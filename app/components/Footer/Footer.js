import React from 'react';
import Link from 'next/link';
import { Button } from "@heroui/react";

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] text-white border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              DarkCloud
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted partner in finding the best flight deals and travel experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-200">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  Deals
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-200">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/flights" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  Flight Search
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  Hotel Booking
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  Travel Packages
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-200">Stay Updated</h3>
            <p className="text-gray-400 text-sm">
              Subscribe to our newsletter for the latest deals and travel tips.
            </p>
            <div className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg bg-[#1a1a1a] text-white border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              />
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/20"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} DarkCloud. All rights reserved.
            </p>
            <div className="flex space-x-8">
              <Link href="/privacy" className="text-gray-500 hover:text-blue-400 text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-blue-400 text-sm transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-500 hover:text-blue-400 text-sm transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 