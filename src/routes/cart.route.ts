import { Router } from "express";
import { addToCart, getAllItems, removeProduct, updateQuantity } from "../controllers/cart.controller";

export const cartRouter = Router();

cartRouter.get("/", getAllItems);
cartRouter.post("/add", addToCart);
cartRouter.put("/update/:productId",updateQuantity);
cartRouter.delete("/remove/:productId", removeProduct);
