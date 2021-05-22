import Axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { errorPop, infoPop, successPop } from "./alertHelpers";
import { getCookie } from "./auth";

const token = getCookie("token");

const getAuthProfileAxios = async () => {
  let getProfileUrl = "http://localhost:5000/api/auth/user";
  const data = await Axios.get(getProfileUrl, {
    headers: {
      Authorization: token,
    },
  }).then((res) => res.data.data);
  return data;
};

export const getAxiosWithToken = async (url) => {
  const response = await Axios.get(url, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

const getAllAsArrayAxios = async (url) => {
  let arr = [];
  await Axios.get(url)
    .then((res) => res.data.data)
    .then((data) => data.map((a) => arr.push(a)));
  return arr;
};
const getSingleAxios = async (url) => {
  const data = await Axios.get(url).then((res) => res.data.data);
  return data;
};
const postAxiosWithAlertPop = async (
  url,
  item,
  successMessage,
  errorMessage
) => {
  await Axios.post(url, item, {
    headers: {
      Authorization: token,
    },
  })
    .then(() => successPop(successMessage))
    .catch(() => errorPop(errorMessage));
};

const deleteAxiosWithConfirmPop = async (
  deleteUrl,
  successMessage,
  errorMessage
) => {
  const result = await Swal.fire({
    title: "Emin misin?",
    text: "Bunu geri alamayız!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Evet, sil!",
    cancelButtonText: "İptal",
  });
  if (result.isConfirmed) {
    const response = await Axios.delete(deleteUrl, {
      headers: {
        Authorization: token,
      },
    });
    if (response.data.success) {
      successPop(successMessage);
      return true;
    } else {
      errorPop(errorMessage);
      return false;
    }
  }
  return false;
};
const putAxiosWithConfirmPop = (url, item) => {
  Swal.fire({
    title: "Değişiklikleri kaydetmek istiyor musunuz?",
    showDenyButton: true,
    confirmButtonText: `Güncelle`,
    denyButtonText: `İptal Et`,
  }).then((result) => {
    if (result.isConfirmed) {
      Axios.put(url, item, {
        headers: {
          Authorization: token,
        },
      })
        .then(() => successPop("Güncellendi!"))
        .catch(() =>
          errorPop("Bir şeyler yanlış gitmiş olmalı güncelleme başarısız.")
        );
    } else if (result.isDenied) {
      infoPop("Değişiklikler kayıt edilmedi.");
    }
  });
};

const getLikeOrUndoLikeWithToast = async (
  itemUrl,
  successMessage,
  warningMessage
) => {
  let config = {
    headers: {
      Authorization: token,
    },
  };
  let rate = 0;
  await Axios.get(itemUrl + "/like", config)
    .then(() => {
      toast.success(successMessage, {
        position: "bottom-right",
        autoClose: 3000,
      });
      rate = 1;
    })
    .catch(() => {
      undoLike(itemUrl, config, warningMessage);
      rate = -1;
    });
  return rate;
};
const undoLike = (itemUrl, config, warningMessage) => {
  Axios.get(itemUrl + "/undo_like", config).then(() => {
    toast.warn(warningMessage, {
      position: "bottom-right",
      autoClose: 3000,
    });
  });
};
const getDislikeOrUndoDislikeWithToast = async (
  itemUrl,
  successMessage,
  warningMessage
) => {
  let config = {
    headers: {
      Authorization: token,
    },
  };
  let rate = 0;
  await Axios.get(itemUrl + "/dislike", config)
    .then(() => {
      rate = 1;
      toast.warn(successMessage, {
        position: "bottom-right",
        autoClose: 3000,
      });
    })
    .catch(() => {
      undoDislike(itemUrl, config, warningMessage);
      rate = -1;
    });
  return rate;
};
const undoDislike = (itemUrl, config, warningMessage) => {
  Axios.get(itemUrl + "/undo_dislike", config).then(() => {
    toast.warn(warningMessage, {
      position: "bottom-right",
      autoClose: 3000,
    });
  });
};

export {
  getAllAsArrayAxios,
  postAxiosWithAlertPop,
  putAxiosWithConfirmPop,
  deleteAxiosWithConfirmPop,
  getAuthProfileAxios,
  getSingleAxios,
  getLikeOrUndoLikeWithToast,
  getDislikeOrUndoDislikeWithToast,
};
