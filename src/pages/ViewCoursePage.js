import { useState, useEffect } from "react";
// import Modal from "@mui/material/Modal";
// import loadScript from "./../helper/scriptLoader";
import axios from "axios";
import Accordion from "../components/Accordion";
import Layout from "../components/Layout";
import { useParams, useSearchParams } from "react-router-dom";
import { RWebShare } from "react-web-share";
import { ApiBaseURL, ApiEndpoints } from "./../components/ApiConfig";
// import Lottie from "react-lottie";
// import * as tickData from "../lottie/tick.json";
// import Blur from "react-blur";
import LockIcon from "@mui/icons-material/Lock";

import { useUserStore } from "./../store/store";
import InfoModal from "../components/infoModal";
import { useCookie } from "react-use";

const ViewCoursePage = () => {
  const user = useUserStore((state) => state.user);
  const [batches, setBatches] = useState([]);
  // const [loggedIn, ,updateLoggedIn] = useCookie('maang');
  const [loggedIn, ,] = useCookie("maang");
  // const updateUser = useUserStore((state) => state.updateUser);
  const { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  // console.log('pay_id', payid)
  // console.log('id', id)

  const [openInfoModal, setOpenInfoModal] = useState(false);
  // const [openSuccessModal, setOpenSuccessModal] = useState(false);
  // const [loaction, setLocation] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [coupon, setCoupon] = useState("");
  // const [validCoupon, setValidCoupon] = useState(false);
  // const [paymentStatus, setPaymentStatus] = useState("");

  const [course, setCourse] = useState({});

  // const defaultOptions = {
  //   loop: false,
  //   autoplay: true,
  //   animationData: tickData,
  //   // rendererSettings: {
  //   //   preserveAspectRatio: "xMidYMid slice",
  //   // },
  // };

  // ?payment_id=pay_LsXVsib70UhXLG

  const payid = searchParams.get("payment_id");
  if (payid && user.token) {
    axios
      .post(
        `${ApiBaseURL}course-management/payment-status/`,
        {
          payment_id: payid,
          course_id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + user.token,
          },
        }
      )
      .then((resp) => {
        searchParams.delete("payment_id");
        setSearchParams(searchParams);

        // fetch(
        //   'https://devdjango.maangcareers.com/course-management/user-batch/', {
        //   headers: {
        //     'Authorization': 'Token ' + user.token,
        //   }
        // }
        // ).then(res => res.json()).then(dat => {
        //   // console.log('res', dat)
        //   let data = user;
        //   data.user = {
        //     ...data.user,
        //     batches: dat
        //   }
        //   // console.log('data', data)

        //   updateLoggedIn(data);
        //   updateUser(data);

        window.location.replace("https://www.maangcareers.com/course/" + id);
        // })
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    fetch(`${ApiBaseURL}course-management/list-courses/` + id + "/")
      .then((res) => res.json())
      .then((data) => setCourse(data))
      .catch((err) => console.error(err));

    loggedIn &&
      fetch(`${ApiBaseURL}course-management/user-batch/`, {
        headers: {
          Authorization: `Token ${JSON.parse(loggedIn).token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setBatches(data.results))
        .catch((err) => console.error(err));
  }, [loggedIn, id]);

  // useEffect(() => {
  //   console.log(paymentStatus);
  // }, [paymentStatus]);

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
  //     `${process.env.REACT_APP_API_URL}/capturerazorpay`,
  //     {
  //       amount: !validCoupon
  //         ? parseFloat(discountedPrice) * 100
  //         : discountedPrice * validCoupon?.discount,
  //     }
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
  //     description: `Purchase ${course?.name}`,
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
  //         course: course?._id,
  //         totalAmount: parseFloat(discountedPrice) * 100,
  //         invoiceNumber: "00001",
  //       };

  //       const result = await axios.post(
  //         `${process.env.REACT_APP_API_URL}/order`,
  //         data
  //       );

  //       setPaymentStatus("success");
  //       setOpenSuccessModal(true);
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
  //   // console.log(res_data.data.coupon);
  // };

  // const SuccessModal = () => {
  //   return (
  //     <Modal
  //       open={openSuccessModal}
  //       onClose={() => setOpenSuccessModal(false)}
  //       aria-labelledby="modal-modal-title"
  //       aria-describedby="modal-modal-description"
  //     >
  //       <div className="flex h-screen items-center justify-center">
  //         <div className="bg-white rounded px-16 py-10">
  //           <Lottie
  //             options={defaultOptions}
  //             height={150}
  //             width={150}
  //           // isStopped={this.state.isStopped}
  //           // isPaused={this.state.isPaused}
  //           />

  //           <Link to="/time-table" className="font-heading">
  //             <p className="text-center mt-5">
  //               Check out my{" "}
  //               <span className="text-primary font-bold">time table</span>
  //             </p>
  //           </Link>
  //         </div>
  //       </div>
  //     </Modal>
  //   );
  // };

  const req = course?.requirements;
  const discountedPrice = course
    ? course.price - (course.price * course.discount_percentage) / 100
    : 0;

  return (
    <Layout>
      <div>
        <div
          className="py-10 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-x-5 pattern"
          // style={{ backgroundColor: "#272727" }}
        >
          <div className="flex flex-col justify-center px-5 md:pl-20 order-last lg:order-first">
            <h1 className="font-heading font-bold text-4xl  md:text-6xl text-white mb-4 leading-tight">
              {course?.name}
            </h1>
            <p className="font-heading text-lg md:text-2xl text-white mb-2">
              {course?.caption}
            </p>
            <p className="font-heading text-sm md:text-lg text-white mb-12">
              Instructor:{" "}
              <span className="font-bold text-primary">
                Mr. {course?.author_name}
              </span>
            </p>
            <h1 className="font-heading font-bold text-4xl  md:text-6xl text-white mb-10">
              ₹ {discountedPrice}/-{"  "}
              <span
                className="line-through font-medium text-xl md:text-4xl"
                style={{ color: "#4F4F4F" }}
              >
                ₹ {course?.price}/-
              </span>
            </h1>
            <div>
              {Object.keys(user).length <= 1 ? (
                <button
                  className="font-heading font-semibold text-white text-lg md:text-2xl rounded-sm bg-primary px-12 md:px-16 py-2 "
                  onClick={() => (window.location.href = "/login")}
                >
                  Buy Now
                </button>
              ) : batches.some((e) => {
                  return e.course.id === Number(id);
                }) ? (
                <button
                  className="font-heading font-semibold text-white text-lg md:text-2xl rounded-sm bg-primary px-12 md:px-16 py-2 "
                  onClick={() => (window.location.href = "/timetable")}
                >
                  Time Table
                </button>
              ) : (
                <button
                  className="font-heading font-semibold text-white text-lg md:text-2xl rounded-sm bg-primary px-12 md:px-16 py-2 "
                  onClick={() => setOpenInfoModal(true)}
                >
                  Buy Now
                </button>
              )}
            </div>
          </div>
          <div className="hidden md:mx-10 md:mb-10 md:flex flex-col items-center justify-center">
            <div className=" overflow-hidden shadow border-2">
              {/* <iframe
                title="mediadelivery"
                src={`https://iframe.mediadelivery.net/embed/58149/${course.demoVideoKey}`}
                loading="lazy"
                style={{
                  border: "none",
                  height: "360px",
                  width: "640px",
                }}
                allow="accelerometer; gyroscope;  encrypted-media; picture-in-picture;"
              ></iframe> */}
              <img
                src={course.thumbnail?.split("?")[0]}
                alt="course thumbnail"
              />
            </div>
          </div>
        </div>
        <div className="px-3 md:px-20 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-6">
            <div className=" col-span-2 mb-8 order-last md:order-first">
              <div>
                <h1 className="font-heading font-bold text-3xl text-gray-600">
                  Description
                </h1>
                <p className="mt-4 font-base mb-8 text-justify">
                  {course.description}
                </p>
                {/* <h1 className="font-heading font-bold text-3xl text-gray-600">
                  Who this course is for
                  </h1>
                  <p className="mt-4 font-base mb-8">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </p> */}
                <h1 className="font-heading font-bold text-3xl text-gray-600">
                  Requirements
                </h1>
                <ul className="mt-4 list-disc font-base ml-5 mb-8">
                  <li>
                    Laptop Requirements :{" "}
                    <span className="font-semibold bg-gray-500 text-white px-2 py-1 rounded">
                      Windows, Mac
                    </span>
                  </li>
                  {/* <li>Lot of dedication</li>
                  <li>Consistency</li> */}
                  {req &&
                    req.split("\n").map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            </div>
            <div className="">
              <div className="border-2 bg-white font-heading px-5 md:px-4 py-5">
                <h1 className="font-bold text-2xl mb-5 text-gray-600">
                  The course includes
                </h1>
                <ul className="space-y-6">
                  <li>
                    <div className="flex space-x-2 items-center">
                      <img src="/icons/videoIcon.svg" className="w-6" alt="" />
                      <p>{course.lectures} live lectures</p>
                    </div>
                  </li>
                  <li>
                    <div className="flex space-x-2 items-center">
                      <img src="/icons/videoIcon.svg" className="w-6" alt="" />
                      <p>{course.class_duration} hrs class duration</p>
                    </div>
                  </li>
                  {/* <li>
                    <div className="flex space-x-2 items-center">
                    <img
                    src="/icons/downloadIcon.svg"
                    className="w-6"
                    alt=""
                    />
                    <p>4 downloadable attachments</p>
                    </div>
                  </li> */}
                  <li>
                    {" "}
                    <div className="flex space-x-2 items-center">
                      <img src="/icons/timeIcon.svg" className="w-6" alt="" />
                      <p> {course.course_duration} weeks course length</p>
                    </div>
                  </li>
                  <li>
                    {" "}
                    <div className="flex space-x-2 items-center">
                      <img src="/icons/timeIcon.svg" className="w-6" alt="" />
                      <p> {course.projects} assignment projects</p>
                    </div>
                  </li>
                  {course.mobile_computer && (
                    <li>
                      {" "}
                      <div className="flex space-x-3 items-center">
                        <img
                          src="/icons/mobileIcon.svg"
                          className="w-6"
                          alt=""
                        />
                        <p>Watch in mobile and computer</p>
                      </div>
                    </li>
                  )}

                  {course.certificate && (
                    <li>
                      {" "}
                      <div className="flex space-x-2 items-center">
                        <img
                          src="/icons/certificateIcon.svg"
                          className="w-6"
                          alt="certificate"
                        />
                        <p>Certificate of completion</p>
                      </div>
                    </li>
                  )}
                </ul>
                <RWebShare
                  data={{
                    text: `${course.shortDescription}`,
                    url: `${window.location}`,
                    title: `${course.name}`,
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
        {/*  */}
        <div className="grid grid-cols-1 md:grid-cols-3 px-3 md:px-20 md:gap-x-10 mb-6">
          <div className=" col-span-2 mb-8">
            <div>
              <h1 className="font-heading font-bold text-3xl text-gray-600">
                Syllabus
              </h1>
              <div className="mt-5 ">
                {course?.syllabi?.map((week, index) => {
                  return (
                    <div
                      className="relative flex items-center justify-end w-full"
                      key={index}
                    >
                      <div className=" w-full">
                        <Accordion
                          {...week}
                          index={index}
                          opening={!week.lock}
                        />
                      </div>
                      {week.lock && (
                        <h1 className="absolute mx-3 text-gray-500">
                          <LockIcon />
                        </h1>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className=" ">
            <div className="border-2 bg-white font-heading px-8 py-5">
              <div className="flex items-center space-x-3">
                <div>
                  <img
                    src={course.author_photo?.split("?")[0]}
                    className="rounded-full w-20 border-2 border-primary"
                    alt="author_photo"
                  />
                </div>
                <div className=" flex flex-col">
                  <p className="font-heading   mb-2">
                    Author:{" "}
                    <span className="font-bold text-primary">
                      Mr. {course.author_name}
                    </span>
                  </p>
                  {/* <div className="flex bg-gray-400 rounded-full justify-center font-bold text-white py-1 text-sm">
                    <p>IIT kharagpur</p>
                  </div> */}
                </div>
              </div>
              <p className="pt-4 font-base text-sm ">{course.author_message}</p>
            </div>
          </div>
        </div>
        <InfoModal
          name={course.name}
          price={course.price}
          discount_percentage={course.discount_percentage}
          payment_id={course.payment_id}
          openInfoModal={openInfoModal}
          setOpenInfoModal={setOpenInfoModal}
        />
        {/* {SuccessModal()} */}
      </div>
    </Layout>
  );
};

export default ViewCoursePage;
