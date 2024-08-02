import { useEffect, useState } from 'react';
import client, { GET_PRODUCTS_QUERY } from '@/lib/graphqlClient';
import AdminProductListing from '@/components/AdminProductListing';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';

const ShowAllProducts = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true); // Start loading state
        const { data } = await client.query({ query: GET_PRODUCTS_QUERY });
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // End loading state
      }
    }

    fetchProducts();
  }, []);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/AddProductFoam');
    }, 2000); // Simulate network request duration
  };

  return (
    <div className="px-6 py-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-brown-500 to-black inline-block">
          Product Listings
        </h2>
      </div>
      <div className='flex justify-end px-6'>
        <Button
          variant="primary"
          disabled={isLoading}
          onClick={handleClick}
        >
          {isLoading ? 'Loading…' : 'Add a new product'}
        </Button>
      </div>

      <AdminProductListing products={products} />
    </div>
  );
};

export default ShowAllProducts;
