const User = require('../models/User');
const bcrypt = require('bcrypt');


module.exports = class AuthController {
    static login(req, res) {
        res.render('auth/login');
    }

    static register(req, res) {
        res.render('auth/register');
    }

    static async registerPost(req, res) {
        // Pegadno todos os dados do body
        const { name, email, password, confirmPassword } = req.body
        // password match validation
        if (password != confirmPassword) {
            // Usando flash cards
            req.flash('message', 'As Senhas não Confere, Tente novamente')
            res.render('auth/register')

            return
        }
    }
}