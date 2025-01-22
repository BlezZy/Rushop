const User = require('../models/User');
const Product = require('../models/Product');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        return res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found.' });
        }

        return res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const addProduct = async (req, res) => {
    try {
        const { name, price, description, stock, categoryId, producer } = req.body;

        if (!name || !price || !description || stock == null || !categoryId || !producer) {
            return res.status(400).json({ error: 'All product fields are required.' });
        }

        if (price <= 0) {
            return res.status(400).json({ error: 'Price must be greater than 0.' });
        }

        if (stock < 0 || !Number.isInteger(stock)) {
            return res.status(400).json({ error: 'Stock must be a non-negative integer.' });
        }

        if (producer.length < 2 || producer.length > 64) {
            return res.status(400).json({ error: 'Producer must be between 2 and 64 characters.' });
        }

        const newProduct = new Product({
            name,
            price,
            description,
            stock,
            categoryId,
            producer
        });

        const savedProduct = await newProduct.save();

        return res.status(201).json({ message: 'Product added successfully.', product: savedProduct });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};



const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, price, description, stock, categoryId } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { name, price, description, stock, categoryId },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        return res.status(200).json({ message: 'Product updated successfully.', product: updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        return res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    deleteUserById,
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
};
