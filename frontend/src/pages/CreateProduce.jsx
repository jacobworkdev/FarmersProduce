import axios from "axios"
import { useState } from "react"

const CreateProduce = () => {
    const [formData, setFormData] = useState({
        name: "",
        quantity: "",
        unit: "",
        price: "",
        image: null,
    })

    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('name', formData.name)
        data.append('quantity', formData.quantity)
        data.append('unit', formData.unit)
        data.append('price', formData.price)
        data.append('image', formData.image)


        const token = localStorage.getItem('token')

        try {
            const res = await axios.post('http://localhost:5000/api/produce', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            })
            setMessage('Produce has been added')
        } catch (err) {
            setMessage('Something went wrong')
            console.log('something went wrong while adding the produce', err)
        }

    }


    return (
        <div>
            <h2>Add Produce</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} required />
                <input type="text" name="unit" placeholder="Unit (e.g., kg, lbs)" onChange={handleChange} required />
                <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
                <input type="file" name="image" onChange={handleFileChange} required />
                <button type="submit">Submit</button>
            </form>
        </div>
    );


}

export default CreateProduce