import { pool } from './database.js'

const createCarsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS cars;

        CREATE TABLE IF NOT EXISTS cars (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            exterior VARCHAR(50) NOT NULL,
            roof VARCHAR(50) NOT NULL,
            wheels VARCHAR(50) NOT NULL,
            interior VARCHAR(50) NOT NULL,
            price INTEGER NOT NULL
        )
    `

    try {
        await pool.query(createTableQuery)
        console.log('🎉 cars table created successfully')
    } catch (err) {
        console.error('⚠️ error creating cars table', err)
    }
}

const seedCarsTable = async () => {
    const insertQuery = `
        INSERT INTO cars (name, exterior, roof, wheels, interior, price)
        VALUES 
            ('Lightning Bolt', 'red', 'convertible', 'sport', 'leather', 55000),
            ('Thunder Strike', 'blue', 'sunroof', 'luxury', 'premium', 62000)
    `

    try {
        await pool.query(insertQuery)
        console.log('🎉 cars table seeded successfully')
    } catch (err) {
        console.error('⚠️ error seeding cars table', err)
    }
}

const setup = async () => {
    await createCarsTable()
    await seedCarsTable()
}

setup()