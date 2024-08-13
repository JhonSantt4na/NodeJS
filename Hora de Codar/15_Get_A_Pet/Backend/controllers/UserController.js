const createUserToken = require('../helpers/create-user-token');
const User = require('../models/User');
const bcrypt = require('bcrypt');


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

        // Create a password crypto
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)
        // Create a user
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash
        })

        try {

            const newUser = await user.save()

            await createUserToken(newUser, req, res)


        } catch (error) {
            res.status(500).json({ message: error })
        }

    }
}