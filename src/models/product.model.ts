import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    price: number;
    imageUrl?: string;
    category?: string;
    stock: number;
    createdAt: Date;
}

const ProductSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String
    },
    category: {
        type: String
    },
    stock: {
        type: Number, default: 0
    },
}, { timestamps: { createdAt: 'createdAt' } });

export const ProductModel =  mongoose.model<IProduct>('Product', ProductSchema);
