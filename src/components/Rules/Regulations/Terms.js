import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCookie } from "react-use";
import { ApiBaseURL, ApiEndpoints } from "../../ApiConfig";
import axios from "axios";

export default function Terms() {
  const navigate = useNavigate();

  const [loggedIn] = useCookie("maang");
  const [showContent, setShowContent] = useState(true);

  const handleSubmit = async () => {
    if (loggedIn) {
      try {
        const formDataRules = new FormData();
        formDataRules.append("count", 10);

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

        const responsePageVisit = await axios.post(
          `${ApiBaseURL}/mentor-management/page-visit-count/`,
          null,
          {
            headers: {
              Authorization: `Token ${JSON.parse(loggedIn).token}`,
            },
          }
        );

        // console.log(responsePageVisit.data);

        setShowContent(false);
        navigate("/mentor", { replace: true });
        setShowContent(false);
      } catch (error) {
        // console.error("Error hitting API:", error);
      }
    }
  };

  return (
    <div>
      <div className="xl:w-[800px] md:w-[500px] w-[340px] px-10 py-16 bg-white rounded-lg shadow-xl text-center">
        <div className="mb-8">
          <span className="mx-auto text-left">
            <img
              src="/images/terms.png"
              alt=""
              className=" inline-block max-w-full"
            />
            <div className="text-gray-700 text-3xl font-semibold font-['Outfit']">
              Privacy Terms
            </div>

            <div className="w-[330px] text-gray-600 text-xl font-normal font-['Outfit']">
              <li>
                {" "}
                Personal interactions with students is strictly prohibited and
                its against the company policy
              </li>
            </div>
            <div className="w-[330px] text-gray-600 text-xl font-normal font-['Outfit']">
              <li>
                {" "}
                Company internal data can’t collected and shared with the
                external parties.
              </li>
            </div>
          </span>

          <div className="w-[157px] h-[45px] px-5 py-2.5 bg-emerald-400 rounded-[5px] justify-center items-center gap-2.5 inline-flex">
            <a
              className="text-white text-xl font-medium font-['Outfit']"
              onClick={handleSubmit}
            >
              Finished
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
