'use client'

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { getBookmarks } from '../../../actions/getbookmarks';
import { bookmarkFlight } from '../../../actions/bookmark';
import { unbookmarkFlight } from '../../../actions/unbookmark';
import { Button } from "@heroui/react";

export default function BookmarkButton({ flight }) {
  const { data: session } = useSession();
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const hasValidId = flight && (typeof flight.id === 'number' || typeof flight.id === 'string') && flight.id !== '' && flight.id !== undefined && flight.id !== null;
  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!session) return;

      const bookmarks = await getBookmarks();
      if (bookmarks.error) return;
      const isBookmarked = bookmarks.some((b) => b.id === flight.id);
      setBookmarked(isBookmarked);
    };

    fetchBookmarks();

    // Listen for global bookmarks update
    const handleUpdate = () => fetchBookmarks();
    window.addEventListener('bookmarksUpdated', handleUpdate);
    return () => window.removeEventListener('bookmarksUpdated', handleUpdate);
  }, [session, flight.id]);

  const handleBookmark = async () => {
    setLoading(true)
    if (!session) {
      console.error('User not logged in');
      setLoading(false);
      return;
    }
    if (!hasValidId) {
      console.error('Invalid flight ID');
      setLoading(false);
      return;
    }

    try {
      let result;
      if (bookmarked) {
        result = await unbookmarkFlight(flight);
      } else {
        result = await bookmarkFlight(flight);
      }

      if (result.error) {
        console.error(result.error);
      } else {
        setBookmarked(!bookmarked);
        window.dispatchEvent(new CustomEvent('bookmarksUpdated'));
      }
    } catch (error) {
      console.error('Error handling bookmark:', error);
    }
    setLoading(false)
  };

  return (
    <Button
      onClick={handleBookmark}
      isLoading={loading}
      color={bookmarked ? "warning" : "primary"}
      className="w-10 h-10"
      disabled={!hasValidId}
      title={!hasValidId ? 'Cannot bookmark/unbookmark: Invalid flight ID' : ''}
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
      {bookmarked ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 4a2 2 0 00-2 2v14l8-5.333L20 20V6a2 2 0 00-2-2H6z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 4a2 2 0 00-2 2v14l8-5.333L20 20V6a2 2 0 00-2-2H6z" />
        </svg>
      )}
    </Button>
  );
}
