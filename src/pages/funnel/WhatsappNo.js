import React, { useEffect, useState } from "react";
import "./funnel.css";
import "./input.css";
import { useLocation, useNavigate } from "react-router-dom";

import { GoogleSpreadsheet } from "google-spreadsheet";

export default function WhatsappNo() {
  const navigate = useNavigate();
  const location = useLocation();
  const name = sessionStorage.getItem("name");
  const [whatsapp, setWhatsApp] = useState(
    sessionStorage.getItem("whatsapp") || location.state?.whatsapp || ""
  );
  const [code, setCode] = useState(
    sessionStorage.getItem("code") || location.state?.code || 91
  );
  const [error, setError] = useState("");

  useEffect(() => {
    // Save the name value to session storage
    sessionStorage.setItem("whatsapp", whatsapp);
    sessionStorage.setItem("code", code);
  }, [whatsapp, code]);

  useEffect(() => {
    if (!name) {
      navigate("/webinars");
    }
  }, [name]);

  // const addToSpreadsheet = async (number) => {
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
  //     await sheet.addRow({ Name: number });

  //     console.log("Data added to the spreadsheet!");
  //   } catch (error) {
  //     console.error("Error adding data to the spreadsheet:", error);
  //   }
  // };

  const handleChange = (e) => {
    setWhatsApp(e.target.value);
    setError("");
  };

  const handleCode = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = () => {
    // Validate the name
    const phoneNumberRegex = /^\d{10}$/; // Assuming a 10-digit phone number
    if (!phoneNumberRegex.test(whatsapp)) {
      // Handle invalid phone number
      setError("Please enter your number to proceed further!");
      return;
    }

    if (code === "") {
      setError("Enter Country code to proceed further");
      return;
    }

    // Proceed to the next step
    navigate("/webinars/email", {
      state: { whatsapp: whatsapp, name: name, code: code },
    });
  };

  return (
    <div className="funnel-bg lg:h-screen flex justify-center items-center font-heading bg-cover bg-no-repeat bg-center p-5">
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
              <div class="2xl:w-6/12 xl:w-6/12 lg:w-6/12 w-full px-5 pb-10 lg:pb-0">
                <img
                  src="/images/whatsapp.png"
                  alt=""
                  class="w-full xl:max-w-[422px]"
                />
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
                      What Is Your Whatsapp Number?
                    </label>
                    <div
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <div class="relative mt-2 flex">
                        <div class="w-3/12">
                          <input
                            type="tel"
                            name="code"
                            id="code"
                            class="block w-[calc(100%-1rem)] text-lg rounded-md border border-slate-300 py-4 px-5 text-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-till-600 focus:outline-none"
                            placeholder="Country Code"
                            onChange={handleCode}
                            value={code}
                          />
                        </div>

                        <div class="relative w-9/12">
                          <input
                            type="tel"
                            name="whatsapp"
                            id="whatsapp"
                            class="block w-[calc(100%-1rem)] text-lg rounded-md border border-slate-300 py-4 px-5 text-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-till-600 focus:outline-none"
                            placeholder="Enter your number here"
                            onChange={handleChange}
                            value={whatsapp}
                          />
                        </div>
                      </div>
                    </div>
                    {error && (
                      <p className="text-red-500 mt-2 text-sm">{error}</p>
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
