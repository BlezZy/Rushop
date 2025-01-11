const Order = require('../models/Order');

const getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.find()
        if (!allOrders) {
            return res.status(404).json({message: 'Orders not found'})
        }
        return res.status(200).json(allOrders)
    }
    catch (err) {
        return res.status(404).json(err)
    }
}

const getOrderById = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(404).json({message: 'Invalid ID format'})
        }
        const order = await Order.findById(id)
        if (!order) {
            return res.status(404).json({message: 'Order not found'})
        }

        return res.status(200).json(order)
    }
    catch (err) {
        return res.status(404).json(err)
    }
}

const addOrder = async (req, res) => {
    try {
        const order = req.body
        if (!order) {
            return res.status(404).json({message: 'Request body empty'})
        }
        const newOrder = new Order(order)
        const saveOrder = await newOrder.save()

        return res.status(200).json(saveOrder)
    }
    catch (err) {
        return res.status(404).json(err)
    }
}

const updateOrder = async (req, res) => {
    try {
        const id = req.params.id
        const updatedOrder = req.body
        if (!id) {
            return res.status(404).json({message: 'Invalid ID format'})
        }
        if (!updatedOrder) {
            return res.status(404).json({message: 'Request body empty'})
        }
        const updateOrder= await Order.findByIdAndUpdate(id)
        return res.status(200).json(updateOrder)

    }
    catch (err) {
        return res.status(404).json(err)
    }
}

const cancelOrder = async (req, res) => {
    try {
        const id = req.params.id

        if (!id) {
            return res.status(404).json({message: 'Invalid ID format'})
        }

        const order = await Order.findById(id)

        if (!order) {
            return res.status(404).json({message: 'Order not found'})
        }

        if(order.status === 'cancelled') {
            return res.status(400).json({ message: 'Order has already been cancelled.' });
        }
        order.status = 'cancelled'
        order.updatedAt = Date.now()
        await order.save()

        return res.status(200).json({ message: 'Order has been cancelled successfully.', order })
    }
    catch (err) {
        return res.status(404).json(err)
    }
}


module.exports = {
    getAllOrders,
    getOrderById,
    addOrder,
    updateOrder,
    cancelOrder
}