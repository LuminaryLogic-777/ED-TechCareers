import React from "react";
import Layout from "../components/Layout";
import Header from "./../components/Header";
import { useUserStore } from "./../store/store";

import AccordionMessage from "./../components/AccordianMessage";

const InboxPage = () => {
  const user = useUserStore((state) => state.user);
  return (
    <Layout>
      <Header title="My Inbox" subTitle="Check out all your messages here" />

      <div className="flex flex-col items-center justify-center my-10">
        {user?.message?.map((msg) => {
          return (
            <AccordionMessage
              heading={msg.heading}
              subject={msg.content}
              sender={msg.sender}
              sendAt={msg.sendAt}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default InboxPage;
