const User = require('../models/User');

module.exports = class UserController {
    static async register(req, res) {
        const { name, email, phone, password, confirmpassword } = req.body

        // Validations
        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório' })
            return
        }

        if (!email) {
            res.status(422).json({ message: 'O e-mail é obrigatório' })
            return
        }

        if (!phone) {
            res.status(422).json({ message: 'O telefone é obrigatório' })
            return
        }

        if (!password) {
            res.status(422).json({ message: 'A Senha é obrigatória' })
            return
        }
        if (!confirmpassword) {
            res.status(422).json({ message: 'O confirmação de senha é obrigatória' })
            return
        }

        // passwords check
        if (password !== confirmpassword) {
            res.status(422).json({ message: 'A senha e confirmação de senha precisa ser iguais' })
            return
        }
        // check if user exists (email uni)
        const userExists = await User.findOne({ email: email }) //Pegando do Banco
        if (userExists) { 
            res.status(422).json({
                message: "Por favor, utilize outro e-mail!"
            })
            return
        }
    }
}