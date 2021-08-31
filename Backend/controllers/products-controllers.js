const Product = require('../models/product')
const User = require('../models/user');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose')

export const getProductById = async (req, res, next) => {
    const pid = req.params.pid
    let place;
    try {
        place = await Product.findById(pid)
    } catch (err) {
        const error = new Error("Some error occurred")
        return next(error)
    }
    if (!place) {
        const error = new Error("Cannot find place")
        return next(error)

    }
    res.json({
        place: place.toObject({ getters: true })
    })
}






export const getProductByUserId = async (req, res, next) => {
    const uid = req.params.uid
    let products;
    try {
        products = await User.findById(uid).populate('products')
    } catch (err) {
        const error = new Error("Some error occurred")
        return next(error)
    }
    if (!products || products.length === 0) {
        const error = new Error("Cannot find place for this user")
        return next(error)

    }
    res.json({
        products: products.map(product => product.toObject({ getters: true }))
    })
}




export const createProduct = async (req, res, next) => {

    const errors = validationResult(req)
    if (!error.isEmpty()) {
        const error = new Error("Please enter proper details")
        return next(error)
    }

    const { name, details } = req.body;
    const product = new Product({
        name: name,
        details: details
    }
    )
    let user;
    try {
        user = await User.findById(req.userId)
    } catch (err) {
        const error = new Error("Some error occurred")
        return next(error)

    }
    if (!user) {
        const error = new Error("Cannot find user for this id")
        return next(error)

    }
    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await product.save({ session: sess })
        user.products.push(product)
        await user.save({ session: sess })
        await sess.commitTransaction()
    } catch (err) {
        const error = new Error("Some error occurred")
        return next(error)

    }

    res.json({createdproduct:product})
}