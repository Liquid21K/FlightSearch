'use client';

import { useState, useEffect } from 'react';
import { Autocomplete, AutocompleteItem, Select, SelectItem, Card, CardFooter, Image, Button } from "@heroui/react";
import DarkClouds from '../assets/FooterCloud';

const DealsPage = () => {
  const [departureCity, setDepartureCity] = useState('');
  const [departureIATA, setDepartureIATA] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [sortBy, setSortBy] = useState('price'); // 'price' or 'duration'

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const res = await fetch('/api/airports');
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error('Error loading airports:', err);
      }
    };
    fetchAirports();
  }, []);

  const handleCitySelect = async (airport) => {
    setDepartureCity(`${airport.name} (${airport.iata})`);
    setDepartureIATA(airport.iata);
    setSelectedFrom(airport.iata);
    await fetchDeals(airport.iata);
  };

  const fetchDeals = async (origin) => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams({
        origin: origin || '',
      }).toString();

      const res = await fetch(`/api/flights?${query}`);
      const data = await res.json();
      
      // Filter deals for the selected month and sort
      const filteredDeals = data
        .filter(deal => {
          const dealMonth = new Date(deal.departure).getMonth() + 1;
          return dealMonth === selectedMonth;
        })
        .sort((a, b) => {
          if (sortBy === 'price') {
            return a.price - b.price;
          } else {
            return a.flightDuration - b.flightDuration;
          }
        });

      setDeals(filteredDeals);
    } catch (err) {
      console.error('Error loading deals:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSuggestions = suggestions.filter((airport) =>
    airport.name.toLowerCase().includes(departureCity.toLowerCase()) ||
    airport.iata.toLowerCase().includes(departureCity.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDuration = (duration) => {
    const hours = Math.floor(duration);
    const minutes = Math.round((duration - hours) * 60);
    return `${hours}h ${minutes}m`;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white-500 to-white-700 relative">
      <div className="container mx-auto px-4 py-8 rounded-lg mt-10">
        <div className="flex flex-col items-center justify-center my-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Explore Travel Deals</h1>
          <p className="text-gray-600 mb-4">Find the best flight deals from your preferred departure city</p>
          <div className="flex flex-row items-center justify-center gap-4 w-full max-w-xl">
            <Autocomplete
              className="w-full"
              items={filteredSuggestions}
              inputValue={departureCity}
              selectedKey={selectedFrom}
              label="Departure City"
              placeholder="Search departure city"
              onInputChange={(value) => {
                setDepartureCity(value);
                setSelectedFrom(null);
              }}
              onSelectionChange={(key) => {
                const selectedAirport = suggestions.find(airport => airport.iata === key);
                if (selectedAirport) {
                  handleCitySelect(selectedAirport);
                }
              }}
            >
              {(airport) => (
                <AutocompleteItem key={airport.iata}>
                  {airport.name} ({airport.iata})
                </AutocompleteItem>
              )}
            </Autocomplete>
          </div>
          <div className="flex gap-4 mt-4">
            <Select
              selectedKeys={[selectedMonth.toString()]}
              onChange={(e) => {
                setSelectedMonth(Number(e.target.value));
                if (departureIATA) {
                  fetchDeals(departureIATA);
                }
              }}
              className="w-28"
            >
              {months.map((month) => (
                <SelectItem className='w-52 ' key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="flex justify-center items-center w-full col-span-full py-8">
              <Button
                isLoading
                color="secondary"
                spinner={
                  <svg
                    className="animate-spin h-5 w-5 text-current"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      fill="currentColor"
                    />
                  </svg>
                }
              >
                Loading
              </Button>
            </div>
          ) : deals.length > 0 ? (
            deals.map((deal, index) => (
              <Card key={index} isFooterBlurred radius="lg" className="relative overflow-hidden">
                <div className="w-full h-64 overflow-hidden">
                <Image
                  alt={`Flight to ${deal.destinationCity}`}
                  src={deal.image || "https://heroui.com/images/hero-card.jpeg"}
                  className="w-full h-full object-cover"
                />
                </div>
                <CardFooter className="flex justify-between items-center bg-black/20 backdrop-blur-sm py-2 absolute bottom-0 w-full z-10">
                <div className="flex items-center gap-2">
                  <Image
                    alt={`${deal.airline} logo`}
                    className="object-cover rounded-full"
                    height={40}
                    width={40}
                    src={deal.image || "https://heroui.com/images/hero-card.jpeg"}
                  />
                  <div className="flex flex-col text-white">
                    <p className="text-xs">{deal.airline}</p>
                    <p className="text-xs">{deal.originCity} → {deal.destinationCity}</p>
                    <p className="text-xs font-semibold">${deal.price}</p>
                  </div>
                </div>
                <Button
                  className="text-xs text-white bg-black/30 hover:bg-black/50"
                  color="default"
                  radius="lg"
                  size="sm"
                  variant="flat"
                >
                  Book Now
                </Button>
              </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600">
              {departureIATA ? 'No deals found for this city and month' : 'Select a departure city to see deals'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DealsPage;


