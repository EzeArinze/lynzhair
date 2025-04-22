"use server";

import EmailTemplate from "@/components/AuthUi/EmailTemplate";
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
  const { error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to,
    subject,
    // html: `<strong>${text}: ${url} </strong>`,
    react: await EmailTemplate({ text, to, url }),
  });

  if (error) {
    return console.error({ error });
  }
  return console.log("Email sent successfully");
};
