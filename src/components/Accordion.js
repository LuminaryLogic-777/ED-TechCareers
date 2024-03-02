import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const Accordion = ({ name, lock, lessons, index, opening = true }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className=" w-full rounded shadow-sm  cursor-pointer mb-2"
      onClick={() => setOpen(!open)}
      key={index}
    >
      <div className="bg-white hover:bg-gray-50 transition ease-in-out duration-500">
        {/*  */}
        <div className="px-5 py-3 flex space-x-4 ">
          <h1 className="font-heading font-bold text-gray-500 text-xl">
            {index + 1 < 10 ? "0" + (index + 1) : index + 1}
          </h1>
          <div className="">
            <h1 className="font-heading font-bold text-gray-500 text-xl">
              {name}
            </h1>
            <p className="text-sm font-heading font-medium">
              {lessons.length} Topics
            </p>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {open && opening && (
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
            {lessons.map((topic, i) => {
              return (
                <>
                  <div className="pl-10 pt-3 pb-5 flex items-center space-x-2 text-gray-500">
                    <PlayCircleIcon />
                    <h1 className="font-heading font-semibold   ">
                      {i + 1 < 10 ? "0" + (i + 1) : i + 1} {topic.name}
                    </h1>
                  </div>
                  <div className="pt-3"></div>
                </>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
