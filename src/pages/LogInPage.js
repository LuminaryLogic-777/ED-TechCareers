import React, { useState } from "react";
// import { Link } from "react-router-dom";

import { Formik } from "formik";
// import { object, string } from "yup";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
// import Checkbox from "@mui/material/Checkbox";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useCookie } from "react-use";

import { useUserStore } from "./../store/store";
import Navbar from "./../components/Navbar";
import { ApiBaseURL } from "../components/ApiConfig";

// let userLoginSchema = object({
//   username: string()
//     .required("Opps you forgot to enter your email")
//     .email("No this is not a valid email"),
//   password: string().required("Come on you cannot login without password"),
// });

const LogInPage = () => {
  const [, updateLoggedIn] = useCookie("maang");
  const updateUser = useUserStore((state) => state.updateUser);
  const [error, setError] = useState();

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      axios.defaults.withCredentials = true;
      let res = await axios.post(`${ApiBaseURL}api/login/`, values);

      let data = res.data;
      data.user = {
        ...data.user,
      };

      updateLoggedIn(data);
      updateUser(data);

      if (data.user) {
        let instructorCheckResponse = await axios.get(
          `${ApiBaseURL}test-management/user-valid-check/`,
          {
            headers: {
              Authorization: `Token ${data.token}`,
            },
          }
        );
        // console.log("token", data.token);

        //   if (
        //     instructorCheckResponse.data &&
        //     instructorCheckResponse.data.role === "Instructor"
        //   ) {
        //     window.location.replace("/mentor");
        //     return;
        //   } else {
        //     // Redirect to logout page for other roles
        //     window.location.replace("/"); // Update with the appropriate URL
        //     return;
        //   }
        // }

        if (
          instructorCheckResponse.data &&
          (instructorCheckResponse.data.role === "Instructor" ||
            instructorCheckResponse.data.role === "Student")
        ) {
          if (instructorCheckResponse.data.role === "Instructor") {
            window.location.replace("/mentor");
          } else {
            // Redirect to student dashboard or wherever you want
            window.location.replace("/");
          }
          return;
        } else {
          // Redirect to logout page for other roles
          window.location.replace("/login"); // Update with the appropriate URL
          return;
        }
      }

      // window.location.replace("/");
    } catch (error) {
      setError("Email or Password is Incorrect: ");
    }
    setSubmitting(false);
  };

  return (
    <div className="h-screen overflow-y-hidden bg-theme">
      {/* <div className="flex justify-between ">
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
            to="/signup"
            className="font-base text-gray-500 text-sm border-2 font-medium px-6 py-1 rounded cursor-pointer hover:bg-gray-200 hover:font-bold transition ease-in-out duration-500 "
          >
            Create Account
          </Link>
        </div>
      </div> */}
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        <div className="hidden lg:flex justify-center items-center ">
          <img src="assets/login.svg" alt="" />
        </div>
        <div className="flex flex-col justify-center items-center space-y-5 px-2 lg:px-5">
          <div className="flex flex-col  p-8  rounded space-y-5 bg-card shadow w-full lg:w-2/3">
            <div className="flex justify-between items-center">
              <h1 className="font-heading font-bold text-3xl pb-2 text-white">
                Log In
              </h1>
              <a
                href="/signup"
                className="cursor-pointerflex space-x-1 items-center font-heading font-medium text-lg pb-2 text-white hover:text-primary"
              >
                Sign Up
                <ArrowForwardIosIcon sx={{ fontSize: "14px" }} />
              </a>
            </div>
            <Formik
              initialValues={{ username: "", password: "" }}
              // validationSchema={userLoginSchema}
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
                      Email
                    </label> */}
                    <input
                      className="bg-textBox px-3 py-3 rounded-sm focus:outline-blue-500 text-sm  font-base text-gray-300 font-medium"
                      type="email"
                      name="username"
                      required
                      placeholder="Email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                    />
                    <p className="text-xs font-semibold font-base text-red-500">
                      {errors.username && touched.username && errors.username}
                    </p>
                  </div>

                  <div className="flex flex-col space-y-2">
                    {/* <label className="font-base text-gray-300  font-medium text-sm">
                      Password
                    </label> */}
                    <input
                      className="bg-textBox px-3 py-3  rounded-sm focus:outline-blue-500 text-sm font-base text-gray-300 font-medium"
                      type="password"
                      name="password"
                      required
                      placeholder="Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <p className="text-xs font-semibold  font-base text-red-500">
                      {errors.password && touched.password && errors.password}
                    </p>
                  </div>

                  {error && (
                    <p className="text-xs  font-base font-semibold text-red-500">
                      {error}
                    </p>
                  )}
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
                      <p>Log In</p>
                    </button>
                  </div>
                  {/* <p className="font-base text-sm text-center font-medium  text-gray-400">
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
          {/* <p className="font-base text-xs text-center font-medium  text-gray-400">
            Forgot your password? No Worries
            <br />
            <Link to="/" className="text-primary font-bold">
              Click here
            </Link>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
