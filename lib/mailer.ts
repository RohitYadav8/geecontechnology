import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(
    process.env.SMTP_PORT || 587
  ),
  secure: false,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

type MailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

type SendMailParams = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: MailAttachment[];
};

export async function sendMail({
  to,
  subject,
  html,
    replyTo,
  attachments,
}: SendMailParams) {
  if (
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS
  ) {
    throw new Error(
      "SMTP credentials are missing."
    );
  }

  return transporter.sendMail({
    from: `"Geecon Technology" <${
      process.env.SMTP_FROM ||
      process.env.SMTP_USER
    }>`,
    to,
    subject,
    html,
    replyTo,
    attachments,
  });
}

export async function verifyMailer() {
  return transporter.verify();
}