const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.SECRET

// Imports Model
const User = require('../models/User')

// Imports Helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

// Controller
module.exports = class UserController {
   // Register User
   static async register(req, res) {
      const { name, email, phone, password, confirmpassword } = req.body

      // Validations
      if (!name) {
         res.status(422).json({ message: 'O nome é obrigatório' })
         return
      }

      if (!email) {
         res.status(422).json({ message: 'O email é obrigatório' })
         return
      }

      if (!phone) {
         res.status(422).json({ message: 'O phone é obrigatório' })
         return
      }

      if (!password) {
         res.status(422).json({ message: 'A Senha é obrigatório' })
         return
      }

      if (!confirmpassword) {
         res.status(422).json({ message: 'A Confirmação de Senha é obrigatório' })
         return
      }

      // password equal to confirmpassword ?
      if (password !== confirmpassword) {
         res.status(422).json({
            message: "A senha e confirmação de senha precisam ser iguais!"
         })
         return
      }

      // check if user exists (email-unique)
      const userExists = await User.findOne({ email: email })
      if (userExists) {
         res.status(422).json({
            message: 'Por favor, Ultilize outro e-mail'
         })
         return
      }

      // create a password (ever save password)
      const salt = await bcrypt.genSalt(12)
      const passwordHash = await bcrypt.hash(password, salt)

      const user = new User({
         name,
         email,
         phone,
         password: passwordHash
      })

      // Save user
      try {
         const newUser = await user.save()
         await createUserToken(newUser, req, res)

      } catch (error) {
         res.status(500).json({ message: error })
      }
   }

   static async login(req, res) {
      // Login User
      const { email, password } = req.body

      // Validations
      if (!email) {
         res.status(422).json({ message: 'O E-mail é obrigatório' })
         return
      }

      if (!password) {
         res.status(422).json({ message: 'A Senha é obrigatório' })
         return
      }

      // check if user exists (email-unique)
      const user = await User.findOne({ email: email })
      if (!user) {
         res.status(422).json({
            message: 'Não há Usuário cadastrado com este e-mail'
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
      // Check if user exists
      let currentUser

      // Get token from headers authorization
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
            message: "Usuário não encontrado!"
         })
         return
      }
      res.status(200).json({ user })
   }

   static async editUser(req, res) {
      const id = req.params.id
      const { name, email, phone, password, confirmpassword } = req.body

      // check if user exists
      const token = getToken(req)
      const user = await getUserByToken(token)

      let image = ''

      // validation
      if (!name) {
         res.status(422).json({ message: 'O nome é obrigatório' })
         return
      }

      if (!email) {
         res.status(422).json({ message: 'O email é obrigatório' })
         return
      }

      // check if email has already taken
      const userExists = await User.findOne({ email })
      if (user.email !== email && userExists) {
         res.status(422).json({
            message: "Por favor, ultilize outro e-mail"
         })
         return
      }

      user.email = email

      if (!phone) {
         res.status(422).json({ message: 'O phone é obrigatório' })
         return
      }

      user.phone = phone

      if (password != confirmpassword) {
         res.status(422).json({ message: "As senhas não conferem!" })
         return
      } else if (password === confirmpassword && password != null) {
         // Create NewPassword
         const salt = await bcrypt.genSalt(12)
         const passwordHash = await bcrypt.hash(password, salt)

         user.password = passwordHash
      }
      try {
         //  Returns user updated data
         await User.findOneAndDelete(
            { _id: user._id },
            { $set: user },
            { new: true }
         )
         res.status(200).json({
            message: "Usuário atualizado com sucesso!"
         })

      } catch (error) {
         res.status(500).json({ message: error })
      }
   }
}