import * as React from "react";

interface EmailTemplateProps {
  text: string;
  to: string;
  url: string; // Add the URL as a prop
}

const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  text,
  to,
  url,
}) => (
  <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-gray-100 text-gray-800 max-w-[600px] mx-auto">
    <div className="w-full text-center border-b border-gray-300 pb-4 mb-4">
      <h1 className="text-xl font-semibold text-gray-700">Welcome, {to}!</h1>
    </div>

    {/* Body */}
    <div className="w-full text-left">
      <p className="text-sm leading-6 text-gray-600 mb-4">{text}</p>
      <a
        href={url}
        className="px-6 py-2 bg-pink-600 text-white text-sm font-medium rounded-md shadow-md hover:bg-pink-500 transition-colors inline-block text-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        Click Me
      </a>
    </div>
  </div>
);

export default EmailTemplate;
