export const validateCarConfiguration = (car) => {
    // Example: Convertible roof cannot have cloth interior
    if (car.roof === 'convertible' && car.interior === 'cloth') {
        return {
            valid: false,
            message: 'Convertible roof requires leather or premium interior'
        }
    }
    
    // Example: Offroad wheels require standard roof
    if (car.wheels === 'offroad' && car.roof !== 'standard') {
        return {
            valid: false,
            message: 'Offroad wheels require standard roof'
        }
    }
    
    // Check if all required fields are present
    if (!car.name || !car.exterior || !car.roof || !car.wheels || !car.interior) {
        return {
            valid: false,
            message: 'Please fill in all customization options'
        }
    }
    
    return { valid: true }
}