const Product = require('../models/Product');

module.exports = class ProductController {
    static async showProducts(req, res) {
        const products = await Product.getProducts();
        res.render('products/all', { products });
    }

    static createProduct(req, res) {
        res.render('products/create');
    }

    static async createProductPost(req, res) {
        const { name, image, price, description } = req.body;
        const product = new Product(name, image, price, description);

        await product.save();
        res.redirect('/products');
    }

    static async getProduct(req, res) {
        const id = req.params.id;
        const product = await Product.getProductsById(id);
        res.render('products/product', { product });
    }
}
