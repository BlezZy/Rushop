const Cart = require("../models/Cart");

const getCart = async (req, res) => {
    try {
        const {userId} = req.params

        const cart = await Cart.findOne({userId}).populate('items.productId', 'name price')

        if (!cart) {
            return res.status(404).json({message: 'Cart not found'})
        }

        return res.status(200).json(cart)
    }
    catch (error) {
        return res.status(400).json(error)
    }
}


const addItemToCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId, quantity, price } = req.body;

        if (!productId || !quantity || !price) {
            return res.status(400).json({ error: "ProductId, quantity, and price are required." });
        }

        if (quantity <= 0 || price < 0) {
            return res.status(400).json({ error: "Invalid quantity or price." });
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found." });
        }

        const existingItem = cart.items.find(item => item.productId.toString() === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity, price });
        }

        await cart.save();

        return res.status(200).json({ message: "Item added to cart.", cart });
    } catch (error) {
        return res.status(500).json(error);
    }
}


const removeItemFromCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ error: "ProductId is required." });
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found." });
        }

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        await cart.save();

        return res.status(200).json({ message: "Item removed from cart.", cart });
    } catch (error) {
        return res.status(500).json(error);
    }
}

const clearCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found." });
        }

        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        return res.status(200).json({ message: "Cart cleared.", cart });
    } catch (error) {
        return res.status(500).json(error);
    }
};



module.exports = {
    getCart,
    addItemToCart,
    removeItemFromCart,
    clearCart
}