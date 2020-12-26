import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./instructorPage.scss";

import { FiSettings } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Popup from "../../toolbox/Popup";
import EditLesson from "./EditLesson";
import EditEpisode from "./EditEpisode";

function InstructorPage(props) {
  const [categories, setCategories] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [isOpenLessonModal, setIsOpenLessonModal] = useState(false);
  const [isOpenEpisodeModal, setIsOpenEpisodeModal] = useState(false);
  const MySwal = withReactContent(Swal);

  const togglePopupLesson = (e) => {
    e.preventDefault();
    setIsOpenLessonModal(!isOpenLessonModal);
  };
  const togglePopupEpisode = (e) => {
    e.preventDefault();
    setIsOpenEpisodeModal(!isOpenEpisodeModal);
  };
  const alertMethod = () => {
    MySwal.fire({
      title: "Emin misin?",
      text: "Bunu geri alamayız!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Evet, sil!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Silindi!", "Ders tamamen kaldırıldı.", "success");
      }
    });
  };

  useEffect(() => {
    let arr = [];
    let cat = [];
    const user = props.user;
    let catUrl = "http://localhost:5000/api/categories";
    Axios.get(catUrl)
      .then((res) => res.data.data)
      .then((data) => data.map((d) => cat.push(d)))
      .then(() => setCategories(cat));

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
        <div className="table">
          <div className="thead-tr">
            <div td className="th">
              Ders Başlık
            </div>
            <div td className="th">
              Kategori
            </div>
            <div className="th">Ayarlar</div>
          </div>
          {lessons.map((lesson, i) => (
            <div className="tr-tr" key={i}>
              <div className="td-title td">{lesson.title}</div>
              <div className="td-category td">
                {categories.map((category) =>
                  category._id === lesson.category ? category.title : null
                )}
              </div>
              <div className="td-setting td">
                <div className="dropdown">
                  <span>
                    <FiSettings />
                  </span>
                  <div className="dropdown-content">
                    <ul>
                      <li onClick={togglePopupLesson}>Ders Düzenle</li>
                      <li onClick={togglePopupEpisode}>Bölüm Düzenle</li>
                    </ul>
                  </div>
                </div>
                <span onClick={alertMethod}>
                  <RiDeleteBin5Line />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isOpenLessonModal && (
        <Popup content={<EditLesson />} handleClose={togglePopupLesson} />
      )}
      {isOpenEpisodeModal && (
        <Popup content={<EditEpisode />} handleClose={togglePopupEpisode} />
      )}
    </div>
  );
}

export default InstructorPage;
