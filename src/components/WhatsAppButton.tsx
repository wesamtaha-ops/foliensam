import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const whatsappNumber = "+4915750000505"; // Replace with your actual WhatsApp number
  const message = "Hallo! Ich interessiere mich für eine Autofolierung.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] p-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 text-white" />
    </a>
  );
};

export default WhatsAppButton;