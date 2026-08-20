import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
}

if (!supabaseServiceRoleKey) {
  throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
}

const supabase = createClient(
  supabaseUrl,
  supabaseServiceRoleKey
);

export async function GET(request: Request) {
  try {
    const { searchParams } =
      new URL(request.url);

    const customerId =
      searchParams.get("customerId");

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

    const {
      data: leads,
      error,
    } = await supabase
      .from("leads")
      .select("*")
      .eq("customer_id", customerId)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "SUPABASE LEADS ERROR:",
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

    return Response.json({
      success: true,
      leads: leads || [],
    });
  } catch (error) {
    console.error(
      "LEADS API ERROR:",
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