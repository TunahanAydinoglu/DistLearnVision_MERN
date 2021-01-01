import cookie from "js-cookie";

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
    setCookie("token",response.token);
  };
  const isAuth = () => {
    if (window !== "undefined") {
      const cookieChecked = getCookie("token");
      if (cookieChecked) {
        return true;
      }else{
        return false;
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
    authenticate,
    signout,
    updateUser,
    isAuth,
    setLocalStorage,
    getCookie
  };
  