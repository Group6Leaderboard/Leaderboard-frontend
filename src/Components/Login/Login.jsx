import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css"; 
import bgImage from "../../assets/logog.webp";
import {login} from "../../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 

    try {    const data = await login(email, password);


      if (data.message === "Success") {
        const { token, role } = data.response; 
        
        localStorage.setItem("token", token);
         localStorage.setItem("role", role);

        if (role === "ADMIN") {
          navigate("/admin");
        } else if (role === "MENTOR") {
          navigate("/mentor");
        } else if (role === "STUDENT") {
          navigate("/student");
        } else {
          navigate("/"); // Default route if role is unknown
        }
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);

      if (err.response && err.response.status === 404) {
        setError("Invalid credentials. Please try again.");
      } else {
        setError("Login failed. Check your connection and try again.");
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftHalf} style={{ backgroundImage: `url(${bgImage})` }}></div>

      <div className={styles.rightHalf}>
        <div className={styles.loginBox}>
          <div className={styles.welcomeBack}>
            <h2>Welcome Back!</h2>
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
