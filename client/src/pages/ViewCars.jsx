import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CarsAPI from '../services/CarsAPI'
import '../css/ViewCars.css'

const ViewCars = ({ title }) => {
    useEffect(() => {
        document.title = title
    }, [title])

    const [cars, setCars] = useState([])

    useEffect(() => {
        const fetchCars = async () => {
            const data = await CarsAPI.getAllCars()
            setCars(data)
        }
        fetchCars()
    }, [])

    const handleDelete = async (id) => {
        await CarsAPI.deleteCar(id)
        setCars(cars.filter(car => car.id !== id))
    }

    return (
        <div className="view-cars">
            <h1>Your Custom Cars</h1>
            
            {cars.length === 0 ? (
                <div className="no-cars">
                    <p>No custom cars yet!</p>
                    <Link to="/">
                        <button>Create Your First Car</button>
                    </Link>
                </div>
            ) : (
                <div className="cars-grid">
                    {cars.map((car) => (
                        <article key={car.id} className="car-card">
                            <header>
                                <h2>{car.name}</h2>
                            </header>
                            
                            <div className="car-details">
                                <p><strong>Exterior:</strong> {car.exterior}</p>
                                <p><strong>Roof:</strong> {car.roof}</p>
                                <p><strong>Wheels:</strong> {car.wheels}</p>
                                <p><strong>Interior:</strong> {car.interior}</p>
                                <p className="price"><strong>Price:</strong> ${car.price.toLocaleString()}</p>
                            </div>
                            
                            <footer>
                                <Link to={`/customcars/${car.id}`}>
                                    <button>View Details</button>
                                </Link>
                                <Link to={`/edit/${car.id}`}>
                                    <button>Edit</button>
                                </Link>
                                <button onClick={() => handleDelete(car.id)}>Delete</button>
                            </footer>
                        </article>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ViewCars