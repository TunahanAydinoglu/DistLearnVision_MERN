import { useState, useEffect } from "react";
import "./lessons.scss";
import * as Icons from "../icons/index";
import LessonCart from "./LessonCart";
import Axios from "axios";

function Lessons() {
  const [lessons, setLessons] = useState([]);
  let url = "http://localhost:5000/api/lessons";

  const searchHandle = (e) => {
    e.preventDefault();
    let arr = [];
    let search = url + "?search=" + e.target.value;
    Axios.get(search)
      .then((res) => res.data.data)
      .then((data) => data.map((a) => arr.push(a)))
      .then(() => setLessons(arr));
  };
  useEffect(() => {
    let arr = [];
    Axios.get(url)
      .then((res) => res.data.data)
      .then((data) => data.map((a) => arr.push(a)))
      .then(() => setLessons(arr));
  }, []);
  return (
    <div className="lessons">
      <div className="wrapper">
        <div className="lessons-carts">
          {lessons.map((lesson) => (
            <LessonCart lesson={lesson} />
          ))}
        </div>
        <aside>
          <div className="aside">
            <div className="search">
              <h2>Ders Ara</h2>
              <div className="input-wrapper">
                <input
                  placeholder="Ders Ara"
                  name="search-input"
                  id="search-input"
                  type="text"
                  onChange={searchHandle}
                />
                <label htmlFor="search-input">
                  <Icons.Search />
                </label>
              </div>
            </div>
            <div className="categories">
              <h2>Kategoriler</h2>
              <ul>
                <li>Tasarim</li>
                <li>Web Gelistirme</li>
                <li>Tasarim</li>
                <li>Finans</li>
                <li>Tasarim</li>
                <li>Tasarim</li>
                <li>Tasarim</li>
                <li>Tasarim</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Lessons;
