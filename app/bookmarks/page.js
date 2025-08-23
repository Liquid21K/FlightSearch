"use client";
import FlightCardUser from "../components/FlightStuff/cards/FlightCardUser";
import { useSession } from "next-auth/react";
import { getBookmarks } from "../actions/getbookmarks";
import { useState, useEffect } from "react";
import SplitText from "../assets/SplitText";
import Clouds from "../assets/Clouds";

const Bookmarks = () => {
  const { data: session } = useSession();
  const [bookma, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchBookmarks = async () => {
    if (!session) return;
    const result = await getBookmarks();
    if (!result.error) {
      setBookmarks(result);
    } else {
      setBookmarks([]);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchBookmarks();
    // Listen for global bookmarks update
    const handleUpdate = () => fetchBookmarks();
    window.addEventListener("bookmarksUpdated", handleUpdate);
    return () => window.removeEventListener("bookmarksUpdated", handleUpdate);
  }, [session]);
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-700 relative">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center text-9xl text-white font-extrabold flex items-center justify-center gap-4 mt-10 py-5">
          <SplitText
            text="My Bookmarks"
            className="text-7xl font-semibold text-center p-5"
          />
        </div>
      </div>
      <div className="mt-20 flex flex-col gap-6 items-center min-h-[40vh]">
        {loading ? (
          <div>Loading bookmarks...</div>
        ) : bookma.length === 0 ? (
          <div>No bookmarks found.</div>
        ) : (
          bookma.map((bookmark) => {
            const key =
              bookmark.id ??
              `${bookmark.flightNumber}-${bookmark.departureTime}-${bookmark.arrivalTime}`;
            return (
              <div className="w-full md:w-3/4 lg:w-2/3" key={key}>
                <FlightCardUser
                  flight={{
                    airline: bookmark.airline,
                    flightNumber: bookmark.flightNumber,
                    departure: bookmark.departure,
                    arrival: bookmark.arrival,
                    departureTime: bookmark.departureTime,
                    arrivalTime: bookmark.arrivalTime,
                    price: bookmark.price,
                    stops: bookmark.stops,
                    image: bookmark.logo,
                    id: bookmark.id,
                    // Add other fields as needed
                  }}
                  passengers={1}
                />
              </div>
            );
          })
        )}
      </div>
      <Clouds />
    </div>
  );
};

export default Bookmarks;