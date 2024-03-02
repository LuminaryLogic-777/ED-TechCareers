import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import "tippy.js/themes/light.css";
import ClipLoader from "react-spinners/ClipLoader";
import MenuIcon from "@mui/icons-material/Menu";

// mui
import Modal from "@mui/material/Modal";

import { useUserStore } from "./../store/store";
import ContactUsModal from "../pages/ContactUsModal";
import { ApiBaseURL, ApiEndpoints } from "./ApiConfig";
import axios from "axios";
import { IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import Drawer from "@mui/material/Drawer";
import { useCookie } from "react-use";
// import { object } from "yup";

const Navbar = () => {
  const user = useUserStore((state) => state.user);

  const [profile, setProfile] = useState(user); // TODO: remove profile and setProfile and only use 'user'
  const [openSideNav, setOpenSideNav] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile(user);
    }
  }, [user]);

  // const updateUser = useUserStore((state) => state.updateUser);
  const removeAllUser = useUserStore((state) => state.removeAllUser);
  const [openContactUs, setOpenContactUs] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const generateInitials = (name) => {
    if (name) {
      name.trim();

      let parts = name.split(" ");

      if (parts.length > 1) {
        return (parts[0].charAt(0) + parts[1].charAt(1)).toUpperCase();
      } else {
        return (parts[0].charAt(0) + parts[0].charAt(1)).toUpperCase();
      }
    }
  };

  const handleChange = (name) => (event) => {
    setProfile({ ...profile, [name]: event.target.value });
  };

  const handleSubmit = async () => {
    // console.log(profile);
    // const res = await axios.post(
    //   `${process.env.REACT_APP_API_URL}/userdashboard/update`,
    //   profile
    // );
    // console.log(res);
  };

  const [, , deleteLoggedIn] = useCookie("maang");

  async function logout() {
    // await axios.get(
    //   `${process.env.REACT_APP_API_URL}/logout`
    // );

    await axios.post(
      `${ApiBaseURL}
    api/auth/logout/`,
      null,
      {
        headers: {
          Authorization: "Token " + user.token,
        },
      }
    );

    deleteLoggedIn();
    removeAllUser();
    // updateUser(false);
    document.location.reload();
  }

  const SideNav = () => {
    return (
      <Drawer
        anchor="right"
        open={openSideNav}
        // onClose={toggleDrawer(anchor, false)}
      >
        <div className="w-72 h-full" style={{ backgroundColor: "#202833" }}>
          <div className="flex flex-col justify-between h-screen rounded-lb-3">
            <div className="flex justify-end p-5 text-white">
              <CancelIcon
                onClick={() => {
                  setOpenSideNav(false);
                }}
              />
            </div>
            <ul className="flex flex-col font-base text-white space-y-12 h-full px-10 pb-10">
              <li
                className={
                  window.location.pathname === "/"
                    ? "text-primary font-semibold cursor-pointer"
                    : "cursor-pointer"
                }
                onClick={() => (window.location.href = "/")}
              >
                Home
              </li>

              <li
                className={
                  window.location.pathname === "/about-us"
                    ? "text-primary font-semibold cursor-pointer"
                    : "cursor-pointer"
                }
                onClick={() => (window.location.href = "/about-us")}
              >
                About Us
              </li>

              <li
                className={
                  window.location.pathname === "/how-it-works"
                    ? "text-primary font-semibold cursor-pointer"
                    : "cursor-pointer"
                }
                onClick={() => (window.location.href = "/how-it-works")}
              >
                How It Works
              </li>

              <li
                className="cursor-pointer"
                onClick={() => setOpenContactUs(true)}
              >
                Contact Us
              </li>
            </ul>
            <p className="font-bold text-gray-600 text-center text-sm p-5">
              Version 1.0.0
            </p>
          </div>
        </div>
      </Drawer>
    );
  };

  function getName() {
    if (user !== {} && user.user !== {})
      return user.user.username.split("@")[0];
    else return "";
  }

  // console.log(Object.keys(user).length <= 1)

  return (
    <div>
      <Modal
        open={openProfileModal}
        onClose={() => setOpenProfileModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="h-screen flex justify-center items-center">
          <div className="bg-white w-2/3 rounded p-5 space-y-5">
            <div className="border-b-2 pb-3 space-y-1">
              <h1 className="font-heading text-2xl font-bold ">Profile</h1>
              <p className="font-base text-sm font-semibold text-gray-500">
                Welcome, {getName()} 👋
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-base text-gray-500 text-sm font-medium">
                Email
              </label>
              <input
                className=" px-3 py-3 border-2 rounded-sm focus:outline-blue-500 text-sm  font-base text-gray-600 w-1/2"
                type="text"
                // name="name"
                // onChange={handleChange}
                // onBlur={handleBlur}
                value={profile.email}
              />
              {/* <p className="text-xs  font-base text-red-500">
                      {errors.name && touched.name && errors.name}
                    </p> */}
            </div>
            <div className="flex w-full space-x-3">
              <div className="flex flex-col space-y-2 w-1/2">
                <label className="font-base text-gray-500 text-sm font-medium">
                  Name
                </label>
                <input
                  className=" px-3 py-3 border-2 rounded-sm focus:outline-blue-500 text-sm  font-base text-gray-600 "
                  type="text"
                  // name="name"
                  onChange={handleChange("name")}
                  // onBlur={handleBlur}
                  value={profile.name}
                />
                {/* <p className="text-xs  font-base text-red-500">
                      {errors.name && touched.name && errors.name}
                    </p> */}
              </div>
              <div className="flex flex-col space-y-2 w-1/2">
                <label className="font-base text-gray-500 text-sm font-medium">
                  Phone Number
                </label>
                <input
                  className="px-3 py-3 border-2 rounded-sm focus:outline-blue-500 text-sm  font-base text-gray-600 "
                  type="text"
                  // name="name"
                  onChange={handleChange("phone")}
                  // onBlur={handleBlur}
                  value={profile.phone}
                />
                {/* <p className="text-xs  font-base text-red-500">
                      {errors.name && touched.name && errors.name}
                    </p> */}
              </div>
            </div>

            <div className="flex w-full justify-end pt-1 space-x-4">
              <button
                type="submit"
                // disabled={isSubmitting}
                onClick={() => setOpenProfileModal(false)}
                className="flex items-center justify-center space-x-2 bg-gray-400 text-white text-sm font-base font-semibold py-2 rounded-sm px-9 hover:bg-gray-500 transition duration-500"
              >
                <ClipLoader color="#ffffff" loading={false} size={10} />
                <p>Close</p>
              </button>
              <button
                // disabled={isSubmitting}
                onClick={handleSubmit}
                className="flex items-center justify-center space-x-2 bg-primary text-white text-sm font-base font-semibold py-2 rounded-sm px-9 hover:bg-primaryDark transition duration-500"
              >
                <ClipLoader color="#ffffff" loading={false} size={10} />
                <p>Update Profile</p>
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <div className="hidden lg:flex justify-between items-center px-24 py-5 bg-theme ">
        <img
          src="/logos/Logo_t_white_64.png"
          onClick={() => (window.location.href = "/")}
          className="w-28 cursor-pointer"
          alt="Logo"
        />
        <ul className="flex font-base space-x-10 text-md text-white">
          <li
            className={
              window.location.pathname === "/"
                ? "text-primary font-semibold cursor-pointer"
                : "cursor-pointer"
            }
            onClick={() => (window.location.href = "/")}
          >
            Home
          </li>

          <li
            className={
              window.location.pathname === "/about-us"
                ? "text-primary font-semibold cursor-pointer"
                : "cursor-pointer"
            }
            onClick={() => (window.location.href = "/about-us")}
          >
            About Us
          </li>

          <li
            className={
              window.location.pathname === "/how-it-works"
                ? "text-primary font-semibold cursor-pointer"
                : "cursor-pointer"
            }
            onClick={() => (window.location.href = "/how-it-works")}
          >
            How It Works
          </li>

          <li className="cursor-pointer" onClick={() => setOpenContactUs(true)}>
            Contact Us
          </li>
        </ul>

        {Object.keys(user).length <= 1 ? (
          <div className="space-x-5">
            <button
              onClick={() => (window.location.href = "/courses")}
              className="font-base font-medium text-md  px-5 py-1 bg-primary border-2 border-primary text-white  hover:bg-primaryDark transition duration-500"
            >
              Explore Courses
            </button>
            <button
              className="font-base font-medium text-md border-2 border-white text-white px-5 py-1  hover:bg-white hover:text-theme hover:font-semibold transition ease-in-out duration-500"
              onClick={() => (window.location.href = "/login")}
            >
              Login / Signup
            </button>
          </div>
        ) : (
          <div className="flex space-x-5">
            <button
              onClick={() => (window.location.href = "/courses")}
              className="font-base font-medium text-sm  px-5 py-1 bg-primary border-2 border-primary text-white  hover:bg-primaryDark transition duration-500"
            >
              Explore Courses
            </button>
            {/* <button className="font-base font-medium text-sm  px-5 py-2 bg-primary text-white  hover:bg-primaryDark transition duration-500">
              My Enrollments
            </button> */}
            <Tippy
              theme="light"
              interactive={true}
              trigger="click"
              content={
                <div className="flex flex-col w-40 font-base font-semibold text-gray-500 space-y-6 px-2 py-3 text-sm">
                  <button
                    onClick={() => setOpenProfileModal(true)}
                    className="flex items-center space-x-3 hover:text-primaryDark transition duration-500"
                  >
                    <img src="/icons/profile.svg" className="w-4" alt="" />
                    <p>Profile</p>
                  </button>
                  <a
                    href="/inbox"
                    className="flex items-center space-x-3 hover:text-primaryDark transition duration-500"
                  >
                    <img src="/icons/inbox.svg" className="w-4" alt="" />
                    <p>Inbox</p>
                  </a>
                  <a
                    href="/timetable"
                    className="flex items-center space-x-3 hover:text-primaryDark transition duration-500"
                  >
                    <img src="/icons/inbox.svg" className="w-4" alt="" />
                    <p>My Timetable</p>
                  </a>
                  <button
                    onClick={() => logout()}
                    className="flex items-center space-x-3 hover:text-primaryDark transition duration-500"
                  >
                    <img src="/icons/logout.svg" className="w-4" alt="" />
                    <p>Logout</p>
                  </button>
                </div>
              }
            >
              <div className="flex items-center justify-center font-base font-medium   px-5 py-1  transition ease-in-out duration-500 space-x-2 cursor-pointer">
                <span className="bg-primary font-base  font-bold text-white p-2 rounded-full text-xs">
                  {generateInitials(getName())}
                </span>
                <p className="font-bold text-primary text-xs ">{getName()}</p>
                <img src="icons/arrowDown.svg" className="w-2" alt="" />
              </div>
            </Tippy>
          </div>
        )}
      </div>

      <div className="flex lg:hidden justify-between p-5 items-center bg-theme">
        <img
          src="/logos/Logo_t_white_64.png"
          onClick={() => (window.location.href = "/")}
          className="w-28 cursor-pointer"
          alt=""
        />

        <div className="flex space-x-3">
          {Object.keys(user).length <= 1 ? (
            <button
              className="font-base font-medium border-2 border-white text-white px-2 py-1 hover:bg-white hover:text-theme hover:font-semibold transition ease-in-out duration-250"
              onClick={() => (window.location.href = "/login")}
              style={{ fontSize: "12px" }}
            >
              Login / Signup
            </button>
          ) : (
            <Tippy
              theme="light"
              interactive={true}
              trigger="click"
              content={
                <div className="flex flex-col w-40 font-base font-semibold text-gray-500 space-y-6 py-3 text-md">
                  <button
                    onClick={() => setOpenProfileModal(true)}
                    className="flex items-center space-x-3 hover:text-primaryDark transition duration-500"
                  >
                    <img src="/icons/profile.svg" className="w-4" alt="" />
                    <p>Profile</p>
                  </button>
                  <a
                    href="/inbox"
                    className="flex items-center space-x-3 hover:text-primaryDark transition duration-500"
                  >
                    <img src="/icons/inbox.svg" className="w-4" alt="" />
                    <p>Inbox</p>
                  </a>
                  <a
                    href="/timetable"
                    className="flex items-center space-x-3 hover:text-primaryDark transition duration-500"
                  >
                    <img src="/icons/inbox.svg" className="w-4" alt="" />
                    <p>My Timetable</p>
                  </a>
                  <button
                    onClick={() => logout()}
                    className="flex items-center space-x-3 hover:text-primaryDark transition duration-500"
                  >
                    <img src="/icons/logout.svg" className="w-4" alt="" />
                    <p>Logout</p>
                  </button>
                </div>
              }
            >
              <div className="flex items-center justify-center font-base font-medium px-5 py-1  transition ease-in-out duration-500 space-x-2 cursor-pointer">
                <span className="bg-primary font-base  font-bold text-white p-2 rounded-full text-xs">
                  {generateInitials(getName())}
                </span>
                <p className="font-bold text-primary text-xs ">{getName()}</p>
                <img src="icons/arrowDown.svg" className="w-2" alt="" />
              </div>
            </Tippy>
          )}
          <IconButton onClick={() => setOpenSideNav(true)}>
            <MenuIcon sx={{ fontSize: "22px", color: "#ffffff" }} />
          </IconButton>
        </div>
      </div>
      {
        <ContactUsModal
          openModal={openContactUs}
          setOpenModal={setOpenContactUs}
        />
      }
      {SideNav()}
    </div>
  );
};

export default Navbar;
