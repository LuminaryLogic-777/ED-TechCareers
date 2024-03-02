import React from "react";
import Layout from "../components/Layout";
import Header from "./../components/Header";
import { ApiBaseURL } from "../components/ApiConfig";

import AccordionMessage from "./../components/AccordianMessage";
import { useEffect, useState } from "react";
import { useCookie } from "react-use";

const InboxPage = () => {
  const [loggedIn, , ] = useCookie('maang')
  const [notice, setNotice] = useState([]);
  useEffect(() => {
    fetch(`${ApiBaseURL}user-management/notice/`)
      .then(res => res.json())
      .then(data => setNotice(data))
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    if (!loggedIn) window.location.href = "/"
  })

  return (
    <Layout>
      <Header title="My Inbox" subTitle="Check out all your messages here" />
      <div className="flex flex-col items-center my-10" style={{minHeight: "50vh"}}>
        {notice.map((msg, i) => {
          return (
            <AccordionMessage
              key={i}
              heading={msg.title}
              subject={msg.content}
              sender={"Admin"}
              sendAt={msg.date}
            />
          );
        })}
        {notice.length === 0 && <div className="h-100v" style={{ height: '60vh' }}><h1 className="text-center text-2xl font-bold">No Messages Yet</h1></div>}
      </div>
    </Layout>
  );
};

export default InboxPage;