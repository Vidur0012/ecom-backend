import mongoose, { ObjectId } from 'mongoose';
import dotenv from 'dotenv';
import { ProductModel } from './models/product.model';
import { CartModel, ICart, ICartItem } from './models/cart.model';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URL;

// 1️⃣ Sample Products
const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    price: 1999,
    imageUrl: 'https://www.shutterstock.com/image-illustration/wireless-bluetooth-headphones-white-case-600nw-2051472314.jpg',
    category: 'Electronics',
    stock: 25,
  },
  {
    name: 'Smartphone Model X',
    price: 24999,
    imageUrl: 'https://cdn.dribbble.com/userupload/16842252/file/original-3762a9197a46e47a233290e0d408b1e1.png?format=webp&resize=400x300&vertical=center',
    category: 'Mobiles',
    stock: 15,
  },
  {
    name: 'Gaming Laptop Pro',
    price: 89999,
    imageUrl: 'https://www.shutterstock.com/image-vector/thin-gaming-laptop-glowing-rgb-260nw-2322287961.jpg',
    category: 'Computers',
    stock: 8,
  },
  {
    name: 'Cotton T-Shirt',
    price: 499,
    imageUrl: 'https://5.imimg.com/data5/SELLER/Default/2023/8/335518145/VC/FB/IU/155351929/e-commerce-men-t-shirt-photography.jpeg',
    category: 'Fashion',
    stock: 50,
  },
  {
    name: 'Cooking Pan Set',
    price: 1599,
    imageUrl: 'https://media.istockphoto.com/id/635934210/photo/cooking-equipment-on-wooden-table.jpg?s=612x612&w=0&k=20&c=ihYdUXRdmncnpYGgQzyW14PvaPVzaoMsHIRwjkiX6hI=',
    category: 'Home & Kitchen',
    stock: 20,
  },
  {
    name: 'Sport Shoes',
    price: 2799,
    imageUrl: 'https://m.media-amazon.com/images/I/71f3BmjCwtL.jpg',
    category: 'Sports',
    stock: 30,
  },
];

// 2️⃣ Sample Cart (for userId = 1)
let sampleCart = {
  user: 1,
  items: [] as ICartItem[],
};

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI!);
    console.log('✅ Connected to MongoDB');

    // Clear old data
    await ProductModel.deleteMany({});
    await CartModel.deleteMany({});
    console.log('🧹 Cleared old collections');

    // Insert new products
    const createdProducts = await ProductModel.insertMany(sampleProducts);
    console.log(`✅ Inserted ${createdProducts.length} products`);

    // Add a cart for user 1 with 2 random products
    sampleCart.items = [
      { product: createdProducts[0]._id as any, quantity: 2 },
      { product: createdProducts[2]._id as any, quantity: 1 },
    ];

    await CartModel.create(sampleCart);
    console.log('🛒 Created sample cart for user 1');

    console.log('🎉 Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
  }
}

seedDatabase();
