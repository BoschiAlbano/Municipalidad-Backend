import { config } from "dotenv"
config();

console.log("Puerto de Entorno: "+ process.env.PORT)

export default{
    port: process.env.PORT || 3000,
}