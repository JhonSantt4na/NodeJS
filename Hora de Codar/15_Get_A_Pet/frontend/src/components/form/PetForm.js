import { useState } from "react"
import formStyles from './Form.module.css'
import Input from './Input'
import Select from './Select'

function PetForm({ handleSubmit, petData, btnText }) {
   const [pet, setPet] = useState(petData || {})
   const [preview, setPreview] = useState([])
   const colors = ['Branco', "Preto", "Cinza", "Caramelo", "Mesclado"]

   function onFileChange(event) {

   }

   function handleChange(event) {

   }

   function handleColor(event) {

   }

   return (
      <form className={formStyles.form_container}>
         <Input
            text="Imagens do Pet"
            type="file"
            name="images"
            handleOnChange={onFileChange}
            multiple={true}
         />
         <Input
            text="Nome do Pet"
            type="text"
            name="name"
            placeholder="Digite o nome"
            handleOnChange={handleChange}
            value={pet.name || ''}
         />
         <Input
            text="Idade do Pet"
            type="text"
            name="age"
            placeholder="Digite a Idade"
            handleOnChange={handleChange}
            value={pet.name || ''}
         />
         <Input
            text="Peso do Pet"
            type="number"
            name="weight"
            placeholder="Digite o Peso"
            handleOnChange={handleChange}
            value={pet.name || ''}
         />
         <Select
            name='color'
            text="Selecione a cor"
            options={colors}
            handleOnChange={handleColor}
            value={pet.color || ''}
         />
         <input type="submit" value={btnText} />
      </ form >
   )
}

export default PetForm