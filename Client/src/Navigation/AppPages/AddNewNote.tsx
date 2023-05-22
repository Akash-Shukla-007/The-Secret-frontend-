import React, { useState, useEffect } from "react";
import DynanicInput from "../../Components/DynmaicInput";
import { AddNote, editNote } from "../../Services/AxiosServices/HttpRequests";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { BiLoaderCircle } from "react-icons/bi";

function AddNewNote() {
  const [loading, setLoading] = useState(false);
  const [editState, setEditState] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleErrorText, setTitleErrorText] = useState("Max 50 words");
  const [descErrorText, setDescErrorText] = useState("Max 250 words");
  const Location = useLocation();

  const navigate = useNavigate();
  //   console.log(Location.state.description);

  useEffect(() => {
    if (Location.state) {
      setEditState(true);
      setTitle(Location.state.title);
      setDescription(Location.state.description);
    }
    // console.log(Location.state);
    // var remainingdescLen = 250 - description.length;
    // var remainingTitlecLen = 50 - title.length;
    // setDescErrorText(remainingdescLen + " words remaining");
    // setTitleErrorText(remainingTitlecLen + " words remaining");
  }, []);

  const onAdd = async () => {
    const titleValidator = (title: string) => {
      if (title == "") {
        setTitleErrorText("Title can't be Empty");
        return false;
      }
      setTitleErrorText("");
      return true;
    };
    const descValidator = (description: string) => {
      if (description == "") {
        setDescErrorText("description can't be Empty");
        return false;
      }
      setDescErrorText("");
      return true;
    };
    console.log("title -->" + title.length);
    console.log("Desc --> " + description + "--> " + description.length);
    console.log(descErrorText);

    if (!titleValidator(title) || !descValidator(description)) return;

    if (Location.state) {
      const id = Location.state.id;
      setLoading(true);
      await editNote({ id, title, description })
        .then((res: any) => {
          setLoading(false);
          navigate("/default");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoading(true);
      await AddNote({ title, description })
        .then((res: any) => {
          setLoading(false);
          const data = res.data;
          console.log(data);
          navigate("/default");
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="default_page_container">
      {loading && (
        <div className="loader">
          <BiLoaderCircle className="loader_main" size={100} />
        </div>
      )}
      <div className="default_page_navline">My Profile</div>
      <div className="default_page_outlet_add">
        <div className="add_new_head">
          {editState ? "Edit Note" : "Add Note"}
        </div>
        <DynanicInput
          placeholder="Enter Title"
          type="text"
          value={title}
          maxlength={50}
          setValue={setTitle}
          errorText={titleErrorText}
        />
        <textarea
          rows={5}
          className="input_text_area"
          maxLength={250}
          placeholder="Enter Description"
          value={description}
          onChange={(e: any | any[]) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <div className="input_error ii">{descErrorText}</div>
        {/* <DynanicInput
          placeholder="Enter Description "
          type="text"
          maxlength={200}
          value={description}
          setValue={setDescription}
          errorText={descErrorText}
        /> */}
        <button onClick={onAdd}>{editState ? "Save" : "Add"}</button>
      </div>
    </div>
  );
}

export default AddNewNote;
