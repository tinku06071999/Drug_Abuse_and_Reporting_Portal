
import React from "react";
import { Link } from "react-router-dom";
import main_page_bg from "../Images/main_page_bg.jpg";

const MainSection = () => {
  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden">

      {/* ================= HERO SECTION ================= */}
      <section
        className="relative py-16 md:py-28 bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${main_page_bg})` }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8">
          <div className="bg-white/20 rounded-xl p-10 backdrop-blur-md">
            <h1 className="text-4xl md:text-6xl font-extrabold">
              Drug Abuse Prevention & Reporting
            </h1>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-2">
              at NIT Hamirpur
            </h2>
            <p className="mt-6 text-lg text-white/90 max-w-2xl mx-auto">
              Empowering our community through education, reporting, support,
              and collective action.
            </p>
          </div>

          <Link
            to="/user-signup"
            className="inline-flex items-center gap-2
              bg-blue-600 hover:bg-blue-700
              px-8 py-4 rounded-xl text-xl font-semibold transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <Feature
            icon="🕵️"
            title="Anonymous Reporting"
            desc="Report drug-related concerns safely without revealing identity."
          />
          <Feature
            icon="💊"
            title="Prevention Awareness"
            desc="Learn how to recognize usage patterns and risk factors."
          />
          <Feature
            icon="🤝"
            title="Support & Help"
            desc="Share your story or request guidance confidentially."
          />
          <Feature
            icon="🎯"
            title="Education"
            desc="Understand the signs, impact, and recovery process."
          />
        </div>
      </section>

      {/* ================= ACTIONS SECTION ================= */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Take Action
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ActionCard to="/reportform" label="Report an Incident" />
            <ActionCard to="/helpdesk" label="Share Your Story" />
            <ActionCard to="/help" label="Need Counselling?" />
            <ActionCard to="/tweetClassification" label="Tweet Classification" />
          </div>
        </div>
      </section>

    </main>
  );
};

export default MainSection;

/* ================= COMPONENTS ================= */

function Feature({ icon, title, desc }) {
  return (
    <div className="text-center p-6 bg-slate-50 rounded-xl hover:shadow-lg transition">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-600 mt-2">{desc}</p>
    </div>
  );
}

function ActionCard({ to, label }) {
  return (
    <Link
      to={to}
      className="
        flex items-center justify-center
        h-20 text-lg font-semibold
        rounded-xl bg-blue-600 hover:bg-blue-700
        transition shadow-md"
    >
      {label}
    </Link>
  );
}