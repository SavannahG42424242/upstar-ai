import ChatBox from "@/components/ChatBox";
import { realtors, Realtor } from "@/data/realtor";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    realtor: string;
  }>;
};

export default async function RealtorDemo({ params }: Props) {
  const { realtor } = await params;

  if (!(realtor in realtors)) {
    notFound();
  }

  const selectedRealtor = realtor as Realtor;
  const profile = realtors[selectedRealtor];

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl text-center">

        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          UpStar AI
        </p>

        <h1 className="mt-4 text-4xl font-bold md:text-5xl">
          AI Website Assistant Demo
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
          A personalized demo created for {profile.company}.
        </p>

        <div className="mt-8">
          <ChatBox initialRealtor={selectedRealtor} />
        </div>

      </div>
    </main>
  );
}