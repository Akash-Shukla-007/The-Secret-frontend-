import * as React from "react";
import { useState } from "react";
import "../../Assets/css/Auth/Auth.css";
import {
  Link,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import {
  confirmEmail,
  verifyotp,
} from "../../Services/AxiosServices/HttpRequests";
import DynanicInput from "../../Components/DynmaicInput";
import secret from "../../Assets/img/secret.png";
import { BiLoaderCircle } from "react-icons/bi";

export default function VerifyOtp() {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const Location = useLocation();
  const [otp, setOtp] = useState("");
  const [otpErrorText, setOtpErrorText] = useState("");

  const onSubmit = async () => {
    Location.state.otp = otp;
    if (otp == "") {
      setOtpErrorText("Enter Otp");
      return;
    }

    if (!Location.state.name) {
      // console.log("forgot hit");
      setloading(true);
      await confirmEmail(Location.state)
        .then((res: any) => {
          setloading(false);
          const data = res.data;
          data.email = Location.state.email;
          // console.log("verify");
          // console.log(data);
          navigate("/new-pass", { state: data });
          return;
        })
        .catch((err) => {
          setloading(false);
          setOtpErrorText("Enter correct Otp");
          // console.log(err);
          return;
        });
    } else {
      setloading(true);
      await verifyotp(Location.state)
        .then((res) => {
          setloading(false);
          const data = res.data;
          // console.log("default");
          localStorage.setItem("loginToken", res.data.token);
          window.location.reload();
        })
        .catch((err) => {
          setloading(false);
          setOtpErrorText("Enter correct Otp");
          // console.log("error --> " + err);
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
          <img className="secret_logo" src={secret} alt="Logo " />
        </div>
        <div className="auth_main_container">
          <h1 className="auth_heading">Verfiy Otp</h1>
          <h4>We have send an Otp to {Location.state.email}</h4>
          <DynanicInput
            placeholder="Otp"
            type="number"
            name="otp"
            errorText={otpErrorText}
            setValue={setOtp}
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
