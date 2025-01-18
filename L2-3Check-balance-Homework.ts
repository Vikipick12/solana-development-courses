import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey
} from "@solana/web3.js";

/* 
Challenge #
Modify the script as follows:

- Add instructions to handle invalid wallet addresses.
- Modify the script to connect to mainNet and look up some famous Solana wallets. Try toly.sol, shaq.sol or mccann.sol.
*/

const conncetion = new Connection("https://api.mainnet-beta.solana.com", "confirmed"); 
const suppliedPubKey = process.argv[2];
if (!suppliedPubKey){
  throw new Error("Provide a valid pubkey");
}
try{
const actualSuppliedPubKey = new PublicKey(suppliedPubKey);
const balanceInLamportsOfSuppliedPubKey = await conncetion.getBalance(actualSuppliedPubKey);
const balanceInSOLOfSuppliedPubkey = balanceInLamportsOfSuppliedPubKey / LAMPORTS_PER_SOL;
console.log(`✅ The balance of supplied account (${actualSuppliedPubKey}) is ${balanceInSOLOfSuppliedPubkey} SOL`)
} catch (error) {
  console.error("❌ An error occurred:", error.message);
}


