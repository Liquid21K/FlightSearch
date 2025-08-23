'use client';
import { Button, Input, Textarea, Select, SelectItem } from "@heroui/react";
import { useState } from "react";

export const Categorys = [
  { key: "issues", label: "Report an Issue" },
  { key: "flights", label: "Flight Information & Schedule" },
  { key: "booking", label: "Booking & Reservations" },
  { key: "payment", label: "Payments & Refunds" },
  { key: "baggage", label: "Baggage & Lost Items" },
  { key: "checkin", label: "Check-in & Boarding" },
  { key: "cancellation", label: "Cancellations & Changes" },
  { key: "account", label: "Account & Profile Help" },
  { key: "technical", label: "Website or Technical Issue" },
  { key: "other", label: "Other Questions or Concerns" },
];

const ContactPage = () => {
  const [currentCategory , setCategory] = useState("Select Category")
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-700 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto mt-20">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
            Contact Us
          </h1>
          <p className="mt-4 text-xl text-blue-200">
            Have a question or feedback? Drop us a message below.
          </p>
        </div>

        {/* About Us Section */}
        <div className="mt-10 mb-12 bg-blue-600 bg-opacity-80 rounded-lg shadow-md p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">About Us</h2>
          <p className="text-lg">
            FlightSearch is dedicated to helping you discover the best flight deals to your dream destinations. Our mission is to make travel planning easy, affordable, and enjoyable for everyone. Whether you're booking a vacation, a business trip, or a spontaneous getaway, we're here to help you find the perfect flight.
          </p>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-xl p-8">
          <form action="#" method="POST" className="grid grid-cols-1 gap-y-6">
            <div>
              <label htmlFor="name" className="sr-only">
                Full name
              </label>
              <Input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                placeholder="Full name"
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email address"
                className="w-full"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
          <Select
            className="w-full"
            items={Categorys}
            placeholder={currentCategory}
          >
            {Categorys.map((category) => (
              <SelectItem
                key={category.key}
                value={category.key}
                onClick={() => setCategory(category.label)}
              >
                {category.label}
              </SelectItem>
            ))}
          </Select>

          <Input
            type="text"
            id="bookingNumber"
            name="bookingNumber"
            placeholder="Booking Number"
            className="w-full "
          />
        </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Your message"
                className="w-full"
              />
            </div>
            <div>
              <Button type="submit" color="primary" className="w-full">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;