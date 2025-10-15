//packages
import dotenv from'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";

//environmental variable
const port = Number(process.env.PORT);
const mongodbUri = process.env.MONGODB_URL!;

import {cartRouter} from './routes/cart.route';
import { errorHandler } from './middlewares/errorHandler';
import { productRouter } from './routes/product.route';

const app = express();

app.use(express.json());
app.use(cors());
app.use("/cart",cartRouter);
app.use("/product", productRouter);

app.use(errorHandler);
(async () => {
    try {
        const result = await mongoose.connect(mongodbUri,);
        console.log("Database connected...");
        app.listen(port, () => {
            console.log("Server started on port:", port);
        });
    }
    catch (err) {
        console.log(err);
    }
})();