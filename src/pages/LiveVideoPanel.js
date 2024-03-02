import React, { useRef, useEffect, useState } from "react";

import Peer from "peerjs";

import io from "socket.io-client";

const socket = io("http://localhost:4000");

const LiveVideoPanel = () => {
  const remoteVideoRef = useRef(null);

  const peer = new Peer(undefined, {
    host: "/",
    port: "8000",
  });

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
    getUserMedia(
      { video: true, audio: false },
      function (stream) {
        var call = peer.call("1232423432423", stream);
        remoteVideoRef.current.srcObject = call.options._stream;
        remoteVideoRef.current.play();

        // call.on("stream", function (remoteStream) {
        //   console.log(remoteStream);

        // });
      },
      function (err) {
        console.log("Failed to get local stream", err);
      }
    );
  }, []);

  useEffect(() => {
    socket.on("receive-message", (payload) => {
      setMessages([...messages, payload.message]);
    });
  }, []);

  const sendMessage = () => {
    // console.log(message);
    socket.emit("send-message", { message });
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
          <div className="flex justify-center p-5">
            <div className="rounded overflow-hidden">
              <video ref={remoteVideoRef}></video>
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
          <div className="h-full py-5">
            {messages.map((msg) => {
              return (
                <div className="px-5 py-2 flex space-x-3 text-sm">
                  <p className="font-base" style={{ color: "#969494" }}>
                    Aakifur
                  </p>
                  <p className="font-base text-gray-300">{msg}</p>
                </div>
              );
            })}
          </div>
          <div className="flex">
            <input
              style={{ backgroundColor: "#3B3C51" }}
              type="text"
              placeholder="Type Here"
              className="w-full px-5 py-2 rounded-b font-base text-sm focus:outline-none text-gray-200"
              name=""
              id=""
              onChange={(event) => setMessage(event.target.value)}
            />
            <button
              className="bg-primary text-sm font-medium text-white px-6 rounded-br"
              onClick={sendMessage}
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
