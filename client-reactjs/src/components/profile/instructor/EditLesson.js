import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./editLesson.scss";
import { getAllAsArrayAxios,putAxiosWithConfirmPop } from "../../../helpers/axiosHelpers";

const EditLesson = (props) => {
  const lessonId = props.lesson;
  const [lesson, setLesson] = useState([]);
  const [categories, setCategories] = useState([]);
  const url = "http://localhost:5000/api/lessons/" + lessonId;

  useEffect(() => {
    getLessonById(url);
    getCategories();
  }, [url]);
  const getLessonById = (url) => {
    Axios.get(url)
      .then((res) => res.data.data)
      .then((data) => setLesson(data));
  };
  const getCategories = async () => {
    let categoryUrl = "http://localhost:5000/api/categories";
    const data = await getAllAsArrayAxios(categoryUrl);
    setCategories(data);
  };

  const submithandler = (e) => {
    e.preventDefault();
    let putLessonUrl = url + "/edit";
    let item = {
      title: e.target[0].value,
      content: e.target[1].value,
      image: e.target[2].value,
      url: e.target[3].value,
      instructor: e.target[4].value,
      category: e.target[5].value,
    };
    putAxiosWithConfirmPop(putLessonUrl,item)
  };

  return (
    <div className="edit-lesson">
      <form className="update-form" onSubmit={submithandler}>
        <div className="items">
          <div className="form-item">
            <label htmlFor="tıtle">Ders Başlığı</label>
            <input
              name="tıtle"
              id="tıtle"
              type="text"
              required
              placeholder="Ders başlığı"
              defaultValue={lesson.title}
            />
          </div>
          <div className="form-item">
            <label htmlFor="content">Ders İçeriği</label>
            <input
              name="content"
              id="content"
              type="text"
              required
              placeholder="Ders içeriği"
              defaultValue={lesson.content}
            />
          </div>
          <div className="form-item">
            <label htmlFor="image">Ders Fotoğrafı Adresi (Url)</label>
            <input
              name="image"
              id="image"
              type="text"
              required
              placeholder="Örnek: https://i.hizliresim.com/fwUVRb.jpg"
              defaultValue={lesson.image}
            />
          </div>
          <div className="form-item">
            <label htmlFor="url">Giriş Videosu Adresi (Url)</label>
            <input
              name="url"
              id="url"
              type="text"
              required
              placeholder="Örnek: https://youtube.com/embed/videoId"
              defaultValue={lesson.url}
            />
          </div>
          <div className="form-item">
            <label htmlFor="instructor">Eğitmen Adı</label>
            <input
              name="instructor"
              id="instructor"
              type="text"
              required
              placeholder="Örnek: Tunahan Aydınoğlu"
              defaultValue={lesson.instructor}
            />
          </div>
          <div className="form-item">
            <label htmlFor="category">Kategori</label>
            <select name="category" id="category">
              {categories.map((category) => (
                <option
                  key={category._id}
                  defaultValue={category._id}
                  selected={category._id === lesson.category ? true : false}
                  value={category._id}
                >
                  {category.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="submit-section">
          <button type="submit">Kaydet</button>
        </div>
      </form>
    </div>
  );
};

export default EditLesson;
