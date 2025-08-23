import { useEffect, useState } from 'react';

const FlightData = (flightsData) => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      if (flightsData) {
        setFlights(flightsData);
      } else {
        const flight = [
          {
            id: 1,
            airline: 'Israel Airways',
            flightNumber: 'IA101',
            departure: 'Tel Aviv (TLV)',
            arrival: 'New York (JFK)',
            departureTime: '8:00 AM',
            arrivalTime: '2:00 PM',
            dof: '2025-05-26',
            duration: '12h',
            price: 780,
            checked: true,
            stops: 0,
            logo: ''
          },
          {
            id: 2,
            airline: 'British Airways',
            flightNumber: 'BA172',
            departure: 'London (LHR)',
            arrival: 'Dubai (DXB)',
            departureTime: '2:15 PM',
            arrivalTime: '12:30 AM',
            dof: '2025-06-01',
            duration: '7h 15m',
            price: 380,
            checked: true,
            stops: 2,
            logo: ''
          },
          {
            id: 3,
            airline: 'Qatar Airways',
            flightNumber: 'QR328',
            departure: 'Doha (DOH)',
            arrival: 'Sydney (SYD)',
            departureTime: '9:00 AM',
            arrivalTime: '7:15 PM',
            duration: '15h 30m',
            dof: '2025-06-01',
            price: 950,
            checked: true,
            stops: 3,
            logo: ''
          },
          {
            id: 4,
            airline: 'Emirates',
            flightNumber: 'EK202',
            departure: 'Dubai (DXB)',
            arrival: 'New York (JFK)',
            departureTime: '8:30 AM',
            arrivalTime: '2:50 PM',
            duration: '14h 20m',
            dof: '2025-06-01',
            price: 1100,
            checked: true,
            stops: 0,
            logo: ''
          },
          {
            id: 5,
            airline: 'Lufthansa',
            flightNumber: 'LH456',
            departure: 'Frankfurt (FRA)',
            arrival: 'Los Angeles (LAX)',
            departureTime: '10:00 AM',
            arrivalTime: '1:30 PM',
            duration: '11h 30m',
            dof: '2025-06-01',
            price: 890,
            checked: true,
            stops: 0,
            logo: ''
          },
          {
            id: 6,
            airline: 'Air France',
            flightNumber: 'AF66',
            departure: 'Paris (CDG)',
            arrival: 'San Francisco (SFO)',
            departureTime: '1:00 PM',
            arrivalTime: '3:30 PM',
            duration: '11h 30m',
            dof: '2025-06-01',
            price: 860,
            checked: true,
            stops: 1,
            logo: ''
          },
          {
            id: 7,
            airline: 'KLM',
            flightNumber: 'KL601',
            departure: 'Amsterdam (AMS)',
            arrival: 'Los Angeles (LAX)',
            departureTime: '9:45 AM',
            arrivalTime: '12:10 PM',
            duration: '11h 25m',
            dof: '2025-06-01',
            price: 875,
            checked: true,
            stops: 0,
            logo: ''
          },
          {
            id: 8,
            airline: 'Delta Airlines',
            flightNumber: 'DL200',
            departure: 'Atlanta (ATL)',
            arrival: 'Tokyo (NRT)',
            departureTime: '10:00 AM',
            arrivalTime: '3:00 PM',
            duration: '14h',
            dof: '2025-06-01',
            price: 970,
            checked: true,
            stops: 1,
            logo: ''
          },
          {
            id: 9,
            airline: 'United Airlines',
            flightNumber: 'UA881',
            departure: 'San Francisco (SFO)',
            arrival: 'Osaka (KIX)',
            departureTime: '1:00 PM',
            arrivalTime: '5:00 PM',
            duration: '13h',
            dof: '2025-06-01',
            price: 940,
            checked: true,
            stops: 1,
            logo: ''
          },
          {
            id: 10,
            airline: 'American Airlines',
            flightNumber: 'AA180',
            departure: 'Dallas (DFW)',
            arrival: 'London (LHR)',
            departureTime: '5:00 PM',
            arrivalTime: '8:00 AM',
            duration: '9h',
            dof: '2025-06-01',
            price: 810,
            checked: true,
            stops: 0,
            logo: ''
          },
        ];

        setFlights(flight);
      }
    };

    fetchFlights();
  }, [flightsData]);

  return flights;
};

export default FlightData;
