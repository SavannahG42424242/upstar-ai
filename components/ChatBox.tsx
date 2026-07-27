"use client";

import { useState } from "react";
import { realEstateConversation } from "@/data/conversation";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState(
    realEstateConversation[0].question
  );
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [lead, setLead] = useState({
  goal: "",
  location: "",
  budget: "",
  timeline: "",
  name: "",
  email: "",
  phone: "",
});

  function sendMessage() {
  if (!message.trim()) return;

  const currentField = realEstateConversation[step].field;

  let updatedLead = lead;

if (currentField) {
  updatedLead = {
    ...lead,
    [currentField]: message,
  };

  setLead(updatedLead);
}

  if (step < realEstateConversation.length - 1) {
    const nextStep = step + 1;

    setStep(nextStep);
    setReply(realEstateConversation[nextStep].question);
  } else {
  setReply(
    "🎉 Thanks! Your information has been saved. A real estate professional will follow up shortly."
  );
  setCompleted(true);
  fetch("/api/lead", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(updatedLead),
});
}

  setMessage("");
}

function resetDemo() {
  setMessage("");
  setStep(0);
  setCompleted(false);

  setLead({
    goal: "",
    location: "",
    budget: "",
    timeline: "",
    name: "",
    email: "",
    phone: "",
  });

  setReply(realEstateConversation[0].question);
}
  return (
  <div className="mx-auto mt-10 w-full max-w-md rounded-2xl bg-white p-6 text-black shadow-xl">
    <h2 className="text-xl font-bold">
      UpStar AI Assistant
    </h2>

    <p className="mt-3 text-gray-600">
      {reply}
    </p>
{realEstateConversation[step].options && (
  <div className="mt-4 grid gap-2">
    {realEstateConversation[step].options.map((option) => (
      <button
  key={option}
  onClick={() => {
    const currentField = realEstateConversation[step].field;

    if (currentField) {
      setLead((prev) => ({
        ...prev,
        [currentField]: option,
      }));
    }

    if (step < realEstateConversation.length - 1) {
      const nextStep = step + 1;
      setStep(nextStep);
      setReply(realEstateConversation[nextStep].question);
    }

    setMessage("");
  }}
  className="rounded-lg border p-3 text-left hover:bg-gray-100"
>
  {option}
</button>
    ))}
  </div>
)}
    <input
      className="mt-6 w-full rounded-lg border p-3"
      placeholder="Type your answer..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />

    <button
      onClick={sendMessage}
      className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white"
    >
      Send Message
    </button>

    {completed && (
  <div className="mt-6 rounded-xl bg-blue-50 p-5 text-sm shadow">
    <h3 className="mb-4 text-xl font-bold text-blue-700">
      🎉 New Lead Captured
    </h3>

    <p><strong>Goal:</strong> {lead.goal || "-"}</p>
    <p><strong>Location:</strong> {lead.location || "-"}</p>
    <p><strong>Budget:</strong> {lead.budget || "-"}</p>
    <p><strong>Timeline:</strong> {lead.timeline || "-"}</p>

    <hr className="my-3" />

    <p><strong>Name:</strong> {lead.name || "-"}</p>
    <p><strong>Email:</strong> {lead.email || "-"}</p>
    <p><strong>Phone:</strong> {lead.phone || "-"}</p>
  </div>
)}
      <button
      onClick={resetDemo}
      className="mt-4 w-full rounded-lg bg-gray-800 px-4 py-3 font-semibold text-white"
    >
      Start New Demo
    </button>
  </div>
);
}