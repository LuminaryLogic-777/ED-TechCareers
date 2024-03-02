import React from "react";
import { useNavigate } from "react-router-dom";
import "./funnel.css";
import "./input.css";

export default function Welcome() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/webinars/name", { replace: true });
  };
  return (
    <div className="funnel-bg h-screen flex justify-center items-center font-heading bg-cover bg-no-repeat bg-center p-5">
      <div class="xl:w-[700px] md:w-[500px] w-[340px] px-10 py-16 bg-white rounded-lg shadow-xl text-center relative">
        <div class="mb-8">
          <span className="sm:max-w-[232px] max-w-[174px] block mx-auto text-left">
            <img
              src="/images/logo-lg.png"
              alt=""
              class=" inline-block max-w-full"
            />
            <br />
            <label className="sm:max-w-[232px] max-w-[174px] font-base font-medium tracking-[0.5px] text-2xl text-md px-5 block">
              Explore the Limits
            </label>
          </span>
        </div>
        <h1 class="mx-auto mb-12 font-heading md:text-[50px] text-[35px] leading-none text-gray-700 font-semibold max-w-[400px]">
          Welcome to MAANG Careers!
        </h1>

        <a
          onClick={() => {
            handleSubmit();
          }}
          class="inline-block py-3 px-6 font-base text-xl font-medium text-white rounded bg-till-600 hover:bg-till-900 duration-150"
        >
          Get Started <i class="bx bxs-right-arrow-alt align-middle"></i>
        </a>
      </div>
    </div>
  );
}
