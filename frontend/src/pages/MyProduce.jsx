import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";



const MyProduce = () => {
    const [produce, setProduce] = useState([])
    const { token } = useContext(AuthContext)
    const navigate = useNavigate();




    useEffect(() => {
        const fetchMyProduce = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/produce/myproduce`, {
                    headers: { Authorization: `Bearer ${token}` }
                })

                setProduce(res.data)
            } catch (e) {
                console.log('error fetching my produce', e)
            }
        }

        if (token) {
            fetchMyProduce();
        }

    }, [token])


    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/api/produce/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProduce(produce.filter(item => item._id !== id));
        } catch (error) {
            console.error("Error deleting produce:", error);
        }
    };



    return (
        <div className="AllProduceHome">
            <h1>My Produce</h1>
            {produce.length === 0 ? (
                <p>You have not added any produce yet.</p>
            ) : (
                <div className="AllProduceCardContainer">
                    {produce.map((item) => (
                        <div key={item._id} className="ProduceCard">
                            <h3>{item.name}</h3>
                            <p>Quantity: {item.quantity} {item.unit}</p>
                            <p>Price: ${item.price}</p>
                            {item.imageUrl && <img src={item.imageUrl} alt={item.name} width="100" />}
                            <button onClick={() => navigate(`/edit-produce/${item._id}`)}>Edit</button>
                            <button onClick={() => handleDelete(item._id)}>Delete</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyProduce;
