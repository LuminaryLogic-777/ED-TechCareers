import React, { useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children, title = "" }) => {
  useEffect(() => {
    document.title = `MAANG Careers | ${title}`;
  }, [title]);

  return (
    <div className="">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
