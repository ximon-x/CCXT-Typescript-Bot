import { config } from "dotenv"
import Exchange, { Dictionary } from "ccxt"

config() // Take environment variables from .env

const ftx = new Exchange.ftx({
	'apiKey': process.env.API_KEY,
	'secret': process.env.API_SECRET,
})

const portfolio: any = await ftx.fetchBalance()
// console.log(JSON.stringify(portfolio, undefined, 4))

const ETH_USDT: any = await ftx.markets['ETH/USDT']  // This returns the binance solana market object
// console.log(JSON.stringify(ETH_USDT, undefined, 4))

try {
	const margin: number = portfolio["free"]["USDT"]
	// This gets the free USDT in your account

	if (margin !== undefined) {
		// Just verifying there's USDT in the account

		const ticker: any = await ftx.fetchTicker("ETH/USDT")
		// Tnis fetches the OHLC and other info on the currency pair

		let amount: number = margin / ticker["last"]
		// This computes the amount of ETH you can buy with the free USDT based on the last price

		amount = Number(await ftx.amount_to_precision("ETH/USDT", amount))
		// This converts the calculated amount to appropriate amount of decimals accepted by the exchange

		if (amount < ETH_USDT["limits"]["amount"]["min"]) {
			console.log("Cannot place order, Not up to minimum tradeable amount")
		}

		else {
			const order: boolean = ftx.create_order("ETH/USDT", 'market', 'buy', amount)
			if (order) {
				console.log("Successfully purchased", amount, " of SOL")
			}
		}
	}
}

catch (e: unknown) {
	if (typeof e === "string") {
		console.log("Error encountered when buying: ", e.toUpperCase())
	}

	else if (e instanceof Error) {
		console.log("Error encountered when buying: ", e.message)
	}
	// Simply checking any errors that might have occurred in the try block
}

await setTimeout(() => {
	console.log("Delayed for 10 second.");
}, 10000)

try {
	const margin : number = portfolio["free"]["ETH"]
	
	if (margin !== undefined) {

		let amount : number = Number(await ftx.amount_to_precision("ETH/USDT", margin))

		if (amount < ETH_USDT["limits"]["amount"]["min"]) {
			console.log("Cannot place order, Not up to minimum tradeable amount")
		}
			
		else {
			const order : boolean = ftx.create_order("ETH/USDT", 'market', 'sell', amount)
			if (order) {
				console.log("Successfully sold ", amount, " of SOL")
			}
		}
	}
}

catch (e: unknown) {
	if (typeof e === "string") {
		console.log("Error encountered when selling: ", e.toUpperCase())
	}

	else if (e instanceof Error) {
		console.log("Error encountered when selling: ", e.message)
	}
	// Simply checking any errors that might have occurred in the try block
}