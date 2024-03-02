import React, { useState } from "react";

import Layout from "../components/Layout";
import Header from "../components/Header";

// import AccordionText from "../components/AccordionText";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

import Slider from "react-slick";
import ContactUsModal from "./ContactUsModal";

const BlogPage = () => {
  const [openContactUs, setOpenContactUs] = useState(false);

  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <Layout title="About Us">
      <Header
        title="Blogs"
        subTitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      />

      <div className="px-3 md:px-20 mt-10">
        {/* <h1 className="font-heading font-bold text-2xl md:text-3xl ">
          Featured Stories
        </h1> */}
        <div className="grid grid-cols-1 md:grid-cols-2 px-3 md:px-10 mt-5 gap-x-10">
          <div className="">
            {/* <h1 className="font-heading font-bold text-2xl md:text-3xl hidden lg:flex">
            Our Story
          </h1> */}
            <Slider {...settings2}>
              <img src="https://source.unsplash.com/random/800x600/?img=1" alt="" />
              <img src="https://source.unsplash.com/random/800x600/?img=2" alt="" />
              <img src="https://source.unsplash.com/random/800x600/?img=3" alt="" />
              <img src="https://source.unsplash.com/random/800x600/?img=4" alt="" />
              <img src="https://source.unsplash.com/random/800x600/?img=5" alt="" />
            </Slider>
          </div>
          <div className=" order-first md:order-last mb-5 space-y-6 md:mb-0">
            <h1 className="font-heading font-bold text-2xl md:text-3xl flex">
              Popular Stories
            </h1>
            <div className="w-full mx-4 p-5 flex" style={{ backgroundColor: 'white', borderRadius: '16px' }}>
              <img src="https://source.unsplash.com/random/100x100/?img=1" alt="" />
              <h1 className="font-heading font-bold text-2xl md:text-3xl hidden lg:flex ml-5">
                first Heading
              </h1>
            </div>
            <div className="w-full mx-4 p-5 flex" style={{ backgroundColor: 'white', borderRadius: '16px' }}>
              <img src="https://source.unsplash.com/random/100x100/?img=1" alt="" />
              <h1 className="font-heading font-bold text-2xl md:text-3xl hidden lg:flex ml-5">
                second Heading
              </h1>
            </div>
            <div className="w-full mx-4 p-5 flex" style={{ backgroundColor: 'white', borderRadius: '16px' }}>
              <img src="https://source.unsplash.com/random/100x100/?img=1" alt="" />
              <h1 className="font-heading font-bold text-2xl md:text-3xl hidden lg:flex ml-5">
                third Heading
              </h1>
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
      
      <div className="px-3 md:px-20 mt-10 shadow-inside" >

        <h1 className="font-heading font-bold text-2xl md:text-3xl w-100 flex justify-center mt-20 pt-20">
          Featured Stories/Articles
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 space-y-10 lg:space-t-20 mb-20">

          <div className="px-5 mt-10">
            <div className="bg-white flex flex-col p-4 rounded ">
              <img src="/images/ajay.png" alt="" />
              <h1 className="font-heading font-bold text-xl text-center mt-5">
                Article Title
              </h1>
              <div className="flex justify-center">
                <p className=" bg-cardRed  mt-3 px-8 py-1 font-base text-white rounded-full font-semibold text-xs">
                  6 min
                </p>
              </div>
            </div>
          </div>

          <div className="px-5 ">
            <div className="bg-white flex flex-col p-4 rounded ">
              <img src="/images/ajay.png" alt="" />
              <h1 className="font-heading font-bold text-xl text-center mt-5">
                Article Title
              </h1>
              <div className="flex justify-center">
                <p className=" bg-cardRed  mt-3 px-8 py-1 font-base text-white rounded-full font-semibold text-xs">
                  6 min
                </p>
              </div>
            </div>
          </div>

          <div className="px-5 ">
            <div className="bg-white flex flex-col p-4 rounded ">
              <img src="/images/ajay.png" alt="" />
              <h1 className="font-heading font-bold text-xl text-center mt-5">
                Article Title
              </h1>
              <div className="flex justify-center">
                <p className=" bg-cardRed  mt-3 px-8 py-1 font-base text-white rounded-full font-semibold text-xs">
                  6 min
                </p>
              </div>
            </div>
          </div>

          <div className="px-5 ">
            <div className="bg-white flex flex-col p-4 rounded ">
              <img src="/images/ajay.png" alt="" />
              <h1 className="font-heading font-bold text-xl text-center mt-5">
                Article Title
              </h1>
              <div className="flex justify-center">
                <p className=" bg-cardRed  mt-3 px-8 py-1 font-base text-white rounded-full font-semibold text-xs">
                  6 min
                </p>
              </div>
            </div>
          </div>

          <div className="px-5 ">
            <div className="bg-white flex flex-col p-4 rounded ">
              <img src="/images/ajay.png" alt="" />
              <h1 className="font-heading font-bold text-xl text-center mt-5">
                Article Title
              </h1>
              <div className="flex justify-center">
                <p className=" bg-cardRed  mt-3 px-8 py-1 font-base text-white rounded-full font-semibold text-xs">
                  6 min
                </p>
              </div>
            </div>
          </div>

          <div className="px-5 ">
            <div className="bg-white flex flex-col p-4 rounded ">
              <img src="/images/ajay.png" alt="" />
              <h1 className="font-heading font-bold text-xl text-center mt-5">
                Article Title
              </h1>
              <div className="flex justify-center">
                <p className=" bg-cardRed  mt-3 px-8 py-1 font-base text-white rounded-full font-semibold text-xs">
                  6 min
                </p>
              </div>
            </div>
          </div>

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
