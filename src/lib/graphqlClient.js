import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Create Apollo Client instance
const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql', // Ensure this is the correct endpoint
  cache: new InMemoryCache(),
});

// Define the GraphQL queries and mutations

// Query to fetch products
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
      featured
    }
  }
`;
export const GET_FEATURED_PRODUCTS_QUERY = gql`
  query GetFeaturedProducts {
    featuredProducts {
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
      featured
    }
  }
`;
// Mutation to add a product
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
    $images: [String],
    $featured: Boolean
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
      images: $images,
      featured: $featured
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
      featured
    }
  }
`;

export const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

export const ADD_REVIEW_MUTATION = gql`
  mutation AddReview(
    $instituteName: String!,
    $description: String!,
    $rating: Float!,
    $imageUrl: String
  ) {
    addReview(
      instituteName: $instituteName,
      description: $description,
      rating: $rating,
      imageUrl: $imageUrl
    ) {
      id
      instituteName
      description
      rating
      imageUrl
    }
  }
`;

// Query to fetch reviews
export const GET_REVIEWS_QUERY = gql`
  query GetReviews {
    reviews {
      id
      instituteName
      description
      rating
      imageUrl
    }
  }
`;

// Mutation to delete a review
export const DELETE_REVIEW_MUTATION = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id) {
      id
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

// Function to submit review data
export const submitReview = async (reviewData) => {
  try {
    const { data } = await client.mutate({
      mutation: ADD_REVIEW_MUTATION,
      variables: reviewData,
    });
    return data.addReview;
  } catch (error) {
    console.error('Error in submitReview:', error);
    throw error;
  }
};

// Function to delete a review
export const deleteReview = async (id) => {
  try {
    const { data } = await client.mutate({
      mutation: DELETE_REVIEW_MUTATION,
      variables: { id },
    });
    return data.deleteReview;
  } catch (error) {
    console.error('Error in deleteReview:', error);
    throw error;
  }
};

// Function to delete a product
export const deleteProduct = async (id) => {
  try {
    const { data } = await client.mutate({
      mutation: DELETE_PRODUCT_MUTATION,
      variables: { id },
    });
    return data.deleteProduct;
  } catch (error) {
    console.error('Error in deleteProduct:', error);
    throw error;
  }
};

export default client;
