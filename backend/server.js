import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoute from './src/routes/auth.routes.js';
import auctionRoute from './src/routes/auction.routes.js';
import {connectDB} from './src/lib/db.js';
// const mongoose  = require("mongoose");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
     origin: "http://localhost:5173",
     credentials: true,
    }
    ))

connectDB();
app.use('/api/auth', authRoute)
app.use('/api/auct', auctionRoute)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Sever is running on port:", PORT)
});



