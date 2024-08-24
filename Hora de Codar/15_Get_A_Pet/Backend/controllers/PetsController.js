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

   static async UpdatePet(req, res) {
      const id = req.params.id
      const name = req.body.name
      const age = req.body.age
      const description = req.body.description
      const weight = req.body.weight
      const color = req.body.color
      const images = req.files
      const available = req.body.available

      const updateData = {}

      // check if pet exists
      const pet = await Pet.findOne({ _id: id })

      if (!pet) {
         res.status(404).json({ message: 'Pet não encontrado!' })
         return
      }

      // check if user registered this pet
      const token = getToken(req)
      const user = await getUserByToken(token)

      if (pet.user._id.toString() != user._id.toString()) {
         res.status(404).json({
            message:
               'Houve um problema em processar sua solicitação, tente novamente mais tarde!',
         })
         return
      }

      // validations
      if (!name) {
         res.status(422).json({ message: 'O nome é obrigatório!' })
         return
      } else {
         updateData.name = name
      }

      if (!age) {
         res.status(422).json({ message: 'A idade é obrigatória!' })
         return
      } else {
         updateData.age = age
      }

      if (!weight) {
         res.status(422).json({ message: 'O peso é obrigatório!' })
         return
      } else {
         updateData.weight = weight
      }

      if (!color) {
         res.status(422).json({ message: 'A cor é obrigatória!' })
         return
      } else {
         updateData.color = color
      }

      if (images.length > 0) {
         updateData.images = []
         images.map((image) => {
            updateData.images.push(image.filename)
         })
      }

      await Pet.findByIdAndUpdate(id, updateData)
      res.status(200).json({
         message: "Pet atualizado com sucesso"
      })
   }

   static async schedule(req, res) {
      const id = req.params.id

      // check if pet exists
      const pet = await Pet.findOne({ _id: id })

      // check if user owns this pet
      const token = getToken(req)
      const user = await getUserByToken(token)

      console.log(pet)

      if (pet.user._id.equals(user._id)) {
         res.status(422).json({
            message: 'Você não pode agendar uma visita com seu próprio Pet!',
         })
         return
      }

      // check if user has already adopted this pet
      if (pet.adopter) {
         if (pet.adopter._id.equals(user._id)) {
            res.status(422).json({
               message: 'Você já agendou uma visita para este Pet!',
            })
            return
         }
      }

      // add user to pet
      pet.adopter = {
         _id: user._id,
         name: user.name,
         image: user.image,
      }

      console.log(pet)

      await Pet.findByIdAndUpdate(pet._id, pet)

      res.status(200).json({
         message: `A visita foi agendada com sucesso, entre em contato com ${pet.user.name} no telefone: ${pet.user.phone}`,
      })
   }


   static async concludeAdoption(req, res) {
      const id = req.params.id
      // check if pet exists
      const pet = await Pet.findOne({ _id: id })

      if (!pet) {
         res.status(404).json({ message: 'Pet não encontrado!' })
         return
      }
      // check if logged in user registered the pet
      const token = getToken(req)
      const user = await getUserByToken(token)

      if (pet.user._id.toString() !== user._id.toString()) {
         res.status(422).json({ message: "Houve um problema em processar a sua solicitação, Tente novamente mais tarde!" })
         return
      }

      pet.available = false
      await Pet.findByIdAndUpdate(id, pet)
      res.status(200).json({ message: 'Parabéns o ciclo de adoção foi finalizado com sucesso!' })
   }
}  