import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TimetableAccordion = ({ id, name, course, timetable }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className=" w-full rounded shadow-sm  cursor-pointer mb-2"
      onClick={() => setOpen(!open)}
    >
      <div className="bg-white hover:bg-gray-50 transition ease-in-out duration-500 rounded">
        {/*  */}
        <div className="px-6 py-5 flex space-x-4 text-gray-600  shadow mb-5">
          <h1 className="font-heading font-bold text-xl">{name}</h1>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="bg-white px-10 "
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <table className="w-full">
              <tr className="font-base font-medium text-gray-500">
                <th></th>
                {/* <th className="text-left py-3">Topic Name</th> */}
                <th className="text-left">Date</th>
                <th className="text-left">Class Start Time</th>
                <th></th>
                {/* {console.log(batch)} */}
              </tr>

              {timetable?.map((tb, index) => {
                // console.log(tb);
                return (
                  <tr className="font-base">
                    <td className="py-3 px-2">
                      <p className="bg-primary rounded-full flex items-center justify-center text-white px-1">
                        {index + 1}
                      </p>
                    </td>
                    {/* <td>{tb.topicName}</td> */}
                    <td>{tb.start_date}</td>

                    <td>{tb.start_time}</td>
                    <td>
                      {" "}
                      {tb.link ?
                        <a href={tb.link} target="_blank" rel="noreferrer">
                          <button
                            // onClick={() => document.location.href = String(tb.link)}
                            className="font-base font-medium rounded text-sm  px-5 py-1 bg-primary border-2 border-primary text-white  hover:bg-primaryDark transition duration-500"
                          >
                            Join Class
                          </button></a> :
                        <button
                          disabled
                          // onClick={() => navigate("/courses")}
                          className="font-base font-medium rounded text-sm px-5 py-1 bg-primary border-2 border-primary text-white transition duration-500"
                        >
                          Disabled
                        </button>}
                    </td>
                  </tr>
                );
              })}
            </table>
            <div className="p-3"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimetableAccordion;
