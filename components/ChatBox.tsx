"use client";

import { useState } from "react";
import { getConversation } from "@/data/conversation";
import { Realtor, realtors } from "@/data/realtor";

type ChatBoxProps = {
  initialRealtor?: Realtor;
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
  initialRealtor = "francie",
  showRealtorSelector = false,
}: ChatBoxProps) {
  const [selectedRealtor, setSelectedRealtor] =
    useState<Realtor>(initialRealtor);

  const [message, setMessage] = useState("");
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [lead, setLead] = useState<Lead>(emptyLead);
  const [errorMessage, setErrorMessage] = useState("");

  const conversation = getConversation(selectedRealtor);

  const realtor = realtors[selectedRealtor];

  const currentQuestion =
    conversation[step]?.question ??
    "Thanks for your interest!";

  function resetLead() {
    setLead(emptyLead);
    setMessage("");
    setStep(0);
    setCompleted(false);
    setSubmitting(false);
    setErrorMessage("");
  }

  function switchRealtor(value: Realtor) {
    setSelectedRealtor(value);
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
      /*
       * IMPORTANT:
       * The API expects customerId to be a UUID.
       * We get that UUID from the selected realtor.
       */
      const customerId = realtor?.id;

      if (!customerId) {
        throw new Error(
          "This realtor does not have a Supabase customer ID yet."
        );
      }

      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

      if (!uuidRegex.test(customerId)) {
        throw new Error(
          `Invalid realtor UUID: ${customerId}`
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

      /*
       * Read the response as text first.
       * This prevents the frontend from crashing if the API
       * accidentally returns something that isn't valid JSON.
       */
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

      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong.";

      setErrorMessage(message);
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
      conversation[step]?.field;

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
     * There are still questions remaining.
     */
    if (step < conversation.length - 1) {
      setStep(step + 1);
      setMessage("");
      return;
    }

    /*
     * This was the final question.
     */
    setMessage("");

    submitLead(updatedLead);
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl bg-white p-6 text-left text-black shadow-2xl">

      {/* DEVELOPMENT REALTOR SELECTOR */}
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
            ([key, realtorData]) => (
              <option
                key={key}
                value={key}
              >
                {realtorData.company}
              </option>
            )
          )}
        </select>
      )}

      {/* HEADER */}
      <div className="mb-5">
        <div className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          UpStar AI
        </div>

        <h2 className="mt-1 text-2xl font-bold">
          {realtor.company}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Virtual real estate assistant
        </p>
      </div>

      {/* CHAT */}
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
              <strong>Something went wrong:</strong>

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
          {conversation[step]?.options &&
            conversation[step].options.length >
              0 && (
              <div className="mt-4 grid gap-2">
                {conversation[step].options.map(
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
          {!conversation[step]?.options && (
            <>
              <input
                type="text"
                className="mt-5 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500"
                placeholder="Type your answer..."
                value={message}
                disabled={submitting}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
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
        <>
          {/* SUCCESS */}
          <div className="rounded-2xl bg-blue-50 p-5">
            <h3 className="text-xl font-bold text-blue-700">
              🎉 Thanks!
            </h3>

            <p className="mt-2 text-gray-700">
              Your information has been sent to{" "}
              {realtor.company}.
              Someone from the team will be in touch
              shortly.
            </p>
          </div>

          {/* LEAD SUMMARY */}
          <div className="mt-5 rounded-2xl border bg-gray-50 p-5 text-sm">
            <h3 className="mb-3 font-bold">
              Lead information
            </h3>

            <div className="space-y-2">
              <p>
                <strong>Goal:</strong>{" "}
                {lead.goal}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {lead.location}
              </p>

              <p>
                <strong>Budget:</strong>{" "}
                {lead.budget}
              </p>

              <p>
                <strong>Timeline:</strong>{" "}
                {lead.timeline}
              </p>

              <hr className="my-3" />

              <p>
                <strong>Name:</strong>{" "}
                {lead.name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {lead.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
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