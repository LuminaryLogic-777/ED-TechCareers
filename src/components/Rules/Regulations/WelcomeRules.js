import React, { useState } from "react";
import axios from "axios";
import BatchesType from "./BatchesType";
import { useCookie } from "react-use";
import { ApiBaseURL, ApiEndpoints } from "../../ApiConfig";
export default function WelcomeRules() {
  const [loggedIn] = useCookie("maang");
  const [showContent, setShowContent] = useState(true);
  const [counter, setCounter] = useState(0);

  const handleAgreeAndNext = async () => {
    const formDataRules = new FormData();
    formDataRules.append("count", 2);

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

  const handleGoBack = () => {
    setShowContent(true);
  };

  return (
    <div>
      {showContent ? (
        <div className="p-10 bg-white rounded-lg shadow-xl text-center lg:text-left">
          <div className="mb-10 text-gray-700 text-3xl font-semibold font-['Outfit']">
            Welcome to Maang Career
          </div>

          <div className="flex flex-wrap -mx-4 gap-y-5">
            <div className="md:w-4/12 w-full px-4">
              <img
                src="/images/welcome2.png"
                alt=""
                className=" inline-block max-w-full"
              />
            </div>
            <div className="md:w-8/12 w-full px-4">
              <div className="text-gray-700 text-3xl font-semibold font-['Outfit']">
                Teaching quality is our top priority{" "}
              </div>
              <div className="text-gray-600 text-base font-normal font-['Outfit']">
                <p>
                  Lorem ipsum dolor sit amet consectetur. Tristique nec amet
                  amet purus. Posuere nisl enim felis turpis volutpat molestie
                  ultricies.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center lg:text-right">
            <a
              className="inline-block px-5 py-2.5 bg-emerald-400 rounded-[5px] text-white text-xl font-medium font-['Outfit']"
              onClick={handleAgreeAndNext}
            >
              Agree & Next
            </a>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <BatchesType />
        </div>
      )}
    </div>
  );
}
