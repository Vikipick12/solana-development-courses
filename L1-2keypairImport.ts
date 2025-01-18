// importing existing keypair
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
 
const keypairImported = await getKeypairFromEnvironment("DEVNET_SECRET_KEY");
//  #should be the same??
// const keypairImported = getKeypairFromEnvironment("DEVNET_SECRET_KEY");   
// ## те саме але не await - типу якшо довга відповідь то піде далі бо йому похуй чекати не буде
// const keypairImported = process.env.DEVNET_SECRET_KEY;   
/* ## стандартна функція з бібліотеки "dotenv" повертає голе значення змінної в .env коли як  
      з цієї прикалюхи "@solana-developers/helpers" повертає додатково скомпільований публічний ключ 
      і щей зі всяким текстом і тд
        Keypair {
            _keypair: {
                publicKey: Uint8Array(32) [
                xx,  xx,  xx,  xx, xxx, xxx, ...,
                ..., ..., . . . .
                xxx, xx
                ],
                secretKey: Uint8Array(64) [
                xx,  xx,  xx,  xx, xxx, xxx, ...,
                xx,  xx,  xx,  xx, xxx, xxx
                ..., ..., . . . .
                xxx, xx
                ]
            }
            }  */
console.log(keypairImported);
console.log("Ключі отримано, я крутий дев😎😎😎😎😎😎😎.");

