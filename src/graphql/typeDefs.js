// src/graphql/typeDefs.js
import { gql } from 'apollo-server-micro';

const typeDefs = gql`
  type Product {
    id: ID!
    productName: String!
    price: Float!
    size: String
    dimensions: String
    pageQuality: String
    numberOfPages: Int
    partitions: String
    category: String!
    usage: String
    images: [String]  # List of image URLs or base64 encoded images
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
  }

  type Mutation {
    addProduct(
      productName: String!,
      price: Float!,
      size: String,
      dimensions: String,
      pageQuality: String,
      numberOfPages: Int,
      partitions: String,
      category: String!,
      usage: String,
      images: [String]
    ): Product
  }
`;

export default typeDefs;
