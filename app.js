import express from 'express';
import connectDB from './database/connection.js';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import routes from './routes/index.js';



connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

export default app;
