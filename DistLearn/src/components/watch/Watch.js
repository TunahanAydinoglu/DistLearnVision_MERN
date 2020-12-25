import Iframe from "react-iframe";
import { useEffect, useState } from "react";
import * as Icons from "../icons/index";
import Axios from "axios";

import "./watch.scss";
import QuestionCard from "./QuestionCard";

function Watch() {
  const [episodes, setEpisodes] = useState([]);
  const [video, setVideo] = useState("");

  useEffect(() => {
    let id = window.location.search.split("=")[1];
    let arr = [];
    let url = "http://localhost:5000/api/lessons/" + id + "/episodes";
    let urlLesson = "http://localhost:5000/api/lessons/" + id;
    Axios.get(urlLesson)
      .then((res) => res.data.data)
      .then((data) => setVideo(data.url));

    Axios.get(url)
      .then((res) => res.data.data)
      .then((data) => data.map((c) => arr.push(c)))
      .then(() => setEpisodes(arr));
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
        <div className="questions-wrapper">
          <div className="wrapper-header">
            <ul>
              <li>Sorular & Cevaplar</li>
              <li>Yorumlar</li>
            </ul>
          </div>
          <div className="question-content-wrapper">
            <div className="question-search">
              <input placeholder="Sorularda ara..." />
              <span>
                <Icons.SearchFa />{" "}
              </span>
            </div>
            <div className="questions">
              <div className="questions-header">
                <span>Bu derste 123 soru mevcuttur</span>
                <a href="/">Yeni bir soru ekle</a>
              </div>
              <div className="cards-wrapper">
                <QuestionCard />
                <QuestionCard />
              </div>
            </div>
          </div>
        </div>
      </div>
      <aside className="right">
        <div className="flex-wrapper">
          <h2>Ders İçerikleri</h2>
          <div className="episodes">
            <ul>
              {episodes.map((episode, i) => (
                <li
                  key={episode._id}
                  onClick={() => setVideo(episode.url)}
                  className={video === episode.url?"active":null}
                >
                  <h5>{i + 1}. Bölüm</h5>
                  <span>{episode.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Watch;
