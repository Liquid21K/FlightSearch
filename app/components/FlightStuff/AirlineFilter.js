import { useState, useEffect } from 'react';
import FlightData from './FlightData';
import AirlinePage from './AirlinePage';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Slider, Checkbox } from "@heroui/react";
import React from 'react';

const AirlineFilter = ({flights ,passengers,returnDate,OptinalFlights}) => {
  const [sortBy, setSortBy] = useState('price');
  const [selectedAirlines, setSelectedAirlines] = useState(new Set([]));
  const [selectedStops, setSelectedStops] = useState(new Set([]));
  const [priceRange, setPriceRange] = useState(1000);
  const [finalFlights, setFinalFlights] = useState([]);

  const stopCounts = flights.reduce((acc, flight) => {
    const stop = flight.stop;
    acc[stop] = (acc[stop] || 0) + 1;
    return acc;
  }, {});

  const handleStopSelection = (keys) => {
    if (keys.has("disable_all")) {
      setSelectedStops(new Set([]));
    } else if (keys.has("select_all")) {
      setSelectedStops(new Set(Object.keys(stopCounts)));
    } else {
      setSelectedStops(keys);
    }
  };

  const handleAirlineSelection = (keys) => {
    if (keys.has("disable_all")) {
      setSelectedAirlines(new Set([]));
    } else if (keys.has("select_all")) {
      setSelectedAirlines(new Set(Array.from(new Set(flights.map(flight => flight.airline)))));
    } else {
      setSelectedAirlines(keys);
    }
  };

  const sortOptions = [
    { key: "none", label: "---" },
    { key: "price-low", label: "Price: Low to High" },
    { key: "price-high", label: "Price: High to Low" },
    { key: "duration-short", label: "Duration: Shortest" },
    { key: "duration-long", label: "Duration: Longest" },
    { key: "departure-early", label: "Departure Time: Early" },
    { key: "departure-late", label: "Departure Time: Late" }
  ];

  const selectedValue = React.useMemo(
    () => Array.from(selectedAirlines).join(", ").replaceAll("_", " "),
    [selectedAirlines],
  );

  const selectedStopsValue = React.useMemo(
    () => Array.from(selectedStops).map(stop => 
      stop === '0' ? 'Non-stop' : `${stop} Stop${stop > 1 ? 's' : ''}`
    ).join(", "),
    [selectedStops],
  );

  // Memoize filtered flights to prevent unnecessary recalculations
  const filteredByAirline = React.useMemo(() => {
    return selectedAirlines.size > 0
      ? flights.filter((flight) => selectedAirlines.has(flight.airline))
      : flights;
  }, [flights, selectedAirlines]);

  useEffect(() => {
    let filtered = [...filteredByAirline];

    // Apply price filter
    filtered = filtered.filter((flight) => flight.price <= priceRange);

    // Apply stops filter
    if (selectedStops.size > 0) {
      filtered = filtered.filter((flight) => selectedStops.has(flight.stop.toString()));
    }

    // Apply sorting
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'duration-short') {
      filtered.sort((a, b) => a.duration - b.duration);
    } else if (sortBy === 'duration-long') {
      filtered.sort((a, b) => b.duration - a.duration);
    } else if (sortBy === 'departure-early') {
      filtered.sort((a, b) => a.departure - b.departure);
    } else if (sortBy === 'departure-late') {
      filtered.sort((a, b) => b.departure - a.departure);
    } else {
      filtered.sort((a, b) => a.id - b.id);
    }

    setFinalFlights(filtered);
  }, [filteredByAirline, sortBy, priceRange, selectedStops]);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 min-h-screen w-full">
      {/* Filters Sidebar */}
      <div className="w-full md:w-80 flex-shrink-0">
        <div className="bg-white rounded-2xl shadow-lg p-6 top-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Filters</h2>

          {/* Sort Options */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-700 mb-3">Sort By</h3>
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="bordered" 
                  className="w-full justify-between"
                >
                  {sortOptions.find(option => option.key === sortBy)?.label || "Select sort option"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Sort Options" 
                items={sortOptions}
                onAction={(key) => setSortBy(key)}
              >
                {(item) => (
                  <DropdownItem key={item.key}>
                    {item.label}
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* Stops Filter */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-700 mb-3">Stops</h3>
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="bordered" 
                  className="w-full capitalize"
                >
                  {selectedStopsValue || "Select Stops"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Stops selection"
                closeOnSelect={false}
                selectedKeys={selectedStops}
                selectionMode="multiple"
                variant="flat"
                onSelectionChange={handleStopSelection}
              >
                <DropdownItem key="disable_all" className="text-danger">
                  Disable All
                </DropdownItem>
                <DropdownItem key="select_all">
                  Select All
                </DropdownItem>
                {Object.entries(stopCounts).map(([stop, count]) => (
                  <DropdownItem key={stop}>
                    {stop === '0' ? 'Non-stop' : `${stop} Stop${stop > 1 ? 's' : ''}`}
                    <span className="ml-2 text-gray-500 text-sm">({count})</span>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* Airlines Filter */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-700 mb-3">Airlines</h3>
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="bordered" 
                  className="w-full capitalize"
                >
                  {selectedValue || "Select Airlines"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Airlines selection"
                closeOnSelect={false}
                selectedKeys={selectedAirlines}
                selectionMode="multiple"
                variant="flat"
                onSelectionChange={handleAirlineSelection}
              >
                <DropdownItem key="disable_all" className="text-danger">
                  Disable All
                </DropdownItem>
                <DropdownItem key="select_all">
                  Select All
                </DropdownItem>
                {Array.from(new Set(flights.map(flight => flight.airline))).map((airline) => (
                  <DropdownItem key={airline}>
                    {airline}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Price Range</h3>
            <div className="space-y-4">
              <Slider
                size="sm"
                step={10}
                maxValue={1000}
                minValue={0}
                value={priceRange}
                onChange={setPriceRange}
                className="max-w-md"
                renderThumb={(props) => (
                  <div
                    {...props}
                    className="group p-1 top-1/2 bg-white border border-gray-200 shadow-lg rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                  >
                    <span className="transition-transform bg-blue-500 rounded-full w-3 h-3 block group-data-[dragging=true]:scale-80" />
                  </div>
                )}
              />
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">$0</span>
                <span className="text-sm font-medium text-blue-600">${priceRange}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 ">
              <span className="text-2xl font-bold text-gray-900">{finalFlights.length}</span>
              <span className="text-gray-600">flights found</span>
            </div>
            {(selectedAirlines.size > 0 || selectedStops.size > 0) && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 ml-5"> Filtered by:</span>
                <div className="flex flex-wrap gap-2">
                  {Array.from(selectedAirlines).map((airline) => (
                    <span key={airline} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {airline}
                    </span>
                  ))}
                  {Array.from(selectedStops).map((stop) => (
                    <span key={stop} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {stop === '0' ? 'Non-stop' : `${stop} Stop${stop > 1 ? 's' : ''}`}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <AirlinePage flights={finalFlights} selectedStops={selectedStops} passengers={passengers} returnDate={returnDate} OptinalFlights={OptinalFlights} />
        </div>
      </div>
    </div>
  );
};

export default AirlineFilter;


