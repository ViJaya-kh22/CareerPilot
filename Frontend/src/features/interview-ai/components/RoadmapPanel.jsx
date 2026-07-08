import React, { useState } from "react";
import "../style/roadmapPannel.scss";

function DayCard({ day, focus, tasks, isLast }) {
  const [open, setOpen] = useState(day === 1);

  return (
    <div className="day-row">
      <div className="day-row__rail">
        <span className="day-row__dot">{day}</span>
        {!isLast && <span className="day-row__line" />}
      </div>

      <article className="day-card">
        <button
          type="button"
          className="day-card__head"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <div>
            <span className="day-card__label">Day {day}</span>
            <h3 className="day-card__focus">{focus}</h3>
          </div>
          <svg viewBox="0 0 24 24" fill="none" className={open ? "is-open" : ""}>
            <path d="m7 10 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {open && (
          <ul className="day-card__tasks">
            {tasks.map((task, i) => (
              <li key={i}>{task}</li>
            ))}
          </ul>
        )}
      </article>
    </div>
  );
}

export default function RoadmapPanel({ plan = [] }) {
  const totalTasks = plan.reduce((sum, d) => sum + d.tasks.length, 0);

  return (
    <div className="rm">
      <div className="rm-header">
        <span className="ov-eyebrow">Preparation Plan</span>
        <h1 className="rm-title">{plan.length}-Day Roadmap</h1>
        <span className="rm-count">{totalTasks} tasks across {plan.length} days</span>
      </div>

      <div className="rm-timeline">
        {plan.map((d, i) => (
          <DayCard key={d.day} {...d} isLast={i === plan.length - 1} />
        ))}
      </div>
    </div>
  );
}