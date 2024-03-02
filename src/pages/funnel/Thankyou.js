import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./funnel.css";
import "./input.css";

export default function Thankyou() {
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("popstate", (e) => {
      navigate("/webinars");
    });
  }, []);

  useEffect(() => {
    // Save the name value to session storage
    sessionStorage.setItem("name", "");
    sessionStorage.setItem("email", "");
    sessionStorage.setItem("whatsapp", "");
    sessionStorage.setItem("code", "");
    sessionStorage.setItem("selectedDay", "");
    sessionStorage.setItem("selectedDate", "");
    sessionStorage.setItem("selectedTime", "");
  }, []);

  return (
    <div className="funnel-bg h-screen flex justify-center items-center font-heading bg-cover bg-no-repeat bg-center p-5">
      <div class="2xl:w-[1100px] xl:w-[1024px] lg:w-[920px] md:w-[700px] lg:p-5 p-3 bg-white rounded-[20px] shadow-xl relative">
        <div class="funnel-body rounded-[10px] relative">
          <div class="rounded-[10px] relative z-10 p-2">
            <div class="mb-10 pt-10 text-center">
              <img
                src="/images/logo-lg.png"
                alt=""
                class="max-w-[145px] inline-block"
              />
            </div>

            <div class="flex flex-wrap justify-between items-center -mx-5 mb-5 gap-y-5">
              <div class="w-full px-5 pb-10 lg:pb-0">
                <img
                  src="/images/thankyou.png"
                  alt=""
                  class="max-w-full sm:max-w-[450px] mx-auto"
                />
              </div>

              <div class="w-full px-5">
                <form action="">
                  <div className="text-center">
                    <label
                      for="price"
                      class="block mb-4 font-base text-gray-700 lg:text-3xl sm:text-[25px] text-xl font-semibold"
                    >
                      Thank You!
                    </label>
                    <p className="text-gray-600 lg:text-lg text-base font-normal">
                      We will send you the webinar details shortly
                    </p>
                  </div>
                </form>
              </div>
            </div>
            <div class="flex justify-center items-center gap-x-5">
              <a
                type="button"
                href="/"
                class="inline-block py-3 px-6 text-xl font-medium text-white rounded bg-till-600 hover:bg-till-700 whitespace-nowrap"
              >
                Exit <i class="bx bxs-right-arrow-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
