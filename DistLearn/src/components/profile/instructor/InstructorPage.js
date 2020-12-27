import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./instructorPage.scss";

import { FiSettings } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from "sweetalert2";

import Popup from "../../toolbox/Popup";
import EditLesson from "./EditLesson";
import EditEpisode from "./EditEpisode";
import { getCookie } from "../../../helpers/auth";

function InstructorPage(props) {
  const [categories, setCategories] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [isOpenLessonModal, setIsOpenLessonModal] = useState(false);
  const [isOpenEpisodeModal, setIsOpenEpisodeModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState();
  const token = getCookie("token");

  useEffect(() => {
    getCategories();
    getLessonByUserId();
  }, []);

  const togglePopupLesson = (e) => {
    e.preventDefault();
    if (isOpenLessonModal === false) {
      setIsOpenLessonModal(!isOpenLessonModal);
    } else {
      setIsOpenLessonModal(!isOpenLessonModal);
      getLessonByUserId();
    }
  };
  const togglePopupEpisode = (e, id) => {
    e.preventDefault();
    setIsOpenEpisodeModal(!isOpenEpisodeModal);
  };

  const deleteLessonHandler = (lessonId) => {
    let deleteUrl = "http://localhost:5000/api/lessons/" + lessonId + "/delete";
    Swal.fire({
      title: "Dersi silmek istediğine emin misin?",
      text: "Bunu geri alamayız!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Evet, sil!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(deleteUrl, {
          headers: {
            Authorization: token,
          },
        })
          .then(() => getLessonByUserId())
          .then(() =>
            Swal.fire("Silindi!", "Ders tamamen kaldırıldı.", "success")
          )
          .catch(() => errorPop);
      }
    });
  };
  const errorPop = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Bir şeyler yanlış gitmiş olmalı kayıt eklenemedi.",
    });
  };

  const getCategories = () => {
    let cat = [];
    let catUrl = "http://localhost:5000/api/categories";
    Axios.get(catUrl)
      .then((res) => res.data.data)
      .then((data) => data.map((d) => cat.push(d)))
      .then(() => setCategories(cat));
  };
  const getLessonByUserId = () => {
    let arr = [];
    const user = props.user;
    let lessonsUrl = "http://localhost:5000/api/lessons/user/" + user._id;
    Axios.get(lessonsUrl)
      .then((res) => res.data.data)
      .then((data) => data.map((lesson) => arr.push(lesson)))
      .then(() => setLessons(arr));
  };
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
                      <li
                        onClick={(e) => {
                          togglePopupLesson(e);
                          setSelectedLesson(lesson._id);
                        }}
                      >
                        Ders Düzenle
                      </li>
                      <li
                        onClick={(e) => {
                          togglePopupEpisode(e);
                          setSelectedLesson(lesson._id);
                        }}
                      >
                        Bölüm Düzenle
                      </li>
                    </ul>
                  </div>
                </div>
                <span
                  onClick={() => {
                    deleteLessonHandler(lesson._id);
                  }}
                >
                  <RiDeleteBin5Line />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isOpenLessonModal && (
        <Popup
          content={<EditLesson lesson={selectedLesson} />}
          handleClose={togglePopupLesson}
        />
      )}
      {isOpenEpisodeModal && (
        <Popup
          content={<EditEpisode lesson={selectedLesson} />}
          handleClose={togglePopupEpisode}
        />
      )}
    </div>
  );
}

export default InstructorPage;
