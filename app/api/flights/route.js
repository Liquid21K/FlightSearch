import { NextResponse } from 'next/server';
import flights from '@/app/data/flights.json';

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');
  const date = searchParams.get('date'); 

  console.log('Query Params:', { origin, destination, date });

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
  
    // The incoming date from the deal click is M/D/YYYY, so split by '/'
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      // Assuming the format is M/D/YYYY, we can just return it as is
      // since flights.json uses the same format.
      return dateStr;
    }
    
    // Fallback for YYYY-MM-DD format if it's used elsewhere
    const ymdParts = dateStr.split('-');
    if (ymdParts.length === 3) {
      const [year, month, day] = ymdParts;
      return `${parseInt(month)}/${parseInt(day)}/${year}`;
    }

    return dateStr; // Return as is if format is unknown
  };
  
  const filteredFlights = flights.filter(flight => {
    const matchesOrigin = origin ? flight.origin.toLowerCase() === origin.toLowerCase() : true;
    const matchesDestination = destination ? flight.destination.toLowerCase() === destination.toLowerCase() : true;
  
    let matchesDate = true;
    if (date) {
      const formattedDate = formatDate(date); 
      matchesDate = flight.departure === formattedDate;
    }
  
    return matchesOrigin && matchesDestination && matchesDate;
  });
  
  
  

  console.log(filteredFlights)

  return NextResponse.json(filteredFlights);
}
