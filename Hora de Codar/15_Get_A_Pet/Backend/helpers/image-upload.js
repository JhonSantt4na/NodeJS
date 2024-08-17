const multer = require('multer');
const path = require('path')

// Destination to store the images
const imageStorage = multer.diskStorage({
   destination: function (req, file, cb) {
      let folder = ""
      if (req.baseUrl.includes("users")) {
         folder = "users"
      } else if (req.baseUrl.includes("pets")) {
         folder = "pets"
      }
      cb(null, `public/images/${folder}`)
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + String(Math.floor(Math.random() * 100)) + path.extname(file.originalname)) // Calculo para mais aleatoriaridade na criação do nome unico da image do pet
   },
})

const imageUpload = multer({
   storage: imageStorage,
   fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) {
         // upload only png and jpg format
         return cb(new Error("Por favor, envie apenas png ou jpg!"));
      }
      cb(null, true);
   },
});

module.exports = { imageUpload }