import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"
import { connectDB } from "./config/db";
import authRoutes from './routes/auth'
import protectedRoutes from './routes/protected'
import errorHandler from "./middleware/errorHandler";

dotenv.config()
const app = express()
connectDB().catch(err=> {console.error(err); process.exit(1);})

app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    })
)

app.use('/api/auth', authRoutes)
app.use('/api', protectedRoutes)


app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))