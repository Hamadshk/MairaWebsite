import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import client, { GET_FEATURED_PRODUCTS_QUERY } from '@/lib/graphqlClient';

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const { data } = await client.query({ query: GET_FEATURED_PRODUCTS_QUERY });
                setProducts(data.featuredProducts); // Make sure this matches the query result
            } catch (err) {
                console.error('Error fetching products:', err.message);
                setError(`Failed to load products: ${err.message}`);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center">
                <div className="mx-auto max-w-7xl py-16 sm:py-24 lg:py-32">
                    <h2 className="sr-only">Featured Products</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <a
                                key={product.id}
                                href={product.href}
                                className="group bg-white rounded-lg shadow-xl overflow-hidden no-underline" // Added no-underline
                                style={{ maxWidth: '350px' }} // Adjust maxWidth for the card
                            >
                                <div className="aspect-w-1 w-full overflow-hidden rounded-t-lg bg-white">
                                    <div className="relative h-40 sm:h-60 md:h-40 lg:h-60 w-full ">
                                        <Image
                                            alt={product.productName}
                                            src={product.images[0]} // Ensure `product.images` is not empty
                                            width={400}
                                            height={400}
                                            className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                                        />
                                    </div>
                                </div>
                                <div className="mb-10">
                                    <h3 className="text-lg font-bold text-gray-800">{product.productName}</h3>
                                    <p className="mt-2 text-base font-medium text-gray-500">${product.price}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProducts;
