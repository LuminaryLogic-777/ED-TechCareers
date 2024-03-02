import { Grid } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useCookie } from "react-use";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { studentContext } from "../../Student/context";
import { useState } from "react";
import DemoImage from "../../../assets/mock-test1.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiBaseURL } from "../../ApiConfig";

const Course = ({ setScreen, courseId, setWeek }) => {
  const [loggedIn] = useCookie("maang");
  const [course, setCourse] = useState([]);
  const navigate = useNavigate();
  const activeWeek = 1;

  const fetchData = async () => {
    if (loggedIn) {
      const apiUrl = `${ApiBaseURL}test-management/std-practice-week-lock/?course_id=${courseId}`;
      const token = JSON.parse(loggedIn).token;

      try {
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCourse(data.main_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  //Added this Api call
  useEffect(() => {
    fetchData(courseId);
  }, [loggedIn, courseId]);

  const { setIsShowMiniSidebar, setSelectedQsIdForPractice,setSelectedWeekIdForPractice} =
    useContext(studentContext);

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));

  const Layout = ({ children, isDisabled, weekText }) => {
    if (isDisabled) {
      return (
        <div className="bg-course">
          <div className="bg-course-content">
            <img src="/images/Practice/lock.svg" alt="lock icon" />
            <span>{weekText}</span>
          </div>
          {children}
        </div>
      );
    }

    return children;
  };

  const onButtonClickHandler = (status, week, q_id) => {
    if (status) {
      navigate("/student/practice/" + q_id + "/Problem", {
        state: { week: week, courseId: courseId, q_id: q_id },
      });
      setWeek(week);
    }
  };

  const checkIsDisable = (week) => {
    const currentIndex = course.findIndex((c) => c.week === week);
    const isPreviousWeekCompleted =
      currentIndex > 0 &&
      course[currentIndex - 1].completed === course[currentIndex - 1].total;
    const previousWeekCompletionPercentage =
      currentIndex > 0
        ? course[currentIndex - 1].total !== 0
          ? (course[currentIndex - 1].completed /
              course[currentIndex - 1].total) *
            100
          : 0
        : 0;
    const isPreviousWeekCompletionPercentageGreaterThan50 =
      previousWeekCompletionPercentage >= 50;
    const isLayoutDisabled =
      !isPreviousWeekCompleted &&
      !isPreviousWeekCompletionPercentageGreaterThan50;
    return isLayoutDisabled;
  };

  return (
    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {course?.length > 0 &&
        course.map((courseInfo, idx) => {
          const {
            week,
            name,
            img: path,
            total,
            completed,
            status,
            isDisabled,
            condition,
            q_id,
          } = courseInfo;
          const activeClass =
            week === activeWeek ? "active-course-header-box" : "";
          const weekText = `Week ${week}`;
          const totalCompleted = ((completed * 100) / total).toFixed(0);

          return (
            <Grid item xs={3} key={idx}>
              <Layout weekText={weekText} isDisabled={isDisabled}>
                <div
                  className={`course-card ${
                    week === course[0].week
                      ? false
                      : isDisabled
                      ? "course-disabled-card"
                      : ""
                  }`}
                >
                  <div className="course-header">
                    <div className={`course-header-box ${activeClass}`}>
                      <span>{weekText}</span>
                    </div>
                  </div>
                  <div className="course-body">
                    {/* dynamic image code */}
                    {/* <img alt={weekText} src={path} /> */}

                    {/* static image code */}
                    {path ? (
                      <img alt={weekText} src={DemoImage} />
                    ) : (
                      <img alt={weekText} src={DemoImage} />
                    )}
                    <span className="title">{name}</span>
                    <div className="course-progress">
                      <div
                        className="course-result"
                        style={{
                          background: `url(/images/Practice/rectangle.svg)`,
                        }}
                      >
                        <span className="completed">{completed}</span>
                        <span className="total">{total}</span>
                      </div>
                      <div className="course-progress-bar">
                        <span>Questions Completed</span>
                        <div className="course-progress-text">
                          <BorderLinearProgress
                            variant="determinate"
                            value={totalCompleted}
                          />
                          <span className="percentage">{`${totalCompleted}%`}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="course-footer">
                    <button
                      className={!status ? "btn-completed" : "btn-start"}
                      onClick={() => {
                        onButtonClickHandler(status, week, q_id);
                        setSelectedQsIdForPractice(q_id);
                        setSelectedWeekIdForPractice(week);

                      }}
                      title={condition ? condition : ""}
                      disabled={status === true && condition}
                    >
                      {!status ? "Comming Soon" : "Start Now"}
                    </button>
                  </div>
                </div>
              </Layout>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default Course;
