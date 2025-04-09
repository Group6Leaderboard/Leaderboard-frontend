import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import bgImage from "../../assets/logog.webp";
import { login } from "../../services/authService";

const Login = () => {
  const [email, setEmail] = useState(localStorage.getItem("rememberedEmail") || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);  // State for toggling password visibility
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role) {
      switch (role.toUpperCase()) {
        case "ADMIN":
          navigate("/admin", { replace: true });
          break;
        case "MENTOR":
          navigate("/mentor", { replace: true });
          break;
        case "STUDENT":
          navigate("/student", { replace: true });
          break;
        default:
          navigate("/leaderboard/colleges", { replace: true });
      }
    }
  }, []);


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(email, password);

      if (data.message === "Success") {
        const { token, role } = data.response;

        localStorage.setItem("role", role);
        localStorage.setItem("token", token);

        if (role === "ADMIN") {
          navigate("/admin");
        } else if (role === "MENTOR") {
          navigate("/mentor");
        } else if (role === "STUDENT") {
          navigate("/student");
        } else {
          navigate("/");
        }
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);

      if (err.response && err.response.status === 404) {
        setError("Invalid credentials. Please try again.");
      } else {
        setError("Invalid credentials. Please try again");
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftHalf} style={{ backgroundImage: `url(${bgImage})` }}></div>

      <div className={styles.rightHalf}>
        <div className={styles.loginCard}>
          <div className={styles.iconContainer}>
            <div className={styles.signInIcon}>
              <img src="/password.png" alt="Sign In Icon" className={styles.icon} />
            </div>
          </div>

          <h2 className={styles.signInTitle}>Sign in with email</h2>
          <p className={styles.signInSubtitle}>Unlock your journey to innovation—track projects, compete, and lead the leaderboard!</p>

          {error && <p className={styles.errorMessage}>{error}</p>}

          <form onSubmit={handleLogin}>
            <div className={styles.inputContainer}>
              <div className={styles.inputField}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </div>

              <div className={styles.inputField}>
                <input
                  type={showPassword ? "text" : "password"} // Dynamically toggle input type
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}  // Toggle password visibility
                >
                  <img
                    src={showPassword ? "/hide.png" : "/eye.png"} // Change icon based on state
                    alt="Toggle Password Visibility"
                    className={styles.icon}
                  />
                </button>
              </div>
            </div>

            <button type="submit" className={styles.getStartedBtn}>Login </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
