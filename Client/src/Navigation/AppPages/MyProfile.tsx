import React, { useEffect, useState } from "react";
import logo from "../../Assets/img/secret.png";
import { myProfile } from "../../Services/AxiosServices/HttpRequests";
import { useLocation } from "react-router-dom";
import { BiLoaderCircle } from "react-icons/bi";

function MyProfile() {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>([]);
  const Location = useLocation();

  useEffect(() => {
    myProfile()
      .then((res: any) => {
        setLoading(false);
        const results = res.data.data;
        //   console.log(results);
        setProfileData(results);
        setProfileData((prevData: any) => {
          var dob = new Date(prevData[0].dob);
          var monthName = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          var dateOfBirth =
            dob.getDate() +
            " " +
            monthName[dob.getMonth()] +
            " " +
            dob.getFullYear();
          prevData[0].dob = dateOfBirth;
          // console.log(prevData);
          return prevData;
        });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="default_page_container">
        {loading && (
          <div className="loader">
            <BiLoaderCircle className="loader_main" size={100} />
          </div>
        )}
        <div className="default_page_navline">
          <img className="logo_image-nav" src={logo} alt="logo" />
        </div>
        <div className="default_page_outlet_add">
          <div className="add_new_head">My Profile</div>
          <div className="profile_view">
            <div className="profile_childs">
              <p className="profile_childs_ll">Name</p>
              <p className="profile_childs_rr">
                {!loading && profileData[0].name}
              </p>
            </div>
            <div className="profile_childs">
              <p className="profile_childs_ll">Email</p>
              <p className="profile_childs_rr">
                {!loading && profileData[0].email}
              </p>
            </div>
            <div className="profile_childs">
              <p className="profile_childs_ll">Date of Birth</p>
              <p className="profile_childs_rr">
                {!loading && profileData[0].dob}
              </p>
            </div>
            <div className="profile_childs">
              <p className="profile_childs_ll">Current Notes</p>
              <p className="profile_childs_rr">
                {Location.state.notesCount} Notes
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
