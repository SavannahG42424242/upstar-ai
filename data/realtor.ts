export const realtors = {
  sarah: {
    name: "Sarah Johnson",
    company: "Johnson Realty",
    city: "Westchester County",
    email: "hello@upstarai.com",
    phone: "(555) 555-5555",
  },

  michael: {
    name: "Michael Davis",
    company: "Davis Homes",
    city: "New York City",
    email: "demo@upstarai.com",
    phone: "(555) 555-5555",
  },

  emma: {
    name: "Emma Wilson",
    company: "Wilson Real Estate",
    city: "Hoboken",
    email: "demo@upstarai.com",
    phone: "(555) 555-5555",
  },

  francie: {
  name: "Francie Malina",
  company: "The Francie Malina Team",
  city: "Westchester County",
  email: "savannahgraf@gmail.com",
  phone: "(555) 555-5555",
},
};

export type Realtor = keyof typeof realtors;