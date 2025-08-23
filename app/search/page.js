'use client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import DarkClouds from '../assets/FooterCloud';


import AirlineFilter from '../components/FlightStuff/AirlineFilter';
import LoadingCircle from '../components/LoadingCircle';

const SearchPage =  () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [flights, setFlightsApi] = useState([]);
  
  const [OptinalFlights, setOptinalFlightsApi] = useState([]);
  


  const fromCity = searchParams.get('from');
  const toCity = searchParams.get('to');
  const fromIATA = searchParams.get('fromIATA');
  const toIATA = searchParams.get('toIATA');
  const returnDate = searchParams.get('returnDate');
  const departDate = searchParams.get('departDate');
  const passengers = searchParams.get('passengers');

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const query = new URLSearchParams({
          origin: fromIATA || '',
          destination: toIATA || '',
          date: departDate || '',
        }).toString();
  
        const query2 = new URLSearchParams({
          origin: fromIATA || '',
          destination: toIATA || '',
        }).toString();
  
        const res = await fetch(`/api/flights?${query}`);
        const data = await res.json();
        setFlightsApi(data);
  
        const res2 = await fetch(`/api/flights?${query2}`);
        const data2 = await res2.json();
  
        // Filter optional flights to only those within ±14 days of departDate
        const baseDate = new Date(departDate);
        const twoWeeksBefore = new Date(baseDate);
        twoWeeksBefore.setDate(baseDate.getDate() - 14);
        const twoWeeksAfter = new Date(baseDate);
        twoWeeksAfter.setDate(baseDate.getDate() + 14);
        
        const parseMDY = (str) => {
          // str is in M/D/YYYY
          const [month, day, year] = str.split('/').map(Number);
          return new Date(year, month - 1, day);
        };
        
        const filteredData2 = data2.filter((flight) => {
          const flightDate = parseMDY(flight.departure);
          return flightDate >= twoWeeksBefore && flightDate <= twoWeeksAfter;
        });

        const filteredUnique = filteredData2.filter(
          (flight) => !flights.some(f =>
            f.origin === flight.origin &&
            f.destination === flight.destination &&
            f.departure === flight.departure
          )
        );
        setOptinalFlightsApi(filteredUnique);
  
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error loading flights:', err);
        setIsLoading(false);
      }
    };
  
    fetchFlights();
  }, [fromIATA, toIATA, departDate]);
  
  
  
  
  if (isLoading) {
    return <LoadingCircle />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-700 relative">
      <div className="container mx-auto px-4 py-8 rounded-lg mt-10">
        {/* Search Summary */}

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Flight Search Results: {flights.length} flights found</h1>
          <div className="flex flex-wrap gap-4 text-gray-600">
            <div>FROM: {fromCity} ({fromIATA}) → TO: {toCity} ({toIATA}) </div>
            <div>•</div>
            <div>DEPARTURE: {departDate} • RETURN: {returnDate}</div>
            <div>•</div>
            <div>PASSENGERS: { passengers}</div>
          </div>
        </div>

        {/* Filters and Results Container */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          {!returnDate || returnDate === "" ? (
            <AirlineFilter flights={flights} passengers={passengers} returnDate={null} OptinalFlights={OptinalFlights} />
          ) : (
            <AirlineFilter flights={flights} passengers={passengers} returnDate={returnDate} OptinalFlights={OptinalFlights} />
          )}
          
        </div>
      </div>
      <DarkClouds/>
    </div>
  );
};

export default SearchPage;