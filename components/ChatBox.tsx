"use client";

import { useState } from "react";

type Customer = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  website: string;
  service_areas: string;
  specialties: string;
  greeting: string;
  slug: string;
  industry: string;
  settings: Record<string, unknown>;
};

type ChatBoxProps = {
  customer: Customer;
  showRealtorSelector?: boolean;
};

type Lead = {
  goal: string;
  location: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
};

const emptyLead: Lead = {
  goal: "",
  location: "",
  budget: "",
  timeline: "",
  name: "",
  email: "",
  phone: "",
};

export default function ChatBox({
  customer,
}: ChatBoxProps) {
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState("");
  const [completed, setCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [lead, setLead] = useState<Lead>(emptyLead);
  const [errorMessage, setErrorMessage] = useState("");

  /*
   * Questions asked by the UpStar AI assistant.
   */
  const questions = [
    {
      field: "goal" as const,
      question: "What are you looking to do?",
      options: [
        "🏡 Buy a Home",
        "🏠 Sell a Home",
        "💰 Invest in Real Estate",
      ],
    },
    {
      field: "location" as const,
      question: "What area are you interested in?",
    },
    {
      field: "budget" as const,
      question: "What's your approximate budget?",
    },
    {
      field: "timeline" as const,
      question: "When are you hoping to move?",
      options: [
        "ASAP",
        "1–3 Months",
        "3–6 Months",
        "6+ Months",
        "Just Exploring",
      ],
    },
    {
      field: "name" as const,
      question: "What's your name?",
    },
    {
      field: "email" as const,
      question: "What's the best email to reach you?",
    },
    {
      field: "phone" as const,
      question: "What's the best phone number to reach you?",
    },
  ];

  /*
   * IMPORTANT:
   * The current step directly matches the current question.
   *
   * step 0 = goal
   * step 1 = location
   * step 2 = budget
   * step 3 = timeline
   * step 4 = name
   * step 5 = email
   * step 6 = phone
   */
  const currentQuestion =
    questions[step]?.question ||
    "Thanks for your interest!";

  const currentOptions =
    questions[step]?.options || [];

  function resetLead() {
    setLead(emptyLead);
    setMessage("");
    setStep(0);
    setCompleted(false);
    setSubmitting(false);
    setErrorMessage("");
  }

  async function submitLead(finalLead: Lead) {
    setSubmitting(true);
    setErrorMessage("");

    try {
      const customerId = customer.id;

      if (!customerId) {
        throw new Error(
          "This business does not have a customer ID."
        );
      }

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId,

          goal: finalLead.goal,
          location: finalLead.location,
          budget: finalLead.budget,
          timeline: finalLead.timeline,
          name: finalLead.name,
          email: finalLead.email,
          phone: finalLead.phone,
        }),
      });

      const responseText = await response.text();

      let result: any = {};

      try {
        result = responseText
          ? JSON.parse(responseText)
          : {};
      } catch {
        console.error(
          "API returned invalid JSON:",
          responseText
        );

        throw new Error(
          "The server returned an invalid response."
        );
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "Lead submission failed."
        );
      }

      console.log(
        "UPSTAR LEAD SUCCESS:",
        result.lead
      );

      setCompleted(true);
    } catch (error) {
      console.error(
        "UPSTAR LEAD ERROR:",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function advance(value: string) {
    const cleanValue = value.trim();

    if (!cleanValue || submitting) {
      return;
    }

    setErrorMessage("");

    const currentField =
      questions[step]?.field;

    const updatedLead: Lead = {
      ...lead,

      ...(currentField
        ? {
            [currentField]: cleanValue,
          }
        : {}),
    };

    setLead(updatedLead);

    /*
     * If there are more questions,
     * move to the next question.
     */
    if (step < questions.length - 1) {
      setStep(step + 1);
      setMessage("");
      return;
    }

    /*
     * The phone number was the final question,
     * so submit the lead.
     */
    setMessage("");

    submitLead(updatedLead);
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl bg-white p-6 text-left text-black shadow-2xl">

      {/* HEADER */}

      <div className="mb-5">

        <div className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          UpStar AI
        </div>

        <h2 className="mt-1 text-2xl font-bold">
          {customer.company}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Virtual{" "}
          {customer.industry ||
            "business"}{" "}
          assistant
        </p>

      </div>

      {/* CONVERSATION */}

      {!completed ? (
        <>

          {/* QUESTION */}

          <div className="rounded-2xl bg-gray-50 p-5">

            <p className="leading-relaxed text-gray-700">
              {currentQuestion}
            </p>

          </div>

          {/* ERROR */}

          {errorMessage && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">

              <strong>
                Something went wrong:
              </strong>

              <div className="mt-1">
                {errorMessage}
              </div>

              <button
                type="button"
                onClick={() =>
                  submitLead(lead)
                }
                disabled={submitting}
                className="mt-3 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                Try Again
              </button>

            </div>
          )}

          {/* OPTIONS */}

          {currentOptions.length > 0 && (
            <div className="mt-4 grid gap-2">

              {currentOptions.map(
                (option) => (
                  <button
                    type="button"
                    key={option}
                    onClick={() =>
                      advance(option)
                    }
                    disabled={submitting}
                    className="rounded-xl border border-gray-200 p-3 text-left transition hover:border-blue-400 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {option}
                  </button>
                )
              )}

            </div>
          )}

          {/* TEXT INPUT */}

          {currentOptions.length === 0 && (
            <>

              <input
                type="text"
                className="mt-5 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500"
                placeholder="Type your answer..."
                value={message}
                disabled={submitting}
                onChange={(e) =>
                  setMessage(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter"
                  ) {
                    e.preventDefault();
                    advance(message);
                  }
                }}
              />

              <button
                type="button"
                onClick={() =>
                  advance(message)
                }
                disabled={
                  !message.trim() ||
                  submitting
                }
                className="mt-3 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting
                  ? "Saving..."
                  : "Continue"}
              </button>

            </>
          )}

        </>
      ) : (

        /* SUCCESS */

        <>

          <div className="rounded-2xl bg-blue-50 p-5">

            <h3 className="text-xl font-bold text-blue-700">
              🎉 Thanks!
            </h3>

            <p className="mt-2 text-gray-700">
              Your information has
              been sent to{" "}
              {customer.company}.
              Someone from the team
              will be in touch shortly.
            </p>

          </div>

          {/* LEAD SUMMARY */}

          <div className="mt-5 rounded-2xl border bg-gray-50 p-5 text-sm">

            <h3 className="mb-3 font-bold">
              Lead information
            </h3>

            <div className="space-y-2">

              <p>
                <strong>
                  Goal:
                </strong>{" "}
                {lead.goal}
              </p>

              <p>
                <strong>
                  Location:
                </strong>{" "}
                {lead.location}
              </p>

              <p>
                <strong>
                  Budget:
                </strong>{" "}
                {lead.budget}
              </p>

              <p>
                <strong>
                  Timeline:
                </strong>{" "}
                {lead.timeline}
              </p>

              <hr className="my-3" />

              <p>
                <strong>
                  Name:
                </strong>{" "}
                {lead.name}
              </p>

              <p>
                <strong>
                  Email:
                </strong>{" "}
                {lead.email}
              </p>

              <p>
                <strong>
                  Phone:
                </strong>{" "}
                {lead.phone}
              </p>

            </div>

          </div>

          {/* START OVER */}

          <button
            type="button"
            onClick={resetLead}
            className="mt-4 w-full rounded-xl bg-gray-900 px-4 py-3 font-semibold text-white hover:bg-gray-800"
          >
            Start New Conversation
          </button>

        </>
      )}

    </div>
  );
}