import React, { useEffect } from "react";
import { useState } from "react";
import "../../Assets/css/global.css";
import axios from "../../Services/axios";
import { defaultPage } from "../../Services/AxiosServices/HttpRequests";
import NotesCard from "../../Components/notesCard";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/img/secret.png";
import { BiLoaderCircle } from "react-icons/bi";

const DefaultPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const addHandler = () => {
    navigate("/add-note");
  };
  const profilePage = () => {
    navigate("/profile", { state: { notesCount: data.length } });
  };
  const logoutHandler = () => {
    localStorage.removeItem("loginToken");
    window.location.reload();
  };
  const defaultCall = async () => {};
  useEffect(() => {
    const usertoken = localStorage.getItem("loginToken");
    setLoading(true);
    defaultPage()
      .then((res: any) => {
        setLoading(false);
        const results = res.data;
        // console.log(results.data);
        setData(results.data);
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
          <div className="Profile_button" onClick={profilePage}>
            My Profile
          </div>
          <div className="Profile_button" onClick={logoutHandler}>
            Logout
          </div>
        </div>
        <div className="default_page_outlet">
          {/* <div className="default_page_outlet_one">Add New Note</div> */}
          <button className="button add" onClick={addHandler}>
            Add New Note
          </button>
          <div className="default_page_outlet_two">
            {!loading &&
              data.map((e: any, index) => {
                return (
                  <NotesCard
                    key={index}
                    title={e.title}
                    description={e.description}
                    Time={e.Date}
                    id={e._id}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultPage;
