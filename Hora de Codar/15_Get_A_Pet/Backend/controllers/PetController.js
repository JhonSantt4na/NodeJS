const Pet = require('../models/Pet');

// helpers
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");


module.exports = class PetController {
   // Create a pet   
   static async create(req, res) {
      const { name, age, weight, color } = req.body
      const available = true //Disponivel
      const images = req.files

      // Images upload

      // validations
      if (!name) {
         res.status(422).json({ message: "O nome é Obrigatorio" })
         return
      }

      if (!age) {
         res.status(422).json({ message: "O idade é Obrigatorio" })
         return
      }

      if (!weight) {
         res.status(422).json({ message: "O peso é Obrigatorio" })
         return
      }

      if (!color) {
         res.status(422).json({ message: "O cor é Obrigatorio" })
         return
      }


      if (images.length == 0) {
         res.status(422).json({ message: "A imagem é Obrigatorio" })
         return
      }

      // get pet ower
      const token = getToken(req)
      const user = await getUserByToken(token)

      // create a pet
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
            phone: user.phone
         }
      })

      images.map((image) => {
         pet.images.push(image.filename)
      })

      try {

         const newpet = await pet.save()
         res.status(201).json({
            message: 'Pet cadastrado com sucesso!',
            newpet,
         })

      } catch (error) {
         res.status(500).json({ message: error })
      }
   }
}