// "use server";

// // import EmailTemplate from "@/components/AuthUi/EmailTemplate";
// import { RESEND_API_KEY } from "@/lib/constant/env";
// import { Resend } from "resend";

// interface SendEmailProps {
//   to: string;
//   subject: string;
//   text: string;
//   url: string;
// }

// const resend = new Resend(RESEND_API_KEY);

// export const sendEmail = async ({ to, subject, text, url }: SendEmailProps) => {
//   try {
//     const { error } = await resend.emails.send({
//       from: "Lynnhairz <Nuelrinz@resend.dev>",
//       to,
//       subject,
//       html: `
//           <div style="font-family: sans-serif; padding: 20px;">
//             <strong>Welcome ${to}!</strong>
//              <p style="font-size: 14px; color: #4B5563; margin-bottom: 16px;">
//                <strong>${text}</strong>
//              </p>
//             <a
//             href="${url}"
//             style="display: inline-block; padding: 10px 24px; background-color: #EC4899; color: #ffff; font-weight: 500; text-decoration: none; border-radius: 6px;"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Click Me
//           </a>
//     </div>
//   `,
//       // react: await EmailTemplate({ text, to, url }),
//     });

//     if (error) {
//       console.error("Resend API Error:", error); // Log the error object for debugging
//       throw new Error(
//         error.message || "An unknown error occurred while sending the email"
//       );
//     }
//   } catch (error) {
//     console.error("Error in sendEmail:", error); // Log the full error object
//     throw error; // Re-throw the error to propagate it
//   }

//   console.log("Email sent successfully");
// };

"use server";

import { SMTP_USER } from "@/lib/constant/env";
import transporter from "@/lib/nodemailer";

// import EmailTemplate from "@/components/AuthUi/EmailTemplate";

interface SendEmailProps {
  to: string;
  subject: string;
  text: string;
  url: string;
}

const styles = {
  container:
    "font-family: sans-serif; padding: 24px; background: #f9fafb; border-radius: 8px; margin: 0 auto; max-width: 420px;",
  header:
    "font-size: 20px; font-weight: bold; color: #ec4899; margin-bottom: 12px;",
  paragraph: "font-size: 15px; color: #374151; margin-bottom: 18px;",
  link: "display: inline-block; padding: 10px 24px; background-color: #ec4899; color: #fff; font-weight: 500; text-decoration: none; border-radius: 6px; margin-top: 10px;",
};

export const sendEmail = async ({ to, subject, text, url }: SendEmailProps) => {
  const mailOptions = {
    from: SMTP_USER,
    to,
    subject,
    html: `
  <div style="${styles.container}">
    <div style="${styles.header}">Welcome! ${subject}</div>
    <p style="${styles.paragraph}">
      <strong>${text}</strong>
    </p>
    <a
      href="${url}"
      style="${styles.link}"
      target="_blank"
      rel="noopener noreferrer"
    >
      Click here to verify
    </a>
  </div>
`,
  };

  try {
    transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error in sendEmail:", error);
    return { success: false };
  }
  // console.log("mail sent");
};
