"use client";

import ChatBox from "@/components/ChatBox";

export default function Home() {
  function goToDemo() {
    document
      .getElementById("demo")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <h1 className="text-2xl font-bold">
          UpStar AI
        </h1>

        <button
          onClick={goToDemo}
          className="rounded-lg bg-blue-600 px-5 py-2 font-semibold hover:bg-blue-700"
        >
          Get Started
        </button>
      </nav>


      {/* Hero */}
      <section className="flex flex-col items-center px-6 py-24 text-center">

        <p className="mb-4 text-sm uppercase tracking-widest text-blue-400">
          AI Built For Realtors
        </p>

        <h2 className="max-w-5xl text-5xl font-bold leading-tight md:text-7xl">
          Never Lose Another Website Visitor.
        </h2>

        <p className="mt-8 max-w-3xl text-xl text-slate-300">
          UpStar AI helps real estate agents instantly respond to visitors,
          capture qualified leads, and create more opportunities 24/7.
        </p>

        <button
          onClick={goToDemo}
          className="mt-8 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold hover:bg-blue-700"
        >
          Book a Free Demo
        </button>

      </section>


      {/* Realtor Benefits */}
      <section className="px-8 py-20">

        <h2 className="text-center text-4xl font-bold">
          Why Realtors Use UpStar AI
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">

          <div className="rounded-xl bg-slate-900 p-8">
            <h3 className="text-xl font-bold">
              Capture More Leads
            </h3>
            <p className="mt-3 text-slate-400">
              Turn website visitors into real conversations instead of losing them.
            </p>
          </div>


          <div className="rounded-xl bg-slate-900 p-8">
            <h3 className="text-xl font-bold">
              Respond 24/7
            </h3>
            <p className="mt-3 text-slate-400">
              Answer questions instantly even when you are busy or unavailable.
            </p>
          </div>


          <div className="rounded-xl bg-slate-900 p-8">
            <h3 className="text-xl font-bold">
              Get Qualified Opportunities
            </h3>
            <p className="mt-3 text-slate-400">
              Collect buyer and seller information automatically.
            </p>
          </div>

        </div>

      </section>


      {/* Demo */}
      <section id="demo" className="px-6 py-20">

        <h2 className="mb-4 text-center text-4xl font-bold">
          Live UpStar AI Demo
        </h2>

        <p className="mb-10 text-center text-slate-400">
          See how a website visitor becomes a qualified lead.
        </p>

        <ChatBox />

      </section>


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
              A buyer or seller visits a realtor website.
            </p>
          </div>


          <div className="rounded-xl bg-slate-900 p-8">
            <h3 className="text-xl font-bold">
              2. AI Starts Conversation
            </h3>
            <p className="mt-3 text-slate-400">
              UpStar asks questions and understands their needs.
            </p>
          </div>


          <div className="rounded-xl bg-slate-900 p-8">
            <h3 className="text-xl font-bold">
              3. Realtor Gets The Lead
            </h3>
            <p className="mt-3 text-slate-400">
              The realtor receives a qualified opportunity.
            </p>
          </div>

        </div>

      </section>


      {/* Final CTA */}
      <section className="px-8 py-20 text-center">

        <h2 className="text-4xl font-bold">
          Ready to capture more clients?
        </h2>

        <button
          onClick={goToDemo}
          className="mt-8 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold hover:bg-blue-700"
        >
          Start With UpStar AI
        </button>

      </section>

    </main>
  );
}