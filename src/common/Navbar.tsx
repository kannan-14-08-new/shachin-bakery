"use client"
import Link from "next/link";
import { useState } from "react";

// Import icons (you'd typically use 'react-icons' or similar)
// For simplicity, we'll use a standard SVG for the hamburger icon.

const navItems = [
  { name: "Home", href: "/" },
  { name: "Cakes & Treats", href: "/menu" },
  { name: "Custom Orders", href: "/custom" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the mobile menu state
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="shadow-lg bg-white sticky top-0 z-50 m-5 rounded-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        {/* Logo/Brand Name */}
        <Link
          href="/"
          className="text-2xl text-pink-600 transition duration-300 hover:text-pink-700 tracking-wider"
        >
          Sweet Delights
        </Link>

        {/* Desktop Navigation Links (Hidden on mobile) */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-lg font-medium text-gray-700 group hover:text-pink-600 transition duration-300"
            >
              {item.name}
              {/* Animation: Animated Underline */}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button (Hidden on desktop) */}
        <button
          className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {/* Hamburger Icon / Close Icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              // Close X icon
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              // Hamburger icon
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu (Animated Dropdown) */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-white`}
      >
        <nav className="pb-4 pt-2 border-t border-gray-100">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition duration-150"
              onClick={() => setIsOpen(false)} // Close menu after clicking
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
