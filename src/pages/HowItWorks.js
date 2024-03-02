import React, { useState } from "react";

import Header from "../components/Header";
import Layout from "../components/Layout";

import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
// import Accordion from "../components/AccordionText";
import AccordionText from "../components/AccordionText";

import ContactUsModal from "./ContactUsModal";
import { Link } from "react-router-dom";

const HowItWorksPage = () => {
  const [openContactUs, setOpenContactUs] = useState(false);
  return (
    <Layout title="How It Works">
      <Header
        title="How it works"
        subTitle="We assist students in interview preparation so they can land their dream job"
      />

      <div className="mx-3 lg:mx-20 mt-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded shadow p-3 lg:p-5 md:space-x-5">
          <div
            className="p-8 md:p-10 rounded"
            style={{ backgroundColor: "#F0F0F0" }}
          >
            <h1
              className="font-heading  font-bold text-2xl md:text-3xl "
              style={{ color: "#2B2B2B" }}
            >
              Enroll Now
            </h1>
            <ul className="font-base space-y-10 mt-10 list-disc ml-3 lg:ml-10">
              <li>
                Choose the{" "}
                <Link to="/courses" className=" text-primary font-medium">
                  course
                </Link>
                .
              </li>
              <li>Proceed with payment.</li>
              <li>
                <Link to="/login" className=" text-primary font-medium">
                  Login
                </Link>{" "}
                and explore your syllabus
              </li>
            </ul>
          </div>
          <div className="flex w-full justify-center order-first md:order-last">
            <img src="/vectors/how-it-works-1.svg" className="w-96" alt="" />
          </div>
        </div>
      </div>

      <div className="mx-3 lg:mx-20 mt-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded shadow p-3 lg:p-5 md:space-x-5">
          <div className="flex w-full justify-center">
            <img src="/vectors/how-it-works-2.svg" className="w-96" alt="" />
          </div>
          <div
            className="p-8 md:p-10 rounded"
            style={{ backgroundColor: "#F0F0F0" }}
          >
            <h1
              className="font-heading  font-bold text-2xl md:text-3xl "
              style={{ color: "#2B2B2B" }}
            >
              Connect with a Mentor
            </h1>
            <ul className="font-base space-y-10 mt-10 list-disc ml-3 lg:ml-10">
              <li>Once enrolled, a mentor will be assigned .</li>
              <li>Discuss the prerequisites for the course.</li>
              <li>Understand the course overview.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-3 lg:mx-20 mt-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded shadow p-3 lg:p-5 md:space-x-5">
          <div
            className="p-8 md:p-10 rounded"
            style={{ backgroundColor: "#F0F0F0" }}
          >
            <h1
              className="font-heading  font-bold text-2xl md:text-3xl "
              style={{ color: "#2B2B2B" }}
            >
              Get a timetable
            </h1>
            <ul className="font-base space-y-10 mt-10 list-disc ml-3 md:ml-10">
              <li>Class timings are flexible.</li>
              <li>Keeps you on track with your schedule. .</li>
              <li>It helps to plot and organise your assignments.</li>
            </ul>
          </div>
          <div className="flex w-full justify-center order-first md:order-last">
            <img src="/vectors/how-it-works-3.svg" className="" alt="" />
          </div>
        </div>
      </div>

      <div className="mx-3 lg:mx-20 mt-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded shadow p-3 lg:p-5 md:space-x-5">
          <div className="flex w-full justify-center ">
            <img src="/vectors/how-it-works-4.svg" className="" alt="" />
          </div>
          <div
            className="p-8 md:p-10 rounded"
            style={{ backgroundColor: "#F0F0F0" }}
          >
            <h1
              className="font-heading  font-bold text-2xl md:text-3xl"
              style={{ color: "#2B2B2B" }}
            >
              Attend live classes
            </h1>
            <ul className="font-base space-y-10 mt-10 list-disc ml-3 lg:ml-10">
              <li>Join a class based on regular intervals.</li>
              <li> Interact with the mentor.</li>
              <li>Start solving problems and get your doubts cleared.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-3 lg:mx-20 mt-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded shadow p-3 lg:p-5 md:space-x-5">
          <div
            className="p-8 md:p-10 rounded"
            style={{ backgroundColor: "#F0F0F0" }}
          >
            <h1
              className="font-heading  font-bold text-2xl md:text-3xl "
              style={{ color: "#2B2B2B" }}
            >
              Get a course completion certificate
            </h1>
            <ul className="font-base space-y-10 mt-10 list-disc ml-3 lg:ml-10">
              <li>Finish the course as per the schedule.</li>
              <li>Get rewarded with a certificate.</li>
              <li>
                Boom, congratulations !! And now you&apos;re ready to give
                interviews at MAANG and other product-based companies.
              </li>
            </ul>
          </div>
          <div className="flex w-full justify-center order-first md:order-last">
            <img src="/vectors/how-it-works-5.svg" className="w-72" alt="" />
          </div>
        </div>
      </div>

      <div className="md:mx-10 lg:mx-20 mt-10 space-y-10 mb-20">
        <div className="mt-10 bg-white p-2 mx-3 md:p-5 shadow rounded flex justify-between">
          <div className="flex items-center space-x-3">
            <LocalPhoneIcon sx={{ color: "#2DB2C4", fontSize: "24px" }} />
            <h1 className="font-heading font-bold text-sm md:text-xl ">
              Still Waiting ?
            </h1>
          </div>
          <button
            className="bg-primary px-10 py-2 text-sm lg:text-base font-heading font-bold text-white rounded hover:bg-primaryDark transition duration-500"
            onClick={() => setOpenContactUs(true)}
          >
            Contact Us
          </button>
        </div>
      </div>

      <div className="mx-3 md:mx-20 mt-10 mb-20">
        <h1 className="font-heading font-bold text-2xl md:text-3xl ">FAQ</h1>
        <h2 className="font-heading text-gray-600 text-base md:text-lg">
          Read to know more
        </h2>

        <div className="mt-5 space-y-5">
          <AccordionText
            heading="After enrollment, how long it will take to assign a mentor ?"
            subject="Generally, a mentor will be assigned to a particular batch of around 25 students. Every batch starts on the 1st or 15th of every month. So, the mentor will be assigned prior to those dates."
          />

          <AccordionText
            heading="Where to access the student timetable ?"
            subject="Once enrolled, wait for the mentor to be assigned, and access the student login to see your timetable."
          />
          <AccordionText
            heading="How to join in a live class ?"
            subject="The live classes will be conducted on our website, which can be accessed easily on the student portal."
          />
        </div>
      </div>

      <ContactUsModal
        openModal={openContactUs}
        setOpenModal={setOpenContactUs}
      />
    </Layout>
  );
};

export default HowItWorksPage;
