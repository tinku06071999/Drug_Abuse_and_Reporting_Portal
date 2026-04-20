//
//import React, { useState } from "react";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Header from "./Components/Header";
//import Navbar from "./Components/Navbar";
//import Main from "./Components/Main";
//import Footer from "./Components/Footer";
//import ReportForm from "./Pages/ReportForm";
//import News from "./Pages/News";
//import OurMission from "./Pages/OurMission";
//import Program from "./Pages/Program";
//import Data from "./Pages/Data";
//import Home from "./Pages/Home";
//import EmployeeForm from "./Pages/EmployeeForm";
//import AdminLogin from "./Pages/AdminLogin";
//import AdminDashboard from "./Pages/AdminDashboard";
//import TotalReports from "./Components/Admin/TotalReports";
//import Registeredemployees from "./Components/Admin/Registeredemployees";
//import HelpDesk from "./Pages/HelpDesk";
//import Help from "./Pages/Help";
//import Educational from "./Pages/Educational";
//import OnlineServices from "./Pages/OnlineServices";
//import CollegeSupportForm from "./Pages/CollegeSupportForm";
//import StudentSupportDetails from "./Components/Admin/StudentSupportDetails";
//import UserLogin from "./Pages/User/UserLogin";
//import UserSignup from "./Pages/User/UserSignup";
//import UserDashboard from "./Pages/User/UserDashBoard";
//import UserQuiz from "./Pages/User/UserQuiz";
//import UserReports from "./Pages/User/UserReports";
//import AnxietytestDashBoard from "./Pages/User/AnxietytestDashBoard";
//import AnxietyQuiz from "./Pages/User/AnxietyQuiz";
//import AnxietyResultPage from "./Pages/User/AnxietyResultPage";
//import AnxietyReport from "./Pages/User/AnxietyReport";
//import BookSession from "./Pages/User/BookSession";
//import TweetClassification from "./Pages/TweetClassification";
//function App() {
//  const [isAdminLoggedIn, setAdminLoggedIn] = useState(
//    localStorage.getItem("isAdminLoggedIn") === "true"
//  );
//
//  const handleAdminLogin = (loggedIn) => {
//    setAdminLoggedIn(loggedIn);
//    localStorage.setItem("isAdminLoggedIn", loggedIn);
//  };
//
//  const isAdminPage = window.location.pathname === "/adminlogin";
//
//  return (
//    <Router>
//      {!isAdminLoggedIn && !isAdminPage && <Header />}
//      <Routes>
//        <Route path="/" element={<Main />} />
//        <Route path="/reportform" element={<ReportForm />} />
//        <Route path="/home" element={<Home />} />
//        <Route path="/news" element={<News />} />
//        <Route path="/our-mission" element={<OurMission />} />
//        <Route path="/program" element={<Program />} />
//        <Route path="/data" element={<Data />} />
//        <Route path="/employeeregister" element={<EmployeeForm />} />
//        <Route
//          path="/adminlogin"
//          element={<AdminLogin onLogin={handleAdminLogin} />}
//        />
//        <Route path="/totalreports" element={<TotalReports />} />
//        <Route
//          path="/registeredemployees"
//          element={<Registeredemployees />}
//        />{" "}
//        {/* Add this line */}
//        <Route path="/adminDashboard" element={<AdminDashboard />} />
//        <Route path="/helpdesk" element={<HelpDesk />} />
//        <Route path="/help" element={<Help />} />
//        <Route path="/educational" element={<Educational />} />
//        <Route path="/onlineServices" element={<OnlineServices />} />
//        <Route path="/collegesupportform" element={<CollegeSupportForm />} />
//        <Route
//          path="/studentSupportDetails"
//          element={<StudentSupportDetails />}
//        />
//        <Route path="/userLogin" element={<UserLogin />} />
//        <Route path="/userSignup" element={<UserSignup />} />
//        <Route path="/userDashboard" element={<UserDashboard />} />
//        <Route path="/userQuiz" element={<UserQuiz />} />
//        <Route path="/userReports" element={<UserReports />} />
//        <Route
//          path="/anxietytestdashboard"
//          element={<AnxietytestDashBoard />}
//        />
//        <Route path="/anxietyquiz" element={<AnxietyQuiz />} />
//        <Route path="/anxietyresultpage" element={<AnxietyResultPage />} />
//        <Route path="/anxietyReport" element={<AnxietyReport />} />
//        <Route path="/bookSession" element={<BookSession />} />
//        <Route path="/tweetClassification" element={<TweetClassification/>}/>
//      </Routes>
//      {!isAdminLoggedIn && !isAdminPage && <Footer />}
//import React, { useState } from "react";
//import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
//import Header from "./Components/Header";
//import Navbar from "./Components/Navbar";
//import Main from "./Components/Main";
//import Footer from "./Components/Footer";
//import ReportForm from "./Pages/ReportForm";
//import News from "./Pages/News";
//import OurMission from "./Pages/OurMission";
//import Program from "./Pages/Program";
//import Data from "./Pages/Data";
//import Home from "./Pages/Home";
//import EmployeeForm from "./Pages/EmployeeForm";
//import AdminLogin from "./Pages/AdminLogin";
//import AdminDashboard from "./Pages/AdminDashboard";
//import TotalReports from "./Components/Admin/TotalReports";
//import Registeredemployees from "./Components/Admin/Registeredemployees";
//import HelpDesk from "./Pages/HelpDesk";
//import Help from "./Pages/Help";
//import Educational from "./Pages/Educational";
//import OnlineServices from "./Pages/OnlineServices";
//import CollegeSupportForm from "./Pages/CollegeSupportForm";
//import StudentSupportDetails from "./Components/Admin/StudentSupportDetails";
//import UserLogin from "./Pages/User/UserLogin";
//import UserSignup from "./Pages/User/UserSignup";
//import UserDashboard from "./Pages/User/UserDashBoard";
//import UserQuiz from "./Pages/User/UserQuiz";
//import UserReports from "./Pages/User/UserReports";
//import AnxietytestDashBoard from "./Pages/User/AnxietytestDashBoard";
//import AnxietyQuiz from "./Pages/User/AnxietyQuiz";
//import AnxietyResultPage from "./Pages/User/AnxietyResultPage";
//import AnxietyReport from "./Pages/User/AnxietyReport";
//import BookSession from "./Pages/User/BookSession";
//import TweetClassification from "./Pages/TweetClassification";
//import AdminHeader from "./Components/Admin/AdminHeader";
//
//function App() {
//
//    const location = useLocation();
//    const isAdminSection = location.pathname.startsWith("/admin") &&
//    location.pathname !== "/adminlogin";
//
//  const [isAdminLoggedIn, setAdminLoggedIn] = useState(
//    localStorage.getItem("isAdminLoggedIn") === "true"
//  );
//
//  const handleAdminLogin = (loggedIn) => {
//    setAdminLoggedIn(loggedIn);
//    localStorage.setItem("isAdminLoggedIn", loggedIn);
//  };
//
//  return (
//    <Router>
//      {!isAdminSection && <Header />}
//      <Routes>
//        <Route path="/" element={<Main />} />
//        <Route path="/reportform" element={<ReportForm />} />
//        <Route path="/home" element={<Home />} />
//        <Route path="/news" element={<News />} />
//        <Route path="/our-mission" element={<OurMission />} />
//        <Route path="/program" element={<Program />} />
//        <Route path="/data" element={<Data />} />
//        <Route path="/employeeregister" element={<EmployeeForm />} />
//        <Route path="/adminlogin" element={<AdminLogin onLogin={handleAdminLogin} />}/>
//        <Route path="/helpdesk" element={<HelpDesk />} />
//        <Route path="/help" element={<Help />} />
//        <Route path="/educational" element={<Educational />} />
//        <Route path="/onlineServices" element={<OnlineServices />} />
//        <Route path="/collegesupportform" element={<CollegeSupportForm />} />
//        <Route path="/userLogin" element={<UserLogin />} />
//        <Route path="/userSignup" element={<UserSignup />} />
//        <Route path="/userDashboard" element={<UserDashboard />} />
//        <Route path="/userQuiz" element={<UserQuiz />} />
//        <Route path="/userReports" element={<UserReports />} />
//        <Route path="/anxietytestdashboard" element={<AnxietytestDashBoard />}/>
//        <Route path="/anxietyquiz" element={<AnxietyQuiz />} />
//        <Route path="/anxietyresultpage" element={<AnxietyResultPage />} />
//        <Route path="/anxietyReport" element={<AnxietyReport />} />
//        <Route path="/bookSession" element={<BookSession />} />
//        <Route path="/tweetClassification" element={<TweetClassification/>}/>
//      </Routes>
//      {isAdminSection && <AdminHeader />}
//      <Routes>
//              <Route path="/totalreports" element={<TotalReports />} />
//              <Route path="/registeredemployees" element={<Registeredemployees />}/>{" "}
//              <Route path="/adminDashboard" element={<AdminDashboard />} />
//              <Route path="/studentSupportDetails" element={<StudentSupportDetails />}/>
//      </Routes>
//      { !isAdminSection && <Footer />}
//    </Router>
//  );
//}
//
//export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import AdminHeader from "./Components/Admin/AdminHeader";

