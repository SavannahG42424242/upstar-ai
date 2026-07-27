import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const lead = await request.json();

  await resend.emails.send({
    from: "UpStar AI <onboarding@resend.dev>",
    to: "yourname@gmail.com",
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

  return Response.json({ success: true });
}