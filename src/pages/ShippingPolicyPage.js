import React from "react";
import Layout from "../components/Layout";

const ShippingPolicyPage = () => {
  return (
    <Layout>
      <div className="lg:mx-28 px-5 lg:px-10 py-10 font-base bg-white">
        <h1 className="text-2xl font-bold text-gray-700 mb-5">
          Shipping & Delivery Policy
        </h1>
        <p className="font-semibold text-sm mb-5">Last updated on sep 20th 2022</p>

        <p className="mb-5" style={{height: "100vh"}}>
          {" "}
          Shipping is not applicable for this business.
        </p>
      </div>
    </Layout>
  );
};

export default ShippingPolicyPage;
