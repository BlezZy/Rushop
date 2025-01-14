const Discount = require("../models/Discount");


const getAllDiscounts = async (req, res) => {
    try {
        const allDiscounts = await Discount.find()

        if(!allDiscounts) {
            return res.status(404).json({message:'No Discounts found'})
        }

        return res.status(200).json(allDiscounts)
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

const getDiscountById = async (req, res) => {
    try {
        const id = req.params.id;

        if(!id) {
            return res.status(404).json({message:'Invalid ID format'})
        }

        const discount = await Discount.findById(id)

        if(!discount) {
            return res.status(404).json({message:'Discount not found'})
        }

        return res.status(200).json(discount)
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

const addDiscount = async (req, res) => {
    try {
        const discount = req.body

        if(!discount) {
            return res.status(404).json({message:'Request body empty'})
        }

        const newDiscount = new Discount(discount)
        const savedDiscount = await newDiscount.save()
        return res.status(200).json(savedDiscount)
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

const updateDiscount = async (req, res) => {
    try {
        const id = req.params.id;

        if(!id) {
            return res.status(404).json({message:'Invalid ID format'})
        }

        const discount = req.body

        if(!discount) {
            return res.status(404).json({message:'Request body empty'})
        }

        const updateDiscount = await Discount.findByIdAndUpdate(id, discount)

        if(!updateDiscount) {
            return res.status(404).json({message:'Discount not found'})
        }

        return res.status(200).json({message: 'Discount updated successfully'})
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

const deleteDiscount = async (req, res) => {
    try {
        const id = req.params.id;

        if(!id) {
            return res.status(404).json({message:'Invalid ID format'})
        }

        const deleteDiscount = await Discount.findByIdAndDelete(id)

        if(!deleteDiscount) {
            return res.status(404).json({message:'Discount not found'})
        }

        return res.status(200).json({message: 'Discount deleted successfully'})
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

module.exports = {
    getAllDiscounts,
    getDiscountById,
    addDiscount,
    updateDiscount,
    deleteDiscount,
}