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
//або
//const suppliedToPubkey = process.argv[2] || null;
//або
//прикольчик для вводу даних через консоль
import readline from "readline";
//створюємо інтерфейс readline
const rl1 = readline.createInterface({
    input: process.stdin,   //читає вхідні дані
    output: process.stdout  //записує у консоль
});

//rl1.question("Enter recepient address:": string, (answer: string) )


// Функція для запиту даних
function askQuestion(query: string): Promise<string> {
    return new Promise((resolve) => rl1.question(query, resolve));
}

async function main() {
    const recepientInput = await askQuestion("Enter recepient address:");
    const solAmountInput = await askQuestion("Enter SOL amount to send:");
    rl1.close();

    const solAmount = parseFloat(solAmountInput);
    if (isNaN(solAmount) || solAmount <= 0) {
        console.log("Invalid SOL amount entered. Please enter a positive number.");
        process.exit(1);
    }

    if (!recepientInput){
        console.log("Please provide a public key to send to");
        process.exit(1);
    }

    const suppliedToPubkey = recepientInput;

    const senderKeypair = getKeypairFromEnvironment("DEVNET_SECRET_KEY");
    console.log(`Supplied to pubkey: ${suppliedToPubkey}`);

    const toPubKey = new PublicKey(suppliedToPubkey);
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");

    console.log("Loaded private key, destination address and connection to Solana");

    const transaction = new Transaction();
    const LAMPORTS_TO_SEND = solAmount * LAMPORTS_PER_SOL;
    const sendToInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey: toPubKey,
    lamports: LAMPORTS_TO_SEND
    });

    transaction.add(sendToInstruction);
    const signature = await sendAndConfirmTransaction(connection, transaction, [
        senderKeypair
    ]);

    console.log(
        `Finished! Sent ${LAMPORTS_TO_SEND} lamports to ${toPubKey} address.`
    );
    console.log(`Transaction signature is ${signature} !!!`);
}

main();

    




