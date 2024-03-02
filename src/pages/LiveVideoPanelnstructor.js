import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import VideocamIcon from "@mui/icons-material/Videocam";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { IconButton } from "@mui/material";
import Peer from "peerjs";

import { useUserStore } from "./../store/store";
import socket from "../config/socket";
import { useParams } from "react-router-dom";

const LiveVideoPanel = () => {
  const { batchId, classId, sessionId } = useParams();

  const [text, setText] = useState("");

  //
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) {
      socket.auth = {
        id: user._id,
        name: user.name,
        role: user.role,
        batchId,
        classId,
        sessionId,
      };
      socket.connect();
    }
  }, []);

  const handleSend = () => {
    // console.log(text);
    socket.to("class1").emit("send-message", { text });
  };

  //
  const peer = new Peer("1232423432423", {
    host: "/",
    port: "8000",
  });

  useEffect(() => {
    peer.on("open", function (id) {
      // console.log(id);
    });
  }, []);

  useEffect(() => {}, []);

  const handelUserMedia = (stream) => {
    peer.on("call", function (call) {
      call.answer(stream);
    });
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };
  return (
    <div className="p-10" style={{ backgroundColor: "#1C1C27" }}>
      <div className="grid grid-cols-4 gap-5 ">
        <div
          className="col-span-3 rounded relative"
          style={{ backgroundColor: "#28293D" }}
        >
          <div
            className="flex justify-center"
            style={{ backgroundColor: "#212235" }}
          >
            <p className="font-base text-gray-400 text-sm p-3">VIDEO WINDOW </p>
          </div>
          <p className="bg-red-600 -top-3 right-3 font-base absolute text-white px-3 py-1 rounded-full text-xs ml-2">
            Secure Live
          </p>
          <div className="flex flex-col justify-center p-5">
            <div className="rounded overflow-hidden">
              <Webcam
                height={720}
                width={1280}
                videoConstraints={videoConstraints}
                imageSmoothing={true}
                onUserMedia={handelUserMedia}
              />
            </div>
            <div className="flex justify-center mt-5  ">
              <div
                className="flex space-x-5 px-10 rounded-full"
                style={{ backgroundColor: "#212235" }}
              >
                <IconButton>
                  <VideocamIcon sx={{ color: "#ffffff", fontSize: "28px" }} />
                </IconButton>
                <IconButton>
                  <KeyboardVoiceIcon
                    sx={{ color: "#ffffff", fontSize: "28px" }}
                  />
                </IconButton>
                <IconButton>
                  <ScreenShareIcon
                    sx={{ color: "#ffffff", fontSize: "28px" }}
                  />
                </IconButton>
                <IconButton>
                  <StopCircleIcon sx={{ color: "#ffffff", fontSize: "28px" }} />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
        <div
          className="rounded flex flex-col justify-between"
          style={{ backgroundColor: "#28293D" }}
        >
          <div
            className="flex justify-center"
            style={{ backgroundColor: "#212235" }}
          >
            <p className="font-base text-gray-400 text-sm p-3">CHAT WINDOW</p>
          </div>
          <div className="h-full"></div>
          <div className="flex">
            <input
              style={{ backgroundColor: "#3B3C51" }}
              type="text"
              placeholder="Type Here"
              className="w-full px-5 py-2 rounded-b font-base text-sm focus:outline-none text-gray-200"
              name=""
              id=""
              onChange={(event) => {
                setText(event.target.value);
              }}
            />
            <button
              className="bg-primary text-sm font-medium text-white px-6 rounded-br"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <div className="p-3  mt-5 flex flex-col space-y-2">
        <h1 className="font-base text-gray-400 text-2xl font-semibold">
          Interview Preparation Course
          <span className="bg-green-500 text-white text-xs px-5 py-1 rounded-full ml-3">
            Class 1
          </span>
        </h1>
        <h2 className="font-base text-gray-400 text-base">
          Instructor: Mr Ajit
        </h2>
      </div>
    </div>
  );
};

export default LiveVideoPanel;
