const OPTION_PRICES = {
    exterior: {
        red: 0,
        blue: 500,
        black: 1000,
        white: 750,
        silver: 1200
    },
    roof: {
        standard: 0,
        sunroof: 2000,
        convertible: 5000
    },
    wheels: {
        standard: 0,
        sport: 3000,
        luxury: 5000,
        offroad: 4000
    },
    interior: {
        cloth: 0,
        leather: 4000,
        premium: 7000
    }
}

const BASE_PRICE = 45000

export const calculatePrice = (options) => {
    let total = BASE_PRICE
    
    if (options.exterior && OPTION_PRICES.exterior[options.exterior]) {
        total += OPTION_PRICES.exterior[options.exterior]
    }
    
    if (options.roof && OPTION_PRICES.roof[options.roof]) {
        total += OPTION_PRICES.roof[options.roof]
    }
    
    if (options.wheels && OPTION_PRICES.wheels[options.wheels]) {
        total += OPTION_PRICES.wheels[options.wheels]
    }
    
    if (options.interior && OPTION_PRICES.interior[options.interior]) {
        total += OPTION_PRICES.interior[options.interior]
    }
    
    return total
}