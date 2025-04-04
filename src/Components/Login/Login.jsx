import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css"; 
import bgImage from "../../assets/logog.webp";
import { login } from "../../services/authService";

const Login = () => {
  const [email, setEmail] = useState(localStorage.getItem("rememberedEmail") || ""); // Load saved email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const remembered = localStorage.getItem("rememberedEmail");
    if (remembered) {
      setRememberMe(true);
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
        <div className={styles.loginBox}>
          <div className={styles.welcomeBack}>
            <h2>Sign in to Continue</h2>
          </div>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <form onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className={styles.loginBtn}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
