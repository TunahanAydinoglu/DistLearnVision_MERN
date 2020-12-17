const express = require("express");

const router = express.Router();
const photoUpload = require("../helpers/libraries/multer");

// Controller Functionality
const {
    register,
    login,
    logout,
    getLoggedInUser,
    imageUpload,
    updateDetails,
    forgotPassword,
    resetPassword
} = require("../controllers/auth");
const {getAccessToRoute} = require("../middlewares/authorization/auth");
const limitAccess = require("../middlewares/security/limitAccess");


router.post("/register",register);

router.post("/login",limitAccess({
    windowMs:  60 * 1000, // 1 Minutes
    max: 3,
    message: "Too much login attempt, please try again after 1 minutes"
}),login);
router.get("/logout",getAccessToRoute,logout);
router.get("/user",getAccessToRoute,getLoggedInUser);
router.put("/resetPassword",resetPassword);
router.post("/upload",[getAccessToRoute,photoUpload.single("profile_image")],imageUpload)
router.put("/updateDetails",getAccessToRoute,updateDetails);
router.post("/forgotPassword",forgotPassword)



module.exports = router;
