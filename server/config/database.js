import pg from 'pg'

// Use the full connection string from Render
const connectionString = 'postgresql://boltbucket_db_sptx_user:P5QZlBW6B0Si38aMGUDxXHHM9gGJfXfe@dpg-d3sid76uk2gs73fpkokg-a.oregon-postgres.render.com/boltbucket_db_sptx'

const config = {
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
}

export const pool = new pg.Pool(config)