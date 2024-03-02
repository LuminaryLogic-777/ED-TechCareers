import React, { useState } from "react";
import WhereStart from "./WhereStart";
import { useCookie } from "react-use";
import axios from "axios";
import { ApiBaseURL, ApiEndpoints } from "../../ApiConfig";

export default function ClassTiming(counter) {
  const [loggedIn] = useCookie("maang");
  const [showContent, setShowContent] = useState(true);

  const handleAgreeAndNext = async () => {
    const formDataRules = new FormData();
    formDataRules.append("count", 4);

    const responseRules = await axios.post(
      `${ApiBaseURL}mentor-management/rules-regulation/`,
      formDataRules,
      {
        headers: {
          Authorization: `Token ${JSON.parse(loggedIn).token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // console.log(responseRules.data);

    setShowContent(false);
  };
  // const handleAgreeAndNext = async () => {
  //   if (loggedIn) {
  //     try {
  //       await axios.post(
  //         "https://devdjango.maangcareers.com/mentor-management/rules-regulation/",
  //         null,
  //         {
  //           headers: {
  //             Authorization: `Token ${JSON.parse(loggedIn).token}`,
  //           },
  //         }
  //       );

  //       // If the request is successful, update the state and proceed to the next step
  //       setShowContent(false);
  //     } catch (error) {
  //       console.error("Error hitting API:", error);
  //     }
  //   }
  // };

  return (
    <div>
      {showContent ? (
        <div className="xl:w-[800px] md:w-[500px] w-[340px] px-10 py-16 bg-white rounded-lg shadow-xl text-center">
          <div className="mb-8">
            <div className="w-[305px] text-gray-700 text-3xl font-semibold font-['Outfit']">
              Typical class timings
            </div>
            <div className="w-[358px] text-gray-600 text-base font-normal font-['Outfit']">
              Lorem ipsum dolor sit amet consectetur. Tristique nec amet amet
              purus.
            </div>

            <span className="mx-auto text-left">
              <img
                src="/images/time.png"
                alt=""
                className=" inline-block max-w-full"
              />
              <br />
              <div className="w-[305px] text-sky-500 text-[25px] font-semibold font-['Outfit']">
                2 hrs per class
              </div>
              <div>
                <li>1 hr 30 min ---Teaching</li>
                <li>30 min ---Doubt Discussion</li>{" "}
              </div>
            </span>
          </div>

          <div className="w-[157px] h-[45px] px-5 py-2.5 bg-emerald-400 rounded-[5px] justify-center items-center gap-2.5 inline-flex">
            <a
              className="text-white text-xl font-medium font-['Outfit']"
              onClick={handleAgreeAndNext}
            >
              Next
            </a>
          </div>
        </div>
      ) : (
        <div className="text-center mt-8">
          <WhereStart />
        </div>
      )}
    </div>
  );
}
