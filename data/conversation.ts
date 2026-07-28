import { getRealtor, } from "./currentRealtor";
import { Realtor } from "./realtor";

export function getConversation(selectedRealtor: Realtor) {
  const realtor = getRealtor(selectedRealtor);

  return [
    {
      id: "goal",
      field: "goal",
      question: `👋 Welcome to ${realtor.company}! I'm UpStar AI, your virtual assistant for ${realtor.name}. Are you looking to buy, sell, invest, or just explore today?`,
      options: [
        "🏡 Buy a Home",
        "🏠 Sell a Home",
        "💼 Investment Property",
        "💬 Just Exploring",
      ],
    },
    {
      id: "location",
      field: "location",
      question: `Great! What area in or around ${realtor.city} are you interested in?`,
    },
    {
      id: "budget",
      field: "budget",
      question: "What's your approximate budget?",
    },
    {
      id: "timeline",
      field: "timeline",
      question: "When are you hoping to move?",
    },
    {
      id: "name",
      field: "name",
      question: "What's your full name?",
    },
    {
      id: "email",
      field: "email",
      question: "What's the best email address to reach you?",
    },
    {
      id: "phone",
      field: "phone",
      question: "What's the best phone number to reach you?",
    },
  ];
}