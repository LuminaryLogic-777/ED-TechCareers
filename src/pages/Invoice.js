import React, { useEffect, useState } from "react";
import axios from "axios";

import { Navigate, useParams } from "react-router-dom";
import invoiceData from "./invoiceData";
import CircularProgress from "@mui/material/CircularProgress";

const Invoice = () => {
  let { user_id, order_id } = useParams();
  const [purchasedProducts, setPurchasedProducts] = useState(false);
  const [customerData, setCustomerData] = useState(false);
  const [fetch, setFetch] = useState(false);

  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const getData = async () => {
    setLoading("Getting Your Invoice Data....");
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/invoicedetails/user/${user_id}/order/${order_id}`
    );

    setCustomerData({
      name: res.data.name,
      phone: res?.data?.phone,
      invoice_number: res?.data?.order?.invoiceNumber,
    });

    setPurchasedProducts([
      {
        quantity: 1,
        description: res?.data?.order?.course?.name,
        price: res?.data?.order?.course?.price,
      },
    ]);
  };

  const generateInvoice = async () => {
    const data = invoiceData(purchasedProducts, customerData);

    setLoading("Generating Invoice...");
    const result = await easyinvoice.createInvoice(data);
    setLoading("Downloading Invoice.....");
    easyinvoice.download("Invoice.pdf", result.pdf);
    setLoading(false);
  };

  useEffect(async () => {
    const script = document.createElement("script");

    script.src = "https://unpkg.com/easyinvoice/dist/easyinvoice.min.js";
    script.async = true;
    document.body.appendChild(script);
    await getData();
  }, []);

  useEffect(async () => {
    if (customerData && purchasedProducts) {
      await generateInvoice();
    }
  }, [customerData, purchasedProducts]);

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        disabled={loading}
        onClick={generateInvoice}
        className="px-5 py-3 font-montserrat font-bold text-white rounded flex justify-center items-center space-x-3"
        style={
          loading
            ? { backgroundColor: "#868A96", color: "#B5BBCC" }
            : { backgroundColor: "#4D4BE9" }
        }
      >
        {loading && <CircularProgress size={10} sx={{ color: "#ffffff" }} />}
        {loading ? <div>{loading}</div> : <div>Download Again</div>}
      </button>
    </div>
  );
};

export default Invoice;
