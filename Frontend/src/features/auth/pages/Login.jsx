import { Link, useNavigate } from "react-router";
import AuthLayout from "./AuthLayout";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

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

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const Login = () => {
  const navigate = useNavigate();

  const { loading, handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let message = "";

    if (name === "email") {
      if (!value.trim()) message = "Email is required.";
      else if (!/^\S+@\S+\.\S+$/.test(value)) message = "Enter a valid email.";
    }

    if (name === "password") {
      if (!value) message = "Password is required.";
     else if (value.length < 6) message = "Password must be at least 6 characters.";
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
    return message;
  };

  const handleBlur = (e) => validateField(e.target.name, e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateField("email", email);
    const passwordError = validateField("password", password);

    if (emailError || passwordError) return;

    await handleLogin({ email, password });
    navigate("/home");
  };

  return (
    <AuthLayout>
      <div className="form-header">
        <h1>Welcome Back</h1>
        <p>Continue building your career with AI.</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <div className="input-wrapper">
            <span className="input-icon">
              <MailIcon />
            </span>
            <input
              onBlur={handleBlur}
              className={errors.email ? "input-error" : ""}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              id="email"
              name="email"
              placeholder="you@example.com"
            />
          </div>
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="input-wrapper">
            <span className="input-icon">
              <LockIcon />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className={errors.password ? "input-error" : ""}
              onBlur={handleBlur}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              type="button"
              className="toggle-password"
              aria-label="Toggle password visibility"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <EyeIcon />
            </button>
          </div>
          {errors.password && <span className="field-error">{errors.password}</span>}
        </div>

        <button className="btn primary-btn">
          {loading ? <span className="spinner" /> : "Log In"}
        </button>
      </form>

      <p className="switch-auth">
        Don't have an account?{" "}
        <Link to="/register">
          <span>Create Account</span>
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;