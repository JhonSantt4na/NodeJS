const User = require('../model/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



// Imports helpers
const createUserToken = require("../helpers/create-user-token")
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

// Variables ambient 
require('dotenv').config()
const secret = process.env.SECRET


module.exports = class UserController {
   // Register User
   static async register(req, res) {
      const { name, email, phone, password, confirmPassword } = req.body

      // Validation
      if (!name) {
         res.status(422).json({ message: 'O nome é Obrigatorio' })
         return
      }
      if (!email) {
         res.status(422).json({ message: 'O email é Obrigatorio' })
         return
      }
      if (!phone) {
         res.status(422).json({ message: 'O telefone é Obrigatorio' })
         return
      }
      if (!password) {
         res.status(422).json({ message: 'A senha é Obrigatorio' })
         return
      }
      if (!confirmPassword) {
         res.status(422).json({ message: 'A Confirmação de senha é Obrigatorio' })
         return
      }

      // macth password & confirmPassword
      if (password !== confirmPassword) {
         res.status(422).json({ message: 'A senha e a Confirmação de senha precisam ser iguais!' })
         return
      }

      // check if user exists (email:unique)
      const userExists = await User.findOne({ email })

      if (userExists) {
         res.status(422).json({
            message: 'Por favor, Ultilize outro e-mail !'
         })
         return
      }

      // Create Password
      const salt = await bcrypt.genSalt(12)
      const passwordHash = await bcrypt.hash(password, salt)

      // Create new user
      const user = new User({
         name,
         email,
         phone,
         password: passwordHash
      })

      try {
         // save user in db
         const newUser = await user.save()
         await createUserToken(newUser, req, res) // starts here and ends in helpers

      } catch (error) {
         res.status(500).json({ message: error })
      }
   }

   static async login(req, res) {
      const { email, password } = req.body

      // Validation
      if (!email) {
         res.status(422).json({ message: 'O email é Obrigatorio' })
         return
      }
      if (!password) {
         res.status(422).json({ message: 'A senha é Obrigatorio' })
         return
      }

      // check if user exists (email:unique)
      const user = await User.findOne({ email })

      if (!user) {
         res.status(422).json({
            message: 'Não há usuário cadastrado com este e-mail!'
         })
         return
      }

      // check if password match with db password
      const checkPassword = await bcrypt.compare(password, user.password)
      if (!checkPassword) {
         res.status(422).json({
            message: 'Senha inválida!'
         })
         return
      }

      await createUserToken(user, req, res)
   }

   static async checkUser(req, res) {
      let currentUser

      if (req.headers.authorization) {
         const token = getToken(req)
         const decoded = jwt.verify(token, secret)

         currentUser = await User.findById(decoded.id)
         currentUser.password = undefined

      } else {
         currentUser = null
      }

      res.status(200).send(currentUser)
   }

   static async getUserById(req, res) {
      const id = req.params.id
      const user = await User.findById(id).select("-password")

      if (!user) {
         res.status(422).json({
            message: 'Usuário não encontrado !'
         })
         return
      }

      res.status(200).json({ user })
   }

   static async editUser(req, res) {
      //Check if the id params exists in db
      const id = req.params.id
      const { name, email, phone, password, confirmPassword } = req.body
      let image = ''

      // Check if user exists
      const token = getToken(req)
      const user = await getUserByToken(token)

      // Validation
      if (!name) {
         res.status(422).json({ message: 'O nome é Obrigatorio' })
         return
      }

      if (!email) {
         res.status(422).json({ message: 'O email é Obrigatorio' })
         return
      }
      // check if email has already
      const userExists = await User.findOne({ email })
      if (user.email !== email && userExists) {
         res.status(422).json({
            message: 'Por favor, ultilize outro e-mail'
         })
         return
      }

      user.email = email

      if (!phone) {
         res.status(422).json({ message: 'O telefone é Obrigatorio' })
         return
      }

      user.phone = phone

      if (password != confirmPassword) {
         res.status(422).json({ message: 'As senhas não conferem' })
         return
      } else if (password === confirmPassword && password != null) {
         // Create Password
         const salt = await bcrypt.genSalt(12)
         const passwordHash = await bcrypt.hash(password, salt)

         user.password = passwordHash
      }
      try {
         // user update data
         await User.findOneAndUpdate(
            { _id: user._id },
            { $set: user },
            { new: true }
         )
         res.status(200).json({ message: "Usuário atualizado com sucesso!" })

      } catch (error) {
         res.status(500).json({ message: error })
         return
      }
   }
}