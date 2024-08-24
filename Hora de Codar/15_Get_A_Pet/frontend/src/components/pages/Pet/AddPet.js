import api from '../../../utils/api'
import styles from './AddPet.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


// Hooks
import useFlashMessage from '../../../hooks/useFlashMessage'

// Components
import PetForm from "../../form/PetForm";


function AddPet() {
   const [token] = useState(localStorage.getItem('token') || '')
   const { setFlashMessage } = useFlashMessage()
   const history = useNavigate()


   async function registerPet(pet) {
      let msgType = 'success'

      const formData = new FormData()

      const petFormData = await Object.keys(pet).forEach((key) => {
         if (key === 'images') {
            for (let i = 0; i < pet[key].length; i++) {
               formData.append(`images`, pet[key][i])
            }
         } else {
            formData.append(key, pet[key])
         }
      })

      formData.append('pet', petFormData)

      const data = await api
         .post(`pets/create`, formData, {
            headers: {
               Authorization: `Bearer ${JSON.parse(token)}`,
               'Content-Type': 'multipart/form-data',
            },
         })
         .then((response) => {
            console.log(response.data)
            return response.data
         })
         .catch((err) => {
            console.log(err)
            msgType = 'error'
            return err.response.data
         })

      setFlashMessage(data.message, msgType)

      if (msgType !== 'error') {
         history('/pet/mypets')
      }

   }

   return (
      <section>
         <div className={styles.addpet_header}>
            <h1>Cadastre um Pet</h1>
            <p>Depois ele ficará disponível para adoção</p>
         </div>
         <PetForm handleSubmit={registerPet} btnText="Cadastrar" />
      </section>
   )
}

export default AddPet