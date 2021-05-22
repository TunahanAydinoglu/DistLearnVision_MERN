import { useState, useEffect } from "react";
import "./lessons.scss";
import * as Icons from "../icons/index";
import LessonCart from "./LessonCart";
import { getAllAsArrayAxios } from "../../helpers/axiosHelpers";

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState("1");

  let url = "http://localhost:5000/api/lessons";
  const categoryId = window.location.href.split("dersler/")[1];
  useEffect(() => {
    categoryId === undefined ? getLessons(url) : changeCategory(categoryId);
    getCategories();
  }, [url, categoryId]);

  const changeCategory = async (selected) => {
    setActive(selected);
    let categoryUrl = "http://localhost:5000/api/lessons/category/";
    selected === "1"
      ? (categoryUrl = url)
      : (categoryUrl = categoryUrl + selected);
    const data = await getAllAsArrayAxios(categoryUrl);
    setLessons(data);
  };

  const searchHandle = async (e) => {
    e.preventDefault();
    let searchUrl = url + "?search=" + e.target.value;
    const data = await getAllAsArrayAxios(searchUrl);
    setLessons(data);
    setActive("1");
  };
  
  const getLessons = async (url) => {
    const data = await getAllAsArrayAxios(url);
    setLessons(data);
  };

  const getCategories = async () => {
    let categoryUrl = "http://localhost:5000/api/categories";
    const data = await getAllAsArrayAxios(categoryUrl);
    setCategories(data);
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
};

export default Lessons;
