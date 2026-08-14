import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      customerId,
      goal,
      location,
      budget,
      timeline,
      name,
      email,
      phone,
    } = body;

    console.log("UPSTAR LEAD RECEIVED:", {
      customerId,
      goal,
      location,
      budget,
      timeline,
      name,
      email,
      phone,
    });

    // Make sure the customer ID exists.
    if (!customerId) {
      return Response.json(
        {
          success: false,
          error: "Missing customerId",
        },
        { status: 400 }
      );
    }

    // Make sure it actually looks like a UUID.
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(customerId)) {
      return Response.json(
        {
          success: false,
          error: `Invalid customerId: ${customerId}`,
        },
        { status: 400 }
      );
    }

    const { data: lead, error } =
      await supabase
        .from("leads")
        .insert({
          customer_id: customerId,
          goal,
          location,
          budget,
          timeline,
          name,
          email,
          phone,
        })
        .select()
        .single();

    if (error) {
      console.error(
        "SUPABASE LEAD ERROR:",
        error
      );

      return Response.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    console.log(
      "UPSTAR LEAD SAVED:",
      lead
    );

    return Response.json({
      success: true,
      lead,
    });
  } catch (error) {
    console.error(
      "LEAD API ERROR:",
      error
    );

    return Response.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}