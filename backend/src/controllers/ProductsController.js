const Product = require('../models/Product')



const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find()
        if(!allProducts) {
            return res.status(404).json({message: 'Products not found'})
        }
        return res.status(200).json(allProducts)
    }
    catch (err) {
        return res.status(400).json(err)
    }
}

const getProductById = async (req, res) => {
    try {
        const id = req.params.id
        const foundProduct = await Product.findById(id)

        if(!id) {
            return res.status(400).json({error: "Invalid ID format"})
        }

        if(!foundProduct) {
            return res.status(404).json({error: "Product not found"})
        }

        return res.status(200).json(foundProduct)

    }
    catch (err) {
        return res.status(400).json(err)
    }
}

const addProduct = async (req, res) => {
    try {
        const product = req.body
        if (!product) {
            return res.status(400).json({error: "Request body empty"})
        }
        const newProduct = new Product(product)
        const saveProduct = await newProduct.save()

        return res.status(200).json(saveProduct)
    }
    catch (err) {
        return res.status(400).json(err)
    }
}

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id
        const product = req.body

        if (!id) {
            return res.status(400).json({error: "Invalid ID format"})
        }

        if (!product) {
            return res.status(400).json({error: "Request body empty"})
        }

        const updateProduct = await Product.findByIdAndUpdate(id, product)

        if (!updateProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        return res.status(200).json(updateProduct)
    }
    catch (err) {
        return res.status(400).json(err)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({error: "Invalid ID format"})
        }
        const deleteProduct = await Product.findByIdAndDelete(id)

        if (!deleteProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        return res.status(200).json(deleteProduct)
    }
    catch (err) {
        return res.status(400).json(err)
    }
}



module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
}