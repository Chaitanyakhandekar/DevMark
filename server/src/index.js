import server from "./server.js";
import dotenv from "dotenv"
import connectDB from "./db/dbConfig.js";

dotenv.config({path:"./.env"})

const port = process.env.PORT || 3000

;connectDB()
        .then(async()=>{
            server.listen(port, async()=>{
                console.log(`Server is running on port ${port}`);
            })
        })
