//importation de React
import React, { useEffect, useState } from 'react';
//importation du CSS
import "./Home.css";
//importation des images de Cloudinary
import { Image } from "cloudinary-react";
//importation du package "Axios"
import Axios from "Axios";
//importation de l'icon de material-ui
import ThumUpAltIcon from "@material-ui/icons/ThumUpAltIcon";



function Home() {
//définition des hooks "State"
const [uploads, setUploads] = useState([]);

//vérification si l'utilisateur est loguer avec localStorage
useEffect(() => {
  if (localStorage.getItem("loggedIn")) {
    localStorage.setItem("loggedIn", false);
  }
}, []);

//connection au backend
useEffect(() => {
  Axios.get("http://localhost:3001/upload").then((response) => {
    setUploads(response.data);
  });
}, []);

//création des Likes
const likePost = (id, key) => {
    var tempLikes = uploads;
    tempLikes[key].likes = tempLikes[key].likes + 1;

//association des like en fonction de l'utilisateur
Axios.post("http://localhost:3001/upload/like", {
  userLiking: localStorage.getItem("username"),
  postId: id,
}).then((response) => {
  setUploads(tempLikes);
});
};

//définition de Home
return (
  <div className="Home">
    {uploads.map((val, key) => {
      return (
{/* insertion image de Cloudinary */}
<div className="Post">
<div className="Image">
  <Image cloudName="dmzcffyi1" publicId={val.image} />
</div>
{/*mise en forme du Post*/}
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
{/*mise en place du Like et de son icon*/}
         <div className="Engagement">
           <ThumbUpAltIcon
             id="likeButton"
             onClick={() => {
               likePost(val.id, key);
             }}
           />
           {val.likes}
         </div>
       </div>
     );
   })}
 </div>
 );
}


//export de Home
export default Home;
