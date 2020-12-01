import cookie from "js-cookie";
const fetcherGet = (url) => fetch(url).then((res) => res.json());
var resp = {};
async function getProfile() {
  let id = getCookie("id");
  let url = "http://localhost:5000/api/users/" + id;
  fetch(url)
    .then((res) => res.json())
    .then((response) => authenticate(response))
    .catch((err) => err);
}
const fetchProfile = async () => {
  var requestOptions = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: getCookie("token"),
    },
  };

  let exp = fetch("http://localhost:5000/api/auth/profile", requestOptions)
    .then((response) => {
      response.json();
    })
    .then((resp) => console.log(resp))
    .catch((error) => console.log("error", error));

  return exp;
};

async function loginPost(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // or without this line
    redirect: "follow",
    headers: {
      "content-type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then((response) => response.json())
    .then((res) => {
      authenticate(res);
    })
    .catch((err) => console.log(err));
}
async function fetcherPost(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // or without this line
    redirect: "follow",
    headers: {
      "content-type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then((response) => response.json())
    .then((res) => {
      authenticate(res);
    })
    .catch((err) => console.log(err));
}
async function fetcherPut(data = {}) {
  // Default options are marked with *
  let id = getCookie("id");
  let url = "http://localhost:5000/api/auth/edit/" + id;
  const response = await fetch(url, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // or without this line
    redirect: "follow",
    headers: {
      "content-type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then((response) => response.json())
    .then((res) => {
      authenticate(res);
    })
    .catch((err) => console.log(err));
}

const setCookie = (key, value) => {
  if (window !== "undefiend") {
    cookie.set(key, value, {
      // 1 Day
      expires: 1,
    });
  }
};
const removeCookie = (key) => {
  if (window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

const getCookie = (key) => {
  if (window !== "undefined") {
    return cookie.get(key);
  }
};

const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
const removeLocalStorage = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};
const authenticate = (response) => {
  console.log("AUTHENTICATE HELPER ON SIGNIN RESPONSE", response);
  setCookie("id", response.id);
  setCookie("token", response.access_token);
  setLocalStorage("id", response.id);
  setLocalStorage("token", response.access_token);
};
const isAuth = () => {
  if (window !== "undefined") {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

const signout = (next) => {
  removeCookie("token");
  removeLocalStorage("user");
  next();
};
const updateUser = (response, next) => {
  console.log("UPDATE USER IN LOCALSTORAGE HELPERS", response);
  if (typeof window !== "undefined") {
    let auth = JSON.parse(localStorage.getItem("user"));
    auth = response.data;
    localStorage.setItem("user", JSON.stringify(auth));
  }
  next();
};

export {
  fetcherGet,
  loginPost,
  fetchProfile,
  getProfile,
  fetcherPost,
  fetcherPut,
  getCookie,
};
