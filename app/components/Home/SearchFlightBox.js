'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import ShinyText from '../../assets/ShinyText';
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import LoadingCircle from '../LoadingCircle';
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { DatePicker } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import { Button, Checkbox } from "@heroui/react";

const SearchFlightBox = () => {
  const router = useRouter();

  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const [showLoading, setLoading] = useState(false);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0
  });

  const [fromQuery, setFromQuery] = useState('');
  const [toQuery, setToQuery] = useState('');
  const [departureCity, setDepartureCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [departureIATA, setDepartureIATA] = useState('');
  const [destinationIATA, setDestinationIATA] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);

  // Date states
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [showReturnDate, setShowReturnDate] = useState(false);

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/airports');
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error('Error loading airports:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAirports();
  }, []);

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  const handlePassengerChange = (type, op) => {
    setPassengers(prev => {
      const updated = { ...prev };
      if (op === 'add') updated[type]++;
      else if (op === 'subtract' && updated[type] > 0) updated[type]--;
      if (type === 'adults' && updated.adults < 1) updated.adults = 1;
      return updated;
    });
  };

  const handleCitySelect = (airport, type) => {
    const cityText = `${airport.name} (${airport.iata})`;
    if (type === 'from') {
      setDepartureCity(cityText);
      setDepartureIATA(airport.iata);
      setFromQuery(cityText);
      setSelectedFrom(airport.iata);
    } else {
      setDestinationCity(cityText);
      setDestinationIATA(airport.iata);
      setToQuery(cityText);
      setSelectedTo(airport.iata);
    }
  };

  const handleReturn = () => {
    setShowReturnDate(!showReturnDate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const departDateString = departureDate ? departureDate.toString() : '';
    const returnDateString = returnDate ? returnDate.toString() : '';

    const todayDate = parseDate(new Date().toISOString().split('T')[0]);

    if (!departureDate || (!showReturnDate && !returnDate)) {
      alert('Please select both departure and return dates.');
      return;
    }

    if (!showReturnDate && departureDate.compare(returnDate) >= 0) {
      alert('Departure date must be before return date');
      return;
    }

    if (departureDate.compare(todayDate) < 0) {
      alert('Departure date must be today or later');
      return;
    }

    if (!departureIATA || !destinationIATA) {
      alert('Please select valid departure and destination airports.');
      return;
    }

    const searchParams = new URLSearchParams({
      from: departureCity,
      fromIATA: departureIATA,
      to: destinationCity,
      toIATA: destinationIATA,
      departDate: departDateString,
      returnDate: returnDateString,
      passengers: totalPassengers.toString()
    });

    router.push(`/search?${searchParams.toString()}`);
  };

  return (
    <>
      {showLoading ? (
        <LoadingCircle />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 relative z-40">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* From */}
              <div className="space-y-2 relative">
                <label className="block text-sm font-medium text-gray-700">Departure</label>
                <Autocomplete
                  className="w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  items={suggestions.filter(airport =>
                    airport.name.toLowerCase().includes(fromQuery.toLowerCase()) ||
                    airport.iata.toLowerCase().includes(fromQuery.toLowerCase())
                  )}
                  inputValue={fromQuery}
                  selectedKey={selectedFrom}
                  placeholder="Search"
                  onInputChange={(value) => {
                    setFromQuery(value);
                    setSelectedFrom(null);
                    setDepartureCity(value);
                    setDepartureIATA('');
                  }}
                  onSelectionChange={(key) => {
                    const selectedAirport = suggestions.find(airport => airport.iata === key);
                    if (selectedAirport) {
                      handleCitySelect(selectedAirport, 'from');
                      setFromQuery(`${selectedAirport.name} (${selectedAirport.iata})`);
                    }
                    setSelectedFrom(key);
                  }}
                >
                  {(airport) => (
                    <AutocompleteItem
                      key={airport.iata}
                      title={`${airport.name}`}
                      description={`(${airport.iata})`}
                      itemClasses={{
                        wrapper: "py-1",
                        title: "mb-1",
                        description: "mt-1",
                      }}
                    />
                  )}
                </Autocomplete>
              </div>

              {/* To */}
              <div className="space-y-2 relative">
                <label className="block text-sm font-medium text-gray-700">Destination</label>
                <Autocomplete
                  className="w-full"
                  items={suggestions.filter(airport =>
                    airport.name.toLowerCase().includes(toQuery.toLowerCase()) ||
                    airport.iata.toLowerCase().includes(toQuery.toLowerCase())
                  )}
                  inputValue={toQuery}
                  selectedKey={selectedTo}
                  placeholder="Search"
                  isDisabled={!departureIATA}
                  onInputChange={(value) => {
                    setToQuery(value);
                    setSelectedTo(null);
                    setDestinationCity(value);
                    setDestinationIATA('');
                  }}
                  onSelectionChange={(key) => {
                    const selectedAirport = suggestions.find(airport => airport.iata === key);
                    if (selectedAirport) {
                      handleCitySelect(selectedAirport, 'to');
                      setToQuery(`${selectedAirport.name} (${selectedAirport.iata})`);
                    }
                    setSelectedTo(key);
                  }}
                >
                  {(airport) => (
                    <AutocompleteItem
                      key={airport.iata}
                      title={airport.name}
                      description={`(${airport.iata})`}
                      itemClasses={{
                        wrapper: "py-1",
                        title: "mb-1",
                        description: "mt-1",
                      }}
                    />
                  )}
                </Autocomplete>
              </div>

              {/* Departure Date */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Departure Date</label>
                <DatePicker
                  placeholder="Select Date"
                  value={departureDate}
                  onChange={setDepartureDate}
                  isRequired
                  className="w-full"
                />
              </div>

              {/* Return Date */}
              {!showReturnDate && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Return Date</label>
                  <DatePicker
                    placeholder="Select Date"
                    value={returnDate}
                    onChange={setReturnDate}
                    isRequired
                    className="w-full"
                  />
                </div>
              )}

              {/* Passengers */}
              <div className="space-y-2 relative">
                <label className="block text-sm font-medium text-gray-700">Passengers</label>
                <Popover placement="bottom right">
                  <PopoverTrigger>
                    <Button
                      type="button"
                      className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-200 text-left"
                    >
                      {totalPassengers} Passenger{totalPassengers !== 1 ? 's' : ''}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-4 py-3 w-48">
                      {['adults', 'children', 'infants'].map((type) => (
                        <div key={type} className="mb-3">
                          <div className="flex items-center justify-between">
                            <p className="text-sm capitalize">
                              {type}{' '}
                              <span className="text-xs text-gray-500">
                                {type === 'adults' ? '13+' : type === 'children' ? '2-12' : '<2'}
                              </span>
                            </p>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => handlePassengerChange(type, 'subtract')}
                                className="w-6 h-6 border border-gray-300 rounded-full text-sm hover:bg-gray-100"
                              >
                                -
                              </button>
                              <span className="w-4 text-center text-sm">{passengers[type]}</span>
                              <button
                                type="button"
                                onClick={() => handlePassengerChange(type, 'add')}
                                className="w-6 h-6 border border-gray-300 rounded-full text-sm hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Submit & One-Way Checkbox */}
            <div className="mt-6 relative flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm"
              >
                <ShinyText
                  text="Search Flights"
                  disabled={false}
                  speed={3}
                  className="text-white"
                />
              </button>
              <label className="absolute right-0 flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer rounded-full px-3 py-1 transition-colors duration-200">
                <Checkbox defaultSelected={false} onChange={handleReturn} radius="full" className="mr-2 rounded-lg" size="sm" color="primary" />
                One Way
              </label>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default SearchFlightBox;
