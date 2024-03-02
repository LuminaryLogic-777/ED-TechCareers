import React from "react";

const Header = ({ title, subTitle }) => {
  return (
    <section className="py-10 space-y-3 bg-theme">
      <div className="2xl:container mx-auto 2xl:px-5 lg:px-24 sm:px-12 px-10">
        <div className="w-full flex flex-col items-center">
          <h1 className="font-heading text-white font-bold text-4xl md:text-5xl mb-3">
            {title}
          </h1>
          <h5 className="font-heading text-white text-sm px-3 text-center md:text-lg">
            {subTitle}
          </h5>
        </div>
      </div>
    </section>
  );
};

export default Header;
