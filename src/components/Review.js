import React from 'react';
import Image from 'next/image';
import UCPlogo from "../assets/images/UCP.png";
import UOLlogo from '../assets/images/UOL.png';

const Review = () => {
  // Static content to ensure consistency
  const reviews = [
    {
      id: 1,
      quote: "“You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change.”",
      name: "University of Central Punjab",
      role: "Freelance React Developer",
      avatar: UCPlogo, // Use local import for UCP
      stars: 5, // Adjust based on the review
    },
    {
      id: 2,
      quote: "“You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change.”",
      name: "University of Lahore",
      role: "Freelance React Developer",
      avatar: UOLlogo, // Use local import for UOL
      stars: 5, // Adjust based on the review
    },
    {
      id: 3,
      quote: "“You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change.”",
      name: "University of Lahore",
      role: "Freelance React Developer",
      avatar: UOLlogo, // Use local import for UOL
      stars: 5, // Adjust based on the review
    },
  ];

  return (
    <div>
      <section  id="reviews" className="py-12 bg-gray-50 sm:py-16 lg:py-20 px-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <div className="text-center">
               
              
              <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-brown-500 to-red-900">
                Our happy clients say about us
              </h2>
            </div>

            

            <div className="relative mt-10 md:mt-24 md:order-2">
              <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
                <div
                  className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter"
                  style={{
                    background:
                      'linear-gradient(90deg, #8B4000 -0.55%, #6F3A1A 22.86%, #5B3A29 48.36%, #6F4A41 73.33%, #8B5C40 99.34%)',
                  }}
                ></div>
              </div>

              <div className="relative grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 md:grid-cols-3">
                {reviews.map((review) => (
                  <div key={review.id} className="flex flex-col overflow-hidden shadow-xl bg-white rounded-lg">
                    <div className="flex flex-col items-center p-6">
                      <Image
                        className="object-cover rounded-full w-24 h-24 mb-4"
                        src={review.avatar} // Use next/image for both local and external images
                        alt={`${review.name}'s avatar`}
                        width={96} // Width of the image
                        height={96} // Height of the image
                      />
                      <div className="text-center mb-4">
                        <p className="text-base font-bold text-gray-900 font-pj">
                          {review.name}
                        </p>
                        <p className="text-sm font-pj text-gray-600">
                          {review.role}
                        </p>
                      </div>
                      <div className="flex items-center mb-4">
                        {[...Array(review.stars)].map((_, index) => (
                          <svg
                            key={index}
                            className="w-5 h-5 text-[#FDB241]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <blockquote className="flex-1">
                        <p className="text-lg leading-relaxed text-gray-900 font-pj">
                          {review.quote}
                        </p>
                      </blockquote>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Review;
