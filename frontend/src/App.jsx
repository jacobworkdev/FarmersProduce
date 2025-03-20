import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import MyProduce from './pages/MyProduce.jsx'
import CreateProduce from './pages/CreateProduce.jsx'
import EditProduce from './pages/EditProduce.jsx'
import "./styles.css";

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-produce' element={<CreateProduce />} />
          <Route path='/my-Produce' element={< MyProduce />} />
          <Route path='/edit-produce/:id' element={<EditProduce />} />
          <Route path='/login' element={< Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>

      </Router>
    </>
  )
}

export default App
