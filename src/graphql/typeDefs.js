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
    featured:Boolean
    images: [String]  # List of image URLs
  }

  type Review {
    id: ID!
    instituteName: String!
    description: String!
    rating: Float!
    imageUrl: String  # Single image URL
  }
  input ProductFilter {
    featured: Boolean
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
    reviews: [Review]
    review(id: ID!): Review
    featuredProducts: [Product!]!  # Add this line

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
      featured: Boolean
      images: [String]
    ): Product

    addReview(
      instituteName: String!,
      description: String!,
      rating: Float!,
      imageUrl: String  # Single image URL
    ): Review

    deleteProduct(id: ID!): Product

    deleteReview(id: ID!): Review
  }
`;

export default typeDefs;
