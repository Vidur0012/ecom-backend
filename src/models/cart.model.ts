import mongoose, { Schema, Document } from 'mongoose';

export interface ICartItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  user: number;
  items: ICartItem[];
}

const CartSchema = new Schema<ICart>({
  user: { type: Number, unique: true, required: true },
  items: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 }
  }]
}, { timestamps: true });

export const CartModel =  mongoose.model<ICart>('Cart', CartSchema);
