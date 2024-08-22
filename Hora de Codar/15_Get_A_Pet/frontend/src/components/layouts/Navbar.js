import { Link } from "react-router-dom"
import styles from './Navbar.module.css'
import Logo from '../../assets/img/logo.png'
// Context
import { Context } from "../../context/UserContext"
import { useContext } from "react"


function Navbar() {

   const { authenticated, logout } = useContext(Context)

   return (
      <nav className={styles.navbar}>
         <div className={styles.navbar_logo}>
            <img src={Logo} alt="Get a Pet" />
            <h2>Get a Pet</h2>
         </div>
         <ul>
            <li>
               <Link to='/'>Adotar</Link>
            </li>
            {
               authenticated ?
                  (<>
                     <li><Link to='/user/profile'>Perfil</Link></li>
                     <li onClick={logout}>Sair</li>
                  </>) :
                  (<>
                     <li>
                        <Link to='/login'>Entra</Link>
                     </li>
                     <li>
                        <Link to='/register'>Cadastrar</Link>
                     </li>
                  </>)
            }
         </ul >
      </nav >
   )
}

export default Navbar