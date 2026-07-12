import { Link } from "react-router";
import "../LandingPage.scss";
import logoLight from "../../../assets/images/logos/logo-light-removebg-preview.png"


const IconDocScan = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M7 3.5h7.5L18.5 7.5V20a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M14.2 3.5V7a.5.5 0 0 0 .5.5h3.6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M9 12.5h6M9 15.5h6M9 9.5h2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconTargetMatch = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="1.4" fill="currentColor" />
  </svg>
);

const IconGapChart = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M4 20V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4 20h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="7" y="13" width="3" height="7" rx="0.6" stroke="currentColor" strokeWidth="1.5" />
    <rect x="13" y="8" width="3" height="12" rx="0.6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="1.6 1.8" />
  </svg>
);

const IconChatSpark = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h9A2.5 2.5 0 0 1 18 6.5v5A2.5 2.5 0 0 1 15.5 14H10l-4 3.5V14h-.5A1.5 1.5 0 0 1 4 12.5v-6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M19.2 15.2 20 17l1.8.7-1.8.7-.8 1.8-.8-1.8-1.8-.7 1.8-.7Z" fill="currentColor" />
  </svg>
);

const IconRoutePin = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M4 6c2.5 1.6 3.8 1.6 5 0s2.5-1.6 5 0 3.8 1.6 5 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="0.2 3.2" />
    <path d="M12 10.5c2 0 3.5 1.5 3.5 3.4C15.5 16.6 12 20.5 12 20.5s-3.5-3.9-3.5-6.6c0-1.9 1.5-3.4 3.5-3.4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="12" cy="13.8" r="1.2" fill="currentColor" />
  </svg>
);

const IconDocSpark = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M7 3.5h7.5L18.5 7.5V20a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M9 12h5M9 15h3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16.2 9.4 16.7 10.6 17.9 11.1 16.7 11.6 16.2 12.8 15.7 11.6 14.5 11.1 15.7 10.6Z" fill="currentColor" />
  </svg>
);

const IconUpload = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M12 15V5M12 5 8.5 8.5M12 5l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconReport = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <rect x="4.5" y="3.5" width="15" height="17" rx="1.4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 8h8M8 11.5h8M8 15h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconCompass = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M14.8 9.2 13.3 13.3 9.2 14.8 10.7 10.7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const IconLinkedIn = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7.8 10v6.2M7.8 7.7v.02M11.4 16.2V10M11.4 12.6c0-1.6 1-2.6 2.4-2.6 1.4 0 2.4.9 2.4 2.6v3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconGitHub = (props) => (
 <svg
  xmlns="http://www.w3.org/2000/svg"
  width="22"
  height="22"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-8 0C5.27.65 4.09 1 4.09 1A5.07 5.07 0 0 0 4 4.77 5.44 5.44 0 0 0 2.5 8.52c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 18.13V22"/>
</svg>
);

const IconEmail = (props) => (
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="22"
  height="22"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect x="2" y="4" width="20" height="16" rx="2"/>
  <path d="M22 7L12 13 2 7"/>
</svg>
)


const FEATURES = [
  {
    icon: IconDocScan,
    title: "Resume Analysis",
    desc: "A line-by-line read of your resume's strengths, gaps, and real-world impact.",
  },
  {
    icon: IconTargetMatch,
    title: "Job Match Score",
    desc: "See exactly how your background lines up against a specific job posting.",
  },
  {
    icon: IconGapChart,
    title: "Skill Gap Detection",
    desc: "Pinpoint the skills separating you from the role you're aiming for.",
  },
  {
    icon: IconChatSpark,
    title: "AI Interview Questions",
    desc: "Practice with questions pulled straight from the job description, not generic banks.",
  },
  {
    icon: IconRoutePin,
    title: "Personalized Roadmap",
    desc: "A step-by-step plan to close your gaps before you hit apply.",
  },
  {
    icon: IconDocSpark,
    title: "AI Resume Generator",
    desc: "Turn your experience into a resume tuned for the role you want.",
  },
];

const STEPS = [
  {
    icon: IconUpload,
    title: "Upload Your Information",
    desc: "Add your resume, a target job description, or a quick self-introduction- whatever you have on hand.",
  },
  {
    icon: IconReport,
    title: "AI Generates Your Report",
    desc: "We score your fit, surface gaps, and map your strengths against the role in seconds.",
  },
  {
    icon: IconCompass,
    title: "Prepare with Confidence",
    desc: "Walk away with a roadmap, tailored practice questions, and a resume built to match.",
  },
];


