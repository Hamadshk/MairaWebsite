import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';

const WhatsAppButton = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const phoneNumber = '923230018893'; // Replace with the recipient's phone number
  const message = encodeURIComponent('Hello, I’m interested in your services'); // Optional message
  const url = `https://wa.me/${phoneNumber}?text=${message}`;

  if (!isClient) {
    // Avoid rendering the component on the server to prevent hydration errors
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 ease-in-out"
        aria-label="Chat with us on WhatsApp"
      >
        <FontAwesomeIcon icon={faWhatsapp} className="text-white text-2xl" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
