import express from "express";
import {
  getUserById,
  getAllData,
  editUser,
  deleteUser,
  postData,
} from "../controllers/user.controller";
const router = express.Router();

/* GET users listing. */
router
  .get("/", (req, res) => {
    getAllData(res);
  })
  .post("/", (req, res) => {
    postData(req, res);
  })
  .get("/:id", (req, res) => {
    getUserById(req, res);
  })
  .put("/:id", (req, res) => {
    editUser(req, res);
  })
  .delete("/:id", (req, res) => {
    deleteUser(req, res);
  });
export default router;