export default function LandingPage() {
  return (
    <div className="cp">
      {/* ---------------- Nav ---------------- */}
      <header className="cp-nav">
        <div className="cp-container cp-nav__inner">
          <a href="#" className="cp-logo brand-name">
            <span className="cp-logo__mark" aria-hidden="true">
              <img src={logoLight} alt="" srcSet="" />
            </span>
            <span style={{ color: "black" }}>Career</span><span>Pilot</span>
          </a>

          <nav className="cp-nav__links" aria-label="Primary">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it Works</a>
          </nav>

          <div className="cp-nav__actions">
            <Link to="/login" className="cp-link-btn">Login</Link>
            <Link to="/register" className="cp-btn cp-btn--primary cp-btn--sm">Get Started</Link>
          </div>
        </div>
      </header>

      {/* ---------------- Hero ---------------- */}
      <section className="cp-hero">
        <div className="cp-container cp-hero__inner">


          <h1 className="cp-hero__title">
            Land Your Next Role With <span className="cp-accent">AI Precision</span>
          </h1>

          <p className="cp-hero__subtitle">
            Upload your resume, match it against a real job description, and walk into
            the interview already knowing what they're going to ask.
          </p>

          <div className="cp-hero__ctas">
            <Link to="/login" className="cp-btn cp-btn--primary">Build My Plan</Link>
          </div>
        </div>
      </section>

      {/* ---------------- Features ---------------- */}
      <section className="cp-section" id="features">
        <div className="cp-container">
          <div className="cp-section__head">
            <h2>Key Features</h2>
            <p>Everything You Need in One Platform</p>
          </div>

          <div className="cp-grid">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <article className="cp-card" key={title}>
                <span className="cp-card__icon">
                  <Icon />
                </span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section className="cp-section cp-section--muted" id="how-it-works">
        <div className="cp-container">
          <div className="cp-section__head">
            <h2>How Career<span>Pilot</span> Works</h2>
            <p>Three Simple Steps</p>
          </div>

          <div className="cp-route">
            <svg className="cp-route__path" viewBox="0 0 900 40" preserveAspectRatio="none" aria-hidden="true">
              <path d="M60 20 H840" stroke="currentColor" strokeWidth="5" strokeDasharray="1 12" strokeLinecap="round" />
            </svg>

            {STEPS.map(({ icon: Icon, title, desc }, i) => (
              <div className="cp-route__stop" key={title}>
                <span className="cp-route__marker">
                  <Icon />
                </span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Closing CTA ---------------- */}
      <section className="cp-section">
        <div className="cp-container">
          <div className="interview-container">
          <div className="cp-cta">
            <h2>Ready to crush your next interview?</h2>
            <p>Join job seekers who walked in prepared, not guessing.</p>
            <Link to="/login" className="cp-btn cp-btn--primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
              </svg>
              Generate My Interview Strategy</Link>   
          </div>
        </div>
        </div> 
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="cp-footer">
        <div className="cp-container cp-footer__inner">
          <span className="cp-logo cp-logo--footer">
            <span className="cp-logo__mark" aria-hidden="true">
              <img src={logoLight} alt="" srcSet="" />
            </span>
            <span style={{ color: "black", fontWeight: '700' }}>Career</span><span style={{ color: "teal", fontWeight: '700' }}>Pilot</span>
          </span>

          <p className="cp-footer__copy">AI Interview Platform. </p>

          <nav className="cp-footer__links" aria-label="Legal">
            <span>About Me</span>
            <p>
              CareerPilot is a personal portfolio project that helps job seekers prepare smarter through AI-powered interview reports, personalized questions, and learning roadmaps.
            </p>
          </nav>

          <div className="cp-footer__social">
            <a href="https://github.com/ViJaya-kh22" 
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub">
            <IconGitHub />
            </a>
             <a href="https://www.linkedin.com/in/vijaya-khavnekar-711a45369/" 
              target="_blank"
            rel="noopener noreferrer"
             aria-label="LinkedIn">
             <IconLinkedIn />
             </a>
             <a href="mailto:vijayakhavnekar@gmail.com" 
             aria-label="Email">
              <IconEmail />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}