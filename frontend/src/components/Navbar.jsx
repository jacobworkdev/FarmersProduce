import AuthContext from "../context/AuthContext"
import { useContext } from "react"
import { Link } from "react-router-dom"
const Navbar = () =>{
    const{user,logout} = useContext(AuthContext)

        //For reference*******

        //   <Route path='/' element={<Home />} />
        //   <Route path='/create-produce' element={<CreateProduce />} />
        //   <Route path='/my-Produce' element={< Myproduce />} />
        //   <Route path='/edit-produce/:id' element={<EditProduce />} />
        //   <Route path='/login' element={< Login />} />
        //   <Route path='/register' element={<Register />} />


    return(
        <nav>
            <Link to='/'>Home</Link>
            {user?(
                <>
                <Link to='/create-produce'>Create Produce</Link>
                <Link to='/my-produce'>My produce</Link>
                <button onClick={logout}>Logout</button>
                </>
            ):(
                <>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
                </>

            )}

        </nav>
    )
}

export default Navbar