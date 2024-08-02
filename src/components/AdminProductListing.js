import React from 'react';
import Image from 'next/image';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const AdminProductListing = ({ products }) => {
  return (
    <div className="space-y-6">
      {products.map((product) => (
        <div key={product.id} className="flex flex-col md:flex-row items-start p-6 border-b border-gray-300">
          <div className="flex-shrink-0 mb-4 md:mb-0 text-center">
            {product.images && product.images.length > 0 ? (
              <div className="mx-auto px-5 py-5">
                <Image
                  src={product.images[0]}  // Display the first image for now
                  alt="Product Image"
                  className="object-cover opacity-70 rounded-lg"
                  width={120}
                  height={120}
                />
              </div>
            ) : (
              <div className="w-24 h-24 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg mx-auto">
                No Image
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col md:flex-row items-center md:items-start px-4">
            <div className="flex flex-col flex-1 md:mr-4 text-center md:text-left">
              <div className="font-bold text-lg md:text-xl mb-2">{product.productName}</div>
              <div className="text-sm md:text-base">
                <div className="font-semibold mb-2">Description:</div>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Size:</span>
                    <span>{product.size || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Dimensions:</span>
                    <span>{product.dimensions || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Page Quality:</span>
                    <span>{product.pageQuality || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Number of Pages:</span>
                    <span>{product.numberOfPages || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Partitions:</span>
                    <span>{product.partitions || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Category:</span>
                    <span>{product.category || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Usage:</span>
                    <span>{product.usage || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center flex-1 text-center md:text-left">
              <div className="text-2xl font-bold mb-2">Price</div>
              <div className="py-5 font-bold text-2xl text-red-600">
                ${product.price}
              </div>

              <div className="flex space-x-2 md:space-x-4 justify-center md:justify-start">
                <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm md:text-base hover:bg-blue-600 flex items-center">
                  <FaEdit className="mr-1" /> Edit
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-md text-sm md:text-base hover:bg-red-600 flex items-center">
                  <FaTrashAlt className="mr-1" /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminProductListing;
