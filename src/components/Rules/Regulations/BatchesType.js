import React, { useState } from "react";
// import BatchCard from "./BatchCard";
import ClassTiming from "./ClassTiming";
import { useCookie } from "react-use";
import axios from "axios";
import { ApiBaseURL, ApiEndpoints } from "../../ApiConfig";

export default function BatchesType() {
  const [loggedIn] = useCookie("maang");
  const [showContent, setShowContent] = useState(true);

  const handleAgreeAndNext = async () => {
    const formDataRules = new FormData();
    formDataRules.append("count", 3);

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

    const apiMessageRules = responseRules.data.message;

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

  // const batches = [
  //   {
  //     name: "Batch 1",
  //     days: ["Monday", "Wednesday", "Friday"],
  //   },
  //   {
  //     name: "Batch 2",
  //     days: ["Tuesday", "Thursday", "Saturday"],
  //   },
  //   // Add more batches as needed
  // ];

  return (
    <div>
      {showContent ? (
        <div class="xl:w-[800px] md:w-[500px] w-[340px] px-10 py-16 bg-white rounded-lg shadow-xl text-center">
          <div class="mb-8">
            <div className="text-center text-gray-700 text-3xl font-semibold font-['Outfit']">
              2 Types of batches
            </div>
            <p>Lorem ipsum dolor sit amet consectetur. Tristique </p>
            <div className="flex mx-4">
              <div style={{ width: 125, height: 201, position: "relative" }}>
                <div
                  style={{
                    left: 30,
                    top: 0,
                    position: "absolute",
                    textAlign: "center",
                    color: "#3C4250",
                    fontSize: 20,
                    fontFamily: "Outfit",
                    fontWeight: "500",
                    wordWrap: "break-word",
                  }}
                >
                  Batch 1
                </div>
                <div
                  style={{
                    width: 21,
                    height: 153.54,
                    left: 52,
                    top: 30.46,
                    position: "absolute",
                  }}
                >
                  <div
                    style={{
                      width: 1,
                      height: 137,
                      left: 10,
                      top: 16.54,
                      position: "absolute",
                      background: "#3C4250",
                    }}
                  />
                  <div
                    style={{
                      width: 21,
                      height: 21,
                      left: 0,
                      top: 0,
                      position: "absolute",
                    }}
                  >
                    <div
                      style={{
                        width: 21,
                        height: 21,
                        left: 0,
                        top: 0,
                        position: "absolute",
                        background: "white",
                        border: "1px #3C4250 solid",
                      }}
                    ></div>
                    <div
                      style={{
                        width: 9,
                        height: 9,
                        left: 6,
                        top: 6.54,
                        position: "absolute",
                        background: "#3C4250",
                      }}
                    ></div>
                  </div>
                </div>
                <div
                  style={{
                    width: 125,
                    height: 40,
                    left: 0,
                    top: 61,
                    position: "absolute",
                  }}
                >
                  <div
                    style={{
                      width: 125,
                      height: 40,
                      left: 0,
                      top: 0,
                      position: "absolute",
                      background: "#F9FFFD",
                      borderRadius: 10,
                      border: "1px #C5D9DC solid",
                    }}
                  />
                  <div
                    style={{
                      left: 34,
                      top: 10,
                      position: "absolute",
                      textAlign: "center",
                      color: "#3C4250",
                      fontSize: 16,
                      fontFamily: "Outfit",
                      fontWeight: "600",
                      wordWrap: "break-word",
                    }}
                  >
                    Monday
                  </div>
                </div>
                <div
                  style={{
                    width: 125,
                    height: 40,
                    left: 0,
                    top: 111,
                    position: "absolute",
                  }}
                >
                  <div
                    style={{
                      width: 125,
                      height: 40,
                      left: 0,
                      top: 0,
                      position: "absolute",
                      background: "#F9FFFD",
                      borderRadius: 10,
                      border: "1px #C5D9DC solid",
                    }}
                  />
                  <div
                    style={{
                      left: 21,
                      top: 10,
                      position: "absolute",
                      textAlign: "center",
                      color: "#3C4250",
                      fontSize: 16,
                      fontFamily: "Outfit",
                      fontWeight: "600",
                      wordWrap: "break-word",
                    }}
                  >
                    Wednesday
                  </div>
                </div>
                <div
                  style={{
                    width: 125,
                    height: 40,
                    left: 0,
                    top: 161,
                    position: "absolute",
                  }}
                >
                  <div
                    style={{
                      width: 125,
                      height: 40,
                      left: 0,
                      top: 0,
                      position: "absolute",
                      background: "#F9FFFD",
                      borderRadius: 10,
                      border: "1px #C5D9DC solid",
                    }}
                  />
                  <div
                    style={{
                      left: 39,
                      top: 10,
                      position: "absolute",
                      textAlign: "center",
                      color: "#3C4250",
                      fontSize: 16,
                      fontFamily: "Outfit",
                      fontWeight: "600",
                      wordWrap: "break-word",
                    }}
                  >
                    Friday
                  </div>
                </div>
              </div>
              <div className="w-[125px] h-[201px] relative">
                <div className="left-[29px] top-0 absolute text-center text-gray-700 text-xl font-medium font-['Outfit']">
                  Batch 2
                </div>
                <div
                  style={{
                    width: 21,
                    height: 153.54,
                    left: 52,
                    top: 30.46,
                    position: "absolute",
                  }}
                >
                  <div
                    style={{
                      width: 1,
                      height: 137,
                      left: 10,
                      top: 16.54,
                      position: "absolute",
                      background: "#3C4250",
                    }}
                  />
                  <div
                    style={{
                      width: 21,
                      height: 21,
                      left: 0,
                      top: 0,
                      position: "absolute",
                    }}
                  >
                    <div
                      style={{
                        width: 21,
                        height: 21,
                        left: 0,
                        top: 0,
                        position: "absolute",
                        background: "white",
                        border: "1px #3C4250 solid",
                      }}
                    ></div>
                    <div
                      style={{
                        width: 9,
                        height: 9,
                        left: 6,
                        top: 6.54,
                        position: "absolute",
                        background: "#3C4250",
                      }}
                    ></div>
                  </div>
                </div>
                <div
                  style={{
                    width: 125,
                    height: 40,
                    left: 0,
                    top: 61,
                    position: "absolute",
                  }}
                >
                  <div
                    style={{
                      width: 125,
                      height: 40,
                      left: 0,
                      top: 0,
                      position: "absolute",
                      background: "#F9FFFD",
                      borderRadius: 10,
                      border: "1px #C5D9DC solid",
                    }}
                  />
                  <div
                    style={{
                      left: 34,
                      top: 10,
                      position: "absolute",
                      textAlign: "center",
                      color: "#3C4250",
                      fontSize: 16,
                      fontFamily: "Outfit",
                      fontWeight: "600",
                      wordWrap: "break-word",
                    }}
                  >
                    Tuesday
                  </div>
                </div>
                <div
                  style={{
                    width: 125,
                    height: 40,
                    left: 0,
                    top: 111,
                    position: "absolute",
                  }}
                >
                  <div
                    style={{
                      width: 125,
                      height: 40,
                      left: 0,
                      top: 0,
                      position: "absolute",
                      background: "#F9FFFD",
                      borderRadius: 10,
                      border: "1px #C5D9DC solid",
                    }}
                  />
                  <div
                    style={{
                      left: 21,
                      top: 10,
                      position: "absolute",
                      textAlign: "center",
                      color: "#3C4250",
                      fontSize: 16,
                      fontFamily: "Outfit",
                      fontWeight: "600",
                      wordWrap: "break-word",
                    }}
                  >
                    Thursday
                  </div>
                </div>
                <div
                  style={{
                    width: 125,
                    height: 40,
                    left: 0,
                    top: 161,
                    position: "absolute",
                  }}
                >
                  <div
                    style={{
                      width: 125,
                      height: 40,
                      left: 0,
                      top: 0,
                      position: "absolute",
                      background: "#F9FFFD",
                      borderRadius: 10,
                      border: "1px #C5D9DC solid",
                    }}
                  />
                  <div
                    style={{
                      left: 39,
                      top: 10,
                      position: "absolute",
                      textAlign: "center",
                      color: "#3C4250",
                      fontSize: 16,
                      fontFamily: "Outfit",
                      fontWeight: "600",
                      wordWrap: "break-word",
                    }}
                  >
                    Saturday
                  </div>
                </div>
              </div>
            </div>
            {/* 
            <div className="flex mx-4">
      {batches.map((batch, index) => (
        <BatchCard key={index} batchName={batch.name} days={batch.days} />
      ))}
    </div> */}
            <span className="mx-auto text-left">
              <img
                src="/images/batches.png"
                alt=""
                class=" inline-block max-w-full"
              />
            </span>
            <p>Note: Each batch has alternative day classes.</p>
          </div>

          <div className="w-[157px] h-[45px] px-5 py-2.5 bg-emerald-400 rounded-[5px] justify-center items-center gap-2.5 inline-flex">
            <a
              className="text-white text-xl font-medium font-['Outfit']"
              onClick={() => {
                handleAgreeAndNext();
              }}
            >
              Next
            </a>
          </div>
        </div>
      ) : (
        <div className="text-center mt-8">
          <ClassTiming />
        </div>
      )}
    </div>
  );
}
