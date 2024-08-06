// src/graphql/resolvers.js
import Product from '../models/Product';
import Review from '../models/Review'; // Import the Review model

const resolvers = {
  Query: {
    products: async () => await Product.find({}),
    product: async (_, { id }) => await Product.findById(id),
    reviews: async () => await Review.find({}),
    review: async (_, { id }) => await Review.findById(id),
    featuredProducts: async () => await Product.find({ featured: true }), // Add this line

  },
  
  Mutation: {
    addProduct: async (_, { productName, price, size, dimensions, pageQuality, numberOfPages, partitions, category, usage, images, featured }) => {
      const newProduct = new Product({
        productName,
        price,
        size,
        dimensions,
        pageQuality,
        numberOfPages,
        partitions,
        category,
        usage,
        images,
        featured, // Add the featured field here
      });

      return await newProduct.save();
    },

    deleteProduct: async (_, { id }) => {
      const deletedProduct = await Product.findByIdAndDelete(id);
      return deletedProduct;
    },

    addReview: async (_, { instituteName, description, rating, imageUrl }) => {
      const newReview = new Review({
        instituteName,
        description,
        rating,
        imageUrl,
      });

      return await newReview.save();
    },

    deleteReview: async (_, { id }) => {
      const deletedReview = await Review.findByIdAndDelete(id);
      return deletedReview;
    },
  },
};

export default resolvers;
