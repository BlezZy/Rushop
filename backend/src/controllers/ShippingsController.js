const Shipping = require("../models/Shipping");

const getAllShippings = async (req, res) => {
    try {
        const allShippings = await Shipping.find()

        if(!allShippings) {
            return res.status(404).json({message: "Shipping not found"})
        }

        return res.status(200).json(allShippings)
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

const getShippingById = async (req, res) => {
    try {
        const id = req.params.id

        if(!id) {
            return res.status(404).json({message: "Invalid ID format"})
        }

        const shipping = await Shipping.findById(id)

        if(!shipping) {
            return res.status(404).json({message: "Shipping not found"})
        }

        return res.status(200).json(shipping)
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

const addShipping = async (req, res) => {
    try {
        const shipping = req.body

        if(!shipping) {
            return res.status(404).json({message: "Request body empty"})
        }

        const newShipping = await new Shipping(shipping)
        const savedShipping = await newShipping.save()

        return res.status(200).json(savedShipping)
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

const updateShipping = async (req, res) => {
    try {
        const id = req.params.id

        if(!id) {
            return res.status(404).json({message: "Invalid ID format"})
        }

        const shipping = req.body

        if(!shipping) {
            return res.status(404).json({message: "Request body empty"})
        }

        const updatedShipping = await Shipping.findByIdAndUpdate(id, shipping)

        if(!updatedShipping) {
            return res.status(404).json({message: "Shipping not found"})
        }

        return res.status(200).json({message: "Shipping updated successfully"})
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

const deleteShipping = async (req, res) => {
    try{
        const id = req.params.id

        if(!id) {
            return res.status(404).json({message: "Invalid ID format"})
        }

        const deleteShipping = await Shipping.findByIdAndDelete(id)

        if(!deleteShipping) {
            return res.status(404).json({message: "Shipping not found"})
        }

        return res.status(200).json({message: "Shipping deleted successfully"})
    }
    catch (error) {
        return res.status(400).json(error)
    }
}



module.exports = {
    getAllShippings,
    getShippingById,
    addShipping,
    updateShipping,
    deleteShipping
}