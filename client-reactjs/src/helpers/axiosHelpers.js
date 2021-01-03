import Axios from "axios";

const getAllAsArrayAxios = async (url) => {
  let arr = [];
 await Axios.get(url)
    .then((res) => res.data.data)
    .then((data) => data.map((a) => arr.push(a)));
    return arr;
};

// const getLessons = (url) => {
//   let arr = [];
//   Axios.get(url)
//     .then((res) => res.data.data)
//     .then((data) => data.map((a) => arr.push(a)))
//     .then(() => setLessons(arr));
// };

export {getAllAsArrayAxios};