import React, { useState, useEffect } from "react";

import Layout from "../components/Layout";
import Header from "./../components/Header";

import axios from "axios";
import { ApiBaseURL } from "../components/ApiConfig";
import CourseCard from "./../components/CourseCard";

import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
// import SearchIcon from "@mui/icons-material/Search";

import AccordionText from "../components/AccordionText";
import ContactUsModal from "./ContactUsModal";
// import CloseIcon from "@mui/icons-material/Close";

// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import { useSearchParams } from "react-router-dom";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [openContactUs, setOpenContactUs] = useState(false);

  // const [searchParam, setSearchParam] = useSearchParams();

  // const [showSearch, setShowSearch] = useState(true);

  // const [filters, setFilters] = useState({page: 1});
  // const [search, setSearch] = useState(
  //   searchParam.get("search") ? searchParam.get("search") : ""
  // );

  // useEffect(() => {
  //   if (search !== "") {
  //     setShowSearch(false);
  //   }
  // }, [search]);

  useEffect(() => {
    async function getAllCourse() {
      // const res = await axios.get(
      //   `${process.env.REACT_APP_API_URL}/course/?search=${search}&page=${filters.page}`
      // );
      const res = await axios.get(
        `${ApiBaseURL}course-management/list-courses/`
      );
      setCourses(res.data);
    }

    getAllCourse();
    // }, [filters]);
  }, []);
  
  return (
    <Layout title="Courses">
      <Header
        title="Our Courses"
        subTitle="We assist students in interview preparation so they can land their dream job"
      />

      <div className="flex flex-col md:flex-row justify-between md:items-center px-3 md:mx-20 mt-8 mb-5">
        <div className="  ">
          <h1 className="font-heading font-bold text-2xl md:text-3xl ">
            Our Courses
          </h1>
          <h2 className="font-heading text-gray-600 text-base md:text-lg mb-8 ">
            Checkout out all our courses
          </h2>
        </div>

        {/* <div className="flex w-full md:w-1/3 space-x-3">
          <input
            type="text"
            placeholder="Search"
            className="rounded-full font-base  bg-white shadow py-2 px-5 w-full focus:outline-blue-500"
            onChange={(event) => {
              setSearch(event.target.value);
              setShowSearch(true);
              setSearchParam({});
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                setSearch(event.target.value);
                setShowSearch(true);
                setSearchParam({});
                setFilters({ ...filters, search: event.target.value });
                setShowSearch(false);
              }
              if (event.key === "Backspace") {
                setFilters({ ...filters, search: "" });
                setSearch("");
                setShowSearch(true);
                setSearchParam({});
              }
            }}
            value={search}
          />
          {showSearch ? (
            <button
              className="bg-white rounded-full px-2 shadow hover:bg-gray-200 transition ease-in-out duration-500"
              onClick={() => {
                setFilters({ ...filters, search: search });
                setShowSearch(false);
              }}
            >
              <SearchIcon />
            </button>
          ) : (
            <button
              className="bg-white rounded-full px-2 shadow hover:bg-gray-200 transition ease-in-out duration-500"
              onClick={() => {
                setFilters({ ...filters, search: "" });
                setSearch("");
                setShowSearch(true);
                setSearchParam({});
              }}
            >
              <CloseIcon />
            </button>
          )}
        </div> */}
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-3 px-3 md:px-20 py-10 gap-10 shadow-inside"
        style={{ backgroundColor: "#D9D9D9" }}
      >
        {courses?.map((course) => {
          return <CourseCard {...course} />;
        })}
      </div>

      {/* <div className="flex w-full justify-center items-center mt-5 font-base">
        <ArrowBackIosIcon
          sx={{ fontSize: "16px", cursor: "pointer" }}
          onClick={() => {
            if (filters.page > 1) {
              setFilters({ ...filters, page: filters.page - 1 });
            }
          }}
        />
        {filters.page}/{Math.ceil(courses?.filteredCourseNumber / 6)}
        <ArrowForwardIosIcon
          sx={{ fontSize: "16px", cursor: "pointer" }}
          onClick={() => {
            if (filters.page < Math.ceil(courses?.filteredCourseNumber / 6)) {
              setFilters({ ...filters, page: filters.page + 1 });
            }
          }}
        />
      </div> */}

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

      <div className="md:mx-10 lg:mx-20 px-3 mt-20 mb-20">
        <h1 className="font-heading font-bold text-3xl ">FAQ</h1>
        <h2 className="font-heading text-gray-600 text-lg">
          Read to know more
        </h2>

        <div className="mt-5 space-y-5">
          <AccordionText
            heading="What is a Fast-Track interview preparation course and its purpose ?"
            subject="The Fast Track course is famous for its 30+ unique coding patterns and 500+ hand-picked questions, which it covers in a duration of 2 months. The purpose of this course is to crack MAANG companies in less time."
          />
          <AccordionText
            heading="What are the date and timings of course ?"
            subject="We start the course on the 1st and 15th of every month. The class timings of the course can be varied from morning to evening based on the batch."
          />

          <AccordionText
            heading="When classes will be conducted ?"
            subject="The classes will be 3 days a week and last around 2 hours per session, giving you the best time to practice the code and interact with the mentor."
          />

          <AccordionText
            heading="How will get my timetable ?"
            subject="Once enrolled, your timetable will be automatically updated in your student login."
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

export default CoursesPage;
