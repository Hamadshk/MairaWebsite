import React, { useEffect, useState } from 'react';
import client, { GET_REVIEWS_QUERY, DELETE_REVIEW_MUTATION } from '@/lib/graphqlClient';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';

const ShowAllReviews = () => {
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
      async function fetchReviews() {
      try {
        setLoading(true); // Start loading state
        const { data } = await client.query({ query: GET_REVIEWS_QUERY });
        setReviews(data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false); // End loading state
      }
    }

    fetchReviews();
  }, []);

  useEffect(() => {
    if (router.query.newReview) {
      const newReview = JSON.parse(router.query.newReview);
      setReviews((prevReviews) => [newReview, ...prevReviews]);
      router.replace('/ShowAllReviews'); // Remove the query param after processing
    }
  }, [router.query.newReview]);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this review?')) {
      try {
        setLoading(true);
        await client.mutate({
          mutation: DELETE_REVIEW_MUTATION,
          variables: { id },
        });
        setReviews(reviews.filter((review) => review.id !== id));
      } catch (error) {
        console.error('Error deleting review:', error);
        alert('Failed to delete review. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddReview = () => {
    router.push('/AddReviewForm');
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Customer Reviews</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative w-full h-40">
              {review.imageUrl && (
                <Image
                  src={review.imageUrl}
                  alt={review.instituteName}
                  layout="fill"
                  objectFit="cover"
                />
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{review.instituteName}</h2>
              <p className="text-gray-700 mb-4">{review.description}</p>
              <div className="flex items-center mb-4">
                <span className="text-yellow-500 mr-2">{review.rating}</span>
                <div className="flex">
                  {'★'.repeat(Math.floor(review.rating))}
                  {'☆'.repeat(5 - Math.floor(review.rating))}
                </div>
              </div>
              <div className="text-right">
                <button
                  onClick={() => handleDelete(review.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200 flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Button
          onClick={handleAddReview}
          variant="success"
          disabled={isLoading}
        >
          {isLoading ? 'Loading…' : 'Add New Review'}
        </Button>
      </div>
    </div>
  );
};

export default ShowAllReviews;
