// src/graphql/resolvers.js
import Product from '../models/Product';

const resolvers = {
  Query: {
    products: async () => await Product.find({}),
    product: async (_, { id }) => await Product.findById(id),
  },
  
  Mutation: {
    addProduct: async (_, { productName, price, size, dimensions, pageQuality, numberOfPages, partitions, category, usage, images }) => {
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
      });

      return await newProduct.save();
    },
  },
};

export default resolvers;
