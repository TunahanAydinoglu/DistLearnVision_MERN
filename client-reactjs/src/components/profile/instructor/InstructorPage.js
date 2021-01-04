import React, { useEffect, useState } from "react";
import "./instructorPage.scss";

import { FiSettings } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";

import Popup from "../../toolbox/Popup";
import EditLesson from "./EditLesson";
import EditEpisode from "./EditEpisode";
import AddLesson from "./AddLesson";
import {
  deleteAxiosWithConfirmPop,
  getAllAsArrayAxios,
} from "../../../helpers/axiosHelpers";

function InstructorPage(props) {
  const [categories, setCategories] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [isOpenLessonModal, setIsOpenLessonModal] = useState(false);
  const [isOpenAddLessonModal, setIsOpenAddLessonModal] = useState(false);
  const [isOpenEpisodeModal, setIsOpenEpisodeModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState();
  const user_id = props.user._id;

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
  const togglePopupEpisode = (e) => {
    e.preventDefault();
    setIsOpenEpisodeModal(!isOpenEpisodeModal);
  };

  const deleteLessonHandler = (lessonId) => {
    let deleteUrl = "http://localhost:5000/api/lessons/" + lessonId + "/delete";
    deleteAxiosWithConfirmPop(
      deleteUrl,
      "Ders tamamen kaldırıldı.",
      "Bir şeyler yanlış gitmiş olmalı kayıt eklenemedi."
    ).then(() => getLessonByUserId(user_id));
  };

  const getCategories = async () => {
    let categoryUrl = "http://localhost:5000/api/categories";
    const data = await getAllAsArrayAxios(categoryUrl);
    setCategories(data);
  };
  const getLessonByUserId = async (userId) => {
    let lessonsUrl = "http://localhost:5000/api/lessons/user/" + userId;
    const data = await getAllAsArrayAxios(lessonsUrl);
    setLessons(data);
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
            <div className="th">Ders Başlık</div>
            <div className="th">Kategori</div>
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
