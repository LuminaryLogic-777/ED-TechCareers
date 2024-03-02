import React, { useState } from "react";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
// import { Link } from "react-router-dom";
import ContactUsModal from "./../pages/ContactUsModal";

const Footer = () => {
  const [openContactUs, setOpenContactUs] = useState(false);

  return (
    <div className="bg-theme">
      <div className="2xl:container mx-auto 2xl:px-5 lg:px-24 sm:px-12 px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 space-y-10 md:space-y-0 pt-20 md:pt-12 pb-8">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col">
              <a href="/">
                <img
                  src="/logos/Logo_t_white_64.png"
                  className="w-36"
                  alt="LogoWhite"
                />
              </a>
              <p className="font-base text-white text-md mx-3">
                Explore the Limits
              </p>
              <p className="font-base text-white text-xs mt-3 mx-3">
                MAANG Careers (OPC) Private Limited
              </p>
            </div>
            <div className="flex space-x-3">
              <a
                target="_blank"
                href="https://www.facebook.com/MaangCareers"
                rel="noreferrer"
              >
                <FacebookIcon sx={{ color: "#ffffff", fontSize: "28px" }} />
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com/maang_careers/"
                rel="noreferrer"
              >
                <InstagramIcon sx={{ color: "#ffffff", fontSize: "28px" }} />
              </a>
              <a
                target="_blank"
                href="https://twitter.com/CareersMaang"
                rel="noreferrer"
              >
                <TwitterIcon sx={{ color: "#ffffff", fontSize: "28px" }} />
              </a>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/maang-careers/"
                rel="noreferrer"
              >
                <LinkedInIcon sx={{ color: "#ffffff", fontSize: "28px" }} />
              </a>
              <a
                target="_blank"
                href="https://www.youtube.com/channel/UCxjnOZ_xZFV9OAlvensnTLw"
                rel="noreferrer"
              >
                <YouTubeIcon sx={{ color: "#ffffff", fontSize: "28px" }} />
              </a>
            </div>
          </div>

          {/*  */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:space-y-0">
            <ul className="font-base  text-white text-sm space-y-3">
              <li
                className="hover:font-bold cursor-pointer"
                onClick={() => (window.location.href = "/")}
              >
                Home
              </li>
              <li
                className="hover:font-bold cursor-pointer"
                onClick={() => (window.location.href = "/about-us")}
              >
                About Us
              </li>
              <li
                className="hover:font-bold cursor-pointer"
                onClick={() => (window.location.href = "/how-it-works")}
              >
                How It Works
              </li>
              <li
                className="hover:font-bold cursor-pointer"
                onClick={() => setOpenContactUs(true)}
              >
                Contact Us
              </li>
            </ul>
            <ul className="font-base text-white text-sm space-y-3">
              <li>
                <a className="hover:font-bold" href="/#testimonials">
                  Testimonial
                </a>
              </li>
              <li>
                <a className="hover:font-bold" href="/courses">
                  Courses
                </a>
              </li>
              <li>
                <a className="hover:font-bold" href="/#mentors">
                  Mentors
                </a>
              </li>
              <li>
                <a className="hover:font-bold" href="/privacy-policy">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="hover:font-bold" href="/terms-and-condition">
                  Terms and Coditions
                </a>
              </li>
              <li>
                <a className="hover:font-bold" href="/refund-policy">
                  Return and Refund Policy
                </a>
              </li>
              <li>
                <a className="hover:font-bold" href="/shipping-and-delivery">
                  Shipping & Delivery Policy
                </a>
              </li>
            </ul>
            <div className="font-base text-white text-sm space-y-3">
              <h3 className="font-semibold text-sm">Contact Us</h3>
              <p>
                <a href="tel:+919182513789">Customer Care: +91-9182513789</a>
              </p>
              <p>
                <a href="tel:+919182513789">
                  Business Enquiries: +91 91825 13789
                </a>
              </p>
              <p>
                <a href="mailto:support@maangcareers.com">
                  support @ maangcareers.com
                </a>
              </p>
              <p>D.NO: 2-98/2, Kavuru, Guntur, Andhra Pradesh, India, 522611</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className=" flex py-3 items-center justify-center"
        style={{ backgroundColor: "#141620" }}
      >
        <p className="font-base font-medium text-gray-400 text-xs">
          © 2023 MAANG Careers (OPC) Private Limited. All rights reserved.
        </p>
      </div>

      <ContactUsModal
        openModal={openContactUs}
        setOpenModal={setOpenContactUs}
      />
    </div>
  );
};

export default Footer;
