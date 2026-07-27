import ChatBox from "@/components/ChatBox";
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6">
        <h1 className="text-2xl font-bold">
          UpStar AI
        </h1>

        <button className="rounded-lg bg-blue-600 px-5 py-2 font-semibold hover:bg-blue-700">
          Get Started
        </button>
      </nav>


      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 py-24 text-center">

        <p className="mb-4 text-sm uppercase tracking-widest text-blue-400">
          AI Built For Realtors
        </p>

        <h2 className="max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
          Never Lose Another Website Visitor.
        </h2>

        <p className="mt-8 max-w-2xl text-xl text-slate-300">
          UpStar AI helps real estate agents respond instantly,
          capture leads, and create more opportunities 24/7.
        </p>

        <button className="mt-10 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold hover:bg-blue-700">
          Book a Free Demo
        </button>

      </section>

<ChatBox />

      {/* How It Works */}
      <section className="px-8 py-20">

        <h2 className="text-center text-4xl font-bold">
          How UpStar AI Works
        </h2>


        <div className="mt-12 grid gap-8 md:grid-cols-3">

          <div className="rounded-xl bg-slate-900 p-8">
            <h3 className="text-xl font-bold">
              1. Visitor Arrives
            </h3>
            <p className="mt-3 text-slate-400">
              A potential buyer or seller visits the realtor's website.
            </p>
          </div>


          <div className="rounded-xl bg-slate-900 p-8">
            <h3 className="text-xl font-bold">
              2. AI Starts The Conversation
            </h3>
            <p className="mt-3 text-slate-400">
              UpStar answers questions and understands what the visitor needs.
            </p>
          </div>


          <div className="rounded-xl bg-slate-900 p-8">
            <h3 className="text-xl font-bold">
              3. Realtor Gets The Opportunity
            </h3>
            <p className="mt-3 text-slate-400">
              Qualified leads become real conversations.
            </p>
          </div>

        </div>

      </section>


      {/* Final CTA */}
      <section className="px-8 py-20 text-center">

        <h2 className="text-4xl font-bold">
          Ready to capture more clients?
        </h2>

        <button className="mt-8 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold hover:bg-blue-700">
          Start With UpStar AI
        </button>

      </section>

    </main>
  );
}