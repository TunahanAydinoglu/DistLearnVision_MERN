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
import AddLesson from "./AddLesson";

function InstructorPage(props) {
  const [categories, setCategories] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [isOpenLessonModal, setIsOpenLessonModal] = useState(false);
  const [isOpenAddLessonModal, setIsOpenAddLessonModal] = useState(false);
  const [isOpenEpisodeModal, setIsOpenEpisodeModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState();
  const user_id = props.user._id;
  const token = getCookie("token");

  useEffect(() => {
    getCategories();
    getLessonByUserId(user_id);
  }, [user_id]);

  const togglePopupLesson = (e) => {
    e.preventDefault();
    if (isOpenLessonModal === false) {
      setIsOpenLessonModal(!isOpenLessonModal);
    } else {
      setIsOpenLessonModal(!isOpenLessonModal);
      getLessonByUserId(user_id);
    }
  };
  const togglePopupAddLesson = (e) => {
    e.preventDefault();
    if (isOpenAddLessonModal === false) {
      setIsOpenAddLessonModal(!isOpenAddLessonModal);
    } else {
      setIsOpenAddLessonModal(!isOpenAddLessonModal);
      getLessonByUserId(user_id);
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
      cancelButtonText: "İptal",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(deleteUrl, {
          headers: {
            Authorization: token,
          },
        })
          .then(() => getLessonByUserId(user_id))
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
  const getLessonByUserId = (userId) => {
    let arr = [];
    let lessonsUrl = "http://localhost:5000/api/lessons/user/" + userId;
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
            <div className="th">
              Ders Başlık
            </div>
            <div className="th">
              Kategori
            </div>
            <div className="th">
              <div className="button" onClick={togglePopupAddLesson}>
                Ders Ekle
              </div>
            </div>
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
      {isOpenAddLessonModal && (
        <Popup content={<AddLesson />} handleClose={togglePopupAddLesson} />
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
