import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL"
  );
}

if (!supabaseServiceRoleKey) {
  throw new Error(
    "Missing SUPABASE_SERVICE_ROLE_KEY"
  );
}

const supabase = createClient(
  supabaseUrl,
  supabaseServiceRoleKey
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

    console.log(
      "UPSTAR LEAD RECEIVED:",
      body
    );

    if (!customerId) {
      return Response.json(
        {
          success: false,
          error: "Missing customerId.",
        },
        { status: 400 }
      );
    }

    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(customerId)) {
      return Response.json(
        {
          success: false,
          error: `Invalid customerId UUID: ${customerId}`,
        },
        { status: 400 }
      );
    }

    const { data: lead, error } =
      await supabase
        .from("leads")
        .insert({
          customer_id: customerId,
          goal: goal || "",
          location: location || "",
          budget: budget || "",
          timeline: timeline || "",
          name: name || "",
          email: email || "",
          phone: phone || "",
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
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}