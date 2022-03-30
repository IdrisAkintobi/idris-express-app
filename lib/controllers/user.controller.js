"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postData = exports.deleteUser = exports.editUser = exports.getAllData = exports.getUserById = void 0;
const users_controller_1 = require("./users.controller");
Object.defineProperty(exports, "getAllData", { enumerable: true, get: function () { return users_controller_1.getAllData; } });
Object.defineProperty(exports, "postData", { enumerable: true, get: function () { return users_controller_1.postData; } });
const data_validator_1 = require("./data.validator");
// Function to get user by their id number
function getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const data = yield (0, users_controller_1.getDatabase)();
        const database = JSON.parse(data);
        const user = database.find((item) => item.id === +id);
        if (!user)
            return res.status(404).end(`<h3>Error</h3><p>User ${id} not found</p>`);
        return res.status(200).end(JSON.stringify(user));
    });
}
exports.getUserById = getUserById;
// Function to edit user
function editUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const data = yield (0, users_controller_1.getDatabase)();
        const bodyData = req.body;
        const date = new Date().toISOString(); // Create date
        const database = JSON.parse(data);
        const curr = database[+id - 1];
        // If user not found return with the message
        if (!curr)
            return res.status(404).end(`<h3>Error</h3><p>User ${id} not found</p>`);
        // Destructure the bodyData
        const { organization, products, marketValue, address, ceo, country, noOfEmployees, employees, } = bodyData;
        // If data is not passed in body i.e undefined... Use the current value
        const newData = {
            organization: organization || curr.organization,
            createdAt: curr.createdAt,
            updatedAt: date,
            products: products || curr.products,
            marketValue: marketValue || curr.marketValue,
            address: address || curr.address,
            ceo: ceo || curr.ceo,
            country: country || curr.country,
            id: curr.id,
            noOfEmployees: noOfEmployees || curr.noOfEmployees,
            employees: employees || curr.employees,
        };
        // Validate data before writing to database
        if (!(0, data_validator_1.validate)(newData))
            return res.status(400).end("<h3>Error</h3><p>Wrong data input</p>");
        database[+id - 1] = newData;
        (0, users_controller_1.createDatabase)(users_controller_1.dbPath, JSON.stringify(database));
        return res.status(202).end(JSON.stringify(database[+id - 1]));
    });
}
exports.editUser = editUser;
// function deleteUser(req: Request, res: Response) {
// }
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const data = yield (0, users_controller_1.getDatabase)();
        const database = JSON.parse(data);
        const currIndex = database.findIndex((item) => item.id == +id);
        // If user not in database return with the message
        if (currIndex === -1)
            return res.status(404).end(`<h3>Error</h3><p>User ${id} not found</p>`);
        database.splice(currIndex, 1);
        (0, users_controller_1.createDatabase)(users_controller_1.dbPath, JSON.stringify(database));
        return res.status(202).end(`<h3>User ${id} was deleted successfully</h3>`);
    });
}
exports.deleteUser = deleteUser;
