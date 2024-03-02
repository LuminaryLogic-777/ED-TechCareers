import React, { useEffect, useState } from "react";
import "./funnel.css";
import "./input.css";
import { useLocation, useNavigate } from "react-router-dom";

import { GoogleSpreadsheet } from "google-spreadsheet";
import axios from "axios";
import { ApiBaseURL, ApiEndpoints } from "./../../components/ApiConfig";

export default function Webinar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDay, setSelectedDay] = useState(
    sessionStorage.getItem("selectedDay") || location.state?.selectedDay || ""
  );
  const [selectedDate, setSelectedDate] = useState(
    sessionStorage.getItem("selectedDate") || location.state?.webinarDate || ""
  );
  const [selectedTime, setSelectedTime] = useState(
    sessionStorage.getItem("selectedTime") || location.state?.selectedTime || ""
  );
  const [selectedGMeetCode, setSelectedGMeetCode] = useState(
    sessionStorage.getItem("selectedGMeetCode") || ""
  );

  const name = sessionStorage.getItem("name");
  const whatsapp = sessionStorage.getItem("whatsapp");
  const email = sessionStorage.getItem("email");
  const code = sessionStorage.getItem("code");
  const [error, setError] = useState("");
  const [daysToDates, setDaysToDates] = useState([]);

  useEffect(() => {
    sessionStorage.setItem("selectedDay", selectedDay);
    sessionStorage.setItem("selectedDate", selectedDate);
    sessionStorage.setItem("selectedTime", selectedTime);
    sessionStorage.setItem("selectedGMeetCode", selectedGMeetCode);
  }, [selectedDay, selectedDate, selectedTime, selectedGMeetCode]);

  useEffect(() => {
    if (!email) {
      navigate("/webinars");
    }
  }, [email]);

  const getWebinarDate = async () => {
    try {
      const response = await axios.get(`${ApiBaseURL}funnel-date/funneldates/`);
      const data = response.data?.results;
      setDaysToDates(data);
    } catch (error) {
      // Handle errors, e.g., log the error or throw it again
      console.error("Error fetching webinar date:", error);
      throw error;
    }
  };

  useEffect(() => {
    getWebinarDate();
  }, []);

  // const datesToDays = {
  //   "2023-11-20": "Monday",
  //   "2023-11-21": "Tuesday",
  //   "2023-11-22": "Wednesday",
  //   "2023-11-23": "Thursday",
  //   "2023-11-24": "Friday",
  //   "2023-11-25": "Saturday",
  //   "2023-11-26": "Sunday",
  // };

  const getDayOfWeek = (dateString) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(dateString);
    const dayIndex = date.getDay();

    return daysOfWeek[dayIndex];
  };

  const handleDayChange = (e) => {
    const selectedDay = e.target.value;
    setSelectedDay(selectedDay);
    setSelectedDate(getDefaultDate(selectedDay));
    const filteredDates = daysToDates.filter((item) => {
      return item.date === getDefaultDate(selectedDay);
    });
    setSelectedGMeetCode(filteredDates[0].g_meet_code);
  };

  const getDefaultDate = (selectedDay) => {
    const matchingDate = daysToDates.find(
      (item) => getDayOfWeek(item.date) === selectedDay
    );
    return matchingDate ? matchingDate.date : "";
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);
    setSelectedDay(getDayOfWeek(selectedDate));
    const filteredDates = daysToDates.filter((item) => {
      return item.date === selectedDate;
    });
    setSelectedGMeetCode(filteredDates[0].g_meet_code);
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    setSelectedTime(selectedTime);
  };

  const renderDateOptions = () => {
    return daysToDates.map((item) => (
      <option key={item.date} value={item.date}>
        {formatDateWithSuffix(item.date)}
      </option>
    ));
  };

  const convertToAMPM = (time24) => {
    const [hours, minutes, seconds] = time24.split(":");
    const dummyDate = new Date(2000, 0, 1, hours, minutes, seconds);
    const time12 = dummyDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return time12;
  };

  // Function to set min and max date for current year
  const getCurrentYearDates = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const startMonth = currentMonth.toString().padStart(2, "0");
    const startDate = `${currentYear}-${startMonth}-01`;
    const endDate = `${currentYear}-12-31`;
    return { startDate, endDate };
  };

  // Set min and max dates for the current year
  const { startDate, endDate } = getCurrentYearDates();

  const handleSubmit = () => {
    if (selectedDate === "" || selectedDay === "" || selectedTime === "") {
      // Handle invalid phone number
      setError("Kindly select a slot for the webinar to Continue!");
      setTimeout(() => setError(null), 2000);
      return;
    }
    navigate("/webinars/university", {
      state: {
        email: email,
        whatsapp: whatsapp,
        name: name,
        code: code,
        webinarDate: selectedDate,
        selectedDay: selectedDay,
        selectedTime: selectedTime,
        selectedGMeetCode: selectedGMeetCode,
      },
    });
  };

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

  return (
    <div className="funnel-bg lg:h-screen flex justify-center items-center font-heading bg-cover bg-no-repeat bg-center p-5">
      <div class="2xl:w-[1100px] xl:w-[1024px] lg:w-[920px] md:w-[700px] lg:p-5 p-3 bg-white rounded-[20px] shadow-xl relative">
        <div class="funnel-body rounded-[10px] relative">
          <div class="rounded-[10px] relative z-10 p-2">
            <div class="mb-8 pt-8 text-center">
              <img
                src="/images/logo-lg.png"
                alt=""
                class="max-w-[145px] inline-block"
              />
            </div>

            <div class="flex flex-wrap justify-between items-center -mx-5 mb-5 gap-y-5">
              <div class="2xl:w-6/12 xl:w-6/12 lg:w-6/12 w-full px-5 pb-10 lg:pb-0">
                <img src="/images/date.png" alt="date" class="w-full" />
              </div>

              <div class="2xl:w-6/12 xl:w-6/12 lg:w-6/12 w-full px-5">
                <div className="user-name mb-5 lg:text-left text-center">
                  <h1 className="text-gray-600 lg:text-3xl text-[25px] font-medium">
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
                      htmlFor="day"
                      className="
                    block mb-4 font-base text-gray-700 lg:text-3xl sm:text-[25px] text-xl font-semibold"
                    >
                      Select The Webinar Day?
                    </label>
                    <div className="p-2 rounded bg-white shadow-2xl shadow-till-200 sm:flex md:gap-x-1 mx-auto sm:max-w-none max-w-[200px]">
                      <label htmlFor="date"></label>
                      <select
                        name="date"
                        id="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="py-2 px-3 w-full"
                      >
                        <option value="" disabled>
                          Select date
                        </option>
                        {renderDateOptions()}
                      </select>

                      {selectedDate && (
                        <select
                          name="day"
                          id="day"
                          value={selectedDay}
                          onChange={handleDayChange}
                          className="py-2 px-3 w-full bg-[#dbeefa] rounded"
                        >
                          <option value="" disabled>
                            Select day
                          </option>
                          {daysToDates.map((item) => (
                            <option
                              key={item.date}
                              value={getDayOfWeek(item.date)}
                            >
                              {getDayOfWeek(item.date)}
                            </option>
                          ))}
                        </select>
                      )}

                      <label htmlFor="time"></label>
                      <select
                        name="time"
                        id="time"
                        value={selectedTime}
                        onChange={handleTimeChange}
                        className="py-2 px-3 w-full"
                      >
                        <option value="" disabled>
                          Select time
                        </option>
                        {daysToDates.map((item) => {
                          return (
                            item.date === selectedDate && (
                              <option value={convertToAMPM(item.time)}>
                                {convertToAMPM(item.time)}
                              </option>
                            )
                          );
                        })}
                      </select>
                    </div>
                    {error && (
                      <p className="text-red-500 mt-2 text-sm">{error}</p>
                    )}
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
