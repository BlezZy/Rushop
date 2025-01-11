const Category = require('../models/Category')


const getAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find()
        if (!allCategories) {
            return res.status(404).json({message: 'Category not found'})
        }
        return res.status(200).json(allCategories)
    }
    catch (error) {
        return res.status(400).json({error: error})
    }
}

const getCategoryById = async (req, res) => {
    try {
        const id = req.params.id
        const category = await Category.findById(id)

        if (!id) {
            return res.status(404).json({message: 'Invalid ID format'})
        }

        if (!category) {
            return res.status(404).json({message: 'Category not found'})
        }

        return res.status(200).json(category)


    }
    catch (error) {
        return res.status(400).json({error: error})
    }
}

const addCategory = async (req, res) => {
    try {
        const category = req.body

        if (!category) {
            return res.status(404).json({message: 'Request body empty'})
        }
        const newCategory = new Category(category)
        const savedCategory = await newCategory.save()
        return res.status(200).json(savedCategory)
    }
    catch (error) {
        return res.status(400).json({error: error})
    }
}

const updateCategory = async (req, res) => {
    try {
        const id = req.params.id
        const category = req.body
        if (!id) {
            return res.status(404).json({message: 'Invalid ID format'})
        }
        if (!category) {
            return res.status(404).json({message: 'Request body empty'})
        }

        const updatedCategory = await Category.findByIdAndUpdate(id, category)
        return res.status(200).json(updatedCategory)
    }
    catch (error) {
        return res.status(400).json({error: error})
    }
}

const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(404).json({message: 'Invalid ID format'})
        }

        const deletedCategory = await Category.findByIdAndDelete(id)
        return res.status(200).json(deletedCategory)
    }
    catch (error) {
        return res.status(400).json({error: error})
    }
}


module.exports = {
    getAllCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory
}