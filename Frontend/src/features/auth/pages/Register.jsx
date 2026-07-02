import { Link } from "react-router";
import AuthLayout from "./AuthLayout";

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 6 10-6" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="11" width="16" height="9" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <AuthLayout>
      <div className="form-header">
        <h1>
          Create Account 
        </h1>
        <p>Start your career journey with us</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <div className="input-wrapper">
            <span className="input-icon">
              <UserIcon />
            </span>
            <input type="text" id="username" name="username" placeholder="Enter username" />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <div className="input-wrapper">
            <span className="input-icon">
              <MailIcon />
            </span>
            <input type="text" id="email" name="email" placeholder="Enter email address" />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="input-wrapper">
            <span className="input-icon">
              <LockIcon />
            </span>
            <input type="password" id="password" name="password" placeholder="Enter password" />
          </div>
        </div>

        <button className="btn primary-btn">Register</button>
      </form>

      <p className="switch-auth">
        Already have an account?{" "}
        <Link to="/login">
          <span>Login</span>
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;