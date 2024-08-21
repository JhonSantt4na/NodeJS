import Input from '../../form/Input.js'
import styles from '../../form/Form.module.css'

import { Link } from 'react-router-dom'
import { useState } from 'react'

function Register() {
   const [user, setUser] = useState({})

   function handleChange(event) {
      setUser({ ...user, [event.target.name]: event.target.value })
   }

   function handleSubmit(event) {
      event.preventDefault()
      // Enviar o usuario para o banco
      console.log(user)
   }

   return (
      <section className={styles.form_container}>
         <h1>Registrar</h1>
         <form onSubmit={handleSubmit}>
            <Input
               text="Nome"
               type="text"
               name="name"
               placeholder="Digite o seu Nome"
               handleOnChange={handleChange}
            />
            <Input
               text="Telefone"
               type="text"
               name="phone"
               placeholder="Digite o seu Telefone"
               handleOnChange={handleChange}
            />
            <Input
               text="E-mail"
               type="email"
               name="email"
               placeholder="Digite o seu E-mail"
               handleOnChange={handleChange}
            />
            <Input
               text="Senha"
               type="password"
               name="password"
               placeholder="Digite a sua Senha"
               handleOnChange={handleChange}
            />
            <Input
               text="Confirmação de Senha"
               type="password"
               name="confirmpassword"
               placeholder="Confirme a sua Senha"
               handleOnChange={handleChange}
            />
            <input type='submit' value='Cadastrar' />
            <p>
               Já tem conta? <Link to='/login'>Clique aqui.</Link>
            </p>
         </form>
      </section>
   )
}

export default Register