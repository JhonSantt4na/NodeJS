import { createContext } from "react";
import useAuth from '../hooks/useAuth'

const Context = createContext()

function UserProvider({ children }) {
   const { logout, authenticated, register, login } = useAuth()

   return (
      <Context.Provider value={{ authenticated, register, logout, login }}>{children}</Context.Provider>
   )
}

export { Context, UserProvider }