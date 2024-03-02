import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Layout from "../components/Layout";
import TimetableAccordion from "./../components/TimetableAccordion";
import { useCookie } from "react-use";
// import axios from "axios";
import { ApiBaseURL, ApiEndpoints } from "./../components/ApiConfig";

const TimetablePage = () => {
  const [loggedIn, ,] = useCookie("maang");
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    if (!loggedIn) window.location.href = "/";
  });

  useEffect(() => {
    loggedIn &&
      fetch(`${ApiBaseURL}course-management/user-batch/`, {
        headers: {
          Authorization: `Token ${JSON.parse(loggedIn).token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setBatches(data.results))
        .catch((err) => console.error(err));
  }, [loggedIn]);

  // const [purchase, setPurchase] = useState([]);

  // const getPuchase = async () => {
  //   // console.log(user._id);
  //   if (user) {
  //     // const purchase_res = await axios.get(
  //     //   `${process.env.REACT_APP_API_URL}/purchase/${user._id}`
  //     // );

  //     // console.log(purchase_res.data);
  //     // setPurchase(purchase_res.data);
  //   }
  // };

  // useEffect(() => {
  //   getPuchase();
  // }, []);

  return (
    <Layout title="Time Table">
      <Header title="My Time Table" subTitle="Here is your time table" />
      <div
        className="flex flex-col items-center my-10"
        style={{ minHeight: "50vh" }}
      >
        {batches.map((batch) => {
          return <TimetableAccordion {...batch} />;
        })}
        {batches.length === 0 && (
          <div className="h-100v" style={{ height: "60vh" }}>
            <h1 className="text-center text-2xl font-bold">
              You are not enrolled into any courses
            </h1>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TimetablePage;
