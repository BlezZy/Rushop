const Cart = require("../models/Cart");
const Product = require("../models/Product");

const getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({ userId }).populate('items.productId', 'name price images');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }

        return res.status(200).json(cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};



const addItemToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({ error: 'ProductId and quantity are required.' });
        }

        if (quantity <= 0) {
            return res.status(400).json({ error: 'Quantity must be greater than 0.' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const existingItem = cart.items.find(item => item.productId.toString() === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                productId,
                quantity,
                price: product.price
            });
        }

        await cart.save();

        const responseCart = {
            userId: cart.userId,
            items: cart.items.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            })),
            totalPrice: cart.totalPrice
        };

        return res.status(200).json({ message: 'Item added to cart.', cart: responseCart });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ error: 'Internal server error.', details: error });
    }
};





const removeItemFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ error: 'ProductId is required.' });
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found.' });
        }

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        await cart.save();

        return res.status(200).json({ message: 'Item removed from cart.', cart });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.', details: error });
    }
};

const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found.' });
        }

        cart.items = [];
        cart.totalPrice = 0;

        await cart.save();

        return res.status(200).json({ message: 'Cart cleared.', cart });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.', details: error });
    }
};



module.exports = {
    getCart,
    addItemToCart,
    removeItemFromCart,
    clearCart
}