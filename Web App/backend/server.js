import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const port = process.env.PORT || 5000

const app = express()

app.get('/', (req,res)=> res.send('Welcome to ParkSense'))

app.listen(port, ()=> console.log(`ParkSense is running on port: ${port}`))