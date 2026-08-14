import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("customers")
    .select("id")
    .limit(1);

  if (error) {
    console.error("SUPABASE TEST ERROR:", error);

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
    data,
  });
}