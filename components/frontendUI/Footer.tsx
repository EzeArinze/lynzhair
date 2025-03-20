import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { socialLinks } from "@/utils/socialLinks";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <p className="text-gray-600 text-sm">
              Premium quality hair extensions and wigs. 100% virgin human hair
              for the most natural look and feel.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  className="text-gray-500 hover:text-pink-600 transition-colors p-2 rounded-full hover:bg-gray-100"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon size={20} />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Shop All", href: "#" },
                { name: "New Arrivals", href: "#" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-pink-600 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              {[
                { name: "Contact Us", href: "#" },
                { name: "Track Your Order", href: "#" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-pink-600 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t border-gray-200 mt-10 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <Phone size={18} className="text-pink-600" />
              <span className="text-sm">+1 (800) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Mail size={18} className="text-pink-600" />
              <span className="text-sm">support@lynzhair.com</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin size={18} className="text-pink-600" />
              <span className="text-sm">
                123 Beauty Lane, Style City, SC 12345
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} LynzHair. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <Link
                href="#"
                className="text-xs text-gray-500 hover:text-pink-600"
              >
                Privacy Policy
              </Link>
              <Link
                href="/#"
                className="text-xs text-gray-500 hover:text-pink-600"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
