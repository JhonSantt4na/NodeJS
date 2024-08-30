

module.exports = class UserController {
   static async GetAll(req, res) {
      res.status(200).json({ message: "Pegou Todos" })
   }
}

