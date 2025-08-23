'use client';

import { useEffect, useState } from 'react';
import { MenuItem } from '@headlessui/react';
import Link from 'next/link';
import { getBookmarks } from '../../../actions/getbookmarks';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import {
  useDisclosure,
} from '@heroui/react';
import Bookmark from '../../Bookmark'; // the modal component

export default function NavbarBookmark() {
  const { data: session } = useSession();
  const [bookmarks, setBookmarks] = useState([]);
  const [selectedBookmark, setSelectedBookmark] = useState(null);
  const router = useRouter()
  const {
    isOpen: isOpenBookmark,
    onOpen: onOpenBookmark,
    onOpenChange: onOpenChangeBookmark,
  } = useDisclosure();

  const fetchBookmarks = async () => {
    if (!session) return;
    const result = await getBookmarks();
    if (!result.error) {
      setBookmarks(result);
    }
  };

  useEffect(() => {
    fetchBookmarks();

    const handleBookmarksUpdate = () => {
      fetchBookmarks();
    };

    window.addEventListener('bookmarksUpdated', handleBookmarksUpdate);
    return () => {
      window.removeEventListener('bookmarksUpdated', handleBookmarksUpdate);
    };
  }, [session]);

  const handleClick = (bookmark) => {
    setSelectedBookmark(bookmark);
  };

  const handleModalClose = () => {
    setSelectedBookmark(null);
    onOpenChangeBookmark(false);
  };

  return (
    <>
      {bookmarks.length > 0 &&
        bookmarks.map((bookmark) => (
          <MenuItem key={bookmark.id}>
            {({ active }) => (
              <div
              className={`flex items-center px-4 py-2 text-sm cursor-pointer ${
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
              }`}
              onClick={() => {
                if (active) {
                  router.push("bookmarks")
                } else {
                  console.log('xx');
                }
              }}
            >
                <img
                  className="w-8 h-8 rounded-full shrink-0"
                  src={bookmark.airline_logo}
                  alt={bookmark.airline}
                />
                <div  className="flex-1 min-w-0 ml-3">
                  <p className="font-medium truncate">
                    {bookmark.airline} {bookmark.flightNumber}
                  </p>
                  {bookmark.departure && new Date(bookmark.departure) < new Date() ? (
                    <p className="text-xs text-red-500 truncate">
                      EXPIRED {bookmark.departure}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500 truncate">
                      {bookmark.departure} {bookmark.departureTime}
                    </p>
                  )}
                </div>
                <div className="ml-3 text-sm font-semibold text-gray-900">
                  ${bookmark.price}
                </div>
              </div>
            )}
          </MenuItem>
        ))}

      {bookmarks.length === 0 && (
        <MenuItem>
          <div className="px-4 py-2 text-sm text-gray-700">No bookmarks</div>
        </MenuItem>
      )}

      <MenuItem>
        {({ active }) => (
          <Link
            href="/bookmarks"
            className={`block px-4 py-2 text-sm ${
              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
            }`}
          >
            View all bookmarks
          </Link>
        )}
      </MenuItem>
    </>
  );
}
