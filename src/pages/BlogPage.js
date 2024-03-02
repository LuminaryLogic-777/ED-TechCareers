import React, { useEffect, useRef, useState } from "react";

import Layout from "../components/Layout";
import Header from "../components/Header";

// import AccordionText from "../components/AccordionText";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ShareIcon from "@mui/icons-material/Share";
// import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { ApiBaseURL } from "../components/ApiConfig";

import Slider from "react-slick";
import ContactUsModal from "./ContactUsModal";
import { IconButton } from "@mui/material";
import { RWebShare } from "react-web-share";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "20px" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "20px", zIndex: 1 }}
      onClick={onClick}
    />
  );
}

const BlogPage = () => {
  const [openContactUs, setOpenContactUs] = useState(false);
  const ref = useRef(null);

  const [blogs, setBlogs] = useState([])
  const [width, setWidth] = useState(window.screen.width)

  useEffect(() => {
    fetch(`${ApiBaseURL}website-management/blogs/`)
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    if (ref.current) setWidth(ref.current.offsetWidth)
  }, []);

  const settings2 = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    adaptiveHeight: true,
    height: 600,
    // arrows: false,

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: dots => (
      <div
        style={{
          borderRadius: "20px",
          padding: "0px",
          zIndex: 1,
          bottom: "5px"
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: "white",
          border: "1px white solid"
        }}
      >
        {/* {i + 1} */}
      </div>
    )
  };

  var options = { month: 'long', day: 'numeric' };

  return (
    <Layout title="About Us">
      <Header
        title="#blogs"
        subTitle="Experience the Unexperienced !"
      />

      <div className="md:px-3 md:px-20 md:pt-5">
        {/* <h1 className="font-heading font-bold text-2xl md:text-3xl ">
          Featured Stories
        </h1> */}
        <div className="hidden md:block">

          <div className="grid grid-cols-1 lg:grid-cols-5 md:px-3 md:px-10 gap-x-10">
            <div className="lg:col-span-3 md:mt-6">
              {/* <h1 className="font-heading font-bold text-2xl md:text-3xl hidden lg:flex">
            Our Story
          </h1> */}

              <Slider {...settings2}>
                {
                  blogs.sort((a, b) => a.views - b.views).map((blog, i) =>

                    <a key={i} ref={ref} style={{
                      // border: '1px solid #000000',
                      backgroundColor: 'white',
                      minHeight: "300px",
                      borderRadius: 6,
                    }}
                      href={"/blog/" + blog.id}>
                      <img src={blog.photo} alt="" id={"image" + i} style={{
                        objectFit: "fill",
                        // borderRadius: 6,
                        width: "100%",
                        // height: "100%"
                      }} />
                      <div className="flex flex-col p-3 md:p-5" style={{ position: "absolute", bottom: 7, background: "linear-gradient(to top, #00000015, #00000015)", width: width, height: "100%" }}>
                        <p className="font-bold text-white">
                          "
                        </p>
                        <ul className="md:pb-5">
                          <li style={{ display: "inline" }} className="font-subheading md:font-bold text-white text-xs md:text-md mr-1">{new Date(blog.date).toLocaleDateString("en-US", options)}</li>
                          <li style={{ display: "inline" }} className="font-subheading md:font-bold text-white text-xs md:text-md"> · </li>
                          <li style={{ display: "inline" }} className="font-subheading md:font-bold text-white text-xs md:text-md ml-1">{blog.read_time} min</li>
                        </ul>
                        <h1 className="font-heading font-bold text-white text-lg md:text-3xl mt-auto">
                          {blog.title}
                        </h1>
                        {/* <p className="text-sm text-white" style={{ maxLines: 2 }}>
                        {blog.text.slice(0, 50)} ...
                      </p> */}
                        <div className="flex border-t mt-2" style={{ justifyContent: "space-between" }}>
                          <ul className="pb-5 md:pt-1 md:mt-2 border-gray-300">
                            <li style={{ display: "inline" }} className="font-subheading md:font-bold text-white text-xs md:text-md mr-5">{blog.views} Views</li>
                            <li style={{ display: "inline" }} className="font-subheading md:font-bold text-white text-xs md:text-md">{blog.count_comments ? blog.count_comments : 0} comments</li>
                          </ul>
                          <li style={{ display: "inline", zIndex: 1 }} className="font-subheading md:pt-1 md:mt-2 font-bold text-xs text-white pt-1">
                            0 <FavoriteBorderOutlinedIcon sx={{ fontSize: "18px", color: "white" }} />
                          </li>
                        </div>
                      </div>
                    </a>
                  )
                }
              </Slider>
            </div>
            <div className="order-first md:order-last mb-5 mt-10 lg:mt-0 space-y-4 md:mb-0 lg:col-span-2 ">
              <h1 className="font-heading ml-4 font-bold text-md md:text-2xl flex">
                Popular Stories
              </h1>
              {
                blogs.filter((blog, i) => blog.popular === true).map((blog, i) =>
                  <div className="mx-4 flex" key={i} style={{
                    // border: '1px solid #000000',
                    backgroundColor: 'white',
                    height: "120px",
                    borderRadius: 6
                  }}>
                    <img src={blog.photo} alt="" style={{
                      objectFit: "cover",
                      overflow: "hidden",
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                      width: 200,
                    }} />
                    <div className="bg-white flex flex-col rounded px-3 w-full">
                      <div className="flex" style={{ justifyContent: "space-between" }}>
                        <ul className="py-0">
                          <li style={{ display: "inline" }} className="font-subheading text-gray-600 text-xs mr-1">{new Date(blog.date).toLocaleDateString("en-US", options)}</li>
                          <li style={{ display: "inline" }} className="font-subheading text-gray-600 text-xs"> · </li>
                          <li style={{ display: "inline" }} className="font-subheading text-gray-600 text-xs ml-1">{blog.read_time} min</li>
                        </ul>
                        <li style={{ display: "inline" }} className="font-subheading text-gray-600 pt-1">
                          <RWebShare
                            data={{
                              // text: `${course.shortDescription}`,
                              url: `https://maangcareers.com/blog/${blog.id}`,
                              title: `${blog.title}`,
                            }}
                          >
                            <IconButton>
                              <ShareIcon sx={{ fontSize: "18px" }} />
                            </IconButton>
                          </RWebShare>
                        </li>
                      </div>
                      <a href={"/blog/" + blog.id}>
                        <h1 className="font-heading md:font-bold text-md xl:text-md my-auto">
                          {/* {blog.title.length < 25 ? blog.title : blog.title.slice(0,25) + '...'} */}
                          {blog.title}
                        </h1>
                      </a>
                      <div className="flex border-t mt-1" style={{ justifyContent: "space-between" }}>
                        <ul className="py-1 mt-auto mb-2">
                          <li style={{ display: "inline" }} className="font-subheading text-gray-600 text-xs mr-5">{blog.views} Views</li>
                          <li style={{ display: "inline" }} className="font-subheading text-gray-600 text-xs">{blog.count_comments ? blog.count_comments : 0} comments</li>
                        </ul>
                        <li style={{ display: "inline" }} className="font-subheading text-gray-600 pt-1">
                          0 <FavoriteBorderOutlinedIcon sx={{ fontSize: "18px", color: "#39bed2" }} />
                        </li>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-4 space-y-3 lg:space-y-0 gap-x-5 mt-8">
          <div className="bg-white p-5 rounded shadow">
            <h1 className="font-heading font-bold text-3xl text-primary">
              30+
            </h1>
            <p className="font-heading  text-lg font-semibold text-gray-600">
              Unique coding patterns
            </p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h1 className="font-heading font-bold text-3xl text-primary">
              500+
            </h1>
            <p className="font-heading  text-lg font-semibold text-gray-600">
              Standard handpicked questions
            </p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h1 className="font-heading font-bold text-3xl text-primary">
              24/7
            </h1>
            <p className="font-heading  text-lg font-semibold text-gray-600">
              Flexible class timings
            </p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h1 className="font-heading font-bold text-3xl text-primary">
              20+
            </h1>
            <p className="font-heading  text-lg font-semibold text-gray-600">
              Interactive group sessions
            </p>
          </div>
        </div> */}
      </div>

      <div className="px-3 md:px-20" >

        <h1 className="font-heading font-bold text-2xl md:text-3xl w-100 flex justify-center pt-12 hidden md:block">
          Our Blogs
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-20 pt-5">
          {
            blogs.map((blog, i) =>
              <div className="mt-5 lg:mt-10 md:ml-4 lg:ml-10" key={i} style={{
                // border: '1px solid #000000',
                backgroundColor: 'white',
                minHeight: "300px",
                borderRadius: 6
              }}
              >
                <a href={"/blog/" + blog.id}>
                  <img src={blog.photo} alt="" style={{
                    objectFit: "cover",
                    // height: "300px",
                    overflow: "hidden",
                    borderTopLeftRadius: 6,
                    borderTopRightRadius: 6,
                  }} />
                </a>
                <div className="bg-white flex flex-col rounded px-5">
                  <div className="flex" style={{ justifyContent: "space-between" }}>
                    <ul className="py-5">
                      <li style={{ display: "inline" }} className="font-subheading text-gray-600 text-xs mr-1">{new Date(blog.date).toLocaleDateString("en-US", options)}</li>
                      <li style={{ display: "inline" }} className="font-subheading text-gray-600 text-xs"> · </li>
                      <li style={{ display: "inline" }} className="font-subheading text-gray-600 text-xs ml-1">{blog.read_time} min</li>
                    </ul>
                    <li style={{ display: "inline" }} className="font-subheading text-gray-600 pt-4">
                      <RWebShare
                        data={{
                          // text: `${course.shortDescription}`,
                          url: `https://maangcareers.com/blog/${blog.id}`,
                          title: `${blog.title}`,
                        }}
                      >
                        <IconButton>
                          <ShareIcon sx={{ fontSize: "18px" }} />
                        </IconButton>
                      </RWebShare>
                    </li>
                  </div>
                  <a href={"/blog/" + blog.id}>
                    <h1 className="font-heading font-bold text-xl my-auto">
                      {blog.title}
                    </h1>
                    <p className="text-sm" style={{ maxLines: 2 }}>
                      {blog.text.slice(0, 50)} ...
                    </p>
                  </a>
                  <div className="flex border-t mt-5" style={{ justifyContent: "space-between" }}>
                    <ul className="pb-5 pt-3 border-gray-300" >
                      <li style={{ display: "inline" }} className="font-subheading text-gray-600 text-xs mr-5">
                        {blog.views} Views
                      </li>
                      <li style={{ display: "inline" }} className="font-subheading text-gray-600 text-xs">
                        {blog.count_comments ? blog.count_comments : 0} Comments
                      </li>
                    </ul>
                    <li style={{ display: "inline" }} className="font-subheading text-gray-600 pt-3">
                      0 <FavoriteBorderOutlinedIcon sx={{ fontSize: "18px", color: "#39bed2" }} />
                    </li>
                  </div>
                </div>
              </div>
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

export default BlogPage;
