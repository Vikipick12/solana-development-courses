import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey
} from "@solana/web3.js";

const publicKey = new PublicKey("Az7i62dzD4RqfJ7dm6SakrjaHoDGjNroJHJgENGhcLuu");
const conncetion = new Connection("https://api.devnet.solana.com", "confirmed"); // "https://api.mainnet-beta.solana.com" for mainnet??
// як я і думав тут посилання замість clusterApiUrl (але хз шо таке "confirmed")
const balanceInLamports = await conncetion.getBalance(publicKey);
const balanceInSOL = balanceInLamports/LAMPORTS_PER_SOL;

console.log(`The devnet account balance is: ${balanceInSOL} SOL`);

// ЧАСТИНА 2

const suppliedPubKey = process.argv[2];
if (!suppliedPubKey) {
  throw new Error("Provide a valid public key you idiot");
}
// в мене вже є конекшн в попередньому коді (так просто урок радить)
// const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const actualSuppliedPubKey = new PublicKey(suppliedPubKey);
const balanceInLamportsOfSuppliedPubKey = await conncetion.getBalance(actualSuppliedPubKey);
const balanceInSOLOfSuppliedPubkey = balanceInLamportsOfSuppliedPubKey / LAMPORTS_PER_SOL;
console.log(`Devnet balance of supplied account (${actualSuppliedPubKey}) is ${balanceInSOLOfSuppliedPubkey} SOL`)

