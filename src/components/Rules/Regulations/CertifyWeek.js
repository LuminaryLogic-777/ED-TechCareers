import React, { useState } from "react";
import { useCookie } from "react-use";
import Terms from "./Terms";
import axios from "axios";
import { ApiBaseURL, ApiEndpoints } from "../../ApiConfig";
export default function CertifyWeek() {
  const [loggedIn] = useCookie("maang");
  const [showContent, setShowContent] = useState(true);

  const handleAgreeAndNext = async () => {
    const formDataRules = new FormData();
    formDataRules.append("count", 9);

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

    // const apiMessageRules = responseRules.data.message;

    setShowContent(false);
  };

  return (
    <div>
      {showContent ? (
        <div className="xl:w-[800px] md:w-[500px] w-[340px] px-10 py-16 bg-white rounded-lg shadow-xl text-center">
          <div className="mb-8">
            <div className="w-[334px] text-gray-700 text-3xl font-semibold font-['Outfit']">
              Complete all 8 weeks classes and release certificates from the
              courses tab.
            </div>
            <span className="mx-auto text-left">
              <img
                src="/images/certify.png"
                alt=""
                className=" inline-block max-w-full"
              />
            </span>

            <div className="w-[157px] h-[45px] px-5 py-2.5 bg-emerald-400 rounded-[5px] justify-center items-center gap-2.5 inline-flex">
              <a
                className="text-white text-xl font-medium font-['Outfit']"
                onClick={handleAgreeAndNext}
              >
                Next
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-8">
          <Terms />
        </div>
      )}
    </div>
  );
}
