'use client';

import FlightCard from './cards/FlightCard';
import FlightCardUser from './cards/FlightCardUser';
import { useSession } from 'next-auth/react';

const AirlinePage = ({ flights, selectedStops, passengers, returnDate, OptinalFlights }) => {
  const { data: session } = useSession();

  return (
    <>
      {!session ? (
        <div>
          {selectedStops.length > 0
            ? selectedStops.map((stop) =>
                flights
                  .filter((flight) => Number(stop) === flight.stops)
                  .map((flight) => (
                    <div key={flight.id}>
                      <FlightCard
                        flight={flight}
                        passengers={passengers}
                        returnDate={returnDate}
                      />
                    </div>
                  ))
              )
            : flights.map((flight) => (
                <div key={flight.id}>
                  <FlightCard
                    flight={flight}
                    passengers={passengers}
                    returnDate={returnDate}
                  />
                </div>
              ))}
        </div>
      ) : selectedStops.length > 0 ? (
        selectedStops.map((stop) =>
          flights
            .filter((flight) => Number(stop) === flight.stops)
            .map((flight) => (
              <div key={flight.id}>
                <FlightCardUser
                  flight={flight}
                  passengers={passengers}
                  returnDate={returnDate}
                />
              </div>
            ))
        )
      ) : (
        flights.map((flight) => (
          <div key={flight.id}>
            <FlightCardUser
              flight={flight}
              passengers={passengers}
              returnDate={returnDate}
            />
          </div>
        ))
      )}

      {OptinalFlights && (
       
        <>
        <div className='text-center text-xl font-semibold'>Optinal Flights</div>
          {!session
            ? OptinalFlights.map((flight) => (
                <div key={flight.id}>
                  <FlightCard
                    flight={flight}
                    passengers={passengers}
                    returnDate={returnDate}
                  />
                </div>
              ))
            : OptinalFlights.map((flight) => (
                <div key={flight.id}>
                  <FlightCardUser
                    flight={flight}
                    passengers={passengers}
                    returnDate={returnDate}
                  />
                </div>
              ))}
        </>
      )}
    </>
  );
};

export default AirlinePage;
