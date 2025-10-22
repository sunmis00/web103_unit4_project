import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CarsAPI from '../services/CarsAPI'
import { calculatePrice } from '../utilities/priceCalculator'
import { validateCarConfiguration } from '../utilities/validation'
import '../css/CreateCar.css'

const EditCar = ({ title }) => {
    useEffect(() => {
        document.title = title
    }, [title])

    const { id } = useParams()
    const navigate = useNavigate()

    const [car, setCar] = useState({
        name: '',
        exterior: '',
        roof: '',
        wheels: '',
        interior: ''
    })

    const [price, setPrice] = useState(0)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchCar = async () => {
            const data = await CarsAPI.getCar(id)
            if (data) {
                setCar(data)
                setPrice(data.price)
            }
        }
        fetchCar()
    }, [id])

    const handleChange = (event) => {
        const { name, value } = event.target
        
        const updatedCar = {
            ...car,
            [name]: value
        }
        
        setCar(updatedCar)
        setPrice(calculatePrice(updatedCar))
        setError('')
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        const validation = validateCarConfiguration(car)
        
        if (!validation.valid) {
            setError(validation.message)
            return
        }
        
        const carWithPrice = {
            ...car,
            price: price
        }
        
        await CarsAPI.updateCar(id, carWithPrice)
        navigate(`/customcars/${id}`)
    }

    return (
        <div className="create-car">
            <h1>Edit Your BOLT</h1>
            
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <label>Car Name</label>
                    <input
                        type="text"
                        name="name"
                        value={car.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-section">
                    <label>Exterior Color</label>
                    <div className="options">
                        <label>
                            <input
                                type="radio"
                                name="exterior"
                                value="red"
                                checked={car.exterior === 'red'}
                                onChange={handleChange}
                            />
                            Red (+$0)
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="exterior"
                                value="blue"
                                checked={car.exterior === 'blue'}
                                onChange={handleChange}
                            />
                            Blue (+$500)
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="exterior"
                                value="black"
                                checked={car.exterior === 'black'}
                                onChange={handleChange}
                            />
                            Black (+$1,000)
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="exterior"
                                value="white"
                                checked={car.exterior === 'white'}
                                onChange={handleChange}
                            />
                            White (+$750)
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="exterior"
                                value="silver"
                                checked={car.exterior === 'silver'}
                                onChange={handleChange}
                            />
                            Silver (+$1,200)
                        </label>
                    </div>
                </div>

                <div className="form-section">
                    <label>Roof Type</label>
                    <div className="options">
                        <label>
                            <input
                                type="radio"
                                name="roof"
                                value="standard"
                                checked={car.roof === 'standard'}
                                onChange={handleChange}
                            />
                            Standard (+$0)
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="roof"
                                value="sunroof"
                                checked={car.roof === 'sunroof'}
                                onChange={handleChange}
                            />
                            Sunroof (+$2,000)
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="roof"
                                value="convertible"
                                checked={car.roof === 'convertible'}
                                onChange={handleChange}
                            />
                            Convertible (+$5,000)
                        </label>
                    </div>
                </div>

                <div className="form-section">
                    <label>Wheels</label>
                    <div className="options">
                        <label>
                            <input
                                type="radio"
                                name="wheels"
                                value="standard"
                                checked={car.wheels === 'standard'}
                                onChange={handleChange}
                            />
                            Standard (+$0)
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="wheels"
                                value="sport"
                                checked={car.wheels === 'sport'}
                                onChange={handleChange}
                            />
                            Sport (+$3,000)
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="wheels"
                                value="luxury"
                                checked={car.wheels === 'luxury'}
                                onChange={handleChange}
                            />
                            Luxury (+$5,000)
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="wheels"
                                value="offroad"
                                checked={car.wheels === 'offroad'}
                                onChange={handleChange}
                            />
                            Offroad (+$4,000)
                        </label>
                    </div>
                </div>

                <div className="form-section">
                    <label>Interior</label>
                    <div className="options">
                        <label>
                            <input
                                type="radio"
                                name="interior"
                                value="cloth"
                                checked={car.interior === 'cloth'}
                                onChange={handleChange}
                            />
                            Cloth (+$0)
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="interior"
                                value="leather"
                                checked={car.interior === 'leather'}
                                onChange={handleChange}
                            />
                            Leather (+$4,000)
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="interior"
                                value="premium"
                                checked={car.interior === 'premium'}
                                onChange={handleChange}
                            />
                            Premium (+$7,000)
                        </label>
                    </div>
                </div>

                <div className="price-display">
                    <h2>Total Price: ${price.toLocaleString()}</h2>
                </div>

                {error && <p className="error">{error}</p>}

                <button type="submit">Update Car</button>
            </form>

            <div className="car-preview" style={{ 
                backgroundColor: car.exterior || '#FFD700',
                border: `5px solid ${car.wheels === 'sport' ? 'red' : car.wheels === 'luxury' ? 'gold' : 'black'}`
            }}>
                <h3>Preview</h3>
                <p>Exterior: {car.exterior}</p>
                <p>Roof: {car.roof}</p>
                <p>Wheels: {car.wheels}</p>
                <p>Interior: {car.interior}</p>
            </div>
        </div>
    )
}

export default EditCar