import { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "react-router-dom";
import axios from "axios";

const VideoPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [playVideo, setPlayVideo] = useState({});

  const getCourseById = async (courseId) => {
    const response_course = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/${courseId}`
    );

    setCourse(response_course.data.product);
  };

  useEffect(() => {
    if (courseId) {
      getCourseById(courseId);
    }
  }, []);
  const Segmeant = (section, index) => {
    return (
      <Accordion style={{ boxShadow: "none", border: "none" }}>
        <AccordionSummary
          style={{ boxShadow: "none", border: "none" }}
          expandIcon={<ExpandMoreIcon />}
          //   aria-controls="panel1a-content"
          //   id="panel1a-header"
        >
          <div className="flex font-heading text-gray-500 space-x-3 items-start px-2 py-1">
            <h1 className="font-bold">
              {index < 10 ? "0" + (index + 1) : index + 1}
            </h1>
            <div>
              <h1 className="font-bold">{section?.sectionTitle}</h1>
              <p className="text-xs font-medium">
                {section?.videos?.length} Lessions
              </p>
            </div>
            {/* <div className="text-xs bg-primary font-medium text-white px-3 py-1 rounded-full">
              2 hrs approx
            </div> */}
            <div></div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {section?.videos?.map((video, index) => {
            return (
              <div
                className="pl-3 cursor-pointer"
                onClick={() => {
                  setPlayVideo({ ...video });
                }}
              >
                <div className="flex font-heading text-gray-500 space-x-3 items-start px-2 pb-4">
                  <div className=" flex font-semibold text-sm pt-0 space-x-2">
                    <img src="icons/video.svg" alt="" />
                    <p>{index < 10 ? "0" + (index + 1) : index + 1}</p>
                  </div>
                  <div>
                    <h1 className="font-semibold text-sm">{video.title}</h1>
                    <p className="text-xs font-medium">Video . 6m 20s</p>
                  </div>

                  <div></div>
                </div>
              </div>
            );
          })}
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <div className="flex h-full">
      <div className="w-2/6 bg-white p-3 ">
        <div className="flex items-center  border-b-2 pb-1">
          <img src="icons/back.svg" alt="" className="w-5" />
          {/* product name */}
          <p className="font-heading text-sm font-semibold text-gray-300">
            {/* {console.log(course)} */}
            {course?.name}
          </p>
        </div>
        <h1 className="font-heading font-bold text-xl my-3 ">Syllabus</h1>
        {course?.sections?.map((section, index) => {
          return Segmeant(section, index);
        })}
      </div>
      <div className="bg-gray-200 w-full">
        <div style={{ position: "relative", "padding-top": "56.25%" }}>
          <iframe
            src={`https://iframe.mediadelivery.net/embed/54086/${playVideo.videoKey}`}
            loading="lazy"
            style={{
              border: "none",
              position: "absolute",
              top: 0,
              height: "100%",
              width: "100%",
            }}
            allow="accelerometer; gyroscope;  encrypted-media; picture-in-picture;"
            allowfullscreen="true"
          ></iframe>
        </div>
        <div>
          <h1 className="font-heading font-bold text-3xl my-3 text-gray-600 pt-5 px-5 pb-1">
            {playVideo.title}
          </h1>
          <p className="font-base font-medium text-base my-3 text-gray-600 px-5">
            {playVideo.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
