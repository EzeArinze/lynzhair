"use server";

// import EmailTemplate from "@/components/AuthUi/EmailTemplate";
import { RESEND_API_KEY } from "@/lib/constant/env";
import { Resend } from "resend";

interface SendEmailProps {
  to: string;
  subject: string;
  text: string;
  url: string;
}

const resend = new Resend(RESEND_API_KEY);

export const sendEmail = async ({ to, subject, text, url }: SendEmailProps) => {
  try {
    const { error } = await resend.emails.send({
      from: "Lynnhairz <noreply@resend.dev>",
      to,
      subject,
      html: `
          <div style="font-family: sans-serif; padding: 20px; width: 0 auto;">
            <strong>Welcome ${to}!</strong>
             <p style="font-size: 14px; color: #4B5563; margin-bottom: 16px;">
               <strong>${text}</strong>
             </p>
            <a
            href="${url}"
            style="display: inline-block; padding: 10px 24px; background-color: #EC4899; color: #ffff; font-weight: 500; text-decoration: none; border-radius: 6px;"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click here
          </a>
    </div>
  `,
      // react: await EmailTemplate({ text, to, url }),
    });

    if (error) {
      console.error("Resend API Error:", error); // Log the error object for debugging
      throw new Error(
        error.message || "An unknown error occurred while sending the email"
      );
    }
  } catch (error) {
    console.error("Error in sendEmail:", error); // Log the full error object
    throw error; // Re-throw the error to propagate it
  }

  console.log("Email sent successfully");
};
