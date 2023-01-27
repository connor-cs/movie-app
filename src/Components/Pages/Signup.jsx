import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, useAuthContext } from "../Context";
import { auth } from "../../firebase-config";

export default function Signup() {
  const { loggedInState, setLoggedInState } = useContext(UserContext);
  const { signup, login, logout} = useAuthContext();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState("");

  return (
    <div className="form">
      {/* login form */}
      <span>Login here:</span>
      <div className="login-form-container form-container">
        <form className="login-form">
          <input
            value={loginData.username}
            placeholder="type your email"
            onChange={handleLoginUsername}
          ></input>
          <input
            type="password"
            value={loginData.password}
            placeholder="type your password"
            onChange={handleLoginPassword}
          ></input>
          <button type="submit" onClick={handleLoginClick}>
            Login
          </button>
        </form>

        {/* signup form */}

        <span>Or create account here:</span>
        {errors ? <p>{errors}</p> : null}
        <div className="signup-form-container form-container">
          <form className="signup-form" onSubmit={createNewUser}>
            <input
              placeholder="type email"
              type="text"
              value={signupData.username}
              onChange={handleSignupUsername}
            ></input>
            <input
              placeholder="type password"
              type="password"
              value={signupData.password}
              onChange={handleSignupPassword}
            ></input>
            <input
              placeholder="confirm password"
              type="password"
              value={signupData.passwordConfirm}
              onChange={handleSignupPasswordConfirm}
            ></input>
            <button>Sign up</button>
          </form>
        </div>
      </div>
      <div>
        {loggedInState ? <button onClick={logout}>Log out</button> : null}
      </div>
    </div>
  );

  //helper functions
  function handleLoginClick(e) {
    e.preventDefault();
    login(auth, loginData.username, loginData.password);
    navigate("/")
  }

  function handleLoginUsername(e) {
    e.preventDefault();
    setLoginData({
      ...loginData,
      username: e.target.value,
    });
  }
  function handleLoginPassword(e) {
    e.preventDefault();
    setLoginData({
      ...loginData,
      password: e.target.value,
    });
  }
  function handleSignupUsername(e) {
    setSignupData({
      ...signupData,
      username: e.target.value,
    });
  }
  function handleSignupPassword(e) {
    setSignupData({
      ...signupData,
      password: e.target.value,
    });
  }
  function handleSignupPasswordConfirm(e) {
    setSignupData({
      ...signupData,
      passwordConfirm: e.target.value,
    });
  }

  //also add a doc to users collection here or in onauthStateChange inside context? 
  async function createNewUser(e) {
    e.preventDefault();
    if (signupData.password !== signupData.passwordConfirm) {
      alert("Passwords do not match");
    }
    try {
      await signup(auth, signupData.username, signupData.password);
      navigate("/");
    } catch {
      console.log(errors);
      setErrors("Failed to create an account");
    }

    setLoggedInState(true);
  }
}
