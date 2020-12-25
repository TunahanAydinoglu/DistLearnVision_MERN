import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./instructorPage.scss";

function InstructorPage(props) {
  const [categories, setCategories] = useState([]);
  const [lessons, setLessons] = useState([]);
  useEffect(() => {
    let arr = [];
    const user = props.user;
    // let catUrl = "http://localhost:5000/api/categories";
    // Axios.get(catUrl)
    //   .then((res) => res.data.data)
    //   .then((data) => console.log(data));

    let lessonsUrl = "http://localhost:5000/api/lessons/user/" + user._id;
    Axios.get(lessonsUrl)
      .then((res) => res.data.data)
      .then((data) => data.map((lesson) => arr.push(lesson)))
      .then(() => setLessons(arr));
  }, []);
  return (
    <div className="instructor-page">
      <div className="header-wrapper-div">
        <h2>Eğitmen Paneli</h2>
        <h4>
          Düzenlemek istediğiniz alanlara tıklayarak düzenlemelerinizi
          yapabilirsiniz
        </h4>
      </div>
      <div className="update-form">
        <table>
          <tr className="thead-tr">
            <th>Ders title</th>
            <th>Ders Detaylar</th>
            <th>Ders bolumler</th>
            <th>Ders category</th>
          </tr>
          {lessons.map((lesson, i) => (
            <tr key={i}>
              <td>{lesson.title}</td>
              <td>Detaylari Duzenle</td>
              <td>Bolumleri Duzenle</td>
              <td>{lesson.category}</td>
            </tr>
          ))}
        </table>
        {/* <ul>
          <li></li>
        </ul> */}
      </div>
    </div>
  );
}

export default InstructorPage;
