import React, { useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import { ApiBaseURL, ApiEndpoints } from "./ApiConfig";
// import loadScript from "./../helper/scriptLoader";

import { RWebShare } from "react-web-share";
import { IconButton } from "@mui/material";
// import axios from "axios";

import { useUserStore } from "./../store/store";
import InfoModal from "./infoModal";
import { useCookie } from "react-use";
import { useEffect } from "react";

const CourseCard = ({
  // author_message,
  // author_name,
  // author_photo,
  // caption,
  // certificate,
  // class_duration,
  course_duration,
  // demo_video,
  // description,
  discount_percentage,
  id,
  lectures,
  // mobile_computer,
  name,
  popular,
  // pre_recorded,
  premium,
  price,
  projects,
  // requirements,
  short_description,
  thumbnail,
  payment_id,
}) => {
  const [openInfoModal, setOpenInfoModal] = useState(false);
  // const [openSuccessModal, setOpenSuccessModal] = useState(false);
  // const [validCoupon, setValidCoupon] = useState(false);

  const user = useUserStore((state) => state.user);

  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [loaction, setLocation] = useState("");
  // const [paymentStatus, setPaymentStatus] = useState("");

  // const [coupon, setCoupon] = useState("");

  const discountedPrice = price - (price * discount_percentage) / 100;

  const [batches, setBatches] = useState([]);
  const [loggedIn, ,] = useCookie("maang");

  useEffect(() => {
    loggedIn &&
      fetch(
        `${ApiBaseURL}
        course-management/user-batch/`,
        {
          headers: {
            Authorization: `Token ${JSON.parse(loggedIn).token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => setBatches(data.results))
        .catch((err) => console.error(err));
  }, [loggedIn]);

  // const handleSubmit = async () => {
  //   setOpenInfoModal(false);

  //   const res = await loadScript(
  //     "https://checkout.razorpay.com/v1/checkout.js"
  //   );
  //   if (!res) {
  //     alert("Razorpay SDK failed to load. Are you online?");
  //     return;
  //   }

  //   // creating a new order
  //   const result = await axios.post(
  //     // `${process.env.REACT_APP_API_URL}/capturerazorpay`,
  //     // {
  //     //   amount: !validCoupon
  //     //     ? parseFloat(discountedPrice) * 100
  //     //     : discountedPrice * discount,
  //     // }
  //   );

  //   if (!result) {
  //     alert("Server error. Are you online?");
  //     return;
  //   }

  //   // Getting the order details back
  //   const { amount, id: order_id, currency } = result.data.order;

  //   const options = {
  //     key: process.env.RAZORPAY_API_KEY,
  //     amount: amount.toString(),
  //     currency: currency,
  //     name: "MAANG Careers",
  //     description: `Purchase ${name}`,
  //     image: {},
  //     order_id: order_id,

  //     handler: async function (response) {
  //       setPaymentStatus("processing");

  //       const data = {
  //         paymentInfo: {
  //           orderCreationId: order_id,
  //           razorpayPaymentId: response.razorpay_payment_id,
  //           razorpayOrderId: response.razorpay_order_id,
  //           razorpaySignature: response.razorpay_signature,
  //         },
  //         course: id,
  //         totalAmount: parseFloat(discountedPrice) * 100,
  //         invoiceNumber: "00001",
  //       };

  //       const result = await axios.post(
  //         `${process.env.REACT_APP_API_URL}/order`,
  //         data
  //       );

  //       setPaymentStatus("success");
  //       // setOpenSuccessModal(true);
  //     },
  //     prefill: {
  //       name: user?.name,
  //       email: user?.email,
  //       contact: phoneNumber,
  //     },
  //     notes: {
  //       address: "Soumya Dey Corporate Office",
  //     },
  //     theme: {
  //       color: "#2DB2C4",
  //     },
  //   };

  //   const paymentObject = new window.Razorpay(options);
  //   paymentObject.open();
  // };

  // const handleCouponSubmit = async () => {
  //   const res_data = await axios.post(
  //     `${process.env.REACT_APP_API_URL}/coupon`,
  //     {
  //       code: coupon,
  //     }
  //   );

  //   setValidCoupon(res_data.data.coupon);
  // };
  return (
    <div className="relative flex">
      <div className=" bg-white flex justify-between max-w-fit flex-col shadow rounded ">
        <div>
          <div className="flex justify-between items-center px-4 py-2">
            <h1 className="font-heading font-bold text-base md:text-lg text-gray-700">
              {name}
            </h1>

            <RWebShare
              data={{
                text: `${short_description}`,
                url: `${window.location}course/${id}`,
                title: `${name}`,
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <IconButton>
                <ShareIcon sx={{ color: "gray", fontSize: "18px" }} />
              </IconButton>
            </RWebShare>
          </div>
          <img
            src={thumbnail.split("?")[0]}
            alt="course_image"
            width={"100%"}
            height={"100%"}
          />
          <div className="flex items-center space-x-5 px-4 py-5">
            <div className="flex items-baseline space-x-2">
              <h1 className="font-heading font-bold text-1.5xl md:text-3xl text-gray-700">
                ₹{discountedPrice}/-
              </h1>
              <h1 className="font-heading text-sm md:text-base text-gray-400 line-through">
                ₹{price}
              </h1>
            </div>
            <div
              className=" text-white font-bold px-3 lg:px-5 py-1 text-xs flex items-center justify-center rounded"
              style={{ backgroundColor: "#F9AC38" }}
            >
              <p className="font-base">{discount_percentage}% Discount</p>
            </div>
          </div>
          <div className="px-4 font-base text-sm   flex flex-col">
            <p>{short_description}</p>
            <div className="flex space-x-1 py-5">
              <div className="bg-gray-500 flex font-medium text-white max-w-fit py-1 px-5 rounded-full text-xs justify-center items-center">
                {lectures} lectures
              </div>
              <div className="bg-gray-500 flex font-medium text-white max-w-fit py-1 px-5 rounded-full text-xs justify-center items-center">
                {course_duration} weeks
              </div>
              <div className="bg-gray-500 flex font-medium text-white max-w-fit py-1 px-5 rounded-full text-xs justify-center items-center">
                {projects} projects
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 flex space-x-2 mb-3">
          <button
            className="border-2 border-primary py-2 w-1/2 font-heading font-bold text-gray-800 rounded hover:bg-primary hover:text-white transition duration-500"
            onClick={() => (window.location.href = "/course/" + id)}
          >
            Learn More
          </button>
          {Object.keys(user).length <= 1 ? (
            <button
              className="bg-primary py-2 w-1/2 font-heading font-bold text-white rounded"
              onClick={() => (window.location.href = "/login")}
            >
              Buy Now
            </button>
          ) : batches?.some((e) => {
              return e.course.id === id;
            }) ? (
            <button
              className="bg-primary py-2 w-1/2 font-heading font-bold text-white rounded"
              onClick={() => (window.location.href = "/timetable")}
            >
              Time Table
            </button>
          ) : (
            <button
              className="bg-primary py-2 w-1/2 font-heading font-bold text-white rounded"
              onClick={() => setOpenInfoModal(true)}
            >
              Buy Now
            </button>
          )}
        </div>
        <InfoModal
          name={name}
          price={price}
          discount_percentage={discount_percentage}
          payment_id={payment_id}
          openInfoModal={openInfoModal}
          setOpenInfoModal={setOpenInfoModal}
        />
      </div>
      {popular && (
        <div className="absolute bg-blue z-50 bg-green-400 font-bold rounded-full text-xs font-base text-white px-5 py-1 -top-4 left-4">
          Popular
        </div>
      )}
      {premium && (
        <div className="absolute bg-blue z-50 bg-yellow-400 font-bold rounded-full text-xs font-base text-white px-5 py-1 -top-4 left-28">
          Permium
        </div>
      )}
    </div>
  );
};

export default CourseCard;
