//importation de React
import React, { useEffect, useState } from "react";
//importation des image de cloudinary
import { Image } from "cloudinary-react";
//importation du package "Axios"
import Axios from "axios";
//importation du CSS
import "./Profile.css";


  function Profile() {
//création des hooks "usestate"
    const [yourUploads, setYourUploads] = useState([]);

//appel du localStorage
useEffect(() => {
    Axios.get(
      `http://localhost:3001/api/upload/byUser/${localStorage.getItem("username")}`
    ).then((response) => {
      setYourUploads(response.data);
    });
  });

//définition du Profile
  return (
  <div className="Profile">
    {/*insertion du nom de l'utilisateur*/}
        <h1>{localStorage.getItem("username")}</h1>
        {yourUploads.map((val, key) => {
          return (
            <div className="Post">
                {/*insertion image de Cloudinary*/}
              <div className="Image">
                <Image cloudName="dmzcffyi1" publicId={val.image} />
              </div>
    {/*mise en forme du Profile*/}
              <div className="Content">
    {/*avec le titre du post*/}
                <div className="title">
                  {" "}
    {/*avec l'auteur du post*/}
                  {val.title} / by @{val.author}
                </div>
    {/* et avec la description*/}
                <div className="description">{val.description}</div>
              </div>
    {/*mise en place du Like*/}
              <div className="Engagement">{val.likes}</div>
            </div>
          );
        })}
  </div>
);
}

//export du Profile
export default Profile;
