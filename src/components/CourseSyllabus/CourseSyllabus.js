import React, { useState, useEffect, useContext } from "react";

import { useCookie } from "react-use";
import dayjs from "dayjs";

import { PickersDay } from "@mui/x-date-pickers";
import { Badge, Tooltip } from "@mui/material";
import { mentorContext } from "../Mentor/context";
import Batch from "./Batch";
import axios from "axios";
import MentorCalendar from "../Common/Calendar/MentorCalendar";
import MentorPerformanceChart from "../Dashboard/MentorPerformanceChart";
import { ApiBaseURL, ApiEndpoints } from "../ApiConfig";

const CourseSyllabus = () => {
  const { batchInfo } = useContext(mentorContext);
  const [activeCourse, setActiveCourse] = useState(null);
  const [showSyllabus, setShowSyllabus] = useState(true);
  const [showBatch, setShowBatch] = useState(false);
  const [syllabusData, setSyllabusData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loggedIn] = useCookie("maang");
  const [timetables, setTimeTables] = useState();
  const [highlightedDays, setHighlightedDays] = useState();
  const [myProgress, setMyProgress] = useState({
    classesRemaining: 0,
    classesCompleted: 0,
    totalClass: 0,
    endDate: null,
    startDate: null,
  });
  // console.log(activeCourse);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${ApiBaseURL}mentor-management/inst-course-list/`,
          {
            headers: {
              Authorization: `Token ${JSON.parse(loggedIn).token}`,
            },
          }
        );

        const { message, courses } = response.data;

        if (message === 1 && courses && courses.length > 0) {
          const coursesData = courses.map(({ course_id, course__name }) => ({
            id: course_id,
            name: course__name,
          }));

          setCourses(coursesData);

          if (coursesData.length > 0) {
            handleCourseClick(coursesData[0].id);
            handleSyllabusClick(coursesData[0].id);
          }
        }
      } catch (error) {
        // console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [loggedIn]);

  const handleCourseClick = async (courseId) => {
    setActiveCourse(courseId);
    setShowSyllabus(true);
    setShowBatch(false);
  };

  const handleBatchClick = () => {
    setShowSyllabus(false);
    setShowBatch(true);
  };
  useEffect(() => {
    setHighlightedDaysForCalendar();
  }, [timetables]);

  const handleMonthChange = (date) => {
    setHighlightedDaysForCalendar(date);
  };

  function ServerDay(props) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected =
      !props.outsideCurrentMonth &&
      highlightedDays.indexOf(props.day.date()) >= 0;

    return isSelected ? (
      <Tooltip title="Course">
        <Badge key={props.day.toString()} overlap="circular">
          <PickersDay
            {...other}
            outsideCurrentMonth={outsideCurrentMonth}
            day={day}
            style={{ background: "#40C2D4", color: "white", border: 0 }}
          />
        </Badge>
      </Tooltip>
    ) : (
      <Badge key={props.day.toString()} overlap="circular">
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
        />
      </Badge>
    );
  }

  const setHighlightedDaysForCalendar = (currentDate = dayjs()) => {
    if (!timetables || timetables.length <= 0) {
      setHighlightedDays([]);
      return;
    }

    let ongoingBatchesFiltered = timetables.filter((record) =>
      dayjs(`${record.start_date} ${record.start_time}`).isSame(
        currentDate,
        "month"
      )
    );

    const upcomingBatches = ongoingBatchesFiltered.map((x) => {
      return dayjs(x.start_date).get("date");
    });

    setHighlightedDays(upcomingBatches);
  };

  const handleSyllabusClick = async (activeCourse) => {
    setActiveCourse(activeCourse);
    setShowSyllabus(true);
    setShowBatch(false);

    try {
      const response = await axios.get(
        `${ApiBaseURL}mentor-management/course-syllabus/?course_id=${activeCourse}`,
        {
          headers: {
            Authorization: `Token ${JSON.parse(loggedIn).token}`,
          },
        }
      );

      const { message, all_data } = response.data;

      if (message === 1 && all_data.length > 0) {
        const syllabusData = all_data.reduce((acc, data) => {
          const existingWeek = acc.find((week) => week.week === data.week);

          if (existingWeek) {
            existingWeek.days.push({
              topic: data.topic,
              file: data.file,
            });
          } else {
            acc.push({
              week: data.week,
              days: [{ topic: data.topic, file: data.file }],
            });
          }

          return acc;
        }, []);

        setSyllabusData(syllabusData);
      }
    } catch (error) {
      // console.error("Error fetching syllabus:", error);
    }
  };

  return (
    <div className="p-5">
      <div className="flex flex-wrap -mx-3 gap-y-4">
        <div className="xl:w-[calc(100%-320px)] w-full px-3">
          <div className="flex space-x-4 px-4 py-2 rounded-full">
            {courses.map((course) => (
              <button
                key={course.id}
                className={`px-5 py-2.5 text-base font-medium rounded-[25px] justify-center items-center bg-white gap-2.5 inline-flex ${
                  activeCourse === course.id
                    ? "bg-gradient-to-l from-teal-400 to-sky-400 text-white"
                    : "bg-sky-200 hover:bg-sky-300 text-sky-800"
                }`}
                onClick={() => handleCourseClick(course.id, course.name)}
              >
                {course.name}
              </button>
            ))}
          </div>

          <br></br>
          <br></br>
          <div>
            <div className="flex space-x-4">
              <button
                className="px-4 py-2 rounded-fullbg-[#35C69D
                  ] text-white hover:text-[#35C69D] hover:bg-[#b6f3e1]
                  ]  bg-[#35C69D]"
                onClick={() => handleSyllabusClick(activeCourse)}
              >
                Syllabus
              </button>
              <button
                className="px-4 py-2 rounded-fullbg-[#35C69D
                    ] text-white hover:bg-[#35C69D
                    ] bg-[#35C69D] hover:bg-[#bffcea] hover:text-[#35C69D]
                    ]"
                onClick={handleBatchClick}
              >
                Batches
              </button>
            </div>
          </div>
          <div className="week-list">
            {!showBatch &&
              (showSyllabus || showBatch) &&
              syllabusData !== null && (
                <div>
                  {syllabusData.map((weekData, weekIndex) => (
                    <div key={weekIndex}>
                      <h2 className="text-center">Week {weekData.week}</h2>
                      <div className="flex flex-col">
                        {weekData.days.map((day, dayIndex) => (
                          <div
                            key={dayIndex}
                            className="flex justify-between p-2 mb-2 border rounded-lg"
                          >
                            <span>
                              Day {dayIndex + 1}: {day.topic}
                            </span>
                            <div className="w-[30px] h-[30px] p-[7px] bg-emerald-400 rounded-lg justify-center items-center gap-2.5 inline-flex">
                              <a
                                href={day.file}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => {
                                  e.preventDefault();
                                  window.open(day.file, "_blank");
                                }}
                              >
                                <i className="bx bx-download text-white px-2 py-1"></i>
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            {showBatch && <Batch course_id={activeCourse} />}
          </div>
        </div>
        <div className="xl:w-[320px] w-full px-3">
          <div className="xl:overflow-visible sm:overflow-auto">
            <div className="xl:block sm:flex xl:mx-0 gap-x-4">
              <div className="xl:px-0 xl:w-full sm:w-6/12 w-full sm:mb-0 mb-4 sm:block hidden">
                <MentorCalendar />
              </div>
              <div className="xl:px-0 xl:w-full sm:w-6/12 w-full">
                <MentorPerformanceChart batchInfo={batchInfo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSyllabus;
