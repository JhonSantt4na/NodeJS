import { useState, useEffect } from 'react';
import { redirect, useHistory } from 'react-router-dom';
import useFlashMessage from '../hooks/useFlashMessage';
import api from '../utils/api';

export default function useAuth() {
   const { setFlashMessage } = useFlashMessage();
   async function register(user) {
      let msgText = 'Cadastro realizado com sucesso!';
      let msgType = 'success';

      try {
         const data = await api.post('users/register', user).then((response) => {
            return response.data;
         });
         console.log(data);

      } catch (error) {
         msgText = error.response.data.message;
         msgType = 'error';
      }

      setFlashMessage(msgText, msgType);

   }

   return { register };
}
