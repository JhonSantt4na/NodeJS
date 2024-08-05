const { where } = require('sequelize');
const User = require('../models/User');
const bcrypt = require('bcrypt');


module.exports = class AuthController {
    static login(req, res) {
        res.render('auth/login');
    }

    static async loginPost(req, res) {
        const { email, password } = req.body
        // find User
        const user = await User.findOne({ where: { email: email } })
        // se não tiver user
        if (!user) {
            req.flash('message', 'Usuario não encontrado')
            res.render('auth/login');
            return
        }
        // Check if passwords mach
        const passwordMatch = bcrypt.compareSync(password, user.password)
        if (!passwordMatch) {
            req.flash('message', 'Senha invalida!')
            res.render('auth/login');
            return
        }
        // initialize session - Autenticando ja ao logar
        req.session.userid = user.id

        // mandando a msg de login
        req.flash('message', 'Autenticação realizada com sucesso!')

        // Salvando a session antes de redirecionar
        req.session.save(() => {
            // Redirecionando
            res.redirect('/');
        })

    }

    static register(req, res) {
        res.render('auth/register');
    }

    static async registerPost(req, res) {
        // Pegadno todos os dados do body
        const { name, email, password, confirmpassword } = req.body
        // password match validation
        if (password != confirmpassword) {
            // Se for diferente, manda uma msg para o front
            req.flash('message', "As Senhas não confere, Tente Novamente!")
            res.render('auth/register');
            return
        }
        // Check if user Exists
        const checkIfUserExists = await User.findOne({ where: { email } })
        if (checkIfUserExists) {
            req.flash('message', "O e-mail já está em uso!")
            res.render('auth/register');
        }

        // creat a password

        // salt = dificulta a senha
        const salt = bcrypt.genSaltSync(10);
        // Criando a senha com o salt
        const hashedPassword = bcrypt.hashSync(password, salt)
        // Preparando o usuario para mandar para o banco
        const user = {
            name,
            email,
            password: hashedPassword // Já mandamos a senha com o salt para o banco nunca manda dados sensiveis
            // Não mandamos a confirmação pois não é necessario
        }
        //  Criando o user no banco 
        try {
            const createUser = await User.create(user);

            // initialize session - Autenticando ja ao logar
            req.session.userid = createUser.id

            // mandando a msg de login
            req.flash('message', 'Cadastro realizado com sucesso!')

            // Salvando a session antes de redirecionar
            req.session.save(() => {
                // Redirecionando
                res.redirect('/');
            })

        } catch (err) {
            console.log(err)
        }
    }

    static logout(req, res) {
        req.session.destroy();
        res.redirect('/login')
    }

}