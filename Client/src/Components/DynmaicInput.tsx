import React, { useState } from "react";
import "../Assets/css/Auth/Auth.css";
import IDynmaicInput from "../Services/DataTypes/IDynamicInput";
import { BiHide, BiShow } from "react-icons/bi";

function DynanicInput({
  placeholder,
  type = "text",
  value,
  setValue,
  name,
  maxlength,
  errorText,
}: IDynmaicInput) {
  const [passwordShow, setpasswordShow] = useState(false);
  return (
    <>
      <div className="input_root_container">
        <input
          width={"100%"}
          className="input_cont"
          value={value}
          type={
            type == "password" ? (passwordShow ? "text" : "password") : type
          }
          name={name}
          maxLength={maxlength}
          placeholder={placeholder}
          onChange={(e: any | any[]) => {
            setValue(e.target.value);
          }}
        />
        {type == "password" && (
          <div className="password_hide_show">
            <div
              className="logo_hide_show"
              onClick={() => setpasswordShow((e) => !e)}
            >
              {passwordShow ? <BiHide width={30} /> : <BiShow width={30} />}
            </div>
          </div>
        )}
        {errorText && <div className="input_error">{errorText}</div>}
      </div>
    </>
  );
}

export default DynanicInput;
