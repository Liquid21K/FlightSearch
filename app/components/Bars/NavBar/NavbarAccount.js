

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import {
  Bars3Icon,
  BookmarkIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

import NavbarBookmark from './NavbarBookmark';
import AnimatedContent from '../../../assets/AnimatedContent';


export default function NavbarAccount ({bookmarks}) {
  const [bookmarksCount, setBookmarksCount] = useState(bookmarks.length);
  useEffect(() => {
    setBookmarksCount(bookmarks.length);
  }, [bookmarks]);
  const { data: session } = useSession();
  
  return (
    <>
    {session && (
      
   
    <div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        {/* Bookmark dropdown */}
        <Menu as="div" className="relative ml-3">
          <MenuButton
            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none
              focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span className="sr-only">Open bookmarks menu</span>
            <BookmarkIcon className="w-5 h-5" aria-hidden="true" />
            <span>
              <div >{bookmarks.length != null && bookmarks.length <= 99  ? (
                  <AnimatedContent
                    distance={150}
                    key={bookmarks.length}
                    direction="vertical"
                    reverse={false}
                    
                    config={{ tension: 100, friction: 18 }}
                    initialOpacity={1.0}
                    animateOpacity
                    scale={1.1}
                    threshold={0.2}
                  >
                    <div className="absolute -top-1 -right-1 text-xs bg-red-600 text-white rounded-full px-1"> {bookmarks.length}</div>
                  </AnimatedContent>
                ) : (
                  <div className="absolute top-3/4 -right-1 text-xs bg-red-600 text-white rounded-full px-1">99+</div>
                )}
              </div>
            </span>
          </MenuButton>

          <MenuItems
            className="absolute right-0 z-10 mt-4 w-72 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5
              focus:outline-none"
          >
            <NavbarBookmark bookmarks={bookmarks} />
            
          </MenuItems>
        </Menu>

        {/* User menu */}
        <Menu as="div" className="relative ml-3">
          <div>
            <MenuButton className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white-800 ">
              <span className="sr-only">Open user menu</span>
              <img
                src={session.user?.image}
                alt="User avatar"
                className="w-6 h-6 rounded-full"
              />
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5
            transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0
            data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            <MenuItem>
              <Link
                href="Profile"
                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
              >
                Your Profile
              </Link>
            </MenuItem>
            {session.user?.isAdmin === "admin" && 
            
            <MenuItem>
              <Link
                href="Dashboard"
                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
              >
                Admin Dashboard
              </Link>
            </MenuItem>
            }
            <MenuItem>
              <Link
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
              >
                Settings
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href="/"
                onClick={() => signOut()}
                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
              >
                Sign out
              </Link>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
     )}
    </>
  );
};

