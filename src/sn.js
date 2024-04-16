import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";
import InputControl from "./InputControl"
import { auth } from "../firebase";
import { Navbar_logo, carousel1, carousel2 } from "./images";
import { Link, useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword,  } from "firebase/auth";

function SignUp() {
  const navigate = useNavigate();
  const [values, setValues] = useState({

    email: "",
    pass: "",
  });
  
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };



  const handleSubmission = () => {
    if ( !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
   

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
      
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
              Already have an account?{" "}
              <Link className="link signup-link" to="/login">
                Login
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

export default SignUp;