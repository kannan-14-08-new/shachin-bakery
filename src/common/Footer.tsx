// components/Footer.tsx
import Image from "next/image";
import { JSX } from "react";
import {
  FaFacebookF,
  FaPinterestP,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";

interface RecentItem {
  image: string;
  date: string;
  title: string;
}

interface SocialLink {
  icon: JSX.Element;
  href: string;
  label: string;
}

interface ExploreLink {
  title: string;
  href: string;
}

export default function Footer() {
  const recentData: RecentItem[] = [
    {
      image: "/cake-images/IMG-20250925-WA0095.jpg",
      date: "June 14,2024",
      title: "Puff pastry bliss.",
    },
    {
      image: "/cake-images/IMG-20250925-WA0097.jpg",
      date: "July 12,2024",
      title: "Black Forest",
    },
  ];

  const socialLinks: SocialLink[] = [
    { icon: <FaFacebookF size={35}/>, href: "#", label: "Facebook" },
    { icon: <FaPinterestP size={35}/>, href: "#", label: "Pinterest" },
    { icon: <FaWhatsapp size={35}/>, href: "#", label: "WhatsApp" },
    { icon: <FaInstagram size={35}/>, href: "#", label: "Instagram" },
  ];

  const exploreLinks: ExploreLink[] = [
    { title: "Home", href: "#" },
    { title: "Blog", href: "#" },
    { title: "Contact us", href: "#" },
    { title: "Services", href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-[#e0b289] py-10 px-5">
      <div className="container mx-auto px-6 md:px-0 grid grid-cols-1 md:grid-cols-4 gap-10 items-center">
        {/* Logo & Social */}
        <div className="flex flex-col items-center gap-3">
          <Image
            src="/cake-images/logo-2.png"
            alt="logo"
            width={150}
            height={40}
          />
          <div className="flex space-x-7 items-center">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                aria-label={social.label}
                className="hover:text-white cursor-pointer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* About Us */}
        <div className="flex flex-col space-y-2">
          <h3 className="font-bold text-lg">About Us</h3>
          <p>(456) 789-12301</p>
          <p>info@modrino.co.uk</p>
          <p>South 13th street</p>
          <p>New York, America</p>
        </div>

        {/* Explore */}
        <div className="flex flex-col space-y-2">
          <h3 className="font-bold text-lg">Explore</h3>
          {exploreLinks.map((link, idx) => (
            <a key={idx} href={link.href} className="hover:text-white">
              {link.title}
            </a>
          ))}
        </div>

        {/* Recent News */}
        <div className="flex flex-col space-y-3">
          <h3 className="font-bold text-lg">Recent Collection</h3>
          {recentData.map((item, idx) => (
            <div key={idx} className="flex space-x-3">
              <Image
                src={item.image}
                alt={item.title}
                width={60}
                height={60}
                className="object-cover rounded"
              />
              <div>
                <p className="text-sm text-[#d9b287]">{item.date}</p>
                <p className="text-white">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 text-center text-gray-400">
        © 2025 Shachin Bakery. All rights reserved
      </div>
    </footer>
  );
}
