import { Request, Response, NextFunction } from 'express';
import { CartModel } from '../models/cart.model';
import { ProductModel } from '../models/product.model';
import mongoose from 'mongoose';

export const getAllItems = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;
    const cart = await CartModel.findOne({ user: userId }).populate('items.product');
    res.json(cart || { items: [] });
};

export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
    const { productId,userId, quantity = 1 } = req.body;
    if (!mongoose.isValidObjectId(productId)) 
        return res.status(400).json({ message: 'Invalid product' });

    const product = await ProductModel.findById(productId);
    if (!product) 
        return res.status(404).json({ message: 'Product not found' });

    let cart = await CartModel.findOne({ user: userId });
    if (!cart) 
        cart = new CartModel({ user: userId, items: [] });

    const idx = cart.items.findIndex(i => i.product.toString() === productId);
    if (idx > -1) 
        cart.items[idx].quantity += +quantity;
    else 
        cart.items.push({ product: productId, quantity: +quantity });

    await cart.save();
    await cart.populate('items.product');
    res.json(cart);
};

export const updateQuantity = async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const { qty, userId } = req.body;
    const cart = await CartModel.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart data not found' });
    const item = cart.items.find(i => i.product.toString() === productId);
    if (!item) return res.status(404).json({ message: 'Item not in cart' });
    item.quantity = +qty;
    await cart.save();
    await cart.populate('items.product');
    res.json(cart);
};

export const removeProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;
    const { productId } = req.params;
    const cart = await CartModel.findOne({ user: userId });
    if (!cart)
        return res.status(404).json({ message: 'Cart data not found' });
    cart.items = cart.items.filter(i => i.product.toString() !== productId);
    await cart.save();
    await cart.populate('items.product');
    res.json(cart);
};

