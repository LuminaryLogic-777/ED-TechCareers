import React, { useState, useEffect, lazy } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ApiBaseURL } from "../components/ApiConfig";
// import { Link } from "react-router-dom";

const Layout = lazy(() => import("../components/Layout"));
// import ShareIcon from "@mui/icons-material/Share";
const LocalPhoneIcon = lazy(() => import("@mui/icons-material/LocalPhone"));
// import SearchIcon from "@mui/icons-material/Search";
const AccordionText = lazy(() => import("../components/AccordionText"));
const Slider = lazy(() => import("react-slick"));
const ContactUsModal = lazy(() => import("./ContactUsModal"));
const CourseCard = lazy(() => import("../components/CourseCard"));
const ArrowForwardIosIcon = lazy(() => import("@mui/icons-material/ArrowForwardIos"));

const HomePage = () => {
  const [openContactUs, setOpenContactUs] = useState(false);
  const [courses, setCourses] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetch(`${ApiBaseURL}course-management/list-courses/`)
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error(err))

    fetch(`${ApiBaseURL}website-management/mentors/`)
      .then(res => res.json())
      .then(data => setMentors(data))
      .catch(err => console.error(err))

    fetch(`${ApiBaseURL}website-management/testimonials/`)
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(err => console.error(err))

    fetch(`${ApiBaseURL}website-management/faqs/`)
      .then(res => res.json())
      .then(data => setFaqs(data))
      .catch(err => console.error(err))

  }, []);

  const settings = {
    // dots: false,
    // infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,

    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const settingsTestomonials = {
    // dots: true,
    arrows: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 4,
    autoplaySpeed: 0,
    speed: 6000,
    slidesToScroll: 1,
    pauseOnHover: true,
    cssEase: "linear",

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const settingsLogosBar = {
    autoplay: true,
    arrows: false,
    slidesToShow: 9,
    autoplaySpeed: 0,
    speed: 6000,
    infinite: true,
    slidesToScroll: 1,
    pauseOnHover: false,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      window.location.href = '/courses?search=' + event.target.value;
    }
  };

  var options = { year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <Layout title="Home">
      <div className="relative">
        <div className="skewed" style={{ height: "72.5%" }}></div>

        <div className="text-white grid grid-cols-1 md:grid-cols-2 pt-16  ">
          {/*  */}
          <div className="flex flex-col justify-center md:pl-20">
            <div className="flex flex-col justify-center space-y-2">
              <h1
                className="font-heading font-bold text-1.5xl md:text-4xl text-center md:text-left "
                style={{ lineHeight: "1.4" }}
              >
                Get your <span className="text-grd">dream job</span> by learning
                from
                <br /> our world-class mentors.{" "}
              </h1>
              <p className="font-heading text-base text-center md:text-left md:text-xl pt-3">
                Improve your skills for a better tomorrow.
              </p>
            </div>
            <div className="flex items-center space-x-3 px-10 md:px-0">
              <input
                type="text"
                placeholder="Search Topics"
                className="w-full md:w-2/3 my-14 py-2  rounded-full px-5  focus:border-blue-2 text-gray-700 font-base  text-sm placeholder:text-gray-400"
                onKeyDown={handleKeyDown}
                name=""
                id=""
              />
              {/* <div className="rounded-full py-1 px-2 bg-white hover:bg-gray-300 transition duration-500 ease-in-out cursor-pointer">
                <SearchIcon sx={{ color: "gray" }} />
              </div> */}
            </div>
            <div className="mt-6"></div>
          </div>

          {/*  */}
          <div className="hidden md:flex items-center justify-center px-16">
            <div>
              <img
                className="border-4 rounded shadow-lg"
                src="/images/image-cover.jpg"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="">
          <h2 className="font-heading text-gray-600 text-center text-xs md:text-base mt-12 mb-5">
            Crack interviews at top companies with our{" "}
            <span className="text-primary ">
              <a href="/courses">fast track courses</a>
            </span>
            .
          </h2>
          <div className="logos-container">
            <Slider
              {...settingsLogosBar}
              className="bg-white"
            // style={{ display: "flex !important" }}
            >
              <div>
                <img
                  src="/logos/google-big.svg"
                  className="w-24 md:w-28"
                  alt=""
                  height={"100%"}
                  width={"100%"}
                />
              </div>
              <div>
                <img
                  src="/logos/linkedin-big.svg"
                  className="w-24 md:w-28"
                  alt=""
                  height={"100%"}
                  width={"100%"}
                />
              </div>
              <div>
                <img src="/logos/amazon-big.svg" className="w-24" alt=""
                  height={"100%"}
                  width={"100%"} />
              </div>
              <div>
                <img
                  src="/logos/microsoft-big.svg"
                  className="w-24 md:w-28"
                  alt=""
                  height={"100%"}
                  width={"100%"}
                />
              </div>
              <div>
                <img
                  src="/logos/adobe-big.svg"
                  className="w-24 md:w-28"
                  alt=""
                  height={"100%"}
                  width={"100%"}
                />
              </div>
              <div>
                <img
                  src="/logos/bloomberg.svg"
                  className="w-24 md:w-28"
                  alt=""
                  height={"100%"}
                  width={"100%"}
                />
              </div>
              <div>
                <img
                  src="/logos/meta-big.svg"
                  className="w-24 md:w-28"
                  alt=""
                  height={"100%"}
                  width={"100%"}
                />
              </div>

              <div>
                <img
                  src="/logos/netflix-big.svg"
                  className="w-20 md:w-24"
                  alt=""
                  height={"100%"}
                  width={"100%"}
                />
              </div>

              <div>
                <img
                  src="/logos/uber-big.svg"
                  className="w-16 md:w-20"
                  alt=""
                  height={"100%"}
                  width={"100%"}
                />
              </div>

              <div>
                <img
                  src="/logos/atlassian-big.svg"
                  className="w-24 md:w-28"
                  alt=""
                  height={"100%"}
                  width={"100%"}
                />
              </div>

              <div>
                <img src="/logos/github-big.svg" className="w-24" alt=""
                  height={"100%"}
                  width={"100%"} />
              </div>
            </Slider>
          </div>
        </div>

      </div>
      <div className="md:mx-20 mt-14  mb-20 px-3">
        <div className="flex justify-between mb-4">
          <div>
            <h1 className="font-heading font-bold text-2xl md:text-3xl ">
              Our Courses
            </h1>
            <h2 className="font-heading text-gray-600 text-base md:text-lg mb-5">
              Checkout our popular courses
            </h2>
          </div>
          <a
            href="/courses"
            className="font-heading font-bold flex items-center text-sm md:text-base text-gray-600 space-x-1 hover:text-primary"
          >
            <p>View All Courses</p>
            <ArrowForwardIosIcon sx={{ fontSize: "16px" }} />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {courses.map((course, index) => {
            // if (index <= 2) return <CourseCard {...course} />;
            return <CourseCard key={index} {...course} />
          })}
        </div>
      </div>
      <div
        className="px-3 md:px-10 lg:px-20 py-20 mt-20  bg-theme"
        id="mentors"
      >
        <h1 className="font-heading font-bold text-2xl md:text-3xl text-white">
          Our Mentors
        </h1>
        <h2 className="font-heading text-base md:text-lg mb-5 text-white">
          The best 1% in the country
        </h2>

        <div className="px-14 lg:px-0 grid grid-cols-1 space-y-4 md:space-y-0 justify-center md:grid-cols-2 lg:grid-cols-4 md:space-x-4 lg:space-x-5 pt-5">
          <div
            className="flex space-x-5 px-10 md:py-2 lg:py-5 rounded items-center"
            style={{ backgroundColor: "#F6AE2D" }}
          >
            <img
              src="/vectors/home-1.svg"
              className="w-12 md:w-14 lg-w-full"
              alt=""
            />
            <div className="flex flex-col justify-start py-2">
              <h1 className="font-heading font-bold text-3xl md:text-3xl lg:text-4xl text-white">
                50+
              </h1>
              <p className="font-heading text-base  md:text-lg lg:text-xl text-white">
                Mentors
              </p>
            </div>
          </div>

          <div
            className="flex space-x-5 px-5 md:py-2 lg:py-5 rounded items-center"
            style={{ backgroundColor: "#3BCEAC" }}
          >
            <img
              src="/vectors/home-2.svg"
              className="w-12 md:w-14 lg-w-full"
              alt=""
            />
            <div className="flex flex-col justify-start py-2">
              <h1 className="font-heading font-bold text-3xl md:text-3xl lg:text-4xl text-white">
                5+{" "}
                <span className="font-heading text-base  md:text-lg lg:text-xl text-white">
                  Years
                </span>
              </h1>
              <p className="font-heading text-base  md:text-lg lg:text-xl text-white">
                Experience
              </p>
            </div>
          </div>

          <div
            className="flex space-x-5 px-5 py-2 md:py-4 lg:py-5 rounded items-center"
            style={{ backgroundColor: "#EE4266" }}
          >
            <img
              src="/vectors/home-3.svg"
              className="w-12 md:w-14 lg-w-full"
              alt=""
            />
            <div className="flex flex-col justify-start">
              <h1 className="font-heading font-bold text-3xl md:text-3xl lg:text-4xl text-white">
                20+
              </h1>
              <p className="font-heading   md:text-lg text-base lg:text-xl text-white">
                Industries
              </p>
            </div>
          </div>

          <div
            className="flex space-x-5 px-5 py-2 md:py-4 lg:py-5 rounded items-center"
            style={{ backgroundColor: "#00A1E4" }}
          >
            <img
              src="/vectors/home-4.svg"
              className="w-12 md:w-14 lg-w-full"
              alt=""
            />
            <div className="flex flex-col justify-start">
              <h1 className="font-heading font-bold text-3xl md:text-3xl lg:text-4xl text-white">
                30+
              </h1>
              <p className="font-heading text-base md:text-lg lg:text-xl text-white">
                Live Sessions
              </p>
            </div>
          </div>
        </div>

        <div className="pt-20 w-full space-x-10">
          <Slider {...settings}>
            {
              mentors.map((mentor, index) =>
                <div className=" flex px-2" key={index}>
                  <div className=" flex space-x-10 px-5 bg-card rounded md:px-10 lg:pr-16 py-7">
                    <img
                      src={mentor.photo}
                      className="w-24 h-24 rounded-full"
                      alt=""
                    />
                    <div className="flex flex-col">
                      <h1 className="font-base font-semibold text-lg text-white">
                        {mentor.name}
                      </h1>
                      <p className="font-base font-medium text-xs md:text-sm  text-primary ">
                        {mentor.subtext}
                      </p>
                      <p className="font-base text-white font-semibold text-xs text-center bg-cardRed md:text-xs lg:text- px-5 py-1 rounded-full mt-5 ">
                        {mentor.maintext}
                      </p>
                    </div>
                  </div>
                </div>
              )}
          </Slider>
        </div>
      </div>
      <div
        className="md:px-10 lg:px-20 pt-10 pb-2 mt-5 mb-0 px-3 "
        id="testimonials"
      >
        <h1 className="font-heading font-bold text-3xl ">Testimonials</h1>
        <h2 className="font-heading text-gray-600 text-lg mb-5">
          Here is what our students say about us
        </h2>

        <Slider {...settingsTestomonials}>
          {
            testimonials.map((testimonial, index) =>
              <div className="p-1">
                <div className="bg-white border-2   py-8 pl-8 pr-3 hover:scale-105 transition duration-500 ease-in-out">
                  <div className="flex space-x-5 justify-start items-center">
                    <img src={testimonial.photo} className="w-16" alt="" />
                    <div className="flex flex-col space-y-1">
                      <h1 className="font-base font-bold text-gray-800">{testimonial.name}</h1>
                      {
                        testimonial.stars === '10' ? <img src="/vectors/stars.svg" className="w-24" alt="" /> :
                          testimonial.stars === '9' ? <img src="/vectors/stars-45.svg" className="w-24" alt="" /> :
                            testimonial.stars === '8' ? <img src="/vectors/stars-4.svg" className="w-24" alt="" /> : null
                      }
                    </div>
                  </div>
                  <p className="font-base mt-5 text-sm  text-gray-600">
                    {testimonial.text}
                  </p>
                  <p className="font-base mt-5 text-xs font-bold">
                    Posted - {new Date(testimonial.date).toLocaleDateString("en-US", options)}{" "}
                  </p>
                </div>
              </div>
            )}
        </Slider>
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
      <div className="px-3 md:mx-10 lg:mx-20 mt-20 mb-20">
        <h1 className="font-heading font-bold text-3xl ">FAQ</h1>
        <h2 className="font-heading text-gray-600 text-lg">
          Read to know more
        </h2>

        <div className="mt-5 space-y-5">
          {
            faqs.map((faq, index) =>
              <AccordionText
                heading={faq.question + '?'}
                subject={faq.answer}
              />
            )}
        </div>
      </div>
      <ContactUsModal
        openModal={openContactUs}
        setOpenModal={setOpenContactUs}
      />
    </Layout>
  );
};

export default HomePage;
