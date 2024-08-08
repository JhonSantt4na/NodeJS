const Product = require('../models/Product');

module.exports = class ProductController {
    static showProducts(req, res) {
        res.render('products/all')
    }

    static createProduct(req, res) {
        res.render('products/create')
    }

    static createProductPost(req, res) {
        const { name, price, description } = req.body

        const product = new Product(name, price, description)

        product.save()
        res.redirect('/products')

    }
}