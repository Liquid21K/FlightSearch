'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import Login from '../(auth)/Skeleton/login/LoginPage'
import NavbarAccount from './NavBar/NavbarAccount'
import { getBookmarks } from '../../actions/getbookmarks'

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [bookmarks, setBookmarks] = useState([])
  const { data: session } = useSession()

  const refreshBookmarks = async () => {
    const data = await getBookmarks()
    if (!data.error) setBookmarks(data)
  }

  useEffect(() => {
    refreshBookmarks()
    window.addEventListener('bookmarksUpdated', refreshBookmarks)
    return () => {
      window.removeEventListener('bookmarksUpdated', refreshBookmarks)
    }
  }, [])

  return (
    <div className="relative w-full">
      {/* Sticky navbar */}
      <nav className="bg-white absolute top-0 left-0 w-full z-10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 md:px-6">
          <div className="grid grid-cols-3 items-center">
            {/* Left: Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="relative w-8 h-8">
                  <Image src="/logo.png" alt="FlightSearch Logo" fill className="object-contain" />
                </div>
                <span className="text-xl font-bold text-blue-600">FlightSearch</span>
              </Link>
            </div>
  
            {/* Center: Nav links */}
            <div className="flex justify-center space-x-6">
              <Link href="/flights" className="text-gray-600 hover:text-blue-600 transition">Flights</Link>
              <Link href="/deals" className="text-gray-600 hover:text-blue-600 transition">Deals</Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition">Contact</Link>
            </div>
  
            {/* Right: Auth section */}
            <div className="flex justify-end items-center space-x-4">
              {session ? (
                <NavbarAccount bookmarks={bookmarks} />
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
  
      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <button onClick={() => setShowLogin(false)} className="mb-4 font-bold">Close</button>
            <Login />
          </div>
        </div>
      )}
    </div>
  )
  
}

export default Navbar