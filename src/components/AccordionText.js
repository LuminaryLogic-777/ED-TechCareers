import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const AccordionText = ({ heading, subject }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className=" w-full rounded shadow-sm  cursor-pointer mb-2"
      onClick={() => setOpen(!open)}
    >
      <div className="bg-white hover:bg-gray-50 transition ease-in-out duration-500 rounded">
        {/*  */}
        <div className="px-6 py-5 flex space-x-4 text-gray-600">
          <h1 className="font-heading font-bold text-base  md:text-xl">
            {heading}
          </h1>
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
            <p className="px-6 pb-5 font-base text-sm lg:text-base text-gray-500 font-medium">
              {subject}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccordionText;
