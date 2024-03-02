import React, { useState, useRef } from "react";

import Layout from "../components/Layout";
import Header from "./../components/Header";
import Slider from "react-slick";

import AccordionText from "../components/AccordionText";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

import ContactUsModal from "./ContactUsModal";

const AboutUsPage = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [openContactUs, setOpenContactUs] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  const teamMembersData = [
    {
      name: "Ajay Gunti",
      position: "Founder & Director",
      image: "/images/ajay.png",
      description: "<strong>PhD</strong>, VIT Alumni<br/>United Kingdom",
    },
    {
      name: "Kavya Para",
      position: "CEO & COO",
      image: "/images/kavya.png",
      description: "Tepia, Ex- Cognizant<br/>United States",
    },
    {
      name: "Pradeep Sharma",
      position: "Marketing Team",
      image: "/images/pradeep.png",
      description: "Manager",
    },
    {
      name: "Kavya Para",
      position: "CEO & COO",
      image: "/images/kavya.png",
      description: "Tepia, Ex- Cognizant<br/>United States",
    },
    // Add other team members similarly
  ];

  const settingsTeam = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <Layout title="About Us">
      <Header
        title="Explore the Limits"
        subTitle="We assist students in interview preparation so they can land their dream job"
      />{" "}
      <section className="py-8">
        <div className="2xl:container mx-auto 2xl:px-5 lg:px-24 sm:px-12 px-10">
          <div className="flex flex-wrap justify-center items-center -mx-5">
            <div className="lg:w-8/12 md:w-6/12 w-full px-5">
              <h2 className="font-heading lg:text-3xl sm:text-2xl text-xl font-bold lg:mb-4 mb-2">
                Our Story
              </h2>
              <p className="font-base xl:text-base lg:text-sm text-xs mb-3 text-justify">
                We are an ed-tech start-up company founded in August 2021 by a
                group of employees from MAANG companies to revolutionize the way
                of learning to code creatively. Our company focuses on
                engineering students to help them through the interview
                preparation process to get their dream job.
              </p>
              <p className="font-base xl:text-base lg:text-sm text-xs text-justify">
                MAANG Careers offers live classes in which students can easily
                and effectively interact with the mentors who are currently
                working at MAANG companies. Most of the instructors have 5+
                years of teaching experience. Our innovative ways to crack a
                company job depend on specific patterns and provide the key to
                understanding the concept realistically.
              </p>
            </div>
            <div className="lg:w-4/12 md:w-6/12 w-full md:text-right text-center px-5 hidden md:block">
              <img
                src="/images/story.png"
                alt="story"
                className="inline-block"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 bg-black text-white">
        <div className="2xl:container mx-auto 2xl:px-5 lg:px-24 sm:px-12 px-10">
          <h2 className="font-heading lg:text-3xl sm:text-2xl text-xl font-bold lg:mb-4 mb-2">
            Our Focus
          </h2>

          <div className="flex flex-wrap justify-center -mx-3 xl:gap-y-8 gap-y-5">
            <div className="lg:w-4/12 sm:w-6/12 w-full 2xl:px-4 px-3">
              <div className="md:p-4 p-2 bg-gray-800 flex rounded-md h-full">
                <div className="lg:w-[67px] lg:h-[67px] w-[49px] h-[49px] flex justify-center items-center p-2 rounded bg-till-900 me-3">
                  <img src="images/s1.svg" alt="s1" />
                </div>
                <div className="text-box text-gray-400 w-[calc(100%-67px)]">
                  <h3 className="font-heading lg:text-xl text-base font-semibold text-white">
                    Student Mentorship
                  </h3>
                  <p className="font-base lg:text-sm text-[0.75rem] lg:leading-normal leading-[14px]">
                    Boost skills via tailored mentorship, mastering interviews,
                    strategic prep, and immersive training.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:w-4/12 sm:w-6/12 w-full 2xl:px-4 px-3">
              <div className="md:p-4 p-2 bg-gray-800 flex rounded-md h-full">
                <div className="lg:w-[67px] lg:h-[67px] w-[49px] h-[49px] flex justify-center items-center p-2 rounded bg-till-900 me-3">
                  <img src="/images/s2.svg" alt="s2" />
                </div>
                <div className="text-box text-gray-400 w-[calc(100%-67px)]">
                  <h3 className="font-heading lg:text-xl text-base font-semibold text-white">
                    Interaction With MAANG Em...
                  </h3>
                  <p className="font-base lg:text-sm text-[0.75rem] lg:leading-normal leading-[14px]">
                    Dive into mentor insights, excel, and unlock referral
                    opportunities.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:w-4/12 sm:w-6/12 w-full 2xl:px-4 px-3">
              <div className="md:p-4 p-2 bg-gray-800 flex rounded-md h-full">
                <div className="lg:w-[67px] lg:h-[67px] w-[49px] h-[49px] flex justify-center items-center p-2 rounded bg-till-900 me-3">
                  <img src="/images/s3.svg" alt="s3" />
                </div>
                <div className="text-box text-gray-400 w-[calc(100%-67px)]">
                  <h3 className="font-heading lg:text-xl text-base font-semibold text-white">
                    Interactive Group Sessions
                  </h3>
                  <p className="font-base lg:text-sm text-[0.625rem] lg:leading-normal leading-[14px]">
                    Groups: 15-30 students, curated for optimal learning based
                    on dates/schedules.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:w-4/12 sm:w-6/12 w-full 2xl:px-4 px-3">
              <div className="md:p-4 p-2 bg-gray-800 flex rounded-md h-full">
                <div className="lg:w-[67px] lg:h-[67px] w-[49px] h-[49px] flex justify-center items-center p-2 rounded bg-till-900 me-3">
                  <img src="/images/s4.svg" alt="s4" />
                </div>
                <div className="text-box text-gray-400 w-[calc(100%-67px)]">
                  <h3 className="font-heading lg:text-xl text-base font-semibold text-white">
                    Flexible Class Timings
                  </h3>
                  <p className="font-base lg:text-sm text-[0.625rem] lg:leading-normal leading-[14px]">
                    Classes flexibly align with evenings, spanning Monday to
                    Saturday inclusively.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:w-4/12 sm:w-6/12 w-full 2xl:px-4 px-3">
              <div className="md:p-4 p-2 bg-gray-800 flex rounded-md h-full">
                <div className="lg:w-[67px] lg:h-[67px] w-[49px] h-[49px] flex justify-center items-center p-2 rounded bg-till-900 me-3">
                  <img src="/images/s5.svg" alt="s5" />
                </div>
                <div className="text-box text-gray-400 w-[calc(100%-67px)]">
                  <h3 className="font-heading lg:text-xl text-base font-semibold text-white">
                    Unique Codes Patterns
                  </h3>
                  <p className="font-base lg:text-sm text-[0.625rem] lg:leading-normal leading-[14px]">
                    Over 30+ coding patterns, encompassing 500+ questions
                    covered.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:w-4/12 sm:w-6/12 w-full 2xl:px-4 px-3">
              <div className="md:p-4 p-2 bg-gray-800 flex rounded-md h-full">
                <div className="lg:w-[67px] lg:h-[67px] w-[49px] h-[49px] flex justify-center items-center p-2 rounded bg-till-900 me-3">
                  <img src="/images/s6.svg" alt="s6" />
                </div>
                <div className="text-box text-gray-400 w-[calc(100%-67px)]">
                  <h3 className="font-heading lg:text-xl text-base font-semibold text-white">
                    Up to Date Training Resources
                  </h3>
                  <p className="font-base lg:text-sm text-[0.625rem] lg:leading-normal leading-[14px]">
                    Robust student portal: practice, quizzes, and mock tests for
                    comprehensive learning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-12 lg:pb-20 pb-24">
        <div className="2xl:container mx-auto 2xl:px-5 lg:px-24 sm:px-12 px-10">
          <div className="flex flex-wrap justify-center items-center -mx-5 mb-10">
            <div className="lg:w-12/12 md:w-12/12 w-full px-5">
              <h2 className="font-heading lg:text-3xl sm:text-2xl text-xl font-bold lg:mb-4 mb-2">
                Our Teams
              </h2>
              <p className="font-base lg:text-lg sm:text-base text-sm">
                Fuel your coding aspirations with our Expert Team
              </p>
            </div>
          </div>

          <div className="sm:px-0 px-5">
            <div class="team-slider">
              <Slider {...settings}>
                {teamMembersData.map((member, index) => (
                  <div key={index} className="items h-full">
                    <div className="team-box relative px-5 flex flex-col justify-between w-full h-full">
                      <div className="2xl:w-[calc(298px+2.5vw)] 2xl:h-[calc(298px+2.5vw)] xl:w-[calc(258px+1.5vw)] xl:h-[calc(258px+1.5vw)] md:w-[180px] md:h-[180px] w-[calc(224px-6vw)] h-[calc(224px-6vw)] rounded-full overflow-hidden relative flex justify-center items-center ms-auto z-10">
                        <div className="half-circle w-full h-full absolute opacity-90">
                          <img src="/images/gradient.png" className="h-full" />
                        </div>
                        <div className="2xl:w-[calc(228px+2.5vw)] 2xl:h-[calc(228px+2.5vw)] xl:w-[calc(178px+1.5vw)] xl:h-[calc(178px+1.5vw)] md:w-[114px] md:h-[114px] w-[calc(158px-6vw)] h-[calc(158px-6vw)] rounded-full overflow-hidden">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="team-details absolute left-5 bottom-0 2xl:right-[calc(169px+1.2vw)] xl:right-[calc(132px+2vw)] sm:right-[110px] right-[120px]">
                        <h3 className="mb-2 font-heading xl:text-xl lg:text-md sm:text-xs text-base font-bold xl:w-[calc(100%-98px)] lg:w-[calc(100%-60px)] md:w-[calc(100%-20px)] sm:w-[calc(100%-60px)] w-[calc(100%-80px)]">
                          {member.name}
                        </h3>
                        
                        {/* <p className="mb-2 font-base xl:text-sm lg:text-xs  sm:text-[10px] text-xs xl:w-[calc(100%-80px)] lg:w-[calc(100%-60px)] md:w-[calc(100%-20px)] sm:w-[calc(100%-60px)] w-[calc(100%-80px)]">
                        {member.description}
                        </p> */}
                         <p className="mb-2 font-base xl:text-sm lg:text-xs sm:text-[10px] text-xs xl:w-[calc(100%-98px)] lg:w-[calc(100%-60px)] md:w-[calc(100%-20px)] sm:w-[calc(100%-60px)] w-[calc(100%-80px)]" dangerouslySetInnerHTML={{ __html: member.description }}>
                  </p>

                        <hr className="border-t-0 border-b border-neutral-500 border-solid" />
                        <span className="font-base lg:text-xs sm:text-[10px] text-[10px] font-bold">
                          {member.position}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 bg-black text-white">
        <div className="2xl:container mx-auto 2xl:px-5 lg:px-24 sm:px-12 px-10">
          <div className="flex flex-wrap justify-center items-center -mx-5 gap-y-10">
            {/* Contact Information */}
            <div className="xl:w-4/12 lg:w-5/12 md:w-6/12 w-full px-5 md:order-last">
              <div className="contact-box relative">
                <img src="/images/circle.svg" alt="" className="w-full" />
                <div className="text-center absolute z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                  <h3 className="mb-4 lg:text-3xl text-xl font-bold leading-tight">
                    Get in Touch
                  </h3>
                  <div className="call-box lg:text-lg md:text-base font-medium flex justify-center items-center mb-3">
                    <div className="w-[24px] h-[24px] flex justify-center items-center rounded-full bg-white text-black me-2">
                      <i className="bx bxs-phone"></i>
                    </div>
                    <a href="tel:+91-9182513789">+91-9182513789</a>
                  </div>
                  <div className="email-box lg:text-lg md:text-base font-medium flex justify-center items-center mb-3">
                    <div className="w-[24px] h-[24px] flex justify-center items-center rounded-full bg-white text-black me-2">
                      <i className="bx bx-envelope"></i>
                    </div>
                    <a href="mailto:support@maangcareers.com">
                      support@maangcareers.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="xl:w-8/12 lg:w-7/12 md:w-6/12 w-full px-5 lg:text-left text-center md:order-first">
              <h2 className="font-heading lg:text-4xl sm:text-2xl text-xl font-bold lg:mb-4 mb-2">
                Follow us on Our Socials
              </h2>

              <ul className="m-0 p-0">
                {/* <li className="list-none inline-block me-2">
                  <a
                    href="https://www.Get in Touch.com/MaangCareers"
                    className="block w-[32px] h-[32px] hover:text-till-900"
                  >
                    <i className="bx bxl-Get in Touch bx-md"></i>
                  </a>
                </li> */}

                <li class="list-none inline-block me-4">
                  <a
                    href="https://www.facebook.com/MaangCareers"
                    className="block w-[32px] h-[32px] hover:text-till-900"
                  >
                    <i class="bx bxl-facebook bx-md"></i>
                  </a>
                </li>
                <li className="list-none inline-block me-4">
                  <a
                    href="https://www.instagram.com/maang_careers/"
                    className="block w-[32px] h-[32px] hover:text-till-900"
                  >
                    <i className="bx bxl-instagram bx-md"></i>
                  </a>
                </li>
                <li className="list-none inline-block me-4">
                  <a
                    href="https://twitter.com/CareersMaang"
                    className="block w-[32px] h-[32px] hover:text-till-900"
                  >
                    <i className="bx bxl-twitter bx-md"></i>
                  </a>
                </li>
                <li className="list-none inline-block me-4">
                  <a
                    href="https://www.linkedin.com/authwall?trk=bf&trkInfo=AQEB4glyhHRXPgAAAYvdM3kgjXq8adIRW_PtqopS0iBGHn4NwOX-Px1YRcW47OFPTWDk0LpqBCFkGA2akcE3iPnwwSyF49C5k9MBqPclmogo-PVjr5C020rVolNYdiTRURH7GqU=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fmaang-careers%2F"
                    className="block w-[32px] h-[32px] hover:text-till-900"
                  >
                    <i className="bx bxl-linkedin bx-md"></i>
                  </a>
                </li>
                <li className="list-none inline-block me-4">
                  <a
                    href="https://www.youtube.com/channel/UCxjnOZ_xZFV9OAlvensnTLw"
                    className="block w-[32px] h-[32px] hover:text-till-900"
                  >
                    <i className="bx bxl-youtube bx-md"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="2xl:container mx-auto 2xl:px-5 lg:px-24 sm:px-12 px-10">
          <div className="mt-10 space-y-10 mb-20">
            <div className="mt-10 bg-white p-2 md:p-5 shadow rounded flex justify-between">
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
          <div className="mt-20 mb-20">
            <h1 className="font-heading font-bold text-xl md:text-3xl ">FAQ</h1>
            <h2 className="font-heading text-gray-600 text-base md:text-lg">
              Read to know more
            </h2>

            <div className="mt-5 space-y-5">
              <AccordionText
                heading="What is the purpose of MAANG Careers ?"
                subject="Our moto is simple, we provide support to students to acknowledge and embrace their coding skills with passion and provide broad view to aim at high paying jobs. The purpose of this course is to crack MAANG companies in less time at affordable price."
              />
              <AccordionText
                heading="Does we provide scholarships/discounts ?"
                subject="Yes, we do provide scholarships/discounts which completely depends on student talent."
              />

              <AccordionText
                heading="How is course structure different from other ed-tech companies ?"
                subject="The course structure is famous for its 30+ unique coding patterns and 500+ hand-picked questions, which it covers in a duration of 2 months and specifically designed by our instructors, which leads to a unique learning style. "
              />
            </div>
          </div>
        </div>
      </section>
      <ContactUsModal
        openModal={openContactUs}
        setOpenModal={setOpenContactUs}
      />
    </Layout>
  );
};

export default AboutUsPage;
