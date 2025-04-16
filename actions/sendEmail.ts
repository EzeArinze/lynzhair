interface SendEmailProps {
  to: string;
  subject: string;
  text: string;
}

export const sendEmail = async ({ to, subject, text }: SendEmailProps) => {
  console.log("Sending email to:", to);
  console.log("Email subject:", subject);
  console.log("Email text:", text);
};
