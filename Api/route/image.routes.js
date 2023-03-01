const express = require('express');
const router = express.Router();
const controller = require("./../controller/image.controller");
const Middelware = require("./../Middelware/image.middelware");
const multer = require("./../Middelware/image.multer");
const model = require('./../model/image.model')

router.post("/signUp",controller.signUp)
router.post("/login",controller.login);
router.post("/uploadimage",Middelware.authenticate,multer.single('image'),controller.upload);
router.get("/profile",Middelware.authenticate,controller.getImages);
router.put("/settings",Middelware.authenticate,controller.setting);




module.exports = router;
