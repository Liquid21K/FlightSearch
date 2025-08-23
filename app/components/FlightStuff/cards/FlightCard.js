import { useState, useEffect } from 'react';
import {Card, CardHeader, CardBody, CardFooter, Divider, Image} from "@heroui/react";

const FlightCard = ({ flight, passengers, returnDate }) => {
  const [returnFlight, setReturnFlight] = useState(null);

  useEffect(() => {
    const findReturnFlight = async () => {
      if (!returnDate) return; // Don't search for return flight if no return date

      try {
        const res = await fetch('/api/flights');
        const flights = await res.json();
        
        // Find a return flight with the same airline and reversed route
        const returnFlight = flights.find(f =>
          f.airline === flight.airline &&
          f.origin === flight.destination &&
          f.destination === flight.origin &&
          new Date(f.departure) > new Date(flight.arrival)
        );
        setReturnFlight(returnFlight);
      } catch (err) {
        console.error('Error finding return flight:', err);
      }
    };

    findReturnFlight();
  }, [flight, returnDate]);

  return (
    <Card className="max-w-[90%] mx-auto">
      <CardHeader className="flex gap-2 py-2">
        <Image
          alt={flight.airline}
          height={32}
          radius="sm"
          className='m-1'
          src={flight.image}
          width={32}
        />
        <div className="flex flex-col">
          <p className="text-sm">{flight.airline}</p>
          <p className="text-xs text-default-500">{flight.flightNumber}</p>
        </div>
        <div className="w-full flex justify-end">
          <div className="text-xl font-bold text-blue-600">
            ${returnFlight ? flight.price + returnFlight.price : flight.price}
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="py-2">
        <div className="flex items-center justify-between my-3">
          {/* Departure */}
          <div className="text-center flex-1">
            <div className="text-xl font-bold text-gray-900">{flight.departureTime}</div>
            <div className="text-xs font-medium text-gray-600 mt-1">{flight.departure}</div>
          </div>

          {/* Flight Path */}
          <div className="flex flex-col items-center flex-1 px-2">
            <div className="">
              <Image
                alt="Flight icon"
                src="/assets/images/flight_icon.png"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="text-xs font-medium text-gray-600 mb-1">{flight.flightDuration}h</div>
            <div className="w-full flex items-center justify-center space-x-1">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
              <div className="flex-1 h-0.5 bg-gray-300 relative">
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
            </div>
            <div className="text-xs font-medium text-gray-500 mt-1">
              {flight.stops === 0 ? (
                <span className="text-green-600">Non-stop</span>
              ) : (
                <span className="text-orange-500">{flight.stop} stop{flight.stop > 1 ? 's' : ''}</span>
              )}
            </div>
          </div>

          {/* Arrival */}
          <div className="text-center flex-1">
            <div className="text-xl font-bold text-gray-900">{flight.arrivalTime}</div>
            <div className="text-xs font-medium text-gray-600 mt-1">{flight.arrival}</div>
          </div>
        </div>

        {/* Return Flight Details (if available) */}
        {returnDate && returnFlight && (
          <>
            <Divider />
            <div className="flex items-center justify-between my-3">
              {/* Return Departure */}
              <div className="text-center flex-1">
                <div className="text-xl font-bold text-gray-900">{returnFlight.departureTime}</div>
                <div className="text-xs font-medium text-gray-600 mt-1">{returnFlight.departure}</div>
              </div>

              {/* Return Flight Path */}
              <div className="flex flex-col items-center flex-1 px-2">
                <div className="">
                  <Image
                    alt="Flight icon"
                    src="/assets/images/flight_icon.png"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div className="text-xs font-medium text-gray-600 mb-1">{returnFlight.flightDuration}h</div>
                <div className="w-full flex items-center justify-center space-x-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                  <div className="flex-1 h-0.5 bg-gray-300 relative">
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                </div>
                <div className="text-xs font-medium text-gray-500 mt-1">
                  {returnFlight.stops === 0 ? (
                    <span className="text-green-600">Non-stop</span>
                  ) : (
                    <span className="text-orange-500">{returnFlight.stop} stop{returnFlight.stop > 1 ? 's' : ''}</span>
                  )}
                </div>
              </div>

              {/* Return Arrival */}
              <div className="text-center flex-1">
                <div className="text-xl font-bold text-gray-900">{returnFlight.arrivalTime}</div>
                <div className="text-xs font-medium text-gray-600 mt-1">{returnFlight.arrival}</div>
              </div>
            </div>
          </>
        )}
      </CardBody>
      <Divider />
      <CardFooter className="relative flex justify-center items-center py-2">
        <div className="flex items-center justify-center text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-3 rounded-lg transition-colors duration-200 text-sm">
            {returnFlight ? 'Select Round Trip' : 'Select Flight'} → ${Number(returnFlight ? flight.price + returnFlight.price : flight.price)}
          </button>
        </div>
        {Number(passengers) > 1 && (
          <div className="text-gray-500 ml-2 justify-end text-xs">
            * ${Math.floor(Number(passengers) * Number(returnFlight ? flight.price + returnFlight.price : flight.price))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default FlightCard;
  