import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Create Apollo Client instance
const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql', // Ensure this is the correct endpoint
  cache: new InMemoryCache(),
});

// Define the GraphQL query
export const GET_PRODUCTS_QUERY = gql`
  query GetProducts {
    products {
      id
      productName
      price
      size
      dimensions
      pageQuality
      numberOfPages
      partitions
      category
      usage
      images
    }
  }
`;

// Define the GraphQL mutation
const ADD_PRODUCT_MUTATION = gql`
  mutation AddProduct(
    $productName: String!,
    $price: Float!,
    $size: String,
    $dimensions: String,
    $pageQuality: String,
    $numberOfPages: Int,
    $partitions: String,
    $category: String!,
    $usage: String,
    $images: [String]
  ) {
    addProduct(
      productName: $productName,
      price: $price,
      size: $size,
      dimensions: $dimensions,
      pageQuality: $pageQuality,
      numberOfPages: $numberOfPages,
      partitions: $partitions,
      category: $category,
      usage: $usage,
      images: $images
    ) {
      id
      productName
      price
      size
      dimensions
      pageQuality
      numberOfPages
      partitions
      category
      usage
      images
    }
  }
`;

// Function to submit product data
export const submitProduct = async (productData) => {
  try {
    const { data } = await client.mutate({
      mutation: ADD_PRODUCT_MUTATION,
      variables: productData,
    });
    return data.addProduct;
  } catch (error) {
    console.error('Error in submitProduct:', error);
    throw error;
  }
};

export default client;
