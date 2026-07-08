import React from "react";
import "../style/overviewPanel.scss";

function matchLabel(score) {
  if (score >= 85) return "Strong Match";
  if (score >= 65) return "Good Match";
  if (score >= 45) return "Partial Match";
  return "Needs Work";
}

function matchNote(score) {
  if (score >= 85)
    return "Your resume aligns closely with this role's core requirements. Focus prep time on the gaps below.";
  if (score >= 65)
    return "A solid foundation is there. Closing a few gaps will meaningfully raise your odds.";
  return "There's a meaningful gap between the resume and this role. Prioritize the list below before applying.";
}

function ScoreRing({ score }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);

  return (
    <div className="score-ring">
      <svg viewBox="0 0 130 130">
        <circle className="score-ring__track" cx="65" cy="65" r={radius} />
        <circle
          className="score-ring__value"
          cx="65"
          cy="65"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="score-ring__label">
        <span className="score-ring__number">{score}</span>
        <span className="score-ring__percent">%</span>
      </div>
    </div>
  );
}

const SEVERITY_ORDER = { High: 0, Medium: 1, Low: 2 };

export default function OverviewPanel({ matchScore, skillGaps = [] }) {
  const sortedGaps = [...skillGaps].sort(
    (a, b) => (SEVERITY_ORDER[a.severity] ?? 3) - (SEVERITY_ORDER[b.severity] ?? 3)
  );

  return (
    <div className="ov">
      <div className="ov-header">
        <span className="ov-eyebrow">Match Report</span>
        <h1 className="ov-title">Resume Vs Job Description</h1>
      </div>

      <section className="ov-score-card">
        <ScoreRing score={matchScore} />
        <div className="ov-score-card__copy">
          <span className={`ov-badge ov-badge--${matchLabel(matchScore).split(" ")[0].toLowerCase()}`}>
            {matchLabel(matchScore)}
          </span>
          <p className="ov-score-card__note">{matchNote(matchScore)}</p>
        </div>
      </section>

      <div className="ov-divider" />

      <section className="ov-gaps">
        <div className="ov-gaps__header">
          <h2 className="ov-gaps__title">Skill Gaps</h2>
          <span className="ov-gaps__count">{skillGaps.length} identified</span>
        </div>

        <div className="ov-gaps__grid">
          {sortedGaps.map((gap) => (
            <article key={gap.skill} className="gap-card">
              <span className="gap-card__skill">{gap.skill}</span>
              <span className={`gap-pill gap-pill--${gap.severity.toLowerCase()}`}>
                {gap.severity}
              </span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}