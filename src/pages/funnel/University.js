import React, { useEffect, useState } from "react";
import "./funnel.css";
import "./input.css";

import { GoogleSpreadsheet } from "google-spreadsheet";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function University() {
  const navigate = useNavigate();
  const location = useLocation();
  const [university, setUnivercity] = useState(
    sessionStorage.getItem("university") || location.state?.university || ""
  );
  const name = sessionStorage.getItem("name");
  const whatsapp = sessionStorage.getItem("whatsapp");
  const email = sessionStorage.getItem("email");
  const webinarDate = sessionStorage.getItem("selectedDate");
  const selectedDay = sessionStorage.getItem("selectedDay");
  const selectedTime = sessionStorage.getItem("selectedTime");
  const code = sessionStorage.getItem("code");
  const selectedGMeetCode = sessionStorage.getItem("selectedGMeetCode");
  const [universityError, setUniversityError] = useState("");

  const handleChange = (e) => {
    setUnivercity(e.target.value);
    setUniversityError("");
  };

  function formatCurrentDateTime() {
    const currentDate = new Date();

    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const seconds = currentDate.getSeconds().toString().padStart(2, "0");

    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
  }

  useEffect(() => {
    if (!webinarDate && !selectedDay && !selectedTime) {
      navigate("/webinars");
    }
  }, [webinarDate, selectedDay, selectedTime]);

  function formatDateWithSuffix(inputDateString) {
    var inputDate = new Date(inputDateString);
    var day = inputDate.getDate();
    var monthIndex = inputDate.getMonth();
    var year = inputDate.getFullYear();
    var monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    function addSuffix(day) {
      if (day >= 11 && day <= 13) {
        return day + "th";
      }
      switch (day % 10) {
        case 1:
          return day + "st";
        case 2:
          return day + "nd";
        case 3:
          return day + "rd";
        default:
          return day + "th";
      }
    }
    var formattedDate =
      monthNames[monthIndex] + " " + addSuffix(day) + ", " + year;
    return formattedDate;
  }

  const handleSubmit = () => {
    if (university.trim() === "") {
      setUniversityError("Please enter your location/university");
      return;
    }
    const formattedDateTime = formatCurrentDateTime();
    const formData = new FormData();
    formData.append("Enrolled Time Stamp", formattedDateTime);
    formData.append(
      "Webinar Date",
      formatDateWithSuffix(sessionStorage.getItem("selectedDate"))
    );
    formData.append("Webinar Day", selectedDay);
    formData.append("Webinar Time", selectedTime);
    formData.append("Full Name", name);
    formData.append("WhatsApp Number", code + whatsapp);
    formData.append("Gmail", email);
    formData.append("University", university);
    formData.append("Gmeet ", selectedGMeetCode);
    // Make an Axios POST request
    axios
      .post(
        "https://sheet.best/api/sheets/add6b09b-d310-4829-85d7-66222be00fb7",
        formData
      )
      .then((response) => {
        // Handle successful response
        // console.log("Success:", response.data);
        navigate("/webinars/thankyou");
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };
  return (
    <div className="funnel-bg lg:h-screen flex justify-center items-center font-heading bg-cover bg-no-repeat bg-center p-5">
      <div class="2xl:w-[1100px] xl:w-[1024px] lg:w-[920px] md:w-[700px] lg:p-5 p-3 bg-white rounded-[20px] shadow-xl relative">
        <div class="funnel-body rounded-[10px] relative">
          <div class="rounded-[10px] relative z-10 p-2">
            <div class="mb-10 pt-10 text-center">
              <img
                src="/images/logo-lg.png"
                alt=""
                class="max-w-[145px] inline-block"
              />
            </div>

            <div class="flex flex-wrap justify-between items-center -mx-5 mb-5 gap-y-5">
              <div class="2xl:w-6/12 xl:w-6/12 lg:w-6/12 w-full px-5 pb-10 lg:pb-0">
                <img src="/images/location.png" alt="" class="w-full" />
              </div>

              <div class="2xl:w-6/12 xl:w-6/12 lg:w-6/12 w-full px-5">
                <div className="user-name mb-5 lg:text-left text-center">
                  <h1 className="text-gray-600 lg:text-3xl text-[25px]">
                    Hey <span className="text-sky-500">{name},</span>
                  </h1>
                  <p className="text-gray-600 lg:text-lg text-base font-normal">
                    Help us personalise your experience by telling us a bit
                    about your self.
                  </p>
                </div>
                <form action="" className="pb-24 lg:pb-0">
                  <div className="lg:text-left text-center">
                    <label
                      for="price"
                      class="block mb-4 font-base text-gray-700 lg:text-3xl sm:text-[25px] text-xl font-semibold"
                    >
                      What Is Your Location / University?
                    </label>
                    <div class="relative mt-2 rounded-md">
                      <input
                        type="name"
                        name="university"
                        id="university"
                        class="block lg:w-[calc(100%-2rem)] w-full text-lg rounded-md border border-slate-300 py-4 px-5 text-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-till-600 focus:outline-none"
                        placeholder="Enter your location/university here"
                        onChange={handleChange}
                        value={university}
                      />
                      {universityError && (
                        <p className="text-red-500 mt-2">{universityError}</p>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="flex justify-between items-center gap-x-5">
              <ul class="m-0 p-0">
                <li class="list-none me-3 inline-block text-gray-400">
                  <a
                    href="/terms-and-condition"
                    class="text-gray-600 hover:text-till-900"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li class="list-none me-3 inline-block text-gray-400">|</li>
                <li class="list-none me-3 inline-block text-gray-400">
                  <a
                    href="/privacy-policy"
                    class="text-gray-600 hover:text-till-900"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
              <a
                type="button"
                class="inline-block py-3 px-6 text-xl font-medium text-white rounded bg-till-600 hover:bg-till-700 whitespace-nowrap"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Next <i class="bx bxs-right-arrow-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
