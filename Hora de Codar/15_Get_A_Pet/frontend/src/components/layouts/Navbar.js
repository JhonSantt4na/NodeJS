import { Link } from "react-router-dom"

import styles from './Navbar.module.css'

import Logo from '../../assets/img/logo.png'

function Navbar() {
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
            <li>
               <Link to='/login'>Entra</Link>
            </li>
            <li>
               <Link to='/register'>Cadastrar</Link>
            </li>
         </ul >
      </nav >
   )
}

export default Navbar