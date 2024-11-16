import React from "react";
import { FaInstagram, FaFacebook, FaGithub } from "react-icons/fa";
import Logo from "../assets/image 5.png";

const Footer = () => {
  return (
    <footer className="bg-[#0B2239] text-white py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Website Link */}
          <div className="flex items-center space-x-4 mb-6 md:mb-0">
            <img
              src={Logo} // Ganti dengan path logo kamu
              alt="RPLSMART Logo"
              className="w-16 h-16"
            />
            <div>
              <p className="text-lg font-semibold">RPLSMART</p>
              <p>Kunjungi website kami</p>
              <a
                href="rplsmart.sinaukode.my.id"
                className="text-orange-500 font-semibold hover:underline"
              >
                RPLSMART.COM
              </a>
            </div>
          </div>

          {/* Center Message */}
          <div className="text-center mb-6 md:mb-0">
            <p className="text-2xl font-semibold mb-4">
              “ Sukses bersama Pameran Rpl 2024 “
            </p>

            {/* Divider kiri, teks, dan divider kanan */}
            <div className="flex items-center space-x-2">
              <div className="flex-1 h-[1px] bg-orange-500"></div>
              <p className="text-sm whitespace-nowrap">
              &copy; 2024 REYHANSYAH. All Rights Reserved.
              </p>
              <div className="flex-1 h-[1px] bg-orange-500"></div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-center">
            <div className="flex space-x-4 text-2xl mb-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className=" text-orange-500 hover:text-orange-600"
              >
                <FaInstagram />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className=" text-orange-500 hover:text-orange-600"
              >
                <FaFacebook />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className=" text-orange-500 hover:text-orange-600"
              >
                <FaGithub />
              </a>
            </div>

            {/* Divider dan teks "Kunjungi juga media sosial kami" */}
            <div className="flex items-center mt-4 w-full">
              <p className="text-sm whitespace-nowrap font-semibold mr-2">
                Kunjungi juga media sosial kami
              </p>
              {/* Divider */}
              <div className="flex-1 h-[1px] bg-orange-500 min-w-[30px]"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
