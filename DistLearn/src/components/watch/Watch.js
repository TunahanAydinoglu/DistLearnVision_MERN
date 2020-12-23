import Iframe from "react-iframe";
import { useEffect, useState } from "react";
import Axios from 'axios'

import "./watch.scss";

function Watch() {

const [episodes, setEpisodes] = useState([])
const [video, setVideo] = useState("")

  useEffect(() => {
   let id = window.location.search.split("=")[1];
   let arr=[];
    let url = "http://localhost:5000/api/lessons/"+id+"/episodes";
    let urlLesson = "http://localhost:5000/api/lessons/"+id;
   Axios.get(urlLesson).then(res=>res.data.data).then(data=>setVideo(data.url))

   Axios.get(url).then(res => res.data.data).then(data => data.map(c => arr.push(c))).then(()=>setEpisodes(arr))
  }, []);

  return (
    <div className="watch">
      <div className="left">
        <div className="video">
          <Iframe
            url={video}
            width="100%"
            height="100%"
            id="myId"
            className="myClassname"
            display="initial"
            allow="fullscreen"
            position="relative"
          />
        </div>
        <div className="questions"></div>
      </div>
      <div className="right">
        <div className="flex-wrapper">
          <h2>Ders İçerikleri</h2>
          <div className="episodes">
            <ul>
              {
                episodes.map((episode,i) => (
                  <li key={episode._id} onClick={()=>setVideo(episode.url)} className={video===episode.url && "active"}>
                    <h5>{i+1}. Bölüm</h5>
                    <span>{episode.title}</span>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Watch;
