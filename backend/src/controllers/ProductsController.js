const Product = require('../models/Product')
const mongoose = require('mongoose');
const Category = require('../models/Category');


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

const searchProducts = async (req, res) => {
    try {
        const { category, title, minPrice, maxPrice } = req.query;

        const filter = {};

        if (category) {
            filter.categoryId = category;
        }

        if (title) {
            filter.name = { $regex: title, $options: 'i' };
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseFloat(minPrice);
            if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
        }

        const products = await Product.find(filter).populate('categoryId', 'name');

        if (products.length === 0) {
            return res.status(404).json({ error: "No products found matching the criteria" });
        }

        return res.status(200).json(products);
    } catch (error) {
        console.error("Error searching products:", error);
        return res.status(400).json({ error: 'An error occurred while searching for products.' });
    }
};



module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    searchProducts
}