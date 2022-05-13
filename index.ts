import { config } from "dotenv"
import Exchange from "ccxt"

config() // Take environment variables from .env

const ftx = new Exchange.ftx({
    'apiKey' : process.env.API_KEY,
    'secret' : process.env.API_SECRET,

})

let portfolio = await ftx.fetchBalance()

console.log(JSON.stringify(portfolio, undefined, 4));