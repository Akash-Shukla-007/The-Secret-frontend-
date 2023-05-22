import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./AuthPages/Auth";
import Forgot from "./AuthPages/ForgotPassword";
import VerifyOtp from "./AuthPages/VerfiyOtp";
import NewPass from "./AuthPages/newPass";
import ProtectedRoutes from "./ProtectedRoutes";
import UnProtectedRoutes from "./UnProtectedRoutes";
import DefaultPage from "./AppPages/DefaultPage";
import AddNewNote from "./AppPages/AddNewNote";
import MyProfile from "./AppPages/MyProfile";

export default function ApplicationNavigation() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="default" element={<DefaultPage />} />
          <Route path="add-note" element={<AddNewNote />} />
          <Route path="profile" element={<MyProfile />} />
        </Route>
        <Route element={<UnProtectedRoutes />}>
          <Route path="/" element={<Auth />} />
          <Route path="signup" element={<Auth isSignup />} />
          <Route path="signin" element={<Auth />} />
          <Route path="forgot" element={<Forgot />} />
          <Route path="verify-otp" element={<VerifyOtp />} />
          <Route path="new-pass" element={<NewPass />} />
        </Route>
      </Routes>
    </>
  );
}
