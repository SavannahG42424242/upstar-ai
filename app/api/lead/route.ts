import { Resend } from "resend";
import { realtors, Realtor } from "@/data/realtor";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(request: Request) {
  try {
    const lead = await request.json();

    const realtorKey = lead.realtorKey as Realtor;

    if (!realtorKey || !(realtorKey in realtors)) {
      return Response.json(
        {
          success: false,
          error: "Invalid realtor",
        },
        { status: 400 }
      );
    }

    const realtor = realtors[realtorKey];

    const result = await resend.emails.send({
      from: "UpStar AI <onboarding@resend.dev>",

      to: realtor.notificationEmail,

      subject:
        `New UpStar AI Lead — ${realtor.company}`,

      text: `
NEW UPSTAR AI LEAD

Company:
${realtor.company}

Goal:
${lead.goal}

Location:
${lead.location}

Budget:
${lead.budget}

Timeline:
${lead.timeline}

Name:
${lead.name}

Email:
${lead.email}

Phone:
${lead.phone}

Realtor Profile:
${realtorKey}
      `,
    });

    console.log(
      "UPSTAR LEAD EMAIL SENT:",
      result
    );

    return Response.json({
      success: true,
    });

  } catch (error) {
    console.error(
      "UPSTAR LEAD ERROR:",
      error
    );

    return Response.json(
      {
        success: false,
        error: "Unable to process lead",
      },
      { status: 500 }
    );
  }
}