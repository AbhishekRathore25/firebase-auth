import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Navbar_logo, carousel1, carousel2 } from "./images";
import "./Login.css";
import InputControl from "./InputControl"
// Import images if needed
// import { Navbar_logo, carousel1, carousel2 } from "./images";

import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // Added state for password visibility

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  const handleSubmission = (e) => {
    e.preventDefault(); // Prevent form submission
    if (!values.email || !values.pass) {
      setErrorMsg("Fill in all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <div
      style={{ backgroundImage: `url(${carousel1})` }}
      className="container5 forms"
    >
      <div className="form login">
        <div className="form-content">
          <header>SignUp</header>
          <form action="#" onSubmit={handleSubmission}>
            <div className="field input-field">
              <InputControl
                type="text"
                id="email"
                placeholder="Email"
                className="input"
                autoComplete="off" 
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, email: event.target.value }))
                }
              />
            </div>

            <div className="field input-field">
              <InputControl
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                className="password"
                id="password"
                autoComplete="off"
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, pass: event.target.value }))
                }
              />
              <i
                className={`bx ${
                  passwordVisible ? "bx-show" : "bx-hide"
                } eye-icon`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>

            <div className="field button-field">
              <button type="submit" disabled={submitButtonDisabled}>
                Sign Up
              </button>
            </div>
          </form>

          <div className="form-link">
            <span>
              Don't have an account?{" "}
              <Link href={true} className="link signup-link" to="/SignUp">
                SignUp
              </Link>
            </span>
          </div>
        </div>

        <div className="line"></div>

        <div className="media-options">
          <a href="#" className="field facebook">
            <FaFacebook className="facebook-icon" />
            <span>Login with Facebook</span>
          </a>
        </div>
        <div className="media-options">
          <a href="#" className="field google">
            <FcGoogle style={{ fontSize: "30px" }} className="facebook-icon" />
            <span>Login with Google</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
