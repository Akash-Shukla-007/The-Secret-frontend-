import { useState } from "react";
import DynanicInput from "../../Components/DynmaicInput";
import "../../Assets/css/Auth/Auth.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import secret from "../../Assets/img/secret.png";

import { forgotPassword } from "../../Services/AxiosServices/HttpRequests";
import { BiLoaderCircle } from "react-icons/bi";

export default function Forgot() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailErrorText, setEmailErrorText] = useState("");
  const onSubmit = async () => {
    if (email == "") {
      setEmailErrorText("Email is required");
      return;
    }
    setLoading(true);
    await forgotPassword(email)
      .then((res: any) => {
        setLoading(false);
        const data = res.data;
        data.email = email;
        console.log(data);

        navigate("/verify-otp", {
          state: data,
        });
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.data.message) {
          setEmailErrorText(err.response.data.message);
          return;
        }
        console.log(err);
      });
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
          <h1 className="auth_heading">Forgot Password</h1>
          <DynanicInput
            placeholder="Email"
            type="email"
            name="email"
            setValue={setEmail}
            errorText={emailErrorText}
          />
          <button onClick={onSubmit}>Proceed</button>
          <Link className="links" to="/signup">
            Back to Sign up
          </Link>
        </div>
        <div className="footer">Copyright 20223</div>
      </div>
    </>
  );
}
