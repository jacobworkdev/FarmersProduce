import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleRegister = async (e) =>{
        e.preventDefault()

        try{
            const response = await axios.post('http://localhost:5000/api/auth/register',{
                name,
                email,
                password
            })

            alert('Successfully Registered! Please Log in!')
            navigate('/login')
        }catch(e){
            console.log('registration error',e)
        }
    }

    return (
        <div className="RegistrationContainer">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required/>
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                <button type="submit">Submit</button>
            </form>

        </div>
    )

}
export default Register