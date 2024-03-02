import React, { useEffect, useState } from "react";

import Layout from "../components/Layout";
import Header from "../components/Header";

// import AccordionText from "../components/AccordionText";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareIcon from "@mui/icons-material/Share";
import { ApiBaseURL } from "../components/ApiConfig";

// import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

import ContactUsModal from "./ContactUsModal";
import { useParams } from "react-router-dom";
import { RWebShare } from "react-web-share";
import { IconButton } from "@mui/material";

const ArticlePage = () => {
  const [openContactUs, setOpenContactUs] = useState(false);
  const [blog, setBlog] = useState([])
  const [blogs, setBlogs] = useState([])
  const [height, setHeight] = useState(300)
  const { id } = useParams();

  useEffect(() => {
    fetch(`${ApiBaseURL}website-management/blogs/` + id + '/')
      .then(res => res.json())
      .then(data => setBlog(data))
      .catch(err => console.error(err))
  }, [id])

  useEffect(() => {
    fetch(`${ApiBaseURL}website-management/blogs/`)
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(err => console.error(err))
  }, [])

  var options = { month: 'long', day: 'numeric' };

  var style = window.innerWidth >= 768 ? { overflow: "hidden", height: height-200 } : {}

  return (
    <Layout title="About Us">
      <Header
        title="#blog"
        subTitle="Experience the Unexperienced !"
      />

      <div className="mx-3 lg:mx-20 px-1 md:px-10 lg:px-20">
        <ul className="py-5 mt-auto">
          <li style={{ display: "inline" }} className="font-subheading text-gray-600 text-sm">{blog.views} Views</li>
          <li style={{ display: "inline" }} className="font-subheading text-gray-600 text-sm"> · </li>
          <li style={{ display: "inline" }} className="font-subheading text-gray-600 text-sm">{blog.read_time} min</li>
        </ul>
        <h1 className="font-heading font-bold text-2xl md:text-5xl mb-5 ml-0">
          {blog.title}
        </h1>
        <div className="md:mt-10 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-10 md:space-x-5">
            <div className="w-full order-first col-span-7">
              <img src={blog.photo} alt="" className="rounded" onLoad={(img) => setHeight(img.target.offsetHeight)} />
            </div>
            <div className="col-span-3">
              <div className="border-2 bg-white font-heading px-5 md:px-4 pt-5 mb-10 rounded" style={{ height: "100%" }}>
                <h1 className="font-bold text-xl mb-5 text-gray-600">
                  This Blog Includes
                </h1>
                <ul className="space-y-5" style={style}>
                  {
                    blog.topics && blog.topics.sort(function (a, b) { return a.id - b.id }).map((topic, i) =>
                      <li>
                        <div className="flex space-x-2 items-center">
                          <img
                            src="/icons/certificateIcon.svg"
                            className="w-6"
                            alt="certificate"
                          />
                          <p>{topic.title}</p>
                        </div>
                      </li>
                    )
                  }
                </ul>
                <div className="mt-2">
                  <RWebShare
                    data={{
                      // text: `${course.shortDescription}`,
                      url: `${window.location}`,
                      title: `${blog.title}`,
                    }}
                  // onClick={() => console.log("shared successfully!")}
                  >
                    <button
                      className="font-heading font-semibold text-white rounded-sm bg-primary w-full mt-7 py-2 "
                    // onClick={() => setOpenInfoModal(true)}
                    >
                      Share Now
                    </button>
                  </RWebShare>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-10 md:space-x-5">
            <div className="col-span-7">
              <p className="font-base mb-8 text-justify mt-5 mb-5 text-justify">
                {blog.text}
              </p>
              {blog.topics && blog.topics.map((topic, i) => <>
                <h2 className="font-heading font-bold text-2xl text-gray-600 flex">
                  {topic.title}
                </h2>
                <p className="my-5 font-base mb-8 text-justify">
                  {topic.text}
                </p>
              </>
              )}
              <p style={{ textAlignLast: "right" }}>
                - MAANGCareers Team
              </p>
              <div className="flex border-t mt-10" style={{ justifyContent: "space-between", borderColor: "gray" }}>
                <ul className="py-1 mt-5 mb-20">
                  <li style={{ display: "inline" }} className="font-subheading font-bold text-gray-600 text-xs mr-5">{blog.views} Views</li>
                  <li style={{ display: "inline" }} className="font-subheading font-bold text-gray-600 text-xs">{blog.count_comments ? blog.count_comments : 0} comments</li>
                </ul>
                <li style={{ display: "inline" }} className="font-subheading font-bold text-gray-600 pt-5">
                  0 <FavoriteBorderOutlinedIcon sx={{ fontSize: "18px", color: "#39bed2" }} />
                </li>
              </div>
            </div>

            <div className="col-span-3 font-heading py-5 hidden md:block">
              <div className="flex items-center bg-white space-x-3 pt-5 px-2" style={{
                borderTopRightRadius: 6,
                borderTopLeftRadius: 6
              }}>
                <div>
                  <img
                    src="https://maangcareers-media.s3.amazonaws.com/default.png"
                    className="rounded-full w-20 border-2 border-primary"
                    alt="author_photo"
                  />
                </div>
                <div>
                  <p className="font-heading mb-2">
                    Author:{" "}
                    <span className="font-bold text-primary">MAANGCareers Blog Team</span>
                  </p>
                  {/* <div className="flex bg-gray-400 rounded-full justify-center font-bold text-white py-1 text-sm">
                    <p>IIT kharagpur</p>
                  </div> */}
                </div>
              </div>
              <p className="py-4 font-base text-sm bg-white px-2" style={{
                borderBottomRightRadius: 6,
                borderBottomLeftRadius: 6
              }}>
                Hi there, we're so glad you're here. This post might change your perspective. Good luck.
              </p>

              <div className="mb-5 mt-10 space-y-4 md:mb-0 hidden md:block">
                <h1 className="font-heading font-bold text-xl md:text-2xl flex">
                  Popular Stories
                </h1>
                {
                  blogs.filter((blog, i) => blog.popular === true).map((blog, i) =>
                    <div className="flex" key={i} style={{
                      // border: '1px solid #000000',
                      backgroundColor: 'white',
                      height: "125px",
                      borderRadius: 6
                    }}>
                      <img src={blog.photo} alt="" style={{
                        objectFit: "cover",
                        overflow: "hidden",
                        borderTopLeftRadius: 6,
                        borderBottomLeftRadius: 6,
                        width: 150,
                      }} />
                      <div className="bg-white flex flex-col rounded w-full pl-2">
                        <div className="flex" style={{ justifyContent: "space-between" }}>
                          <ul className="py-2">
                            <li style={{ display: "inline" }} className="font-subheading text-gray-600 text-xs mr-1">{new Date(blog.date).toLocaleDateString("en-US", options)}</li>
                            <li style={{ display: "inline" }} className="font-subheading text-gray-600 text-xs"> · </li>
                            <li style={{ display: "inline" }} className="font-subheading text-gray-600 text-xs ml-1">{blog.read_time} min</li>
                          </ul>
                          <li style={{ display: "inline" }} className="font-subheading text-gray-600 pt-1">
                            <IconButton>
                              <ShareIcon sx={{ fontSize: "18px" }} />
                            </IconButton>
                          </li>
                        </div>
                        <a href={"/blog/" + blog.id}>
                          <h1 className="font-heading md:font-bold text-xs xl:text-md my-auto">
                            {blog.title.length < 40 ? blog.title : blog.title.slice(0, 40) + '...'}
                          </h1>
                        </a>
                        <div className="flex border-t mt-5" style={{ justifyContent: "space-between" }}>
                          <ul className="py-1 mt-auto border-t mb-2">
                            <li style={{ display: "inline" }} className="font-subheading text-gray-600 text-xs mr-2">{blog.views} Views</li>
                            {/* <li style={{ display: "inline" }} className="font-subheading text-gray-600 text-xs">{blog.count_comments ? blog.count_comments : 0} comments</li> */}
                          </ul>
                          <li style={{ display: "inline" }} className="font-subheading text-gray-600 pt-1 mr-2">
                            0 <FavoriteBorderOutlinedIcon sx={{ fontSize: "18px", color: "#39bed2" }} />
                          </li>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactUsModal
        openModal={openContactUs}
        setOpenModal={setOpenContactUs}
      />
    </Layout >
  );
};

export default ArticlePage;