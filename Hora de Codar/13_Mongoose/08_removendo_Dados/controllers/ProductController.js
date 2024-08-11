const Product = require('../models/Product');

module.exports = class ProductController {
    static async showProducts(req, res) {
        // Vamos ultilizar o metodo find() = Resgatar todos os dados
        // e o metodo lean() = Para formatar para o handlebars entender os dados  
        const products = await Product.find().lean();
        res.render('products/all', { products });
    }

    static createProduct(req, res) {
        res.render('products/create');
    }

    // Verificar se esta Assincrona
    static async createProductPost(req, res) {
        const name = req.body.name;
        const image = req.body.image;
        const price = req.body.price;
        const description = req.body.description;
        // Basta passar o objecto que queremos inserir
        const product = new Product({ name, image, price, description });
        // ultilizamos o metodo save do mongoose
        await product.save();
        res.redirect('/products');
    }

    static async getProduct(req, res) {
        const id = req.params.id;
        // Vamos ultilizar o metodo findById não precisamos usar o id do mongo db (_id), alem disso vamos usar o lean() metodo para instruuir a engine ultilizada
        const product = await Product.findById(id).lean();
        res.render('products/product', { product });
    }

    static async removeProduct(req, res) {
        const id = req.params.id
        // ultilizei o metodo deleteOne com o o _id como parametro
        await Product.deleteOne({ _id: id })
        res.redirect('/products')
    }

    static async editProduct(req, res) {
        const id = req.params.id
        // Vamos usar os mesmos metodos findById e lean
        const product = await Product.findById(id).lean();
        res.render('products/edit', { product })
    }

    static async editProductPost(req, res) {
        const id = req.body.id
        const name = req.body.name
        const image = req.body.image
        const price = req.body.price
        const description = req.body.description

        // Basicamente instanciamos um objetos com os dados que serão mudados
        // Poreriamos passarmos direto mais optamos por essa forma
        const product = {
            name, image, price, description
        }
        // Usamos o metodo updateOne como o atributo id e passamos o objecto
        await Product.updateOne({ _id: id }, product)

        res.redirect('/products')
    }
}
