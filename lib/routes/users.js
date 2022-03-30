"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
/* GET users listing. */
router
    .get("/", (req, res) => {
    (0, user_controller_1.getAllData)(res);
})
    .post("/", (req, res) => {
    (0, user_controller_1.postData)(req, res);
})
    .get("/:id", (req, res) => {
    (0, user_controller_1.getUserById)(req, res);
})
    .put("/:id", (req, res) => {
    (0, user_controller_1.editUser)(req, res);
})
    .delete("/:id", (req, res) => {
    (0, user_controller_1.deleteUser)(req, res);
});
exports.default = router;
