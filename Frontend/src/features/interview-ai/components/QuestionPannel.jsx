import React, { useState } from "react";
import "../style/questionPanel.scss";

function QuestionCard({ index, question, intention, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="q-card">
      <div className="q-card__top">
        <span className="q-card__index">{String(index + 1).padStart(2, "0")}</span>
        <div className="q-card__body">
          <p className="q-card__question">{question}</p>
          <p className="q-card__intention">
            <span className="q-card__intention-label">Why recruiter may ask</span>
            {intention}
          </p>
        </div>
      </div>

      <button
        type="button"
        className={`q-card__toggle${open ? " is-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {open ? "Hide model answer" : "Show model answer"}
        <svg viewBox="0 0 24 24" fill="none">
          <path d="m7 10 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="q-card__answer">
          <p>{answer}</p>
        </div>
      )}
    </article>
  );
}

export default function QuestionsPanel({ title, eyebrow, questions = [] }) {
  return (
    <div className="qp">
      <div className="qp-header">
        <span className="ov-eyebrow">{eyebrow}</span>
        <h1 className="qp-title">{title}</h1>
        <span className="qp-count">{questions.length} questions prepared</span>
      </div>

      <div className="qp-list">
        {questions.map((q, i) => (
          <QuestionCard key={i} index={i} {...q} />
        ))}
      </div>
    </div>
  );
}