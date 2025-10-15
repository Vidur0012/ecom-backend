import { Request, Response, NextFunction } from 'express';
import { ProductModel } from '../models/product.model';

export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { name, price, imageUrl, category, stock } = req.body;
    await ProductModel.create({ name, price, imageUrl, category, stock },);
    res.status(201).json({ message: 'Product added' });
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const { name, price, imageUrl, category, stock } = req.body;
    await ProductModel.findByIdAndUpdate(productId,{ name, price, imageUrl, category, stock },);
    res.json({ message: 'Product updated' });
};

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    const products = await ProductModel.find();
    res.json(products);
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    await ProductModel.findByIdAndDelete(productId);
    res.json({ message: 'Product deleted'});
};

// export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
//     const { productId } = req.params;
//     const product = await ProductModel.findById(productId);
//     res.status(201).json(product);
// };