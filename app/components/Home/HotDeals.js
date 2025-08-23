import { useState, useEffect } from 'react';
import {
  Card,
  CardFooter,
  Image,
  Button,
  Select,
  SelectItem,
  Skeleton
} from "@heroui/react";
import { useRouter } from 'next/navigation';

const DealCardSkeleton = () => (
  <Card isFooterBlurred radius="lg" className="relative overflow-hidden">
    <Skeleton className="w-full h-64" />
    <CardFooter className="flex justify-between items-center bg-black/20 backdrop-blur-sm py-2 absolute bottom-0 w-full z-10">
      <div className="flex items-center gap-2">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-20 rounded-md" />
          <Skeleton className="h-3 w-32 rounded-md" />
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>
      </div>
      <Skeleton className="h-8 w-24 rounded-lg" />
    </CardFooter>
  </Card>
);

export default function HotDeals() {
  const router = useRouter();
  const [deals, setDeals] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [airports, setAirports] = useState([]);

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

  const fetchLocationByIP = async () => {
    try {
      const res = await fetch('https://ipapi.co/json/');
      const data = await res.json();
      setCity(data.country || 'Unknown');
      setCountry(data.country_name)
    } catch (err) {
      console.error('❌ IP location fetch error:', err);
      setCity('Unknown');
    }
  };

  const fetchAirports = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/airports');
      const data = await res.json();
      const filteredAirports = data.filter(airport => airport.country === city);
      setAirports(filteredAirports);
    } catch (err) {
      console.error('Error loading airports:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDeals = async () => {
    setIsLoading(true);
    try {
      const origin = airports[0]?.iata || ''; // Fallback to first airport's IATA code if exists
      const res = await fetch(`/api/flights?origin=${origin}`);
      const data = await res.json();

      const filteredDeals = data
        .filter(deal => {
          const dealMonth = new Date(deal.departure).getMonth() + 1;
          return dealMonth === selectedMonth;
        })
        .sort((a, b) => a.price - b.price)
        .slice(0, 3);

      setDeals(filteredDeals);
    } catch (err) {
      console.error('Error loading deals:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLocationByIP();
  }, []);

  useEffect(() => {
    if (city) fetchAirports();
  }, [city]);

  useEffect(() => {
    if (airports.length > 0) fetchDeals();
  }, [selectedMonth, airports]);

  const handleBooking = (deal) => {
  
    console.log(deal)

    const searchParams = new URLSearchParams({
      from: deal.originCity,
      fromIATA: deal.origin,
      to: deal.destinationCity,
      toIATA: deal.destination,
      departDate: deal.departure,
      returnDate: deal.arrival,
      passengers: 1
    });

    router.push(`/search?${searchParams.toString()}`);
    
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-slate-100 rounded-sm shadow-sm">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Current hot deals from {country || "Unknown"}!</h1>
        <div className="flex justify-center">
          <Select
            selectedKeys={[selectedMonth.toString()]}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="max-w-xs"
          >
            {months.map((month) => (
              <SelectItem key={month.value} value={month.value}>
                {month.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <>
            <DealCardSkeleton />
            <DealCardSkeleton />
            <DealCardSkeleton />
          </>
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
                  onClick={() => handleBooking(deal) }
                >
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600">
            No deals found for this month.
          </div>
        )}
      </div>
    </div>
  );
}
