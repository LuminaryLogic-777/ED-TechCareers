import React, { useEffect, useState } from "react";
import "./funnel.css";
import "./input.css";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { useHistory } from "react-router";

export default function Name() {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState(
    sessionStorage.getItem("name") || location.state?.name || ""
  );
  const [error, setError] = useState("");

  useEffect(() => {
    // Save the name value to session storage
    sessionStorage.setItem("name", name);
  }, [name]);

  // const doc = new GoogleSpreadsheet(
  //   "1GP5nhCHCE_0-PFHEMuY0LimDkZNu9sc5a4ijN8DCExM"
  // );

  // const appendSpreadsheet = async (row) => {
  //   try {
  //     await doc.useServiceAccountAuth({
  //       client_email: "webinars@maangcareerswebinars.com",
  //       private_key: "AIzaSyBHSNiX3LPk-vmlaalvjCCh8ogOfIgrs08",
  //     });
  //     await doc.loadInfo();
  //     console.log(doc.loadInfo());
  //     const sheet =
  //       doc.sheetsById["1GP5nhCHCE_0-PFHEMuY0LimDkZNu9sc5a4ijN8DCExM"];
  //     const result = await sheet.addRow(row);
  //     console.log("hello", result);
  //     return result;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const handleChange = (e) => {
    setName(e.target.value);
    setError("");
  };

  const handleSubmit = () => {
    // Validate the name
    if (name.trim() === "") {
      // Handle invalid name (e.g., show an error message)
      setError("Please enter your name.");
      return;
    }
    // Proceed to the next step
    navigate("/webinars/whatsapp", { state: { name: name } });
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
              <div class="2xl:w-6/12 xl:w-6/12 lg:w-6/12 w-full px-5 pb-6 lg:pb-0">
                <img src="/images/funnels-2.svg" alt="" class="w-full" />
              </div>
              <div class="2xl:w-6/12 xl:w-6/12 lg:w-6/12 w-full px-5">
                <form action="" className="pb-4 lg:pb-0">
                  <div className="lg:text-left text-center">
                    <label
                      for="price"
                      class="block mb-4 font-base text-gray-700 text-3xl font-semibold"
                    >
                      What Is Your Name?
                    </label>
                    <div class="relative mt-2 rounded-md">
                      <input
                        onChange={handleChange}
                        value={name}
                        type="text"
                        name="name"
                        id="name"
                        class="block lg:w-[calc(100%-2rem)] w-full text-lg rounded-md border border-slate-300 py-4 px-5 text-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-till-600 focus:outline-none"
                        placeholder="Enter your name here"
                      />
                      {error && (
                        <p className="text-red-500 text-sm mt-1">{error}</p>
                      )}
                    </div>
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
