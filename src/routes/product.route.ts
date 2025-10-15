import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, updateProduct } from "../controllers/product.controller";

export const productRouter = Router();

productRouter.get("/", getAllProducts);
// productRouter.get("/:productId", getAllProducts);
productRouter.post("/add", addProduct);
productRouter.put("/update/:productId", updateProduct);
productRouter.delete("/remove/:productId", deleteProduct);
