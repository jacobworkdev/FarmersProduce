import { useState, useContext } from 'react'
import AuthContext from "../context/AuthContext.jsx";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config.js';

const Login = ()=>{
    const [formData,setFormData]= useState({email:'',password:''})
    const[message,setMessage] = useState('')
    const {login} = useContext(AuthContext)
    const navigate=useNavigate()
    const handleChange=(e) =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()

        try{
            const res = await axios.post(`${API_BASE_URL}/api/auth/login`,formData)
            console.log("login response:",res.data)
            console.log(res)
            login(res.data.user,res.data.token)
            setMessage('Login Successfull!')
            navigate('/my-Produce') // send the farmer to my produce page to list all of his own postings
        }catch(err){
            setMessage('Wrong credentials')
        }
    }

    return(
        <div className="LoginPage">
            <h2>Login</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required/>
                <button type='submit'>Login</button>
            </form>
        </div>
    )

}

export default Login