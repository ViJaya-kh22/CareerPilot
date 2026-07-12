import { Link, useNavigate } from "react-router";
import AuthLayout from "./AuthLayout";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

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

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const Register = () => {
  const navigate = useNavigate();

  const { loading, handleRegister } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let message = "";

    if (name === "username") {
      if (!value.trim()) message = "Username is required.";
      else if (value.trim().length < 3) message = "Username must be at least 3 characters.";
    }

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

    const usernameError = validateField("username", username);
    const emailError = validateField("email", email);
    const passwordError = validateField("password", password);

    if (usernameError || emailError || passwordError) return;

    await handleRegister({ username, email, password });
    navigate("/home");
  };

  return (
    <AuthLayout>
      <div className="form-header">
        <h1>Create Account</h1>
        <p>Start your career journey with us</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <div className="input-wrapper">
            <span className="input-icon">
              <UserIcon />
            </span>
            <input
              onBlur={handleBlur}
              className={errors.username ? "input-error" : ""}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
            />
          </div>
          {errors.username && <span className="field-error">{errors.username}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
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
              placeholder="Enter email address"
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
          {loading ? <span className="spinner" /> : "Register"}
        </button>
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