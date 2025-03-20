import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext"
import axios from "axios"
const MyProduce = ()=>{
    const[produce,setProduce] = useState([])
    const {token} = useContext(AuthContext)

    useEffect(()=>{
        const fetchMyProduce = async()=>{
            try{
                const res= await axios.get('http://localhost:5000/api/produce/myproduce',{
                    headers: { Authorization: `Bearer ${token}`}
                })

                setProduce(res.data)
            }catch(e){
                console.log('error fetching my produce',e)
            }
        }

        if (token) {
            fetchMyProduce();
        }

    },[token])

    return(
        <div className="MyProducePage">
            <h1>My Produce</h1>
            {produce.length === 0 ? (
                <p>You have not added any produce yet.</p>
            ) : (
                <div className="ProduceList">
                    {produce.map((item) => (
                        <div key={item._id} className="ProduceCard">
                            <h3>{item.name}</h3>
                            <p>Quantity: {item.quantity} {item.unit}</p>
                            <p>Price: ${item.price}</p>
                            {item.imageUrl && <img src={item.imageUrl} alt={item.name} width="100" />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyProduce;
