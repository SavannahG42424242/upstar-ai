"use client";

import { useState } from "react";
import { realEstateConversation } from "@/data/conversation";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState(
    realEstateConversation[0].question
  );
  const [step, setStep] = useState(0);

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
    if (step < realEstateConversation.length - 1) {
      if (step === 1) {
  setLead((prev) => ({
    ...prev,
    location: message,
  }));
}

if (step === 2) {
  setLead((prev) => ({
    ...prev,
    budget: message,
  }));
}

if (step === 3) {
  setLead((prev) => ({
    ...prev,
    timeline: message,
  }));
}
      const nextStep = step + 1;

      setStep(nextStep);
      setReply(realEstateConversation[nextStep].question);
      setMessage("");
    } else {
      setReply(
        "🎉 Thanks! We'll connect you with the perfect real estate professional soon."
      );
      setMessage("");
    }
  }

  return (
  <div className="mx-auto mt-10 w-full max-w-md rounded-2xl bg-white p-6 text-black shadow-xl">
    <h2 className="text-xl font-bold">
      UpStar AI Assistant
    </h2>

    <p className="mt-3 text-gray-600">
      {reply}
    </p>

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

    <div className="mt-6 rounded-lg bg-gray-100 p-4 text-sm">
      <h3 className="font-bold text-lg mb-3">Lead Profile</h3>

      <p><strong>Goal:</strong> {lead.goal || "-"}</p>
      <p><strong>Location:</strong> {lead.location || "-"}</p>
      <p><strong>Budget:</strong> {lead.budget || "-"}</p>
      <p><strong>Timeline:</strong> {lead.timeline || "-"}</p>
      <p><strong>Name:</strong> {lead.name || "-"}</p>
      <p><strong>Email:</strong> {lead.email || "-"}</p>
      <p><strong>Phone:</strong> {lead.phone || "-"}</p>
    </div>
  </div>
);
}