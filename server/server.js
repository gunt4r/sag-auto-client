/* eslint-disable no-undef */
import express from "express"
import dotenv from "dotenv"
import sequelize  from "./config/database.js"
import AdminRoutes from "./routes/Admin.js"
import CarsRoutes from "./routes/Cars.js"
import bodyParser from "body-parser"
import cors from "cors"
dotenv.config({
    path: "./server/.env"
})
const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded()); 
app.use("/uploads", express.static("uploads"))
app.use("/api/admin",AdminRoutes)
app.use("/api/cars",CarsRoutes)
sequelize.sync().then( () => {
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})