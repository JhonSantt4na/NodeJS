const conn = require('../db/conn');
const { ObjectId } = require('mongodb');

class Product {

    constructor(name, image, price, description) {
        this.name = name;
        this.image = image;
        this.price = price;
        this.description = description;
    }

    async save() {
        const product = await conn.db().collection('products').insertOne({
            name: this.name,
            image: this.image,
            price: this.price,
            description: this.description
        });
        return product;
    }

    static async getProducts() {
        const products = await conn.db().collection('products').find().toArray();
        return products;
    }

    static async getProductsById(id) {
        const product = await conn.db().collection('products').findOne({ _id: new ObjectId(id) });
        return product;
    }

    static async removeProductById(id) {
        await conn.db()
            .collection('products')
            .deleteOne({ _id: new ObjectId(id) })
        return
    }

}

module.exports = Product;
