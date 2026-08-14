import { realtors, Realtor } from "./realtor";

export function getConversation(realtorKey: Realtor) {
  const realtor = realtors[realtorKey];

  const areas = realtor.serviceAreas.join(", ");
  const specialties = realtor.specialties.join(", ");

  return [
    {
      id: "goal",
      field: "goal",
      question: realtor.greeting,
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
      question: `Great! Which area are you interested in? We currently help clients in and around ${areas}.`,
    },

    {
      id: "budget",
      field: "budget",
      question: `What's your approximate budget?`,
    },

    {
      id: "timeline",
      field: "timeline",
      question: `When are you hoping to move or complete your real estate transaction?`,
    },

    {
      id: "name",
      field: "name",
      question: `What's your full name?`,
    },

    {
      id: "email",
      field: "email",
      question: `What's the best email address to reach you?`,
    },

    {
      id: "phone",
      field: "phone",
      question: `What's the best phone number to reach you?`,
    },

    {
      id: "specialties",
      field: "specialties",
      question: `Thanks! The ${realtor.company} team specializes in ${specialties}. Is there anything specific you'd like help with?`,
    },
  ];
}