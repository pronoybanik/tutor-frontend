import React from "react";
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return <footer className="bg-gray-900 text-white py-10">
  <div className="container mx-auto px-5">
    {/* Newsletter Section */}
    <div className="bg-black p-8 rounded-lg text-center mb-10">
      <h3 className="text-lg font-semibold">▶▶ GET STARTED</h3>
      <h2 className="text-3xl font-bold mt-2">Don not miss a thing - News & offers</h2>
      <p className="mt-2">Sign up for a trial lesson and experience our high-quality English courses firsthand.</p>
      <button className="mt-4 bg-green-500 text-white py-2 px-6 rounded-full">SIGN UP</button>
    </div>

    {/* Footer Links */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
      <div>
        <h3 className="text-lg font-bold">Lessons</h3>
        <ul>
          <li><Link href="#">1-on-1 Lessons</Link></li>
          <li><Link href="#">Group Class</Link></li>
          <li><Link href="#">Practice for free</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-bold">Teaching</h3>
        <ul>
          <li><Link href="#">Become a teacher</Link></li>
          <li><Link href="#">Teaching Code of Conduct</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-bold">Learning Resources</h3>
        <ul>
          <li><Link href="#">Language Test</Link></li>
          <li><Link href="#">Language Challenge</Link></li>
          <li><Link href="#">Podcasts</Link></li>
          <li><Link href="#">Quiz</Link></li>
          <li><Link href="#">Community</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-bold">Promotions</h3>
        <ul>
          <li><Link href="#">Refer a Friend</Link></li>
          <li><Link href="#">Buy a Gift Card</Link></li>
          <li><Link href="#">Affiliate Program</Link></li>
          <li><Link href="#">Partnership Program</Link></li>
        </ul>
      </div>
    </div>

    {/* Contact Info */}
    <div className="flex flex-col md:flex-row md:justify-between items-center border-t border-gray-700 pt-5">
      <div className="text-center md:text-left mb-4 md:mb-0">
        <h2 className="text-2xl font-bold">Inlingo</h2>
        <p className="text-gray-400 mt-2">Montes quisque urna molestie tincidunt aliquet quam.</p>
        <p className="text-gray-400">info@inlingo.com | 021-3456-789</p>
      </div>
      <div className="flex space-x-4">
        <FaFacebookF className="text-xl cursor-pointer" />
        <FaTwitter className="text-xl cursor-pointer" />
        <FaInstagram className="text-xl cursor-pointer" />
        <FaYoutube className="text-xl cursor-pointer" />
      </div>
    </div>

    {/* Bottom Links */}
    <div className="text-center text-gray-500 mt-6 text-sm">
      © 2025 - Inlingo. Design by ThemeWarrior | <Link href="#">About</Link> | <Link href="#">Careers</Link> | <Link href="#">Support</Link> | <Link href="#">Privacy</Link> | <Link href="#">Contact</Link>
    </div>
  </div>
</footer>;
};

export default Footer;
