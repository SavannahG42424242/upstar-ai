"use client";

import { useState } from "react";
import { getConversation } from "@/data/conversation";
import { Realtor, realtors } from "@/data/realtor";

type ChatBoxProps = {
  initialRealtor?: Realtor;
  showRealtorSelector?: boolean;
};

const emptyLead = {
  goal: "",
  location: "",
  budget: "",
  timeline: "",
  name: "",
  email: "",
  phone: "",
};

export default function ChatBox({
  initialRealtor = "francie",
  showRealtorSelector = false,
}: ChatBoxProps) {
  const [selectedRealtor, setSelectedRealtor] =
    useState<Realtor>(initialRealtor);

  const conversation = getConversation(selectedRealtor);

  const [message, setMessage] = useState("");
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [lead, setLead] = useState(emptyLead);

  const currentQuestion =
    conversation[step]?.question ?? "";

  function resetLead() {
    setLead(emptyLead);
    setMessage("");
    setStep(0);
    setCompleted(false);
  }

  function switchRealtor(value: Realtor) {
    setSelectedRealtor(value);
    resetLead();
  }

  async function submitLead(
    finalLead: typeof emptyLead
  ) {
    setSubmitting(true);

    try {
      const realtor = realtors[selectedRealtor];

      // Make sure this customer is connected
      // to a Supabase customer record.
      if (!realtor.id) {
        throw new Error(
          "This customer is not connected to Supabase yet."
        );
      }

      const response = await fetch("/api/lead", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...finalLead,

          // This is the important connection:
          // the lead belongs to this customer.
          customerId: realtor.id,

          // Keep the UpStar realtor key too.
          realtorKey: selectedRealtor,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "Lead submission failed"
        );
      }

      console.log(
        "UPSTAR LEAD SAVED:",
        result.lead
      );

      setCompleted(true);
    } catch (error) {
      console.error(
        "Lead submission failed:",
        error
      );

      alert(
        "We couldn't submit your information. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function advance(value: string) {
    if (!value.trim() || submitting) {
      return;
    }

    const currentField =
      conversation[step]?.field;

    const updatedLead = {
      ...lead,

      ...(currentField
        ? {
            [currentField]: value.trim(),
          }
        : {}),
    };

    setLead(updatedLead);

    if (
      step <
      conversation.length - 1
    ) {
      setStep(step + 1);
      setMessage("");
      return;
    }

    setMessage("");
    submitLead(updatedLead);
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl bg-white p-6 text-left text-black shadow-2xl">

      {/* Development-only realtor selector */}
      {showRealtorSelector && (
        <select
          className="mb-5 w-full rounded-xl border border-gray-300 p-3"
          value={selectedRealtor}
          onChange={(e) =>
            switchRealtor(
              e.target.value as Realtor
            )
          }
        >
          {Object.entries(realtors).map(
            ([key, realtor]) => (
              <option
                key={key}
                value={key}
              >
                {realtor.company}
              </option>
            )
          )}
        </select>
      )}

      {/* Header */}
      <div className="mb-5">
        <div className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          UpStar AI
        </div>

        <h2 className="mt-1 text-2xl font-bold">
          {
            realtors[
              selectedRealtor
            ].company
          }
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Virtual real estate assistant
        </p>
      </div>

      {!completed ? (
        <>
          {/* Question */}
          <div className="rounded-2xl bg-gray-50 p-5">
            <p className="leading-relaxed text-gray-700">
              {currentQuestion}
            </p>
          </div>

          {/* Multiple-choice options */}
          {conversation[step]?.options && (
            <div className="mt-4 grid gap-2">
              {conversation[
                step
              ].options.map(
                (option) => (
                  <button
                    key={option}
                    onClick={() =>
                      advance(option)
                    }
                    disabled={submitting}
                    className="rounded-xl border border-gray-200 p-3 text-left transition hover:border-blue-400 hover:bg-blue-50 disabled:opacity-50"
                  >
                    {option}
                  </button>
                )
              )}
            </div>
          )}

          {/* Text answer */}
          {!conversation[step]?.options && (
            <>
              <input
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
                    e.key ===
                    "Enter"
                  ) {
                    advance(message);
                  }
                }}
              />

              <button
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
        <>
          {/* Success message */}
          <div className="rounded-2xl bg-blue-50 p-5">
            <h3 className="text-xl font-bold text-blue-700">
              🎉 Thanks!
            </h3>

            <p className="mt-2 text-gray-700">
              Your information has
              been sent to{" "}
              {
                realtors[
                  selectedRealtor
                ].company
              }
              . Someone from the
              team will be in touch
              shortly.
            </p>
          </div>

          {/* Lead summary */}
          <div className="mt-5 rounded-2xl border bg-gray-50 p-5 text-sm">
            <h3 className="mb-3 font-bold">
              Lead information
            </h3>

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

          {/* Start over */}
          <button
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