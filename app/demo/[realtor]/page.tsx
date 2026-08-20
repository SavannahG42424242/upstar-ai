import ChatBox from "@/components/ChatBox";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    realtor: string;
  }>;
};

export default async function RealtorDemo({ params }: Props) {
  const { realtor } = await params;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase environment variables are missing.");
  }

  const supabase = createClient(
    supabaseUrl,
    serviceRoleKey
  );

  /*
   * Find the business by its slug.
   *
   * ilike makes this work whether the database contains:
   * barry
   * Barry
   * BARRY
   */
  const { data: customer, error } = await supabase
    .from("customers")
    .select("*")
    .ilike("slug", realtor)
    .single();

  if (error || !customer) {
    console.error("CUSTOMER LOOKUP ERROR:", error);
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl text-center">

        <div className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
          UpStar AI
        </div>

        <h1 className="mt-5 text-4xl font-bold md:text-5xl">
          Meet Your New AI Website Assistant
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
          A personalized AI lead assistant designed for{" "}
          <span className="font-semibold text-white">
            {customer.company}
          </span>
          .
        </p>

        <div className="mt-10">
          <ChatBox
            customer={customer}
            showRealtorSelector={false}
          />
        </div>

        <p className="mx-auto mt-8 max-w-xl text-sm text-slate-500">
          This is a personalized UpStar AI demonstration.
        </p>

      </div>
    </main>
  );
}