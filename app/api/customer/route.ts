import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
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
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    if (!id && !slug) {
      return Response.json(
        {
          success: false,
          error: "Provide either id or slug.",
        },
        { status: 400 }
      );
    }

    let query = supabase
      .from("customers")
      .select(
        `
        id,
        name,
        company,
        email,
        phone,
        city,
        website,
        service_areas,
        specialties,
        greeting,
        slug,
        industry,
        settings,
        created_at,
        updated_at
        `
      );

    if (id) {
      query = query.eq("id", id);
    } else if (slug) {
      query = query.eq("slug", slug);
    }

    const { data, error } = await query.single();

    if (error) {
      console.error("CUSTOMER LOOKUP ERROR:", error);

      return Response.json(
        {
          success: false,
          error: error.message,
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      customer: data,
    });
  } catch (error) {
    console.error("CUSTOMER API ERROR:", error);

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