import React, { useEffect, useState } from "react";
import axios from "axios";

import Layout from "../components/Layout";
import { useParams } from "react-router-dom";

import * as emailVerified from "../lottie/email-verified.json";
import * as emailUnverified from "../lottie/email-unverified.json";

import Lottie from "react-lottie";

const VerifyEmailPage = () => {
  const { token } = useParams();

  const [msg, setMsg] = useState();
  const [error, setError] = useState();

  const emailVerifiedOptions = {
    loop: false,
    autoplay: true,
    animationData: emailVerified,
    // rendererSettings: {
    //   preserveAspectRatio: "xMidYMid slice",
    // },
  };

  const emailUnverifiedOptions = {
    loop: false,
    autoplay: true,
    animationData: emailUnverified,
    // rendererSettings: {
    //   preserveAspectRatio: "xMidYMid slice",
    // },
  };

  const verifyEmail = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/verify/${token}`
      );

      setMsg(res.data.msg);
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return (
    <Layout>
      <div className="h-screen flex flex-col justify-center items-center space-y-8">
        {msg && <Lottie options={emailVerifiedOptions} height={200}></Lottie>}
        {error && (
          <Lottie options={emailUnverifiedOptions} height={200}></Lottie>
        )}

        {msg && (
          <h1 className="font-base text-2xl font-medium text-green-500">
            {msg}
          </h1>
        )}
        {error && (
          <h1 className="font-base text-2xl font-medium text-red-500">
            {error}
          </h1>
        )}
      </div>
    </Layout>
  );
};

export default VerifyEmailPage;
