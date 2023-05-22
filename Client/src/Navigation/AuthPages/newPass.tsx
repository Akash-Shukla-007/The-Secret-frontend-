import React, { useState } from "react";
import DynanicInput from "../../Components/DynmaicInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../Assets/css/Auth/Auth.css";
import { newPassword } from "../../Services/AxiosServices/HttpRequests";
import secret from "../../Assets/img/secret.png";
import { BiLoaderCircle } from "react-icons/bi";

function NewPass() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const Location = useLocation();
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");

  const [passwordErrorText, setPasswordErrorText] = useState("");
  const [cnfPasswordErrorText, setCnfPasswordErrorText] = useState("");

  const passwordValidator = (password: string) => {
    if (password === "") {
      setPasswordErrorText("Password is required");
      return false;
    }
    if (password.length < 8) {
      setPasswordErrorText("Password should not be less than 8 characters");
      return false;
    }
    if (password.search(/\d+/g) < 0) {
      setPasswordErrorText("Password must contain atleast one Number");
      return false;
    }
    if (password.search(/[A-Z]/) < 0) {
      setPasswordErrorText(
        "Password must contain atleast one Uppercase character"
      );
      return false;
    }
    setPasswordErrorText("");
    return true;
  };
  const cnfPasswordValidator = (cnfPassword: string, password: string) => {
    if (cnfPassword == "") {
      setCnfPasswordErrorText("Confirm Password is required");
      return false;
    }
    if (cnfPassword !== password) {
      setCnfPasswordErrorText("Confirm Password and Password should be same");
      return false;
    }
    setCnfPasswordErrorText("");
    return true;
  };

  const onsubmit = async () => {
    Location.state.password = password;
    let v1 = passwordValidator(password);
    let v2 = cnfPasswordValidator(cnfPassword, password);
    if (!(v1 && v2)) return;
    setLoading(true);
    await newPassword(Location.state)
      .then((res: any) => {
        setLoading(false);
        const data = res.data;
        console.log(data);
        localStorage.setItem("loginToken", Location.state.token);
        navigate("/default");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
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
        <h1 className="auth_heading">New Password</h1>
        <h3> Enter your details to update password</h3>
        <DynanicInput
          placeholder="New Password"
          type="password"
          name="Password"
          setValue={setPassword}
          errorText={passwordErrorText}
        />
        <DynanicInput
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
          setValue={setCnfPassword}
          errorText={cnfPasswordErrorText}
        />
        <button onClick={onsubmit}>Proceed</button>
        <Link className="links" to="/signup">
          Back to Sign up
        </Link>
      </div>
      <div className="footer">Copyright 20223</div>
    </div>
  );
}

export default NewPass;
