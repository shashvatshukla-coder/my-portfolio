import nodemailer from "nodemailer";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const cleanHeader = (value) => String(value).replace(/[\r\n]/g, " ").trim();

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  let body = request.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return response.status(400).json({ error: "Invalid request." });
    }
  }

  const name = cleanHeader(body?.name || "");
  const email = cleanHeader(body?.email || "").toLowerCase();
  const message = String(body?.message || "").trim();
  const website = String(body?.website || "").trim();

  // Quietly accept bot-filled submissions without sending email.
  if (website) return response.status(200).json({ success: true });

  if (name.length < 2 || name.length > 80) {
    return response.status(400).json({ error: "Please enter a valid name." });
  }
  if (!emailPattern.test(email) || email.length > 160) {
    return response.status(400).json({ error: "Please enter a valid email address." });
  }
  if (message.length < 10 || message.length > 3000) {
    return response.status(400).json({ error: "Message must be between 10 and 3000 characters." });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const recipient = process.env.CONTACT_TO_EMAIL || gmailUser;

  if (!gmailUser || !gmailAppPassword || !recipient) {
    console.error("Portfolio contact email environment variables are missing.");
    return response.status(503).json({ error: "Messaging is being configured. Please try again soon." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailAppPassword },
  });

  try {
    await transporter.sendMail({
      from: `"Shashvat Portfolio" <${gmailUser}>`,
      to: recipient,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `New message from your portfolio\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#172033">
          <div style="background:#08101d;color:#58f7ff;padding:22px 24px">
            <div style="font-size:12px;letter-spacing:2px">SHASHVAT PORTFOLIO</div>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:24px">New chat message</h1>
          </div>
          <div style="border:1px solid #dbe2ea;border-top:0;padding:24px">
            <p style="margin:0 0 8px"><strong>From:</strong> ${escapeHtml(name)}</p>
            <p style="margin:0 0 22px"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
            <div style="padding:18px;background:#f5f8fb;border-left:4px solid #22c7d2;white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</div>
            <p style="margin:22px 0 0;color:#657185;font-size:12px">Reply to this email to respond directly to ${escapeHtml(name)}.</p>
          </div>
        </div>
      `,
    });

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error("Portfolio contact email failed:", error?.message || error);
    return response.status(500).json({ error: "Message could not be sent. Please try again." });
  }
}
