"use client";

import { useState } from "react";
import { getConversation } from "@/data/conversation";
import { Realtor, realtors } from "@/data/realtor";

type ChatBoxProps = {
  initialRealtor?: Realtor;
};

const emptyLead = {
  goal: "",
  location: "",
  budget: "",
  timeline: "",
  name: "",
  email: "",
  phone: "",
  specialties: "",
};

export default function ChatBox({
  initialRealtor = "francie",
}: ChatBoxProps) {
  const [selectedRealtor, setSelectedRealtor] =
    useState<Realtor>(initialRealtor);

  const conversation = getConversation(selectedRealtor);

  const [message, setMessage] = useState("");
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const [lead, setLead] = useState(emptyLead);

  const reply = conversation[step]?.question ?? "";

  function switchRealtor(value: Realtor) {
    setSelectedRealtor(value);
    setStep(0);
    setCompleted(false);
    setMessage("");
    setLead(emptyLead);
  }

  function saveLead(field: string, value: string) {
    setLead((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function submitLead(finalLead: typeof emptyLead) {
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...finalLead,
          realtorKey: selectedRealtor,
          realtorName: realtors[selectedRealtor].name,
          realtorCompany: realtors[selectedRealtor].company,
          realtorEmail: realtors[selectedRealtor].email,
        }),
      });
    } catch (error) {
      console.error("Lead submission failed:", error);
    }
  }

  function advance(value: string) {
    if (!value.trim()) return;

    const currentField = conversation[step]?.field;

    const updatedLead = {
      ...lead,
      ...(currentField
        ? {
            [currentField]: value,
          }
        : {}),
    };

    setLead(updatedLead);

    if (step < conversation.length - 1) {
      const nextStep = step + 1;
      setStep(nextStep);
    } else {
      setCompleted(true);
      submitLead(updatedLead);
    }

    setMessage("");
  }

  function resetDemo() {
    setMessage("");
    setStep(0);
    setCompleted(false);
    setLead(emptyLead);
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-md rounded-2xl bg-white p-6 text-black shadow-xl">

      {/* Internal demo selector */}
      <select
        className="mb-4 w-full rounded-lg border p-3"
        value={selectedRealtor}
        onChange={(e) =>
          switchRealtor(e.target.value as Realtor)
        }
      >
        {Object.entries(realtors).map(([key, realtor]) => (
          <option key={key} value={key}>
            {realtor.company}
          </option>
        ))}
      </select>

      <h2 className="text-xl font-bold">
        UpStar AI Assistant
      </h2>

      <p className="mt-3 text-gray-600">
        {completed
          ? "🎉 Thanks! Your information has been saved. A real estate professional will follow up shortly."
          : reply}
      </p>

      {!completed && conversation[step]?.options && (
        <div className="mt-4 grid gap-2">
          {conversation[step].options.map((option) => (
            <button
              key={option}
              onClick={() => advance(option)}
              className="rounded-lg border p-3 text-left transition hover:bg-gray-100"
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {!completed && !conversation[step]?.options && (
        <>
          <input
            className="mt-6 w-full rounded-lg border p-3"
            placeholder="Type your answer..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                advance(message);
              }
            }}
          />

          <button
            onClick={() => advance(message)}
            className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Send Message
          </button>
        </>
      )}

      {completed && (
        <div className="mt-6 rounded-xl bg-blue-50 p-5 text-sm shadow">

          <h3 className="mb-4 text-xl font-bold text-blue-700">
            🎉 New Lead Captured
          </h3>

          <p>
            <strong>Goal:</strong>{" "}
            {lead.goal || "-"}
          </p>

          <p>
            <strong>Location:</strong>{" "}
            {lead.location || "-"}
          </p>

          <p>
            <strong>Budget:</strong>{" "}
            {lead.budget || "-"}
          </p>

          <p>
            <strong>Timeline:</strong>{" "}
            {lead.timeline || "-"}
          </p>

          <hr className="my-3" />

          <p>
            <strong>Name:</strong>{" "}
            {lead.name || "-"}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {lead.email || "-"}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {lead.phone || "-"}
          </p>

          <hr className="my-3" />

          <p>
            <strong>Interest:</strong>{" "}
            {lead.specialties || "-"}
          </p>

        </div>
      )}

      <button
        onClick={resetDemo}
        className="mt-4 w-full rounded-lg bg-gray-800 px-4 py-3 font-semibold text-white transition hover:bg-gray-900"
      >
        Start New Demo
      </button>

    </div>
  );
}