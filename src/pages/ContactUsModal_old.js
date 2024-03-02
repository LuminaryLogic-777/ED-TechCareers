
import React, { useState } from "react";
import Modal from "@mui/material/Modal";

import CloseIcon from "@mui/icons-material/Close";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { ApiBaseURL } from "../components/ApiConfig";

const ContactUsModal = ({ openModal, setOpenModal }) => {
  const [isSubmitting, setSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    let resp = axios.post(`${ApiBaseURL}crm/create-contact/`, {
      name: e.target.name.value,
      email: e.target.email.value,
      phone_number: e.target.phone.value,
      location: e.target.location.value,
      university: e.target.university.value,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
    if (resp) {
      setSubmitting(false);
      setOpenModal(false);
    }
  }

  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="flex justify-center items-center h-screen px-3">
        <div className="bg-white w-full lg:w-2/3 grid grid-cols-1 lg:grid-cols-2 rounded">
          <div className="hidden lg:flex flex-col justify-between items-center ">
            <div className="p-5 flex flex-col items-center space-y-2 justify-center">
              <img src="/logos/Logo_t_Black_64.png" className="w-44" alt="logo" />
              <p className="font-base text-gray-500">Explore the Limits</p>
            </div>
            <img src="/vectors/contact-us.svg" alt="" />
          </div>
          <div className="rounded" style={{ backgroundColor: "#F0F0F0" }}>
            <div className="flex justify-end mr-3 pt-2">
              <CloseIcon
                sx={{ color: "gray", cursor: "pointer" }}
                onClick={() => setOpenModal(false)}
              />
            </div>
            <h1 className="font-heading font-bold text-3xl text-gray-800 px-5 pt-1">
              Contact Us
            </h1>
            <form className="space-y-5 px-5 py-5" onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-2">
                {/* <label className="font-base text-gray-500 text-sm font-medium">
                  Contact Info
                </label> */}
                <input
                  className=" px-3 py-3 border-2 rounded-sm focus:outline-blue-500 text-sm  font-base text-gray-600 "
                  type="text"
                  name="name"
                  required
                  placeholder="Name *"
                // onChange={handleChange}
                // onBlur={handleBlur}
                // value={values.name}
                />
                {/* <p className="text-xs  font-base text-red-500">
                      {errors.name && touched.name && errors.name}
                    </p> */}
              </div>

              <div className="flex flex-col space-y-2">
                {/* <label className="font-base text-gray-500 text-sm font-medium">
                  Contact Info
                </label> */}
                <input
                  className=" px-3 py-3 border-2 rounded-sm focus:outline-blue-500 text-sm  font-base text-gray-600 "
                  type="email"
                  name="email"
                  required
                  placeholder="E-Mail *"
                // onChange={handleChange}
                // onBlur={handleBlur}
                // value={values.name}
                />
                {/* <p className="text-xs  font-base text-red-500">
                      {errors.name && touched.name && errors.name}
                    </p> */}
              </div>

              <div className="flex flex-col space-y-2">
                {/* <label className="font-base text-gray-500 text-sm font-medium">
                  Phone Number
                </label> */}
                <input
                  className=" px-3 py-3 border-2 rounded-sm focus:outline-blue-500 text-sm  font-base text-gray-600 "
                  type="tel"
                  name="phone"
                  required
                  maxLength={10}
                  placeholder="Phone Number *"
                // onChange={handleChange}
                // onBlur={handleBlur}
                // value={values.name}
                />
                {/* <p className="text-xs  font-base text-red-500">
                      {errors.name && touched.name && errors.name}
                    </p> */}
              </div>

              <div className="grid grid-cols-2 gap-5">

                <div className="relative flex flex-col">
                  {/* <label className="font-base text-gray-500 text-sm font-medium">
                  Location / University
                </label> */}
                  <input
                    className="px-3 py-3 border-2 rounded-sm focus:outline-blue-500 text-sm font-base text-gray-600 "
                    type="text"
                    name="location"
                    placeholder="Location *"
                    required
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  // value={values.name}
                  />
                  {/* <p className="text-xs  font-base text-red-500">
                      {errors.name && touched.name && errors.name}
                    </p> */}
                </div>

                <div className="relative flex flex-col">
                  {/* <label className="font-base text-gray-500 text-sm font-medium">
                  University
                </label> */}
                  <input
                    className="px-3 py-3 border-2 rounded-sm focus:outline-blue-500 text-sm  font-base text-gray-600 "
                    type="text"
                    name="university"
                    placeholder="University"
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  // value={values.name}
                  />
                  {/* <p className="text-xs  font-base text-red-500">
                      {errors.name && touched.name && errors.name}
                    </p> */}
                </div>
              </div>

              <div className="flex w-full justify-end ">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  // onClick={handleSubmit}
                  className="flex items-center justify-center space-x-2 bg-primary text-white text-sm font-base font-semibold py-2 rounded-sm px-9 hover:bg-primaryDark transition duration-500"
                >
                  {isSubmitting && <ClipLoader color="#ffffff" loading={true} size={10} />}
                  <p>Submit</p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ContactUsModal;