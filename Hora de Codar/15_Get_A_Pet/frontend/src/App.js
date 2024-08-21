import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Imports components
import Footer from './components/layouts/Footer'
import Navbar from './components/layouts/Navbar'

// Imports Pages
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import Home from './components/pages/auth/Home';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
