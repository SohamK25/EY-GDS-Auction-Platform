import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoute from './src/routes/auth.routes.js'
import {connectDB} from './src/lib/db.js';
// const mongoose  = require("mongoose");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

connectDB();
app.use('/api/auth', authRoute)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Sever is running on port:", PORT)
});



