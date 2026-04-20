
import React from "react";
import { Link } from "react-router-dom";
import main_page_bg from "../Images/main_page_bg.jpg";

const MainSection = () => {
  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden">
      {/* HERO SECTION WITH BACKGROUND IMAGE (ONLY HERE) */}
      <section
        className="relative py-12 md:py-24 lg:py-32 bg-cover bg-center bg-no-repeat text-white"
        style={{ backgroundImage: `url(${main_page_bg})` }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* content */}
        <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center justify-center space-y-6">
          <div className="bg-white/20 rounded-lg p-8 shadow-md backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-center">
                Drug Abuse Prevention and Reporting
              </h1>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-center">
                at NIT Hamirpur
              </h1>
              <p className="max-w-[700px] text-lg text-center text-white/90">
                Empowering our community to overcome substance abuse through
                education, support, and advocacy.
              </p>
            </div>
          </div>

          <Link
            to="/user-signup"
            className="inline-flex items-center justify-center mt-8 text-white bg-blue-600 hover:bg-blue-700 rounded-xl px-6 py-3 text-xl"
          >
            Get started
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-2">Signup</span>
          </Link>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-12 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <UserIcon className="h-12 w-12 text-blue-500" />
            <h3 className="text-xl font-bold text-gray-900">Anonymous Reporting</h3>
            <p className="text-gray-500">
              Safely report drug-related concerns without fear of retaliation.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <PillIcon className="h-12 w-12 text-blue-500" />
            <h3 className="text-xl font-bold text-gray-900">Prevention Strategies</h3>
            <p className="text-gray-500">
              Learn effective ways to identify and address substance abuse.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <ShareIcon className="h-12 w-12 text-blue-500" />
            <h3 className="text-xl font-bold text-gray-900">
              Share Your Stories/Ask for Help
            </h3>
            <p className="text-gray-500">
              Connect with our community and access the support you need.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <GoalIcon className="h-12 w-12 text-blue-500" />
            <h3 className="text-xl font-bold text-gray-900">Recognizing Drug Abuse</h3>
            <p className="text-gray-500">
              Understand the signs and symptoms of substance abuse.
            </p>
          </div>
        </div>
      </section>

      {/* ACTION BUTTONS SECTION */}
      <section className="py-12 md:py-24 lg:py-32 bg-gray-900 text-white">
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-blue-500 rounded-lg overflow-hidden shadow-md">
            <Link
              to="/reportform"
              className="inline-flex items-center justify-center h-16 w-full px-8 bg-blue-500 hover:bg-blue-600 text-lg font-medium transition-colors"
            >
              Reporting
            </Link>
          </div>

          <div className="bg-blue-500 rounded-lg overflow-hidden shadow-md">
            <Link
              to="/helpdesk"
              className="inline-flex items-center justify-center h-16 w-full px-8 bg-blue-500 hover:bg-blue-600 text-lg font-medium transition-colors"
            >
              Share Your Story
            </Link>
          </div>

          <div className="bg-blue-500 rounded-lg overflow-hidden shadow-md">
            <Link
              to="/help"
              className="inline-flex items-center justify-center h-16 w-full px-8 bg-blue-500 hover:bg-blue-600 text-lg font-medium transition-colors"
            >
              Need Counselling?
            </Link>
          </div>

          <div className="bg-blue-500 rounded-lg overflow-hidden shadow-md">
            <Link
              to="/tweetClassification"
              className="inline-flex items-center justify-center h-16 w-full px-8 bg-blue-500 hover:bg-blue-600 text-lg font-medium transition-colors"
            >
              Tweet Classification
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainSection;

function GoalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 13V2l8 4-8 4" />
      <path d="M20.561 10.222a9 9 0 1 1-12.55-5.29" />
      <path d="M8.002 9.997a5 5 0 1 0 8.9 2.02" />
    </svg>
  );
}

function PillIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
      <path d="m8.5 8.5 7 7" />
    </svg>
  );
}

function ShareIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}




