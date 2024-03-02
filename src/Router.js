import React, { Suspense, lazy, useEffect, startTransition } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import { useUserStore } from "./store/store";
// import axios from "axios";
import { SearchResultProvider } from "./components/Submission/SearchResultContext .js";
// import ProtectedRoute from "./pages/ProtectedRoute";
import { useCookie } from "react-use";
import ProtectedRoute from "./pages/ProtectedRoute";
import StudentPractice from "./components/Practice";
import Submission from "./components/Submission/submission.js";
import Course from "./components/Practice/Course/index.js";
import MockResult from "./components/MockTest/MockResult";
import PracticeDetails from "./components/Practice/ParcticeDetails";

// const ProtectedRoute = lazy(() => import("./pages/ProtectedRoute.js"));

const Mentor = lazy(() => import("./components/Mentor/Mentor.js"));
const MentorDashboard = lazy(() =>
  import("./components/Dashboard/MentorDashboard.js")
);
const CourseSyllabus = lazy(() =>
  import("./components/CourseSyllabus/CourseSyllabus.js")
);
const MentorSubmission = lazy(() =>
  import("./components/Submission/MentorSubmission.js")
);
const MentorTimeTable = lazy(() =>
  import("./components/TimeTable/MentorTimeTable.js")
);

const MentorProfile = lazy(() =>
  import("./components/Profile/MentorProfile.js")
);
const Teaching = lazy(() => import("./components/Teaching/Teaching.js"));
const TeachingPracticeDetails = lazy(() =>
  import("./components/Teaching/TeachingParcticeDetails")
);

// const Whiteboard = lazy(() => import("./components/Whiteboard/Whiteboard.js"));

