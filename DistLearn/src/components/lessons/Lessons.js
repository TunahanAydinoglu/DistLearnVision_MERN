import { useState, useEffect } from "react";
import "./lessons.scss";
import * as Icons from "../icons/index";
import LessonCart from "./LessonCart";
import Axios from "axios";

function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState("1");

  let url = "http://localhost:5000/api/lessons";

  const changeCategory = (selected) => {
    setActive(selected);
    let catUrl = "http://localhost:5000/api/lessons/category/";
    if (selected === "1") {
      catUrl = url;
    } else {
      catUrl = catUrl + selected;
    }
    let arr = [];
    Axios.get(catUrl)
      .then((res) => res.data.data)
      .then((data) => data.map((a) => arr.push(a)))
      .then(() => setLessons(arr));
  };

  const searchHandle = (e) => {
    e.preventDefault();
    let arr = [];
    let search = "";
    if (e.target.value === "") {
      getLessons();
    } else {
      search = url + "?search=" + e.target.value;
      Axios.get(search)
      .then((res) => res.data.data)
      .then((data) => data.map((a) => arr.push(a)))
      .then(() => setLessons(arr));
    }
    
  };
  useEffect(() => {
    getLessons();
    getCategories();
  }, []);

  const getLessons = () => {
    let arr = [];
    Axios.get(url)
      .then((res) => res.data.data)
      .then((data) => data.map((a) => arr.push(a)))
      .then(() => setLessons(arr));
  };
  const getCategories = () => {
    let categoryUrl = "http://localhost:5000/api/categories";
    let cat = [];
    Axios.get(categoryUrl)
      .then((res) => res.data.data)
      .then((data) => data.map((c) => cat.push(c)))
      .then(() => setCategories(cat));
  };
  return (
    <div className="lessons">
      <div className="wrapper">
        <div className="lessons-carts">
          {lessons.map((lesson, i) => (
            <LessonCart key={i} lesson={lesson} />
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
                <li
                  className={active === "1" ? "active" : null}
                  onClick={() => changeCategory("1")}
                >
                  Tüm Categoriler
                </li>
                {categories.map((c, i) => (
                  <li
                    key={i}
                    className={active === c._id ? "active" : null}
                    onClick={() => changeCategory(c._id)}
                  >
                    {c.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Lessons;
