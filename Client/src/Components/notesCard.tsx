import React, { useState } from "react";
import INotesCard from "../Services/DataTypes/INotescard";
import ok from "../Assets/svg/ok";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Navigate, useNavigate } from "react-router-dom";
import { deleteNote } from "../Services/AxiosServices/HttpRequests";
import { BiLoaderCircle } from "react-icons/bi";

function NotesCard({ title, description, Time, email, id }: INotesCard) {
  const [loading, setLoading] = useState(false);
  // console.log(id + " -- > " + Time);
  const navigate = useNavigate();
  let nd = new Date(Time);

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
  var date =
    nd.getDate() + " " + monthName[nd.getMonth()] + " " + nd.getFullYear();
  var time = nd.getHours() + ":" + nd.getMinutes() + ":" + nd.getSeconds();

  const handleEdit = (id: string) => {
    return navigate("/add-note", {
      state: { title: title, description: description, id: id },
    });
  };
  const handleDelete = async (id: string) => {
    setLoading(true);
    await deleteNote(id)
      .then((res: any) => {
        setLoading(false);
        window.location.reload();
      })
      .catch((err: any) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="notes_card_container">
      {loading && (
        <div className="loader">
          <BiLoaderCircle className="loader_main" size={100} />
        </div>
      )}
      <div className="notes_card_container_action">
        <h1 style={{ fontSize: "1.15rem" }}>{title}</h1>
        <div className="notes_card_container_button">
          <AiFillEdit
            size={25}
            color="blue"
            className="align_center"
            onClick={() => handleEdit(id)}
          />
          <AiFillDelete
            size={25}
            color="red"
            className="align_center"
            onClick={() => handleDelete(id)}
          />
        </div>
      </div>
      <div className="notes_card_container_para">
        <p style={{ fontSize: "0.875rem" }}>{description}</p>
      </div>
      <div className="notes_card_container_date">
        <h2>{date}</h2>
        <h2>{time}</h2>
      </div>
    </div>
  );
}

export default NotesCard;
