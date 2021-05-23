import React, { useEffect, useState } from "react";
import "./addLesson.scss";
import {
  getAllAsArrayAxios,
  postAxiosWithAlertPop,
} from "../../../helpers/axiosHelpers";
import { BASE_URL } from "../../../constant";

const AddLesson = () => {
  const [categories, setCategories] = useState([]);
  const url = BASE_URL + "api/lessons/add";

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    let categoriesUrl = BASE_URL + "api/categories";
    const data = await getAllAsArrayAxios(categoriesUrl);
    setCategories(data);
  };

  const submithandler = async (e) => {
    e.preventDefault();
    let item = await {
      title: e.target[0].value,
      content: e.target[1].value,
      image: e.target[2].value,
      url: e.target[3].value,
      instructor: e.target[4].value,
      category: e.target[5].value,
    };
    postAxiosWithAlertPop(
      url,
      item,
      "Ders ekleme başarılı",
      "Bir şeyler yanlış gitmiş olmalı kayıt eklenemedi."
    ).then(() => {
      e.target[0].value = "";
      e.target[1].value = "";
      e.target[2].value = "";
      e.target[3].value = "";
      e.target[4].value = "";
      e.target[5].value = "";
    });
  };

  return (
    <div className="add-lesson">
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
            />
          </div>
          <div className="form-item">
            <label htmlFor="category">Kategori</label>
            <select name="category" id="category">
              {categories.map((category) => (
                <option value={category._id}>{category.title}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="submit-section">
          <button type="submit">Dersi Ekle</button>
        </div>
      </form>
    </div>
  );
};

export default AddLesson;
