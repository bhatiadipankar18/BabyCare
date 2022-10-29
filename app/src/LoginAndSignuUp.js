import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import Select from 'react-select'


const LoginAndSignuUp = () => {
  const [email, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userType, setUserType] = useState("");

  const [message, setMessage] = useState("");

  let [authMode, setAuthMode] = useState("signin");
  const navigate = useNavigate();

  const roleOptions = [
    { value: 'parents', label: 'Parents' },
    { value: 'nanny', label: 'Nanny' }
  ];

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
    console.log(authMode);
  }

  //Method to Register User
  let registerUser = async (e) => {
    e.preventDefault();
    
    try {
      let res = await fetch("/user/register", {
        method: "POST",
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          userType: userType
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setFirstName("");
        setLastName("");
        setEmailAddress("");
        setUserType("");
        setPassword("");
        setMessage("User created successfully");
        setAuthMode("signin");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //Method to Login to Application
  let userLogin = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("/user/login", {
        method: "POST",
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      let resJson = await res.json();
      if (res.status === 200) {
        setEmailAddress("");
        setPassword("");
        setMessage("User logged in successfully");
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("user", resJson.data.lastName + ", " + resJson.data.firstName);
        localStorage.setItem("userType", resJson.data.userType);
        navigate("/");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={userLogin}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
              </div>
            <div className="form-group mt-3">
              <label>Email Address</label>
              <input
                type="Email"
                className="form-control mt-1"
                placeholder="Enter Email"
                onChange={(e) => setEmailAddress(e.target.value)}
                value={email}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="Password"
                className="form-control mt-1"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            {/* <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p> */}
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={registerUser}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already Registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>First Name</label>
            <input
              type="First Name"
              className="form-control mt-1"
              placeholder="e.g Jane"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </div>
          <div className="form-group mt-3">
            <label>Last Name</label>
            <input
              type="Last Name"
              className="form-control mt-1"
              placeholder="e.g Doe"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={(e) => setEmailAddress(e.target.value)}
              value={email}
            />
          </div>
          <div className="form-group mt-3">
            <label>Role</label>
            <Select options={roleOptions}
                    id="usertype"
                    label="usertype"
                    name="usertype"
                    onChange={(e) => setUserType(e.value)}
                    value = {roleOptions.filter(function(option) {
                      return option.value === userType;
                    })} />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          {/* <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p> */}
        </div>
      </form>
    </div>
  );
  }

  export default LoginAndSignuUp;