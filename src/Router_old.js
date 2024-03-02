import React, { lazy, useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import { useUserStore } from "./store/store";
// import axios from "axios";

// import ProtectedRoute from "./pages/ProtectedRoute";
import { useCookie } from "react-use";
// pages
const HomePage = lazy(() => import("./pages/HomePage"));
const LogInPage = lazy(() => import("./pages/LogInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
// const VideoPage = lazy(() => import("./pages/VideoPage"));
const ViewCoursePage = lazy(() => import("./pages/ViewCoursePage"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage"));
const HowItWorksPage = lazy(() => import("./pages/HowItWorks"));
const CoursesPage = lazy(() => import("./pages/CoursesPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsAndConditionPage = lazy(() =>
  import("./pages/TermsAndConditionPage")
);
const RefundPolicyPage = lazy(() => import("./pages/RefundPolicyPage"));
const TimetablePage = lazy(() => import("./pages/TimetablePage"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop"));
const InboxPage = lazy(() => import("./pages/InboxPage"));
const ShippingPolicyPage = lazy(() => import("./pages/ShippingPolicyPage"));

// const LiveVideoPanel = lazy(() => import("./pages/LiveVideoPanel"));
// const LiveVideoPanelnstructor = lazy(() => import("./pages/LiveVideoPanelnstructor"));
// const Stream = lazy(() => import("./pages/Stream"));
// const VerifyEmailPage = lazy(() => import("./pages/VerifyEmailPage"));

// const invoice = lazy(() => import(from "./pages/Invoice"));

const Router = () => {
  const updateUser = useUserStore((state) => state.updateUser);
  const user = useUserStore((state) => state.user);
  const removeAllUser = useUserStore((state) => state.removeAllUser);
  const [loggedIn, , deleteLoggedIn] = useCookie("maang");

  useEffect(() => {
    if (Object.keys(user).length <= 1 && loggedIn)
      updateUser(JSON.parse(loggedIn));
    if (new Date(user.expiry) <= new Date(Date.now())) {
      removeAllUser();
      deleteLoggedIn();
    }
  });

  return (
    <ScrollToTop>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/course/:id" element={<ViewCoursePage />} />

        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* <Route path="/video/:courseId" element={<VideoPage />} /> */}

        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route
          path="/terms-and-condition"
          element={<TermsAndConditionPage />}
        />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/shipping-and-delivery" element={<ShippingPolicyPage />} />

        <Route
          path="/timetable"
          element={
            // <ProtectedRoute redirectTo={"/login"} role="student">
            <TimetablePage />
            // </ProtectedRoute>
          }
        />

        <Route
          path="/inbox"
          element={
            // <ProtectedRoute redirectTo={"/login"} role="student">
            <InboxPage />
            // </ProtectedRoute>
          }
        />

        {/* <Route path="/live" element={<LiveVideoPanel />} /> */}

        {/* <Route path="/live-instructor" element={<LiveVideoPanelnstructor />} /> */}

        {/* <Route path="/stream" element={<Stream />} /> */}

        {/* <Route path="/verify-email/:token" element={<VerifyEmailPage />} /> */}

        {/* <Route
          path="/invoice/user/:user_id/order/:order_id"
          element={<Invoice />}
        /> */}
      </Routes>
      {/* </Suspense> */}
    </ScrollToTop>
  );
};

export default Router;
