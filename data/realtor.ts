export const realtors = {
  sarah: {
    name: "Sarah Johnson",
    company: "Johnson Realty",
    city: "Westchester County",

    // For demos, keep this as YOUR email.
    // Change this only after a customer signs up.
    notificationEmail: "savannahgraf@gmail.com",

    phone: "(555) 555-5555",

    serviceAreas: [
      "Westchester County",
    ],

    specialties: [
      "Buying",
      "Selling",
      "Investment Properties",
    ],

    tone: "Friendly and professional",

    greeting:
      "Hi! 👋 I'm UpStar AI, the virtual assistant for Johnson Realty. Are you looking to buy, sell, invest, or just explore today?",
  },

  michael: {
    name: "Michael Davis",
    company: "Davis Homes",
    city: "New York City",

    notificationEmail: "savannahgraf@gmail.com",

    phone: "(555) 555-5555",

    serviceAreas: [
      "New York City",
    ],

    specialties: [
      "Buying",
      "Selling",
      "Investment Properties",
    ],

    tone: "Friendly and professional",

    greeting:
      "Hi! 👋 I'm UpStar AI, the virtual assistant for Davis Homes. Are you looking to buy, sell, invest, or just explore today?",
  },

  emma: {
    name: "Emma Wilson",
    company: "Wilson Real Estate",
    city: "Hoboken",

    notificationEmail: "savannahgraf@gmail.com",

    phone: "(555) 555-5555",

    serviceAreas: [
      "Hoboken",
    ],

    specialties: [
      "Buying",
      "Selling",
      "Investment Properties",
    ],

    tone: "Friendly and professional",

    greeting:
      "Hi! 👋 I'm UpStar AI, the virtual assistant for Wilson Real Estate. Are you looking to buy, sell, invest, or just explore today?",
  },

  francie: {
    name: "Francie Malina",
    company: "The Francie Malina Team",
    city: "Westchester County",

    notificationEmail: "savannahgraf@gmail.com",

    phone: "(555) 555-5555",

    serviceAreas: [
      "Westchester County",
      "Scarsdale",
      "Bronxville",
      "Rye",
    ],

    specialties: [
      "Buying",
      "Selling",
      "Luxury Real Estate",
    ],

    tone: "Warm and professional",

    greeting:
      "Hi! 👋 I'm UpStar AI, the virtual assistant for The Francie Malina Team. Are you looking to buy, sell, invest, or just explore the Westchester market?",
  },

  barry: {
    name: "The Barry Team",
    company: "The Barry Team at Compass",
    city: "Larchmont, NY",

    notificationEmail: "savannahgraf@gmail.com",

    phone: "(914) 715-1584",

    serviceAreas: [
      "Larchmont",
      "Mamaroneck",
      "New Rochelle",
      "Rye",
      "Harrison",
    ],

    specialties: [
      "Buying",
      "Selling",
      "Relocation",
      "Waterfront Properties",
      "New Construction",
      "Investment Properties",
    ],

    tone: "Professional and welcoming",

    greeting:
      "Hi! 👋 I'm UpStar AI, the virtual assistant for The Barry Team. Are you looking to buy, sell, invest, or explore the Larchmont and Sound Shore market?",
  },
};

export type Realtor = keyof typeof realtors;