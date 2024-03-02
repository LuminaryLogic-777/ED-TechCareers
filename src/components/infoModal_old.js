import { useEffect } from "react";
import Modal from "@mui/material/Modal";


const InfoModal = ({ name, price, discount_percentage, payment_id, openInfoModal, setOpenInfoModal }) => {

  useEffect(() => {
    function dobutton() {
      const rzpPaymentForm = document.getElementById(payment_id);
      // console.log(openInfoModal, rzpPaymentForm, payment_id)
      if (openInfoModal && rzpPaymentForm) {
        if (!rzpPaymentForm.hasChildNodes()) {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/payment-button.js";
          script.async = true;
          script.dataset.payment_button_id = payment_id;
          rzpPaymentForm.appendChild(script);
        }
      }
    }
    const timeout = setTimeout(() => {
      dobutton()
    }, 250)
    return () => clearTimeout(timeout)
  }, [openInfoModal, payment_id]);

  const discountedPrice = price - (price * discount_percentage) / 100;

  return (
    <Modal
      open={openInfoModal}
      onClose={() => setOpenInfoModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="flex h-screen items-center justify-center">
        {/* <div className="bg-white w-2/3 rounded grid grid-cols-2 gap-10"> */}
        <div className="bg-white w-1/2 rounded">
          {/* <div className="pb-5 pt-8 pl-8"> */}
          <div className="pb-5 pt-8 px-8">
            <h1 className="font-heading font-bold text-xl mb-3">
              Order Summary
            </h1>
            <div className=" font-base space-y-3 mt-5 mb-10 text-gray-800 text-sm bg-gray-200 p-5 rounded">
              <div className="flex  justify-between">
                <p>Course Name</p>
                <p className="">{name}</p>
              </div>
              <div className="flex  justify-between">
                <p>Course Price</p>
                <p>₹ {price}</p>
              </div>
              <div className="flex  justify-between">
                <p>Discount</p>
                <p>- ₹ {(price * discount_percentage) / 100}</p>
              </div>

              {/* {validCoupon && (
                                <div className="flex  justify-between">
                                    <p>Coupon Code Discount</p>
                                    <p className="">
                                        - ₹{(discountedPrice * validCoupon?.discount) / 100}
                                    </p>
                                </div>
                            )} */}
              <div className="h-0.5 w-full bg-white"></div>
              <div className="flex  justify-between items-center">
                <p>Final Price</p>
                {/* {validCoupon ? (
                                    <p className="font-bold text-base">
                                        ₹{" "}
                                        {discountedPrice -
                                            (discountedPrice * validCoupon?.discount) / 100}
                                    </p>
                                ) : ( */}
                <p className="font-bold text-base">₹ {discountedPrice}</p>
                {/* )} */}
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                className="font-heading font-semibold text-white rounded text-sm bg-gray-500 px-8"
                onClick={() => setOpenInfoModal(false)}
              >
                Close
              </button>
              {/* <button
                  className="font-heading font-semibold text-white rounded-sm bg-primary px-8 py-2 text-sm"
                // onClick={handleSubmit}
                >
                  Continue
                </button> */}

              <form id={payment_id}></form>

            </div>
          </div>
          {/* <div className="space-y-6 bg-gray-100 py-6 px-5 rounded">
              <h1 className="font-heading font-bold text-xl mb-3">
                {" "}
                User Details
              </h1>
              <div className="flex flex-col ">
                <label className="font-base text-gray-500 text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  className=" px-3 py-3 border-2 rounded-sm focus:outline-blue-500 text-sm  font-base text-gray-600 "
                  type="text"
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  value={phoneNumber}
                />
              </div>
              <div className="flex flex-col ">
                <label className="font-base text-gray-500 text-sm font-medium mb-2">
                  Location/University
                </label>
                <input
                  className=" px-3 py-3 border-2 rounded-sm focus:outline-blue-500 text-sm  font-base text-gray-600 "
                  type="text"
                  onChange={(event) => setLocation(event.target.value)}
                  value={loaction}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-base text-gray-500 text-sm font-medium mb-2">
                  Coupon Code
                </label>
                <div className="flex w-full space-x-2 items-center">
                  <input
                    className=" px-3 py-3 border-2 rounded-sm w-full focus:outline-blue-500 text-sm  font-base text-gray-600 "
                    type="text"
                    onChange={(event) => setCoupon(event.target.value)}
                    value={coupon}
                  />
                  {!validCoupon ? (
                    <button
                      className="font-heading font-semibold text-white rounded-sm bg-green-500 px-8 py-2"
                      onClick={handleCouponSubmit}
                    >
                      Apply
                    </button>
                  ) : (
                    <button
                      className="font-heading font-semibold text-white rounded-sm bg-red-500 px-8 py-2 text-sm"
                      onClick={() => {
                        setCoupon("");
                        setValidCoupon(false);
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  className="font-heading font-semibold text-white rounded-sm text-sm bg-gray-500 px-8 py-2"
                  onClick={() => setOpenInfoModal(false)}
                >
                  Close
                </button>
                <button
                  className="font-heading font-semibold text-white rounded-sm bg-primary px-8 py-2 text-sm"
                  onClick={handleSubmit}
                >
                  Continue
                </button>
              </div>
            </div> */}
        </div>
      </div>
    </Modal>
  );
};

export default InfoModal