"use server";

import EmailTemplate from "@/components/AuthUi/EmailTemplate";
import { RESEND_API_KEY } from "@/lib/constant/env";
import { Resend } from "resend";

interface SendEmailProps {
  to: string;
  subject: string;
  text: string;
}

const resend = new Resend(RESEND_API_KEY);

export const sendEmail = async ({ to, subject, text }: SendEmailProps) => {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to,
    subject,
    // html: `<strong>Hello ${to}</strong>`,
    react: await EmailTemplate({ text, to }),
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
};
