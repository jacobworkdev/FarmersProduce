import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";


const EditProduce = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        name: "",
        quantity: "",
        unit: "",
        price: "",
    });

    useEffect(() => {
        const fetchProduce = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/produce/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setFormData(res.data);
            } catch (error) {
                console.error("error while fetching produce details:", error);
            }
        };

        fetchProduce();
    }, [id, token]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/produce/${id}`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate("/my-produce");
        } catch (error) {
            console.error("error while updating produce:", error);
        }
    };

    return (
        <div>
            <h2>Edit Produce</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Produce Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                <label htmlFor="quantity">Quantity:</label>
                <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
                <label htmlFor="unit">Unit (e.g., kg, lbs, dozen):</label>
                <input type="text" name="unit" value={formData.unit} onChange={handleChange} required />
                <label htmlFor="price">Price ($):</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                <button type="submit">Update Produce</button>
            </form>
        </div>
    );
};

export default EditProduce;
