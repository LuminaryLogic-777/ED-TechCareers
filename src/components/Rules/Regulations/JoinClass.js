import React, { useState } from "react";
import { useCookie } from "react-use";
import axios from "axios";
import RecordClass from "./RecordClass";
import { ApiBaseURL, ApiEndpoints } from "../../ApiConfig";
export default function JoinClass() {
  const [loggedIn] = useCookie("maang");
  const [showContent, setShowContent] = useState(true);

  const handleAgreeAndNext = async () => {
    const formDataRules = new FormData();
    formDataRules.append("count", 7);

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

  return (
    <div>
      {showContent ? (
        <div className="xl:w-[800px] md:w-[500px] w-[340px] px-10 py-16 bg-white rounded-lg shadow-xl text-center">
          <div className="mb-8">
            <div className="w-[322px] text-gray-700 text-3xl font-semibold font-['Outfit']">
              Join the class before 10 min and the accept the student
              invitations on google meets
            </div>

            <span className="mx-auto text-left">
              <img
                src="/images/rename.png"
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
          <RecordClass />
        </div>
      )}
    </div>
  );
}