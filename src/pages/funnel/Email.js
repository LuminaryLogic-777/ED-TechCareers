import React, { useEffect, useState } from "react";
import "./funnel.css";
import "./input.css";

import { GoogleSpreadsheet } from "google-spreadsheet";
import { useLocation, useNavigate } from "react-router-dom";

export default function Email() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(
    sessionStorage.getItem("email") || location.state?.email || ""
  );
  const [emailError, setEmailError] = useState("");
  const name = sessionStorage.getItem("name");
  const whatsapp = sessionStorage.getItem("whatsapp");
  const code = sessionStorage.getItem("code");

  useEffect(() => {
    // Save the name value to session storage
    sessionStorage.setItem("email", email);
  }, [email]);

  useEffect(() => {
    if (!whatsapp || !code) {
      navigate("/webinars");
    }
  }, [whatsapp, code]);

  // const addToSpreadsheet = async (email) => {
  //   try {
  //     // Initialize the Google Spreadsheet - replace with your spreadsheet ID
  //     const doc = new GoogleSpreadsheet("YOUR_SPREADSHEET_ID");

  //     // Authentication using the credentials JSON file
  //     await doc.useServiceAccountAuth({
  //       client_email: "YOUR_CLIENT_EMAIL",
  //       private_key: "YOUR_PRIVATE_KEY",
  //     });

  //     // Load the document properties and worksheets
  //     await doc.loadInfo();

  //     // Access the specific sheet by its index (zero-based) or title
  //     const sheet = doc.sheetsByIndex[0]; // Change index accordingly

  //     // Add data to the sheet
  //     await sheet.addRow({ Name: email });

  //     console.log("Data added to the spreadsheet!");
  //   } catch (error) {
  //     console.error("Error adding data to the spreadsheet:", error);
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const name = e.target.elements.name.value;
  //   history.push({
  //     pathname: "/influencer/webinar",
  //     state: { email: name },
  //   });
  //   // // Add the name to the spreadsheet
  //   // addToSpreadsheet(name);
  // };

  const changeEmail = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);
    validateEmail(enteredEmail);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    if (!isValid) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError(""); // Clear the error when the email is valid
    }
  };

  const handleSubmit = () => {
    // Check if the email is not empty and is valid
    if (email.trim() === "" || emailError !== "") {
      // Handle invalid email (e.g., show an error message)
      setEmailError("Please enter a valid email address");
      return;
    }
    // addToSpreadsheet(email);
    navigate("/webinars/webinar", {
      state: { email: email, name: name, whatsapp: whatsapp, code: code },
    });
  };

  return (
    <div className="funnel-bg lg:h-screen flex justify-center items-center font-heading bg-cover bg-no-repeat bg-center p-5">
      <div class="2xl:w-[1100px] xl:w-[1024px] lg:w-[920px] md:w-[700px] lg:p-5 p-3 bg-white rounded-[20px] shadow-xl relative">
        <div class="funnel-body rounded-[10px] relative">
          <div class="rounded-[10px] relative z-10 p-2">
            <div class="mb-8 pt-8 text-center">
              <img
                src="/images/logo-lg.png"
                alt=""
                class="max-w-[145px] inline-block"
              />
            </div>

            <div class="flex flex-wrap justify-between items-center -mx-5 mb-5 gap-y-5">
              <div class="2xl:w-6/12 xl:w-6/12 lg:w-6/12 w-full px-5 pb-10 lg:pb-0">
                <img src="/images/email.png" alt="" class="w-full" />
              </div>

              <div class="2xl:w-6/12 xl:w-6/12 lg:w-6/12 w-full px-5">
                <div className="user-name mb-5 lg:text-left text-center">
                  <h1 className="text-gray-600 lg:text-3xl text-[25px]">
                    Hey <span className="text-sky-500">{name},</span>
                  </h1>
                  <p className="text-gray-600 lg:text-lg text-base font-normal">
                    Help us personalise your experience by telling us a bit
                    about your self.
                  </p>
                </div>
                <form action="" className="pb-24 lg:pb-0">
                  <div className="lg:text-left text-center">
                    <label
                      for="price"
                      class="block mb-4 font-base text-gray-700 lg:text-3xl sm:text-[25px] text-xl font-semibold"
                    >
                      What Is Your Email Address?
                    </label>
                    <div class="relative mt-2 rounded-md">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        class="block lg:w-[calc(100%-2rem)] w-full text-lg rounded-md border border-slate-300 py-4 px-5 text-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-till-600 focus:outline-none"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={changeEmail}
                      />
                    </div>
                    {emailError && (
                      <p className="text-red-500 mt-2">{emailError}</p>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div class="flex justify-between items-center gap-x-5">
              <ul class="m-0 p-0">
                <li class="list-none me-3 inline-block text-gray-400">
                  <a
                    href="/terms-and-condition"
                    class="text-gray-600 hover:text-till-900"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li class="list-none me-3 inline-block text-gray-400">|</li>
                <li class="list-none me-3 inline-block text-gray-400">
                  <a
                    href="/privacy-policy"
                    class="text-gray-600 hover:text-till-900"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
              <a
                type="button"
                class="inline-block py-3 px-6 text-xl font-medium text-white rounded bg-till-600 hover:bg-till-700 whitespace-nowrap"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Next <i class="bx bxs-right-arrow-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
