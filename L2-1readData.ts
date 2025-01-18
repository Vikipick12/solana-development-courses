import { 
    Connection, 
    clusterApiUrl, 
    PublicKey,  
    LAMPORTS_PER_SOL
} from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet")); // "mainnet-beta" for mainnet
const address = new PublicKey("CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN");
const balance = await connection.getBalance(address);
const balanceInSOL = balance / LAMPORTS_PER_SOL;

console.log(`The balance of ${address} is ${balance} lamports`);
console.log(`The balance of ${address} is ${balanceInSOL    } SOL`);