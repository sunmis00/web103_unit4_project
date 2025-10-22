import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import CarsAPI from '../services/CarsAPI'
import '../css/CarDetails.css'

const CarDetails = ({ title }) => {
    useEffect(() => {
        document.title = title
    }, [title])

    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)

    useEffect(() => {
        const fetchCar = async () => {
            const data = await CarsAPI.getCar(id)
            setCar(data)
        }
        fetchCar()
    }, [id])

    const handleDelete = async () => {
        await CarsAPI.deleteCar(id)
        navigate('/customcars')
    }

    if (!car) {
        return <div className="loading">Loading...</div>
    }

    return (
        <div className="car-details-page">
            <h1>{car.name}</h1>
            
            <div className="details-container">
                <div className="car-image" style={{ 
                    backgroundColor: car.exterior,
                    border: `5px solid ${car.wheels === 'sport' ? 'red' : car.wheels === 'luxury' ? 'gold' : 'black'}`
                }}>
                    <h2>Car Preview</h2>
                </div>
                
                <div className="specifications">
                    <h2>Specifications</h2>
                    
                    <div className="spec-item">
                        <span className="spec-label">Exterior Color:</span>
                        <span className="spec-value">{car.exterior}</span>
                    </div>
                    
                    <div className="spec-item">
                        <span className="spec-label">Roof Type:</span>
                        <span className="spec-value">{car.roof}</span>
                    </div>
                    
                    <div className="spec-item">
                        <span className="spec-label">Wheels:</span>
                        <span className="spec-value">{car.wheels}</span>
                    </div>
                    
                    <div className="spec-item">
                        <span className="spec-label">Interior:</span>
                        <span className="spec-value">{car.interior}</span>
                    </div>
                    
                    <div className="spec-item price-item">
                        <span className="spec-label">Total Price:</span>
                        <span className="spec-value">${car.price.toLocaleString()}</span>
                    </div>
                </div>
            </div>
            
            <div className="actions">
                <Link to={`/edit/${car.id}`}>
                    <button>Edit Car</button>
                </Link>
                <button onClick={handleDelete} className="delete-btn">Delete Car</button>
                <Link to="/customcars">
                    <button>Back to All Cars</button>
                </Link>
            </div>
        </div>
    )
}

export default CarDetails