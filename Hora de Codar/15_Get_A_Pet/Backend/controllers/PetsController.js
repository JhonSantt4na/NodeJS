const Pet = require("../model/Pet");

// helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require("../helpers/get-user-by-token");
const { get } = require("express/lib/request");
const Objectid = require('mongoose').Types.ObjectId

module.exports = class PetsController {
   static async create(req, res) {
      const { name, age, weight, color } = req.body
      const available = true
      const images = req.files

      // Images uploads

      // validations
      if (!name) {
         res.status(422).json({ message: "O nome é obrigatorio!" })
         return
      }

      if (!age) {
         res.status(422).json({ message: "A idade é obrigatorio!" })
         return
      }

      if (!weight) {
         res.status(422).json({ message: "O peso é obrigatorio!" })
         return
      }

      if (!color) {
         res.status(422).json({ message: "A cor é obrigatorio!" })
         return
      }

      if (images.length === 0) {
         res.status(422).json({ message: "A imagem é obrigatorio!" })
         return
      }

      // get user
      const token = getToken(req)
      const user = await getUserByToken(token)

      // Create a pet
      const pet = new Pet({
         name,
         age,
         weight,
         color,
         available,
         images: [],
         user: {
            _id: user._id,
            name: user.name,
            image: user.image,
            phone: user.phone,
         },
      })

      images.map((image) => {
         pet.images.push(image.filename)
      })

      try {
         const newPet = await pet.save()
         res.status(201).json({
            message: "Pet cadastrado com sucesso!",
            newPet: newPet,
         })

      } catch (error) {
         res.status(500).json({ message: error })
      }
   }

   static async getAll(req, res) {
      const pets = await Pet.find().sort('-createdAt')

      res.status(200).json({
         pets: pets
      })
   }

   static async getAllUserPets(req, res) {
      // get user from token
      const token = getToken(req)
      const user = await getUserByToken(token)

      const pets = await Pet.find({ 'user._id': user._id })
         .sort('-createdAt')

      res.status(200).json({
         pets,
      })
   }

   static async getAllUserAdopitions(req, res) {
      // get user from token
      const token = getToken(req)
      const user = await getUserByToken(token)

      const pets = await Pet.find({ 'adopter._id': user._id })
         .sort('-createdAt')

      res.status(200).json({
         pets,
      })
   }

   static async getPetById(req, res) {
      // Check if id is valid
      const id = req.params.id
      if (!Objectid.isValid(id)) {
         res.status(422).json({ message: "Id inválido!" })
         return
      }
      // Check if pet exists
      const pet = await Pet.findOne({ _id: id })

      if (!pet) {
         res.status(404).json({
            message: 'Pet Não encontrado'
         })
      }

      res.status(200).json({
         pet: pet
      })
   }

   static async removePetById(req, res) {
      // Check if id is valid
      const id = req.params.id
      if (!Objectid.isValid(id)) {
         res.status(422).json({ message: "Id inválido!" })
         return
      }

      // Check if pet exists
      const pet = await Pet.findOne({ _id: id })

      if (!pet) {
         res.status(404).json({
            message: 'Pet Não encontrado'
         })
         return
      }

      // check if logged in user registered the pet
      const token = getToken(req)
      const user = await getUserByToken(token)

      if (pet.user._id.toString() !== user._id.toString()) {
         res.status(422).json({ message: "Houve um problema em processar a sua solicitação, Tente novamente mais tarde!" })
         return
      }

      await Pet.findByIdAndDelete(id)
      res.status(200).json({
         message: "Pet removido com sucesso"
      })
   }
}