import { config } from "dotenv"
import Exchange, { Dictionary } from "ccxt"

config() // Take environment variables from .env

const ftx = new Exchange.ftx({
    'apiKey' : process.env.API_KEY,
    'secret' : process.env.API_SECRET,

})

const portfolio : any = await ftx.fetchBalance()
// console.log(JSON.stringify(portfolio, undefined, 4))

const ETH_USDT : any = await ftx.markets['ETH/USDT']  // This returns the binance solana market object
// console.log(JSON.stringify(ETH_USDT, undefined, 4))

try {
    const margin : number = portfolio["free"]["USDT"]
    // This gets the free USDT in your account
    const ticker : any = await ftx.fetchTicker("ETH/USDT")
    // Tnis fetches the OHLC and other info on the currency pair

    let amount : number = margin / ticker["last"]
    // This computes the amount of ETH you can buy with the free USDT based on the last price

    amount = ftx.amount_to_precision("ETH/USDT", amount)
//     // This converts the calculated amount to appropriate amount of decimals accepted by the exchange
//     if amount < SOL_USDT["limits"]["amount"]["min"]:
//         print("Cannot place order, Not up to minimum tradeable amount")
//     else:
//         order = binance.create_order("SOL/USDT", 'market', 'buy', amount)
//         if order:
//             print(f"Successfully purchased {amount} of SOL")
}

catch (e: unknown) {
    if (typeof e === "string") {
        e.toUpperCase()
    } 
    else if (e instanceof Error) {
        e.message
    }
 
}