import Main from "./Components/Main";
import ReportForm from "./Pages/ReportForm";
import EmployeeForm from "./Pages/EmployeeForm";
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import TotalReports from "./Components/Admin/TotalReports";
import Registeredemployees from "./Components/Admin/Registeredemployees";
import StudentSupportDetails from "./Components/Admin/StudentSupportDetails";

import UserLogin from "./Components/User/UserLogin";
import UserSignup from "./Components/User/UserSignup";
import UserDashboard from "./Components/User/UserDashBoard";
import UserHeader from "./Components/User/UserHeader";
import UserQuiz from "./Components/User/UserQuiz";
import UserReports from "./Components/User/UserReports";
import AnxietytestDashBoard from "./Components/User/AnxietytestDashBoard";
import AnxietyQuiz from "./Components/User/AnxietyQuiz";
import AnxietyResultPage from "./Components/User/AnxietyResultPage";
import AnxietyReport from "./Components/User/AnxietyReport";
import BookSession from "./Components/User/BookSession";
function AppContent() {
  const location = useLocation();

  const isAdminSection =
    location.pathname.startsWith("/admin") &&
    location.pathname !== "/adminlogin";

  const isUserSection = location.pathname.startsWith("/user")
                        &&location.pathname !== "/user-login"
                        &&location.pathname !== "/user-signup";

  return (
    <>
      {!isAdminSection && !isUserSection && <Header />}
      {isAdminSection && <AdminHeader />}
      {isUserSection && <UserHeader /> }
      <Routes>
        {/* public */}
        <Route path="/" element={<Main />} />
        <Route path="/reportform" element={<ReportForm />} />
        <Route path="/employeeregister" element={<EmployeeForm />} />
        <Route path="/adminlogin" element={<AdminLogin />} />

        {/* user */}
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/quiz" element={<UserQuiz />} />
                <Route path="/user/quiz-reports" element={<UserReports />} />
                <Route path="/user/anxiety-test-dashboard" element={<AnxietytestDashBoard />}/>
                <Route path="/user/anxiety-quiz" element={<AnxietyQuiz />} />
                <Route path="/user/anxiety-result-page" element={<AnxietyResultPage />} />
                <Route path="/user/anxiety-report" element={<AnxietyReport />} />
                <Route path="/user/book-session" element={<BookSession />} />
        {/* admin */}
        <Route path="/admin/Dashboard" element={<AdminDashboard />} />
        <Route path="/admin/totalreports" element={<TotalReports />} />
        <Route path="/admin/registeredemployees" element={<Registeredemployees />} />
        <Route path="/admin/studentSupportDetails" element={<StudentSupportDetails />} />
      </Routes>

      {!isAdminSection && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />

    </Router>
  );
}

export default App;