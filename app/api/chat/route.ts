export async function POST(request: Request) {
  const { message } = await request.json();

  const lower = message.toLowerCase();

  let reply = '';

  if (lower.includes('buy')) {
    reply =
      'That is exciting! Are you looking to buy in Westchester, New York City, or another area? I can help connect you with the right realtor and schedule a consultation.';
  } else if (lower.includes('sell')) {
    reply =
      'Great! Many homeowners want to know their home value first. What town is your property located in? I can help arrange a free home valuation with a local agent.';
  } else if (lower.includes('price') || lower.includes('cost')) {
    reply =
      'Home prices vary significantly by neighborhood. Are you looking for a condo, townhouse, or single-family home, and what is your target price range?';
  } else {
    reply =
      'Thanks for reaching out to UpStar AI. I can help with buying, selling, pricing questions, neighborhood information, and connecting you with a realtor. Are you looking to buy, sell, or just explore the market?';
  }

  return Response.json({ reply });
}