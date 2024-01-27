import { useEffect, useState } from "react";
import DynanicInput from "../../Components/DynmaicInput";
import "../../Assets/css/Auth/Auth.css";

import ISignupInput from "../../Services/DataTypes/ISignupInput";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  gettingStarted,
  login,
} from "../../Services/AxiosServices/HttpRequests";
import secret from "../../Assets/img/secret.png";
import { BiLoaderCircle } from "react-icons/bi";

export default function Auth({ isSignup }: any, { setIsSignup }: any) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [auth, setauth] = useState("");
  const [emailErrorText, setEmailErrorText] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");
  const [nameErrorText, setNameErrorText] = useState("");
  const [dobErrorText, setDobErrorText] = useState("");

  const nameValidator = (name: string) => {
    if (name == "") {
      setNameErrorText("Name is required");
      return false;
    }
    setNameErrorText("");
    return true;
  };

  const emailValidator = (email: string) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email == "") {
      setEmailErrorText("Email is required");
      return false;
    }
    if (!re.test(email) && isSignup) {
      setEmailErrorText("Enter valid email");
      return false;
    }
    setEmailErrorText("");
    return true;
  };

  const passwordValidator = (password: string) => {
    if (password === "") {
      setPasswordErrorText("Password is required");
      return false;
    }
    if (password.length < 8 && isSignup) {
      setPasswordErrorText("Password should not be less than 8 characters");
      return false;
    }
    if (password.search(/\d+/g) < 0 && isSignup) {
      setPasswordErrorText("Password must contain atleast one Number");
      return false;
    }
    if (password.search(/[A-Z]/) < 0 && isSignup) {
      setPasswordErrorText(
        "Password must contain atleast one Uppercase character"
      );
      return false;
    }
    setPasswordErrorText("");
    return true;
  };

  const dobValidator = (dob: string) => {
    if (dob == "") {
      setDobErrorText("DOB is required");
      return false;
    }
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const dobYear = parseInt(dob.split("-")[0]) + 14;
    if (currentYear < dobYear) {
      setDobErrorText("Your Age should not be less than 14 Years");
      return false;
    }
    setDobErrorText("");
    return true;
  };

  const onSubmit = async () => {
    let v0 = nameValidator(name);
    let v1 = emailValidator(email);
    let v2 = passwordValidator(password);
    let v3 = dobValidator(dob);

    if (!(v1 && v2 && (v0 || !isSignup) && (v3 || !isSignup))) return;
    console.log("clickeed");
    if (isSignup) {
      setLoading(true);
      gettingStarted(email)
        .then((res: any) => {
          setLoading(false);
          const data = res.data;
          data.email = email;
          data.name = name;
          data.password = password;
          data.dob = dob;
          console.log(email);
          console.log(data);
          navigate("/verify-otp", {
            state: data,
          });
        })
        .catch((err) => {
          setLoading(false);

          if (err.response.data.message) {
            return setEmailErrorText(err.response.data.message);
          }
          console.log(err);
        });
    } else {
      setLoading(true);
      login({ email: email, password: password })
        .then((res: any) => {
          setLoading(false);
          const data = res.data;
          localStorage.setItem("loginToken", data.token);
          navigate("/default");
        })
        .catch((err: any) => {
          setLoading(false);
          if (err.response.data.message) {
            return setPasswordErrorText(err.response.data.message);
          }
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="auth_root">
        {loading && (
          <div className="loader">
            <BiLoaderCircle className="loader_main" size={100} />
          </div>
        )}
        <div className="header">
          <img className="secret_logo" src={secret} alt="Logo" />
        </div>
        <div className="auth_main_container">
          <h1 className="auth_heading">{isSignup ? "Sign up" : "Login"}</h1>
          {isSignup && (
            <DynanicInput
              placeholder="Name"
              type="text"
              name="name"
              setValue={setName}
              errorText={nameErrorText}
            />
          )}
          <DynanicInput
            placeholder="Email"
            type="text"
            name="email"
            setValue={setEmail}
            errorText={emailErrorText}
          />
          <DynanicInput
            placeholder="Password"
            type="password"
            name="password"
            setValue={setPassword}
            errorText={passwordErrorText}
          />
          {isSignup && (
            <DynanicInput
              placeholder="Date of Birth"
              type="date"
              name="dob"
              setValue={setDob}
              errorText={dobErrorText}
            />
          )}
          <button onClick={onSubmit}>{isSignup ? "Sign up" : "Login"}</button>
          {!isSignup && (
            <Link className="links" to="/forgot">
              Forgot Password ?
            </Link>
          )}
          <Link className="links" to={isSignup ? "/signin" : "/signup"}>
            {isSignup
              ? "Already have an account ? Login"
              : "Create new account"}
          </Link>
        </div>
        <div className="footer">Copyright 2023</div>
      </div>
    </>
  );
}
