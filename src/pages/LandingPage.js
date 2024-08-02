import { useState, useEffect } from 'react';
import Image from 'next/image';
import Background from '../assets/images/background.jpg';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { BookCover } from 'book-cover-3d';
import FeaturedProducts from '@/components/FeaturedProducts';
import Review from '@/components/Review';
import WhatsAppButton from '@/components/WhatsAppButton';

const LandingPage = () => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const textArray = [
    'Maira-FrontLine-NoteBooks...',
    'Paper Product of All Kinds...',
    'Top Quality and Low Prices...',
    'Partnered with Top Schools...'
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleTextChange = () => {
      const currentText = textArray[index];
      let updatedText = '';

      if (isDeleting) {
        updatedText = text.slice(0, -1);
        setText(updatedText);

        if (updatedText.length === 0) {
          setIsDeleting(false);
          setIndex((prevIndex) => (prevIndex + 1) % textArray.length);
        }
      } else {
        updatedText = currentText.slice(0, text.length + 1);
        setText(updatedText);

        if (updatedText.length === currentText.length) {
          setIsDeleting(true);
        }
      }
    };

    const timer = setTimeout(handleTextChange, isDeleting ? 50 : 80);
    return () => clearTimeout(timer);
  }, [text, isDeleting, index, isMounted]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="relative flex-grow">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <Image
            src={Background}
            fill
            alt="Landing Page Background"
            className="object-cover opacity-50"
          />
        </div>
        <div className="relative flex flex-col lg:flex-row items-center justify-between w-full h-full px-8 py-10">
          <div className="ml-5 flex-1 flex flex-col items-start lg:items-start justify-center lg:pr-10">
            <div className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ minHeight: '4rem' }}>
              <span>{text}</span>
            </div>
            <div className="relative flex justify-center w-full lg:w-auto ">
                <Button variant="contained" color="success">
                  SHOP NOW
                </Button>
            </div>
          </div>
          <div className="relative w-full max-w-md lg:w-1/2 flex items-center justify-center mt-10 lg:mt-0">
            <div className="w-full h-64 sm:w-48 sm:h-64">
              {/* <BookCover height={225} width={150}>
                <Image
                  src={MairaLogo}
                  alt="Book Cover"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </BookCover> */}
            </div>
          </div>
        </div>
      </div>
      <div className="relative pt-20 px-4 sm:px-6 lg:px-8 text-center bg-gray-50">
        <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-brown-500 to-black inline-block">
          Our Featured Products
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-red-500 via-brown-500 to-black mx-auto mt-2"></div>
      </div>
      <div className="mt-8">
        <FeaturedProducts />
      </div>
      <div className="text-center mt-8">
        <a
          href="#reviews"
          className="pb-2 text-base font-bold leading-7 text-gray-900 transition-all duration-200 border-b-2 border-gray-900 hover:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 hover:text-gray-600"
        >
        </a>
      </div>
      <Review />
      <div>
        <WhatsAppButton />
      </div>
    </div>
  );
};

export default LandingPage;
