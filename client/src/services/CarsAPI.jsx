const API_URL = '/api/cars'

const getAllCars = async () => {
    try {
        const response = await fetch(API_URL)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching cars:', error)
        return []
    }
}

const getCar = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching car:', error)
        return null
    }
}

const createCar = async (car) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        }
        
        const response = await fetch(API_URL, options)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error creating car:', error)
        return null
    }
}

const updateCar = async (id, car) => {
    try {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        }
        
        const response = await fetch(`${API_URL}/${id}`, options)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error updating car:', error)
        return null
    }
}

const deleteCar = async (id) => {
    try {
        const options = {
            method: 'DELETE'
        }
        
        const response = await fetch(`${API_URL}/${id}`, options)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error deleting car:', error)
        return null
    }
}

export default {
    getAllCars,
    getCar,
    createCar,
    updateCar,
    deleteCar
}