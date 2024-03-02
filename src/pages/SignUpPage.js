import React, { useState } from "react";
// import { Link } from "react-router-dom";

import { Formik } from "formik";
import { object, string } from "yup";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import Navbar from "../components/Navbar";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ApiBaseURL } from "../components/ApiConfig";

let userSignupSchema = object({
  name: string().required("Name is required"),
  email: string().required("Email is required").email(),
  password: string().required("Password is required").min(8),
});

const SignUpPage = () => {
  const [error, setError] = useState();
  // const [msg, setMsg] = useState();

  const handleFormSubmit = async (values, { setSubmitting }) => {
    if (values.password !== values.confirm_password) {
      setError("Passwords do not match");
      return;
    }
    try {
      // const res = await axios.post(
      //   `${process.env.REACT_APP_API_URL}/signup`,
      //   values
      // );

      await axios.post(
        `${ApiBaseURL}api/signup/`,
        {
          user: {
            username: values.email,
            email: values.email,
            first_name: values.name.split(" ")[0],
            last_name: values.name.split(" ").slice(1).join(" "),
            password: values.password
          },
          phone_num: values.phone_num,
        }
      );
      setSubmitting(false);
      // setMsg("Email verification link has been send to your email.");
      window.location.replace('/login')
    } catch (error) {
      // console.log(error);
      if (error.response.status === 400) setError("Email address already in use");
      else setError(error.message);
      setSubmitting(false);
    };
  }

  return (
    <div className="h-screen bg-theme">
      {/* <div className="flex justify-between">
        <div className="p-3 flex items-center cursor-pointer">
          <img src="icons/back.svg" className="w-6" alt="" />
          <Link
            to="/"
            className="font-base text-sm text-gray-500 font-medium hover:text-gray-600 hover:font-bold transition ease-in-out duration-500"
          >
            Go Back To Home
          </Link>
        </div>
        <div className="p-3">
          <Link
            to="/login"
            className="font-base text-gray-500 font-medium text-sm border-2 px-12 py-1 rounded cursor-pointer hover:bg-gray-200 hover:font-bold transition ease-in-out duration-500 "
          >
            Log In
          </Link>
        </div>
      </div> */}
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-theme h-full">
        <div className="hidden lg:flex justify-center items-center">
          <img src="assets/login.svg" alt="" />
        </div>
        <div className="flex flex-col justify-center items-center space-y-5 px-3">
          <div className="flex flex-col  p-8  rounded space-y-5 bg-card  shadow w-full lg:w-2/3">
            <div className="flex justify-between items-center">
              <h1 className="font-heading font-bold text-3xl pb-2 text-white">
                Sign Up
              </h1>
              <a
                href="/login"
                className="cursor-pointer flex space-x-1 items-center font-heading font-medium text-lg pb-2 text-white hover:text-primary"
              >
                Log In
                <ArrowForwardIosIcon sx={{ fontSize: "14px" }} />
              </a>
            </div>
            {/*  */}
            <Formik
              initialValues={{ name: "", email: "", phone_num: "", password: "", confirm_password: "" }}
              validationSchema={userSignupSchema}
              onSubmit={handleFormSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form className="space-y-5">
                  <div className="flex flex-col space-y-2">
                    {/* <label className="font-base text-gray-300 font-medium text-sm">
                      Name
                    </label> */}
                    <input
                      className="bg-textBox px-3 py-3 rounded-sm focus:outline-blue-500 text-sm  font-base text-gray-300"
                      type="text"
                      name="name"
                      placeholder="Name"
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    <p className="text-xs  font-base font-semibold text-red-500">
                      {errors.name && touched.name && errors.name}
                    </p>
                  </div>

                  <div className="flex flex-col space-y-2">
                    {/* <label className="font-base text-gray-300 font-medium text-sm">
                      Email
                    </label> */}
                    <input
                      className="bg-textBox px-3 py-3 rounded-sm focus:outline-blue-500 text-sm  font-base text-gray-300"
                      type="email"
                      name="email"
                      required
                      placeholder="E-Mail"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    <p className="text-xs  font-base font-semibold text-red-500">
                      {errors.email && touched.email && errors.email}
                    </p>
                  </div>

                  <div className="flex flex-col space-y-2">
                    {/* <label className="font-base text-gray-300 font-medium text-sm">
                      Email
                    </label> */}
                    <input
                      className="bg-textBox px-3 py-3 rounded-sm focus:outline-blue-500 text-sm  font-base text-gray-300"
                      type="tel"
                      name="phone_num"
                      required
                      placeholder="Phone Number"
                      maxLength={10}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phone_num}
                    />
                    <p className="text-xs  font-base font-semibold text-red-500">
                      {errors.phone_num && touched.phone_num && errors.phone_num}
                    </p>
                  </div>

                  <div className="flex flex-col space-y-2">
                    {/* <label className="font-base text-gray-300 font-medium text-sm">
                      Password
                    </label> */}
                    <input
                      className="bg-textBox px-3 py-3 rounded-sm focus:outline-blue-500 text-sm font-base text-gray-500"
                      type="password"
                      name="password"
                      placeholder="Password"
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <input
                      className="bg-textBox px-3 py-3 rounded-sm focus:outline-blue-500 text-sm font-base text-gray-500"
                      type="password"
                      name="confirm_password"
                      placeholder="Confirm Password"
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirm_password}
                    />
                    <p className="text-xs  font-base font-semibold text-red-500">
                      {errors.password && touched.password && errors.password}
                    </p>
                  </div>
                  {error && (
                    <p className="text-xs  font-base text-red-500 font-semibold">
                      {error}
                    </p>
                  )}

                  {/* {msg && (
                    <p className="text-xs  font-base text-green-500 font-semibold">
                      {msg}
                    </p>
                  )} */}
                  <div className="w-full pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                      className="flex items-center justify-center space-x-2 bg-primary text-white font-base  py-2 rounded-sm w-full hover:bg-primaryDark transition duration-500"
                    >
                      <ClipLoader
                        color="#ffffff"
                        loading={isSubmitting}
                        size={10}
                      />
                      <p>Sign Up</p>
                    </button>
                  </div>
                  {/* <p className="font-base text-sm text-center  text-gray-400">
                    or
                  </p> */}
                  {/* <div className="flex justify-between">
                    <div
                      className=" px-12 py-3 rounded cursor-pointer hover:bg-gray-200 transition ease-in-out duration-500"
                      style={{
                        border: "1px solid #3D444F",
                        backgroundColor: "#242A32",
                      }}
                    >
                      <img src="logos/google.svg" alt="" />
                    </div>
                    <div
                      className="border-2 border-gray-200 px-12 py-3 rounded cursor-pointer hover:bg-gray-200 transition ease-in-out duration-500"
                      style={{
                        border: "1px solid #3D444F",
                        backgroundColor: "#242A32",
                      }}
                    >
                      <img src="logos/instagram.svg" alt="" />
                    </div>
                    <div
                      className="border-2 border-gray-200 px-12 py-3 rounded cursor-pointer hover:bg-gray-200 transition ease-in-out duration-500"
                      style={{
                        border: "1px solid #3D444F",
                        backgroundColor: "#242A32",
                      }}
                    >
                      <img src="logos/linkedin.svg" alt="" />
                    </div>
                  </div> */}
                  {/* <div>
                    <button className="flex justify-center space-x-3 border-2 py-2 border-gray-700 text-sm items-center  w-full font-base text-white bg">
                      <img src="logos/google.svg" alt="" />
                      <p>Login with Google</p>
                    </button>
                  </div> */}
                </form>
              )}
            </Formik>
            {/*  */}
          </div>
          <p className="font-base text-xs text-center  text-gray-400">
            By clicking on Signup you agree to the
            <br />
            <a href="/terms-and-condition" className="text-primary font-bold">
              Terms and Conditions
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