//
//import React from "react";
//import { Link } from "react-router-dom";
//import main_page_bg from "../Images/main_page_bg.jpg";
//
//const MainSection = () => {
//  return (
//    <main className="min-h-screen overflow-x-hidden bg-slate-950">
//
//      {/* ================= HERO ================= */}
//      <section
//        className="relative bg-cover bg-center text-white"
//        style={{ backgroundImage: `url(${main_page_bg})` }}
//      >
//        {/* gradient overlay */}
//        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-slate-950" />
//
//        <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 text-center space-y-8">
//          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
//            Drug Abuse Prevention &
//            <span className="block text-cyan-400">Reporting Portal</span>
//          </h1>
//
//          <p className="max-w-3xl mx-auto text-lg text-slate-200">
//            A safe, anonymous platform for reporting, awareness,
//            support, and collective prevention at
//            <span className="font-semibold"> NIT Hamirpur</span>.
//          </p>
//
//          <div className="flex justify-center gap-4 pt-6">
//            <Link
//              to="/user-signup"
//              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl
//                bg-cyan-600 hover:bg-cyan-700 transition shadow-lg text-lg font-semibold"
//            >
//              Get Started
//              <ArrowIcon />
//            </Link>
//          </div>
//        </div>
//      </section>
//
//      {/* ================= FEATURES ================= */}
//      <section className="py-20 bg-white">
//        <div className="max-w-6xl mx-auto px-6 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
//
//          <FeatureCard
//            icon={<UserIcon />}
//            title="Anonymous Reporting"
//            description="Report concerns safely without fear or exposure."
//          />
//
//          <FeatureCard
//            icon={<PillIcon />}
//            title="Prevention Resources"
//            description="Learn how to identify, prevent, and address abuse."
//          />
//
//          <FeatureCard
//            icon={<ShareIcon />}
//            title="Support & Stories"
//            description="Ask for help or share experiences in confidence."
//          />
//
//          <FeatureCard
//            icon={<GoalIcon />}
//            title="Awareness & Education"
//            description="Understand the signs, symptoms, and solutions."
//          />
//
//        </div>
//      </section>
//
//      {/* ================= ACTIONS ================= */}
//      <section className="py-20 bg-slate-900 text-white">
//        <div className="max-w-6xl mx-auto px-6">
//          <h2 className="text-3xl font-bold text-center mb-12">
//            Take Action
//          </h2>
//
//          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//            <ActionCard to="/reportform" label="Report an Incident" />
//            <ActionCard to="/helpdesk" label="Share Your Story" />
//            <ActionCard to="/help" label="Need Counselling?" />
//            <ActionCard to="/tweetClassification" label="Tweet Classification" />
//          </div>
//        </div>
//      </section>
//
//    </main>
//  );
//};
//
//export default MainSection;
//
///* ================= COMPONENTS ================= */
//
//function FeatureCard({ icon, title, description }) {
//  return (
//    <div className="text-center space-y-4 p-6 rounded-xl bg-slate-50 hover:shadow-lg transition">
//      <div className="flex justify-center text-cyan-500 text-5xl">
//        {icon}
//      </div>
//      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
//      <p className="text-slate-600 text-sm">{description}</p>
//    </div>
//  );
//}
//
//function ActionCard({ to, label }) {
//  return (
//    <Link
//      to={to}
//      className="flex items-center justify-center text-lg font-semibold
//      h-20 rounded-xl bg-cyan-600 hover:bg-cyan-700 transition shadow-md"
//    >
//      {label}
//    </Link>
//  );
//}
//
//function ArrowIcon() {
//  return (
//    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
//      <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
//    </svg>
//  );
//}
//
///* ================= ICONS ================= */
//
//function GoalIcon() {
//  return <span>🎯</span>;
//}
//
//function PillIcon() {
//  return <span>💊</span>;
//}
//
//function ShareIcon() {
//  return <span>🤝</span>;
//}
//
//function UserIcon() {
//  return <span>🕵️</span>;
//}