const Student = lazy(() => import("./components/Student"));
const DashBoard = lazy(() => import("./components/Dashboard"));
const StudentTimetable = lazy(() => import("./components/TimeTable"));
const StudentProfile = lazy(() => import("./components/Profile"));
// const StudentPractice = lazy(() => import("./components/Practice"));
const StudentCertificates = lazy(() => import("./components/Certificates"));
const StudentMockTest = lazy(() => import("./components/MockTest"));
const StudentQuiz = lazy(() => import("./components/Quiz"));
// const Submission = lazy(() => import("./components/Submission/submission.js"));
// const MockResult = lazy(() => import("./components/MockTest/MockResult"));
// const PracticeDetails = lazy(() =>
//   import("./components/Practice/ParcticeDetails")
// );
// const Course = lazy(() => import("./components/Practice/Course/index.js"));
const HomePage = lazy(() => import("./pages/HomePage"));
const LogInPage = lazy(() => import("./pages/LogInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
// const VideoPage = lazy(() => import("./pages/VideoPage"));
const ViewCoursePage = lazy(() => import("./pages/ViewCoursePage"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const HowItWorksPage = lazy(() => import("./pages/HowItWorks"));
const CoursesPage = lazy(() => import("./pages/CoursesPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsAndConditionPage = lazy(() =>
  import("./pages/TermsAndConditionPage")
);
const Rules = lazy(() => import("./components/Rules/Rules.js"));
const RefundPolicyPage = lazy(() => import("./pages/RefundPolicyPage"));
const TimetablePage = lazy(() => import("./pages/TimetablePage"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop"));
// const InboxPage = lazy(() => import("./pages/InboxPage"));
const ShippingPolicyPage = lazy(() => import("./pages/ShippingPolicyPage"));
// const LiveVideoPanel = lazy(() => import("./pages/LiveVideoPanel"));
// const LiveVideoPanelnstructor = lazy(() => import("./pages/LiveVideoPanelnstructor"));
// const Stream = lazy(() => import("./pages/Stream"));
// const VerifyEmailPage = lazy(() => import("./pages/VerifyEmailPage"));

// const invoice = lazy(() => import(from "./pages/Invoice"));
const Welcome = lazy(() => import("./pages/funnel/Welcome.js"));
const Name = lazy(() => import("./pages/funnel/Name.js"));
const WhatsappNo = lazy(() => import("./pages/funnel/WhatsappNo.js"));
const Email = lazy(() => import("./pages/funnel/Email.js"));
const Webinar = lazy(() => import("./pages/funnel/Webinar.js"));
const University = lazy(() => import("./pages/funnel/University.js"));
const Thankyou = lazy(() => import("./pages/funnel/Thankyou.js"));
const Router = () => {
  const updateUser = useUserStore((state) => state.updateUser);
  const user = useUserStore((state) => state.user);
  const removeAllUser = useUserStore((state) => state.removeAllUser);
  const [loggedIn, , deleteLoggedIn] = useCookie("maang");
  const isLoggedIn = !!(loggedIn && Object.keys(loggedIn).length > 0);

  useEffect(() => {
    if (Object.keys(user).length <= 1 && loggedIn)
      updateUser(JSON.parse(loggedIn));
    if (new Date(user.expiry) <= new Date(Date.now())) {
      removeAllUser();
      deleteLoggedIn();
    }
  });

  // useEffect(() => {
  //   startTransition(() => {
  //     if (Object.keys(user).length <= 1 && loggedIn) {
  //       updateUser(JSON.parse(loggedIn));
  //     }
  //     if (new Date(user.expiry) <= new Date(Date.now())) {
  //       removeAllUser();
  //       deleteLoggedIn();
  //     }
  //   });
  // }, [user, loggedIn, updateUser, removeAllUser, deleteLoggedIn]);

  const renderPublishRouter = () => {
    return (
      <>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blog/:id" element={<ArticlePage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/course/:id" element={<ViewCoursePage />} />
        <Route path="/syllabus" element={<Course />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route
          path="/terms-and-condition"
          element={<TermsAndConditionPage />}
        />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/shipping-and-delivery" element={<ShippingPolicyPage />} />
        <Route path="/webinars" element={<Welcome />} />
        <Route path="/webinars/name" element={<Name />} />
        <Route path="/webinars/whatsapp" element={<WhatsappNo />} />
        <Route path="/webinars/email" element={<Email />} />
        <Route path="/webinars/webinar" element={<Webinar />} />
        <Route path="/webinars/university" element={<University />} />
        <Route path="/webinars/thankyou" element={<Thankyou />} />
      </>
    );
  };

  const renderStudentRouter = () => {
    return (
      <SearchResultProvider>
        <Routes>
          <Route
            path="/student"
            element={isLoggedIn ? <Student /> : <Navigate to="/login" />}
          >
            <Route
              path={`/student`}
              element={isLoggedIn ? <DashBoard /> : <Navigate to="/login" />}
            />
            <Route
              path={`/student/timetable`}
              element={
                isLoggedIn ? <StudentTimetable /> : <Navigate to="/login" />
              }
            />
            <Route
              path={`/student/practice`}
              element={
                isLoggedIn ? <StudentPractice /> : <Navigate to="/login" />
              }
            />
            <Route
              path={`/student/practice/:id/Problem`}
              element={
                isLoggedIn ? <PracticeDetails /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/student/practice/:id/Hint"
              element={
                isLoggedIn ? <PracticeDetails /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/student/practice/:id/Submission"
              element={
                isLoggedIn ? <PracticeDetails /> : <Navigate to="/login" />
              }
            />
            <Route
              path={`/student/quiz`}
              element={isLoggedIn ? <StudentQuiz /> : <Navigate to="/login" />}
            />
            <Route
              path={`/student/mock-test`}
              element={
                isLoggedIn ? <StudentMockTest /> : <Navigate to="/login" />
              }
            />
            <Route
              path={`/student/submission`}
              element={isLoggedIn ? <Submission /> : <Navigate to="/login" />}
            />
            <Route
              path={`/student/certificates`}
              element={
                isLoggedIn ? <StudentCertificates /> : <Navigate to="/login" />
              }
            />
            <Route
              path={`/student/profile`}
              element={
                isLoggedIn ? <StudentProfile /> : <Navigate to="/login" />
              }
            />
          </Route>
          <Route
            path="/timetable"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} role="student">
                <TimetablePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </SearchResultProvider>
    );
  };
  const renderMentorRouter = () => {
    return (
      <SearchResultProvider>
        <Routes>
          <Route
            path="/mentor"
            element={isLoggedIn ? <Mentor /> : <Navigate to="/login" />}
          >
            <Route
              path={`/mentor`}
              element={
                isLoggedIn ? <MentorDashboard /> : <Navigate to="/login" />
              }
            />
            <Route
              path={`/mentor/courses`}
              element={
                isLoggedIn ? <CourseSyllabus /> : <Navigate to="/login" />
              }
            />
            <Route
              path={`/mentor/teaching`}
              element={isLoggedIn ? <Teaching /> : <Navigate to="/login" />}
            />
            <Route
              path={`/mentor/teaching/:id/problem`}
              element={
                isLoggedIn ? (
                  <TeachingPracticeDetails />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/mentor/teaching/:id/hint"
              element={
                isLoggedIn ? (
                  <TeachingPracticeDetails />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/mentor/teaching/:id/submission"
              element={
                isLoggedIn ? (
                  <TeachingPracticeDetails />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path={`/mentor/whiteboard`}
              element={isLoggedIn ?  <Navigate to="/whiteboard.htm" /> : <Navigate to="/login" />}
            />
            {/* <Route
              path="/mentor/whiteboard"
              element={
                isLoggedIn ? (
                  <Whiteboard/>
                ) : (
                  <Navigate to="/login" />
                )
              }
            /> */}

            <Route
              path={`/mentor/submission`}
              element={
                isLoggedIn ? <MentorSubmission /> : <Navigate to="/login" />
              }
            />
            <Route
              path={`/mentor/timetable`}
              element={
                isLoggedIn ? <MentorTimeTable /> : <Navigate to="/login" />
              }
            />
            <Route
              path={`/mentor/rules`}
              element={isLoggedIn ? <Rules /> : <Navigate to="/login" />}
            />
            <Route
              path={`/mentor/profile`}
              element={
                isLoggedIn ? <MentorProfile /> : <Navigate to="/login" />
              }
            />
          </Route>
        </Routes>
      </SearchResultProvider>
    );
  };

  return (
    <ScrollToTop>
      <Suspense fallback={null}>
        <Routes>{renderPublishRouter()}</Routes>

        {renderMentorRouter()}
        {renderStudentRouter()}
      </Suspense>
    </ScrollToTop>
  );
};

export default Router;
