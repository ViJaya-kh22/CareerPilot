import { Link, useLocation } from "react-router";
import "../auth.form.scss";
import logoLight from "../../../assets/images/logos/logo-light-removebg-preview.png";
import career from "../../../assets/images/auth/career-illu.png"

const DocIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M9 13h6M9 17h6" />
  </svg>
);

const TargetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" />
  </svg>
);

const TrendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M15 7h6v6" />
  </svg>
);

const RocketIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
  </svg>
);

const features = [
  {
    icon: <DocIcon />,
    title: "Smart Resume Analysis",
    desc: "Improve your resume and boost your ATS score.",
  },
  {
    icon: <TargetIcon />,
    title: "Interview Preparation",
    desc: "Practice with AI-generated questions and feedback.",
  },
  {
    icon: <TrendIcon />,
    title: "Career Growth",
    desc: "Personalized roadmaps to upskill and grow.",
  },
];

const AuthLayout = ({ children }) => {
  const { pathname } = useLocation();
  const isLogin = pathname === "/login";

  return (
    <main className="auth-main">
      <div className="auth-card">
        <div className="auth-left">
          <div className="brand">
            <span className="brand-icon">
              <img className="logo" src={logoLight} alt="" />
            </span>
            <h1>
              Career<span>Pilot</span>
            </h1>
          </div>

          <h3 className="tagline">
            Navigate Your 
            <span> Career</span> with <span>Confidence</span>
          </h3>
          <p className="subtitle">
            AI-powered resume analysis, interview preparation, and personalized career guidance all in one place.
          </p>

          <ul className="features">
            {features.map((f) => (
              <li key={f.title}>
                <span className="feature-icon">{f.icon}</span>
                <div>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>


          <div className="illustration" aria-hidden="true">
            <img src={career} className="illustration-img" alt="" />
          </div>
        </div>

        <div className="auth-right">
          <div className="tabs">
            <Link to="/login" className={`tab ${isLogin ? "active" : ""}`}>
              Log In
            </Link>
            <Link to="/register" className={`tab ${!isLogin ? "active" : ""}`}>
              Create Account
            </Link>
          </div>

          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;