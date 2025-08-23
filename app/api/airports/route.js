import airportsRaw from '@/app/data/airports.json';

export async function GET() {
  // Convert object values into array
  const airportsArray = Object.values(airportsRaw);

  // Optional: Filter out airports without IATA codes (common)
  const filtered = airportsArray.filter(a => a.iata && a.iata.length === 3);

  return Response.json(filtered);
}
