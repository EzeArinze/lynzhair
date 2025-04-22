import * as React from "react";

interface EmailTemplateProps {
  text: string;
  to: string;
}

const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  text,
  to,
}) => (
  <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-gray-100 text-gray-800">
    <h1 className="font-medium ">Hello Welcome, {to}!</h1>
    <p>{text} </p>
  </div>
);

export default EmailTemplate;
