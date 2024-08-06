import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import { uploadImage } from '../lib/firebaseStorage';
import { submitReview } from '../lib/graphqlClient';

const AddReviewForm = () => {
  const router = useRouter();
  const [instituteName, setInstituteName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let uploadedImageUrl = '';
      if (image) {
        uploadedImageUrl = await uploadImage(image);
      }

      const reviewData = {
        instituteName,
        description,
        rating: parseFloat(rating),
        imageUrl: uploadedImageUrl,
      };

      const result = await submitReview(reviewData);
      if (result) {
        console.log('Review added:', result);
        alert('Review added successfully!');
        router.push({
          pathname: '/ShowAllReviews',
          query: { newReview: JSON.stringify(result) }
        });
      }
    } catch (error) {
      console.error('Error adding review:', error);
      alert('Failed to add review. Please try again.');
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Review</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium text-gray-700">Institute Name</label>
          <input
            type="text"
            value={instituteName}
            onChange={(e) => setInstituteName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="4"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">Rating</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            min="0"
            max="5"
            step="0.1"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">Image</label>
          <div
            {...getRootProps()}
            className="mt-1 flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-md cursor-pointer"
          >
            <input {...getInputProps()} />
            {image ? (
              <p>{image.name}</p>
            ) : (
              <p>Drag 'n' drop an image here, or click to select one</p>
            )}
          </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-200"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReviewForm;
