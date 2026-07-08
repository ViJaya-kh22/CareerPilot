import React, { useState, useEffect } from "react";
import OverviewPanel from "../components/OverviewPanel";
import QuestionsPanel from "../components/QuestionPannel";
import RoadmapPanel from "../components/RoadmapPanel";
import "../style/interviewResults.scss";
import logo from "../../../assets/images/logos/logo-light-removebg-preview.png"
import { useInterview } from "../hooks/useInterview";
import { useParams } from "react-router";


const NAV_ITEMS = [
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

  const { report, getReportById , getResumePdf} = useInterview();

  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId)
    }
  }, [interviewId])

  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="ir">
      <aside className="ir-sidebar">
        <div className="ir-brand">
          <span className="ir-brand__mark"><img src={logo} alt="" srcSet="" /></span>
          <span className="ir-brand__name">CareerPilot</span>
        </div>

        <nav className="ir-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`ir-nav__item${activeTab === item.key ? " is-active" : ""}`}
              onClick={() => setActiveTab(item.key)}
            >
              <span className="ir-nav__icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="ir-sidebar__footer">
          <button
          onClick={()=> getResumePdf(interviewId)}
          >Dowload Resume</button>
        </div>
      </aside>

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