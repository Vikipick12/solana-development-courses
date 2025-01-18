import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
    LAMPORTS_PER_SOL
} from "@solana/web3.js";
import "dotenv/config"
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const suppliedToPubkey = process.argv[2] || null;

if (!suppliedToPubkey) {
    console.log("Please provde a public key to send to");
    process.exit(1);
}

const senderKeypair = getKeypairFromEnvironment("DEVNET_SECRET_KEY");
console.log(`Supplied to pubkey: ${suppliedToPubkey}`);

const toPubKey = new PublicKey(suppliedToPubkey);
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

console.log("Loaded private key, destination address and connection to Solana");

const transaction = new Transaction();
const LAMPORTS_TO_SEND = 0.1 * LAMPORTS_PER_SOL;
const sendToInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey: toPubKey,
    lamports: LAMPORTS_TO_SEND
});

transaction.add(sendToInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
    senderKeypair
])

console.log(
    `Finished! Sent ${LAMPORTS_TO_SEND} lamports to ${toPubKey} address.`
);
console.log(`Transaction signature is ${signature} !!!`);