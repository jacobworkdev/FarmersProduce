import { useEffect, useState } from "react";
import axios from 'axios'

const Home = () => {
    const [produce, setProduce] = useState([])
    useEffect(() => {
        const fetchProduce = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/produce')
                console.log(res.data)
                setProduce(res.data)
            } catch (error) {
                console.log('error fetching the produce:', error)
            }
        }
        fetchProduce()
    }, [])

    return (
        <div className="AllProduceHome">
            <h1>Hello this is Farmers Produce marketplace!</h1>
            {produce.length === 0 ? <p>No Produce available right now, Sorry!.</p> : (
                <div className="AllProduceCardContainer">
                    {produce.map((item) => (
                        <div key={item._id} className="ProduceCard">
                            <h3>{item.name}</h3>
                            <p>Quantity:{item.quantity} {item.unit}</p>
                            <p>Price: ${item.price}</p>
                            <p>Farm - {item.farmer.name}</p>
                            {item.imageUrl && <img src={item.imageUrl} alt={item.name} width="100" />}
                        </div>
                    ))}
                </div>
            )}


        </div>
    )
}

export default Home;
