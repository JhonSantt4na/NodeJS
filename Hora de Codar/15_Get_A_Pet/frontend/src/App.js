import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Imports components
import Footer from './components/layouts/Footer'
import Navbar from './components/layouts/Navbar'
import Container from './components/layouts/Container'

// Imports Pages
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import Home from './components/pages/auth/Home';

// Context
import { UserProvider } from './context/UserContexto';

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
