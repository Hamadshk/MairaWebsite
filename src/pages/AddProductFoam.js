import React, { useState } from 'react';
import Image from 'next/image'; // Import the Image component from Next.js
import { uploadImage } from '../lib/firebaseStorage'; // Import the upload function
import { submitProduct } from '../lib/graphqlClient'; // Import the submit function

const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [pageQuality, setPageQuality] = useState('');
  const [numberOfPages, setNumberOfPages] = useState('');
  const [partitions, setPartitions] = useState('');
  const [category, setCategory] = useState('');
  const [usage, setUsage] = useState('');
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [isFeatured, setIsFeatured] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const urls = files.map(file => URL.createObjectURL(file));
    setImageUrls(urls);
  };

  const uploadImages = async () => {
    const uploadedImageUrls = [];
    for (const image of images) {
      const url = await uploadImage(image);
      uploadedImageUrls.push(url);
    }
    return uploadedImageUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uploadedImageUrls = await uploadImages();
      const formData = {
        productName,
        price: parseFloat(price),
        size,
        dimensions,
        pageQuality,
        numberOfPages: parseInt(numberOfPages),
        partitions,
        category,
        usage,
        featured: isFeatured, // Ensure this value is included
        images: uploadedImageUrls,
      };
      const result = await submitProduct(formData);

      if (result) {
        console.log('Product added:', result);
        alert('Product added successfully!');
        // Optionally, reset the form or redirect
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div className="flex flex-col">
          <label htmlFor="productName" className="text-sm font-medium mb-1">Product Name:</label>
          <input
            id="productName"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label htmlFor="price" className="text-sm font-medium mb-1">Price:</label>
          <input
            id="price"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
            placeholder="Enter price"
            required
          />
        </div>

        {/* Size */}
        <div className="flex flex-col">
          <label htmlFor="size" className="text-sm font-medium mb-1">Size:</label>
          <input
            id="size"
            type="text"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
            placeholder="Enter size"
          />
        </div>

        {/* Dimensions */}
        <div className="flex flex-col">
          <label htmlFor="dimensions" className="text-sm font-medium mb-1">Dimensions:</label>
          <input
            id="dimensions"
            type="text"
            value={dimensions}
            onChange={(e) => setDimensions(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
            placeholder="Enter dimensions"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label htmlFor="category" className="text-sm font-medium mb-1">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select Category</option>
            <option value="subject-notebook">Subject Notebook</option>
            <option value="diary">Diary</option>
            <option value="sketchbook">Sketchbook</option>
          </select>
        </div>

        {/* Partitions (conditionally rendered based on category) */}
        {category === 'subject-notebook' && (
          <div className="flex flex-col">
            <label htmlFor="partitions" className="text-sm font-medium mb-1">Partitions:</label>
            <input
              id="partitions"
              type="text"
              value={partitions}
              onChange={(e) => setPartitions(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
              placeholder="Enter partitions"
            />
          </div>
        )}

        {/* Number of Pages */}
        <div className="flex flex-col">
          <label htmlFor="numberOfPages" className="text-sm font-medium mb-1">Number of Pages:</label>
          <input
            id="numberOfPages"
            type="text"
            value={numberOfPages}
            onChange={(e) => setNumberOfPages(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
            placeholder="Enter number of pages"
          />
        </div>

        {/* Usage */}
        <div className="flex flex-col">
          <label htmlFor="usage" className="text-sm font-medium mb-1">Usage:</label>
          <input
            id="usage"
            type="text"
            value={usage}
            onChange={(e) => setUsage(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
            placeholder="Enter usage"
          />
        </div>

        {/* Is Featured */}
        <div className="flex flex-col">
          <label htmlFor="isFeatured" className="text-sm font-medium mb-1">Is Featured:</label>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="isFeaturedYes"
              name="isFeatured"
              value={true}
              checked={isFeatured === true}
              onChange={() => setIsFeatured(true)}
              className="w-4 h-4 border-gray-300 rounded-sm focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="isFeaturedYes" className="text-sm font-medium">Yes</label>
            <input
              type="radio"
              id="isFeaturedNo"
              name="isFeatured"
              value={false}
              checked={isFeatured === false}
              onChange={() => setIsFeatured(false)}
              className="w-4 h-4 border-gray-300 rounded-sm focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="isFeaturedNo" className="text-sm font-medium">No</label>
          </div>
        </div>

        {/* Image Upload */}
        <div className="flex flex-col">
          <label htmlFor="images" className="text-sm font-medium mb-1">Upload Images:</label>
          <input
            id="images"
            type="file"
            multiple
            onChange={handleImageChange}
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Display Selected Images */}
        {imageUrls.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-4">
            {imageUrls.map((url, index) => (
              <Image
                key={index}
                src={url}
                alt={`Preview ${index}`}
                width={96}
                height={96}
                className="object-cover border border-gray-300 rounded-lg"
              />
            ))}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
