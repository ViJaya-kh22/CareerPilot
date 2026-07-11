import React, { useState, useEffect } from "react";
import OverviewPanel from "../components/OverviewPanel";
import QuestionsPanel from "../components/QuestionPannel";
import RoadmapPanel from "../components/RoadmapPanel";
import "../style/interviewResults.scss";
import logo from "../../../assets/images/logos/logo-light-removebg-preview.png"
import { useInterview } from "../hooks/useInterview";
import { Link, useParams, useNavigate } from "react-router";


const NAV_ITEMS = [
  {
    key: "home",
    label: "Home",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 11.5 12 4l8 7.5M6 10v9h5v-5h2v5h5v-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "overview",
    label: "Overview",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 13h6V4H4v9Zm0 7h6v-5H4v5Zm10 0h6V11h-6v9Zm0-16v5h6V4h-6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "technical",
    label: "Technical Question's",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="m9 8-4 4 4 4M15 8l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "behavioral",
    label: "Behavioral Question's",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 5h16v10H8l-4 4V5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "roadmap",
    label: "Roadmap",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 20 9 5l4 10 3-6 4 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];


export default function InterviewResults() {

  const { report, getReportById, getResumePdf, loading } = useInterview();

  const navigate = useNavigate();

  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId)
    }
  }, [interviewId])

  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNavClick = (item) => {
    setIsSidebarOpen(false);

    if (item.key === "home") {
      navigate("/home");
      return;
    }

    setActiveTab(item.key);
  };

  return (
    <div className="ir">

      {/* Mobile top bar: hamburger + brand */}
      <div className="ir-mobile-topbar">
        <button
          className="menu-btn"
          onClick={() => setIsSidebarOpen(true)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6H20M4 12H20M4 18H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <Link to="/home" className="ir-mobile-topbar__brand">
          <img src={logo} alt="" />
          <span>Career<span>Pilot</span></span>
        </Link>
      </div>

      <aside className={`ir-sidebar${isSidebarOpen ? " active" : ""}`}>
        <Link to="/home" className="ir-brand">
          <span className="ir-brand__mark"><img src={logo} alt="" srcSet="" /></span>
          <span className="ir-brand__name">Career<span>Pilot</span></span>
        </Link>

        <button
          className="close-btn"
          onClick={() => setIsSidebarOpen(false)}
        >
          ✕
        </button>

        <nav className="ir-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`ir-nav__item${activeTab === item.key ? " is-active" : ""}${item.key === "home" ? " ir-nav__item--home" : ""}`}
              onClick={() => handleNavClick(item)}
            >
              <span className="ir-nav__icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>


        <div className="ir-sidebar__footer">
          <div className="resume-download-card">
            <div className="resume-download-card__header">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z"
                  fill="currentColor"
                />
              </svg>

              <span>AI Resume</span>
            </div>

            <p className="resume-download-card__description">
              Generated using your uploaded resume, job description and self
              description to improve ATS compatibility for this role.
            </p>


            <div className="resume-download-card__badges">
              <span>AI Generated</span>
              <span>ATS Friendly</span>
              <span>Tailored</span>
            </div>

            <span></span>
            <button
              className="download-btn"
              onClick={() => getResumePdf(interviewId)}
              disabled={loading}
            >
              {loading ? (
                <span className="download-btn__loading">
                  Downloading<span className="spinner"></span>
                </span>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 20H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Download AI Resume
                </>
              )}
            </button>
          </div>
        </div>

      </aside>

      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="ir-content">
        {activeTab === "overview" && (
          <OverviewPanel matchScore={report?.matchScore} skillGaps={report?.skillGaps} />
        )}
        {activeTab === "technical" && (
          <QuestionsPanel
            title="Technical Questions"
            eyebrow="Round 1 · Technical"
            questions={report?.technicalQuestions}
          />
        )}
        {activeTab === "behavioral" && (
          <QuestionsPanel
            title="Behavioral Questions"
            eyebrow="Round 2 · Behavioral"
            questions={report?.behavioralQuestions}
          />
        )}
        {activeTab === "roadmap"
          && <RoadmapPanel
            plan={report?.preparationPlan}
          />
        }
      </main>
    </div>
  );
}