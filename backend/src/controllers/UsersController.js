const User = require('../models/User');
const Cart = require('../models/Cart');

const registerUser = async (req, res) => {
    try {
        const {email, password, name, surname, addresses} = req.body;

        if (!email || !password || !name || !surname || !addresses) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await User.findOne({email})

        if (existingUser) {
            return res.status(400).json({error: 'User already exists'})
        }

        const newUser = new User({
            email,
            password,
            name,
            surname,
            addresses,
            role: 'user'
        })
        const savedUser = await newUser.save()

        const newCart = new Cart({userId: savedUser._id})
        await newCart.save()

        return res.status(201).json({message: "User registered and cart created successfully."})
    }
    catch (error) {
        console.error("Error during registration", error)
        return res.status(500).json(error)
    }
}

const getUserProfileById = async (req, res) => {
    try {
        const id = req.params.id;

        if(!id) {
            return res.status(404).json({error: "ID not found"})
        }

        const user = await User.findById(id).select('-password');

        if (!user) {
            return res.status(404).json({error: "User not found"})
        }
        return res.status(200).json({user})
    }
    catch (error) {
        console.error("Error fetching user profile", error)
        return res.status(500).json(error)
    }
}

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find()

        if (!allUsers) {
            return res.status(404).json({error: "Users not found"})
        }

        return res.status(200).json(allUsers)
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const {email, name, surname} = req.body;

        if (!id) {
            return res.status(404).json({error: "ID not found"})
        }

        const user = await User.findByIdAndUpdate(id, {email, name, surname})
        if (!user) {
            return res.status(404).json({error: "User not found"})
        }
        return res.status(200).json({message: "User updated successfully."})
    }
    catch (error) {
        console.error("Error updating user profile", error);
        res.status(500).json(error);
    }
}

const deleteUserProfile = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(404).json({error: "ID not found"})
        }

        const deletedUser = await User.findByIdAndDelete(id)

        if (!deletedUser) {
            return res.status(404).json({error: "User not found"})
        }

        await Cart.findOneAndDelete({userId: id})

        return res.status(200).json({message: "User deleted successfully."})


    }
    catch (error) {
        console.error("Error deleting user", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getUserAddresses = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(404).json({error: "ID not found"})
        }

        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({error: "User not found"})
        }

        const formattedAddresses = user.addresses.map(address => ({
            street: address.street,
            city: address.city,
            country: address.country,
            zipCode: address.zipCode,
        }))

        return res.status(200).json(formattedAddresses)
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' })
    }
}

const addUserAddress = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(404).json({error: "ID not found"})
        }

        const {street, city, country, zipCode} = req.body;

        if (!street || !city || !country || !zipCode) {
            return res.status(400).json({ error: "All address fields are required." });
        }

        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({error: "User not found"})
        }

        const newAddress = {street, city, country, zipCode};
        user.addresses.push(newAddress);

        await user.save()

        return res.status(201).json({message: "Address added successfully."})
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error." });
    }
}

const updateUserAddress = async (req, res) => {
    try {
        const { id, addressId } = req.params;
        const { street, city, country, zipCode } = req.body;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const address = user.addresses.id(addressId);

        if (!address) {
            return res.status(404).json({ error: 'Address not found' });
        }

        if (street) address.street = street;
        if (city) address.city = city;
        if (country) address.country = country;
        if (zipCode) address.zipCode = zipCode;

        await user.save();

        res.status(200).json({ message: 'Address updated successfully', address });
    } catch (error) {
        console.error("Error updating address", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteUserAddress = async (req, res) => {
    try {
        const { id, addressId } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const address = user.addresses.id(addressId);

        if (!address) {
            return res.status(404).json({ error: 'Address not found' });
        }

        user.addresses.pull(addressId)

        await user.save();

        res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
        console.error("Error deleting address", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    registerUser,
    getUserProfileById,
    getAllUsers,
    updateUserProfile,
    deleteUserProfile,
    getUserAddresses,
    addUserAddress,
    updateUserAddress,
    deleteUserAddress,
}