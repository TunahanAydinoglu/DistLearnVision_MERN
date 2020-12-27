import Axios from "axios";
import React, { useEffect, useState } from "react";
import { getCookie } from "../../../helpers/auth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./editEpisode.scss";

function EditEpisode(props) {
  const [episodes, setEpisodes] = useState([]);
  const lesson = props.lesson;
  const url = "http://localhost:5000/api/lessons/" + lesson + "/episodes/";
  const token = getCookie("token");
  const MySwal = withReactContent(Swal);
  const [display, setDisplay] = useState("none");

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    let arr = [];
    Axios.get(url)
      .then((res) => res.data.data)
      .then((data) => data.map((e) => arr.push(e)))
      .then(() => setEpisodes(arr));
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

    MySwal.fire({
      title: "Değişiklikleri kaydetmek istiyor musunuz?",
      showDenyButton: true,
      confirmButtonText: `Kaydet`,
      denyButtonText: `Kaydetme`,
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.put(putUrl, item, {
          headers: {
            Authorization: token,
          },
        })
          .then(() => Swal.fire("Kaydedildi!", "", "success"))
          .then(() => getItems)
          .catch(errorPop);
      } else if (result.isDenied) {
        Swal.fire("Değişiklikler kayıt edilmedi.", "", "info");
      }
    });
  };

  const deleteItemHandler = (e, id) => {
    e.preventDefault();
    let deleteUrl = url + id + "/delete";
    Swal.fire({
      title: "Emin misin?",
      text: "Bunu geri alamayacaksın!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "İptal",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet, Sil!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(deleteUrl, {
          headers: {
            Authorization: token,
          },
        })
          .then(() => getItems())
          .then(() =>
            Swal.fire("Silindi!", "BÖlüm başarıyla silindi.", "success")
          )
          .catch(errorPop);
      }
    });
  };
  const addLessonHandler = (e) => {
    e.preventDefault();
    let item = {
      ranking: e.target[0].value,
      title: e.target[1].value,
      url: e.target[2].value,
    };
    console.log(item)
    Axios.post(url, item, {
      headers: {
        Authorization: token,
      },
    })
      .then(() => getItems())
      .then(() =>
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Yeni bölüm eklendi",
          showConfirmButton: false,
          timer: 800,
        })
      )
      .then(() => setDisplay("none"))
      .catch(() => errorPop());
  };
  const errorPop = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Bir şeyler yanlış gitmiş olmalı kayıt eklenemedi.",
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
