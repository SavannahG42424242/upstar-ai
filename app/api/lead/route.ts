import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const lead = await request.json();

    const result = await resend.emails.send({
      from: "UpStar AI <onboarding@resend.dev>",
      to: lead.realtorEmail,
      subject: "New UpStar AI Lead",
      text: `
New Real Estate Lead:

Goal: ${lead.goal}
Location: ${lead.location}
Budget: ${lead.budget}
Timeline: ${lead.timeline}

Name: ${lead.name}
Email: ${lead.email}
Phone: ${lead.phone}
      `,
    });

    console.log("EMAIL SENT:", result);

    return Response.json({ 
      success: true,
      result
    });

  } catch (error) {
    console.error("EMAIL ERROR:", error);

    return Response.json(
      { 
        success: false,
        error: String(error)
      },
      { status: 500 }
    );
  }
}