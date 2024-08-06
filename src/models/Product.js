// src/models/Product.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String },
  dimensions: { type: String },
  pageQuality: { type: String },
  numberOfPages: { type: Number },
  partitions: { type: String },
  category: { type: String, required: true },
  usage: { type: String },
  featured: { type: Boolean}, // Featured flag
  images: [{ type: String }], // Array of image URLs
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;
