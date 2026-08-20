export const realtors = {
  barry: {
    id: "4e758f12-7ab3-461a-9003-4906397af132",
    name: "The Barry Team",
    company: "The Barry Team",
    city: "Larchmont, NY",
    email: "barryteam@compass.com",
    phone: "914.715.1584",

    serviceAreas: [
      "Larchmont",
      "Mamaroneck",
      "New Rochelle",
      "Rye",
      "Harrison",
      "Pelham",
    ],

    specialties: [
      "Residential Real Estate",
      "Buying",
      "Selling",
      "Luxury Real Estate",
    ],

    greeting:
      "Hi! I'm the Barry Team's virtual real estate assistant. How can I help you today?",
  },

  sarah: {
    id: "",
    name: "Sarah Johnson",
    company: "Johnson Realty",
    city: "Westchester County",
    email: "hello@upstarai.com",
    phone: "(555) 555-5555",
    serviceAreas: ["Westchester County"],
    specialties: ["Residential Real Estate"],
    greeting: "Hi! How can I help you today?",
  },

  michael: {
    id: "",
    name: "Michael Davis",
    company: "Davis Homes",
    city: "New York City",
    email: "demo@upstarai.com",
    phone: "(555) 555-5555",
    serviceAreas: ["New York City"],
    specialties: ["Residential Real Estate"],
    greeting: "Hi! How can I help you today?",
  },

  emma: {
    id: "",
    name: "Emma Wilson",
    company: "Wilson Real Estate",
    city: "Hoboken",
    email: "demo@upstarai.com",
    phone: "(555) 555-5555",
    serviceAreas: ["Hoboken"],
    specialties: ["Residential Real Estate"],
    greeting: "Hi! How can I help you today?",
  },

  francie: {
    id: "",
    name: "Francie Malina",
    company: "The Francie Malina Team",
    city: "Westchester County",
    email: "savannahgraf@gmail.com",
    phone: "(555) 555-5555",
    serviceAreas: ["Westchester County"],
    specialties: ["Residential Real Estate"],
    greeting: "Hi! How can I help you today?",
  },
};

export type Realtor = keyof typeof realtors;