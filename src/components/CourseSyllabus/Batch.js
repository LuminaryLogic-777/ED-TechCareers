import React, { useState, useRef, useEffect } from "react";
import { ApiBaseURL } from "../ApiConfig";
import { useCookie } from "react-use";

const Batch = ({ course_id }) => {
  // console.log(course_id);
  const [activeCourse, setActiveCourse] = useState(course_id);
  // console.log(activeCourse);
  // console.log(activeCourse);
  const [showSyllabus, setShowSyllabus] = useState(true);
  const [previousCourses, setPreviousCourses] = useState([]);
  const [noticeCount, setNoticeCount] = useState(0);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [ongoingCourses, setOngoingCourses] = useState([]);
  const [requestData, setRequestData] = useState([]);
  const [loggedIn] = useCookie("maang");

  const [myProgress, setMyProgress] = useState({
    classesRemaining: 0,
    classesCompleted: 0,
    totalClass: 0,
    endDate: null,
    startDate: null,
  });

  const handleOngoingBatchesClick = async () => {
    try {
      const response = await fetch(
        `${ApiBaseURL}mentor-management/batch-complete-view/?course_id=${activeCourse}`,
        {
          headers: {
            Authorization: `Token ${JSON.parse(loggedIn).token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const { ongoing_data } = data || {};

      if (ongoing_data && ongoing_data.length > 0) {
        setPreviousCourses([]);
        setOngoingCourses(ongoing_data);
        setShowSyllabus(true);
      }

      if (ongoing_data && ongoing_data.length > 0) {
        const batchId = ongoing_data[0].batch_id;

        const getResponse = await fetch(
          `${ApiBaseURL}mentor-management/batch-request-ongoing?batch_id=${batchId}`,
          {
            headers: {
              Authorization: `Token ${JSON.parse(loggedIn).token}`,
            },
          }
        );

        if (!getResponse.ok) {
          throw new Error(`HTTP error! Status: ${getResponse.status}`);
        }

        const getData = await getResponse.json();

        // console.log("Get API response:", getData);
      }
    } catch (error) {
      // console.error("Error fetching ongoing courses:", error);
    }
  };

  const handlePreviousBatchesClick = async () => {
    try {
      const response = await fetch(
        `${ApiBaseURL}mentor-management/batch-complete-view/?course_id=${activeCourse}`,
        {
          headers: {
            Authorization: `Token ${JSON.parse(loggedIn).token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const { previous_data } = data || {};

      if (previous_data && previous_data.length > 0) {
        setOngoingCourses([]);
        setPreviousCourses(previous_data);
        setShowSyllabus(true);
      }

      if (previous_data && previous_data.length > 0) {
        const batchId = previous_data[0].batch_id;
        const getResponse = await fetch(
          `${ApiBaseURL}mentor-management/batch-request-ongoing?batch_id=${batchId}`,
          {
            headers: {
              Authorization: `Token ${JSON.parse(loggedIn).token}`,
            },
          }
        );

        if (!getResponse.ok) {
          throw new Error(`HTTP error! Status: ${getResponse.status}`);
        }

        const getData = await getResponse.json();
        setRequestData(getData);
        // Handle the received data as needed
        // console.log("Get API response:", getData);
        // Update your state or UI with the received data
      }
    } catch (error) {
      // console.error("Error fetching previous courses:", error);
    }
  };

  useEffect(() => {
    handleOngoingBatchesClick();
  }, [course_id]);
  const resetNotification = async () => {
    try {
      const token = JSON.parse(loggedIn).token;
      const response = await fetch(
        "https://django.maangcareers.com/user-management/reset_notice_count/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      if (responseData.message === "All notifications marked as read") {
        // console.log(
        //   "Successfully reset notification count:",
        //   responseData.message
        // );
      } else {
        // console.warn("Unexpected response:", responseData);
      }
    } catch (error) {
      // console.error("Error resetting notification count:", error);
    }
  };

  const handleNotificationIconClick = () => {
    resetNotification();
    setIsNotificationPanelOpen((prev) => !prev);
  };

  const handleBatchRequest = async (batchId) => {
    try {
      const token = JSON.parse(loggedIn).token;
      // console.log("batch", batchId);
      const formData = new FormData();
      formData.append("batch_id", batchId);

      const response = await fetch(
        ` ${ApiBaseURL}mentor-management/batch-request-ongoing/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      // console.log("Batch request successful:", responseData);
    } catch (error) {
      // console.error("Error making batch request:", error);
    }
  };

  return (
    <div className="flex bg-[#f6fffe]">
      <div className="flex flex-col w-full">
        <div className="p-5 flex">
          <div className="sm:w-8/12 w-full">
            <div>
              {activeCourse && (
                <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                  <ul className="flex flex-wrap -mb-px">
                    <li className="me-2">
                      <a
                        href="#"
                        onClick={handleOngoingBatchesClick}
                        className={`inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg ${
                          showSyllabus
                            ? "active dark:text-blue-500 dark:border-blue-500"
                            : ""
                        }`}
                      >
                        On Going Batches
                      </a>
                    </li>
                    <li className="me-2">
                      <a
                        href="#"
                        onClick={handlePreviousBatchesClick}
                        className={`inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg ${
                          !showSyllabus
                            ? "active dark:text-blue-500 dark:border-blue-500"
                            : ""
                        }`}
                        aria-current="page"
                      >
                        Previous Batches
                      </a>
                    </li>
                  </ul>
                </div>
              )}

              {showSyllabus && ongoingCourses.length > 0 && (
                <div>
                  {ongoingCourses.map((ongoingCourse, index) => (
                    <div>
                      <h2 className="text-center font-bold">
                        Batch {ongoingCourse.batch_id || "N/A"}
                      </h2>
                      <div key={index} className="border p-2 mt-4">
                        <h3 className="text-center font-bold">
                          {ongoingCourse.course__name || "N/A"}
                        </h3>
                        <p>
                          Number of Students:{" "}
                          {ongoingCourse.no_of_students || "N/A"}
                        </p>
                        <p>
                          Course End Date:{" "}
                          {ongoingCourse.end_date || "Not available"}
                        </p>

                        <div className="border p-2 flex justify-between items-center">
                          <span> Course Completed?</span>
                          <button
                            className={`text-[#24b584] ml-8 border px-3 py-1 rounded-md focus:outline-none focus:ring focus:border-[#24b584] transition-colors duration-300 ${
                              ongoingCourse.completed_status === "Completed"
                                ? "bg-orange-300 text-orange-500"
                                : ongoingCourse.completed_status === "pending"
                                ? `text-yellow-800 ml-8 border px-3 py-1 rounded-md focus:outline-none focus:ring focus:border-yellow-500 transition-colors duration-300 bg-yellow-300`
                                : "bg-[#c3f9e7] hover:bg-[#24b584] hover:text-white border-green-500"
                            }`}
                            onClick={() =>
                              handleBatchRequest(ongoingCourse.batch_id)
                            }
                          >
                            {ongoingCourse.completed_status || "Request"}
                          </button>
                        </div>
                        <div className="border p-2 flex justify-between items-center">
                          <span>Release Certificate ~ </span>
                          <button
                            className={`text-[#24b584] ml-8 border px-3 py-1 rounded-md focus:outline-none focus:ring focus:border-[#24b584] transition-colors duration-300 ${
                              ongoingCourse.b_certificate_status === "Completed"
                                ? "bg-orange-300 text-orange-500"
                                : ongoingCourse.b_certificate_status ===
                                  "pending"
                                ? `text-yellow-800 ml-8 border px-3 py-1 rounded-md focus:outline-none focus:ring focus:border-yellow-500 transition-colors duration-300 bg-yellow-300`
                                : "bg-[#c3f9e7] hover:bg-[#24b584] hover:text-white border-green-500"
                            }`}
                            onClick={() =>
                              handleBatchRequest(ongoingCourse.batch_id)
                            }
                          >
                            {ongoingCourse.b_certificate_status || "Request"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {showSyllabus && previousCourses.length > 0 && (
              <div>
                {previousCourses.map((previousCourse, index) => (
                  <div>
                    <h2 className="text-center font-bold">
                      Batch {previousCourse.batch_id || "N/A"}
                    </h2>
                    <div key={index} className="border p-2 mt-4">
                      <h3 className="text-center font-bold">
                        {previousCourse.course__name || "N/A"}
                      </h3>
                      <p>Number of Students: {previousCourse.no_of_students}</p>
                      <p>
                        Course End Date:{" "}
                        {previousCourse.end_date || "Not available"}
                      </p>

                      <div className="border p-2 flex justify-between items-center">
                        <span> Course Completed?</span>
                        <button
                          className={`text-orange-500 ml-8 border px-3 py-1 rounded-md focus:outline-none focus:ring focus:border-orange-500 transition-colors duration-300 bg-orange-300`}
                          onClick={() =>
                            handleBatchRequest(previousCourse.batch_id)
                          }
                        >
                          {previousCourse.completed_status || "N/A"}
                        </button>
                      </div>
                      <div className="border p-2 flex justify-between items-center">
                        <span>Release Certificate ~ </span>
                        <button
                          className={`text-orange-500 ml-8 border px-3 py-1 rounded-md focus:outline-none focus:ring focus:border-orange-500 transition-colors duration-300 bg-orange-300`}
                          onClick={() =>
                            handleBatchRequest(previousCourse.batch_id)
                          }
                        >
                          {previousCourse.b_certificate_status || "N/A"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Batch;
