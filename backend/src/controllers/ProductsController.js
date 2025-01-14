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
        const { category, name, producer, minPrice, maxPrice } = req.query;

        const filter = {};

        if (category) {
            const categoryData = await Category.findOne({ name: { $regex: category, $options: 'i' } });
            if (!categoryData) {
                return res.status(404).json({ error: "Category not found" });
            }
            filter.categoryId = categoryData._id;
        }

        if (name) {
            filter.name = { $regex: name, $options: 'i' };
        }

        if (producer) {
            filter.producer = { $regex: producer, $options: 'i' };
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) {
                if (isNaN(minPrice)) {
                    return res.status(400).json({ error: "minPrice must be a valid number" });
                }
                filter.price.$gte = Number(minPrice);
            }
            if (maxPrice) {
                if (isNaN(maxPrice)) {
                    return res.status(400).json({ error: "maxPrice must be a valid number" });
                }
                filter.price.$lte = Number(maxPrice);
            }
        }

        const products = await Product.find(filter).populate('categoryId', 'name');

        if (products.length === 0) {
            return res.status(404).json({ error: "No products found matching the criteria" });
        }

        return res.status(200).json(products);
    } catch (error) {
        console.error("Error searching products:", error);
        return res.status(400).json(error);
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