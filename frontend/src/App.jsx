import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-produce' element={<CreateProduce />} />
          <Route path='/my-Produce' element={< Myproduce />} />
          <Route path='/edit-produce/:id' element={<EditProduce />} />
          <Route path='/login' element={< Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>

      </Router>
    </>
  )
}

export default App
