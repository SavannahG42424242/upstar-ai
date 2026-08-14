import ChatBox from "@/components/ChatBox";
import { realtors, Realtor } from "@/data/realtor";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    realtor: string;
  }>;
};

export default async function RealtorDemo({
  params,
}: Props) {
  const { realtor } = await params;

  if (!(realtor in realtors)) {
    notFound();
  }

  const selectedRealtor = realtor as Realtor;
  const profile = realtors[selectedRealtor];

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
          A personalized AI lead assistant designed
          for{" "}
          <span className="font-semibold text-white">
            {profile.company}
          </span>
          .
        </p>

        <div className="mt-10">
          <ChatBox
            initialRealtor={selectedRealtor}
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