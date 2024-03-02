import React, { useState, useContext, useEffect } from "react";
import { useCookie } from "react-use";
import "./index.css";
import Note from "./Note";
import Course from "./Course";
import OnGoing from "./OnGoing";
import { mentorContext } from "../Mentor/context";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiBaseURL } from "../ApiConfig";

const Teaching = (props) => {
  const [loggedIn] = useCookie("maang");
  const {
    screen,
    setScreen,
    setIsShowMiniMentorSidebar,
    isShowMiniMentorSidebar,
    selectedBatchIdForTeaching,
    setSelectedBatchIdForTeaching,
  } = useContext(mentorContext);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState(null);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    end_date: "",
    start_date: "",
  });
  const [week, setWeek] = useState(null);

  const location = useLocation();
  const { userProps } = location.state || {};

  // Now you can use userProps in your component
  useEffect(() => {
    if (userProps?.courseId && userProps?.weekId) {
      setTag(userProps?.courseId);
      setWeek(userProps?.weekId);
      setScreen("start");
    }
  }, [userProps]);

  // useEffect(() => {
  //   if (loggedIn) {
  //     fetch(
  //       `${ApiBaseURL}course-management/user-batch/`,
  //       {
  //         headers: {
  //           Authorization: `Token ${JSON.parse(loggedIn).token}`,
  //         },
  //       }
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const { course, end_date, start_date } = data?.results?.[0] || {
  //           course: {
  //             name: "Interview Preparation Course Name",
  //           },
  //           end_date: null,
  //           start_date: "2030-05-09",
  //         };

  //         setCourseInfo({
  //           end_date,
  //           start_date,
  //           name: course?.name || "",
  //         });
  //       })
  //       .catch((err) => console.error(err));
  //   }
  // }, [loggedIn]); // Add loggedIn as a dependency to useEffect

  useEffect(() => {
    if (loggedIn) {
      const apiUrl =
        `${ApiBaseURL}mentor-management/inst-course/`;
      // "https://django.maangcareers.com/test-management/std-all-courese/";
      const token = JSON.parse(loggedIn).token;

      fetch(apiUrl, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const courseNames = data?.course_batches_details?.map((course) => ({
            id: course.course_id,
            name: course.course__name,
            batchId: course.batch_id,
          }));
          // console.log("data--->", data);

          setTags(courseNames);
          const defaultCourseId =
            courseNames.length > 0 ? courseNames[0].batchId : null;
          setTag(defaultCourseId);
        })
        .catch((err) => console.error(err));
    }
  }, [loggedIn]);

  const handleCourseClick = (id) => {
    setSelectedBatchIdForTeaching(null);
    setTag(id);
  };

  useEffect(() => {
    setIsShowMiniMentorSidebar(false);
  }, []);

  const renderScreen = () => {
    const selectedCourse = tags.find(({ batchId }) => batchId === tag);

    return (
      <>
        <div className="p-5">
          <div className="flex flex-wrap -mx-3 gap-y-4">
            <div className="xl:w-[calc(100%-320px)] lg:w-[calc(100%-260px)] w-full px-3">
              <div className="course-tags">
                {tags &&
                  tags.length > 0 &&
                  tags.map(({ id, name, batchId }) => (
                    <div
                      key={batchId}
                      className={
                        batchId === (selectedBatchIdForTeaching || tag)
                          ? "active-tag"
                          : ""
                      }
                      onClick={() => handleCourseClick(batchId)}
                    >
                      <span>{`Batch-${batchId} ${name}`}</span>
                    </div>
                  ))}
              </div>
              {selectedCourse && (
                <Course
                  setScreen={setScreen}
                  courseId={selectedCourse.id}
                  batchId={tag}
                  setWeek={setWeek}
                  key={selectedCourse.id}
                  selectedBatchIdForTeaching={selectedBatchIdForTeaching}
                />
              )}
            </div>
            <div className="xl:w-[320px] lg:w-[260px] w-full px-3">
              {selectedCourse && (
                <Note
                  courseInfo={courseInfo}
                  courseId={selectedCourse.id}
                  key={tag}
                />
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  return <>{renderScreen()}</>;
};

export default Teaching;
