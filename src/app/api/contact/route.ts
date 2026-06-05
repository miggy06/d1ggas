import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Determine target recipient.
    // NOTE: On Resend's free tier (using onboarding@resend.dev), Resend will restrict
    // transmission delivery ONLY to the email address registered to your Resend account.
    const recipient = process.env.CONTACT_RECIPIENT_EMAIL || "crew@d1ggas.com";

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: "d1ggas Crew Mainframe <onboarding@resend.dev>",
      to: [recipient],
      replyTo: email, // Lets you hit reply directly in your email client to email the sender back!
      subject: `[d1ggas] Message from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e4e4e7; background-color: #fafafa;">
          <h2 style="color: #116dff; border-bottom: 2px solid #e4e4e7; padding-bottom: 12px; margin-top: 0; font-size: 1.4rem;">d1ggas Crew Mainframe</h2>
          <p style="font-size: 15px; color: #52525b; line-height: 1.5;">You have received a new message from the contact form:</p>
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e4e4e7; border-radius: 4px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #71717a;"><strong>From:</strong> ${name}</p>
            <p style="margin: 0 0 16px 0; font-size: 14px; color: #71717a;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #116dff; text-decoration: none;">${email}</a></p>
            <div style="margin-top: 16px; border-top: 1px solid #f4f4f5; padding-top: 16px;">
              <p style="margin: 0; font-size: 15px; color: #18181b; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <p style="font-size: 11px; color: #71717a; text-align: center; margin-top: 32px; font-family: monospace; letter-spacing: 1px;">
            TRANSMITTED AUTOMATICALLY // SYSTEM ONLINE
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error details:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("Contact Form Server Error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
