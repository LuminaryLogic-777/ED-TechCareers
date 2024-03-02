import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
// import Moment from "react-moment";
// import "moment-timezone";

const AccordionMessage = ({ heading, subject, sender, sendAt }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded shadow-sm cursor-pointer mb-2 md:w-2/3"
      onClick={() => setOpen(!open)}
    >
      <div className="bg-white hover:bg-gray-50 transition ease-in-out duration-500 rounded">
        <div className="px-5 py-5 flex justify-between space-x-3 items-center text-gray-600 border-b-2">
          <h1 className="font-heading  font-semibold text-base  md:text-lg">
            {heading}
          </h1>
          <div className="flex space-x-3">
            <p className="font-base  text-sm">
              Sent By:{" "}
              <span className="bg-gray-500 px-3 py-1 text-white rounded-full text-xs font-bold">
                {sender}
              </span>
            </p>
            <p className="font-base text-sm">
              Sent On: {sendAt}
            </p>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="bg-white"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <p className="px-6 pb-5 font-base text-sm lg:text-base text-gray-600 py-5">
              {subject}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccordionMessage;
