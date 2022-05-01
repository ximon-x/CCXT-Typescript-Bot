import { config } from "dotenv"
import { Exchange } from "ccxt"

config() // Take environment variables from .env

const ftx = new Exchange({
    key : 'ftx',
    'apiKey' : process.env.API_KEY,
    'secret' : process.env.API_SECRET
})
