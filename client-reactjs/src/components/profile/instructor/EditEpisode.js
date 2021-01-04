import React, { useEffect, useState } from "react";
import "./editEpisode.scss";
import {
  getAllAsArrayAxios,
  postAxiosWithAlertPop,
  deleteAxiosWithConfirmPop,
  putAxiosWithConfirmPop,
} from "../../../helpers/axiosHelpers";

function EditEpisode(props) {
  const [episodes, setEpisodes] = useState([]);
  const lesson = props.lesson;
  const url = "http://localhost:5000/api/lessons/" + lesson + "/episodes/";
  const [display, setDisplay] = useState("none");

  useEffect(() => {
    getItems(url);
  }, [url]);

  const getItems = async (url) => {
    const data = await getAllAsArrayAxios(url);
    setEpisodes(data);
  };

  const addFormHandle = () => {
    display === "none" ? setDisplay("flex") : setDisplay("none");
  };

  const updateSubmitHandler = (e, id) => {
    e.preventDefault();
    let putUrl = url + id + "/edit";
    let item = {
      ranking: e.target[0].value,
      title: e.target[1].value,
      url: e.target[2].value,
    };
    putAxiosWithConfirmPop(putUrl, item);
  };

  const deleteItemHandler = (e, id) => {
    e.preventDefault();
    let deleteUrl = url + id + "/delete";
    deleteAxiosWithConfirmPop(
      deleteUrl,
      "Bölüm başarıyla silindi.",
      "Bir şeyler yanlış gitmiş olmalı ders sılınemedı."
    ).then(() => getItems(url));
  };
  const addLessonHandler = (e) => {
    e.preventDefault();
    let item = {
      ranking: e.target[0].value,
      title: e.target[1].value,
      url: e.target[2].value,
    };
    postAxiosWithAlertPop(
      url,
      item,
      "Yeni bölüm eklendi",
      "Bir şeyler yanlış gitmiş olmalı kayıt eklenemedi."
    )
      .then(() => getItems(url))
      .then(() => {
        setDisplay("none");
        e.target[0].value = "";
        e.target[1].value = "";
        e.target[2].value = "";
      });
  };

  return (
    <div className="edit-episodes">
      <div className="table">
        <div className="thead">
          <div className="tr">
            <div className="th th-ranking">Sıra</div>
            <div className="th th-title">Bölüm Başlığı</div>
            <div className="th th-url">Video Url</div>
            <div className="th th-setting" onClick={addFormHandle}>
              Bölüm Ekle
            </div>
          </div>
        </div>
        <div className="tbody">
          <form
            className="tr tr-add"
            onSubmit={addLessonHandler}
            style={{ display }}
          >
            <div className="td td-ranking">
              <input name="ranking" placeholder="#" required />
            </div>
            <div className="td td-title">
              <input
                name="title"
                placeholder="Ders başığı giriniz.."
                required
              />
            </div>
            <div className="td td-url">
              <input
                name="url"
                placeholder="Ders video adresini giriniz.."
                required
              />
            </div>
            <div className="td td-setting">
              <button type="submit" className="add-button">
                Ekle
              </button>
            </div>
          </form>
          {episodes.map((episode, i) => (
            <form
              key={episode._id}
              onSubmit={(e) => updateSubmitHandler(e, episode._id)}
            >
              <div className={i % 2 === 0 ? "tr" : "tr tr-even"}>
                <div className="td td-ranking">
                  <input
                    name="ranking"
                    defaultValue={episode.ranking}
                    required
                  />
                </div>
                <div className="td td-title">
                  <input name="title" defaultValue={episode.title} required />
                </div>
                <div className="td td-url">
                  <input name="url" defaultValue={episode.url} required />
                </div>
                <div className="td td-setting">
                  <button type="submit">Güncelle</button>
                  <button
                    type="button"
                    onClick={(e) => deleteItemHandler(e, episode._id)}
                  >
                    Sil
                  </button>
                </div>
              </div>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EditEpisode;
