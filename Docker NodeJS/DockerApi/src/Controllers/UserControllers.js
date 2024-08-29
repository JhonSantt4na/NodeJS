
export const createUser = (req, res) => {
   res.status(201).json({ message: "Boa Noite" })
}
export const getAllUser = (req, res) => {
   res.status(200).json({ message: "Boa Dia" })
}
export const updateUser = (req, res) => {
   res.json({ message: "Boa Tarde" })
}
export const deleteUser = (req, res) => {
   res.json({ message: "Boa Madrugada" })
}