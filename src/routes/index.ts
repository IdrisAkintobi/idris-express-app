import express from "express";
import { getAllData, postData } from "../controllers/users.controller";
const router = express.Router();
const details = { title: "Express", name: "Idris Akintobi" };
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", details);
});

export default router;
