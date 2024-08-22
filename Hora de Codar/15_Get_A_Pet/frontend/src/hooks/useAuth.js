import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFlashMessage from '../hooks/useFlashMessage';
import api from '../utils/api';

export default function useAuth() {
   const [authenticated, setAuthenticated] = useState(false)
   const { setFlashMessage } = useFlashMessage();
   const history = useNavigate()

   useEffect(() => { //Mandando o token em todas as req
      const token = localStorage.getItem('token')

      if (token) {
         api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
         setAuthenticated(true)
      }
   }, [])


   async function register(user) {
      let msgText = 'Cadastro realizado com sucesso!';
      let msgType = 'success';

      try {
         const data = await api.post('users/register', user).then((response) => {
            return response.data;
         });
         console.log(data);
         await authUser(data)
      } catch (error) {
         msgText = error.response.data.message;
         msgType = 'error';
      }

      setFlashMessage(msgText, msgType);

   }

   async function login(user) {
      let msgText = "Login realizado com sucesso!"
      let msgType = "Success"
      try {
         const data = await api.post('/users/login', user).then((response) => {
            return response.data
         })

         await authUser(data)
      } catch (error) {
         msgText = error.response.data.message
         msgType = 'error'
      }

      setFlashMessage(msgText, msgType)
   }

   async function authUser(data) {
      setAuthenticated(true)
      localStorage.setItem('token', JSON.stringify(data.token))
      history('/')
   }

   function logout() {
      const msgText = "Logout realizado com sucesso!"
      const msgType = "sucess"

      setAuthenticated(false)
      localStorage.removeItem('token')
      api.defaults.headers.Authorization = undefined
      history('/')

      setFlashMessage(msgText, msgType)

   }

   return { logout, authenticated, register, login };
}
