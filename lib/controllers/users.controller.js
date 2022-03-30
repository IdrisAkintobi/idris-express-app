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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbPath = exports.readDatabase = exports.createDatabase = exports.getDatabase = exports.postData = exports.getAllData = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
const data_validator_1 = require("./data.validator");
const readDatabase = (0, util_1.promisify)(fs_1.readFile);
exports.readDatabase = readDatabase;
const createDatabase = (0, util_1.promisify)(fs_1.writeFile);
exports.createDatabase = createDatabase;
const dbPath = path_1.default.join(__dirname, "../..", "data/database.json");
exports.dbPath = dbPath;
// Function to read database and create if not exist
function getDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield readDatabase(dbPath, {
                encoding: "utf8",
                flag: "r",
            });
        }
        catch (err) {
            yield createDatabase(dbPath, JSON.stringify([]));
            return yield readDatabase(dbPath, {
                encoding: "utf8",
                flag: "r",
            });
        }
    });
}
exports.getDatabase = getDatabase;
// Read database if data, send to response else respond with Database not found
function getAllData(res) {
    (0, fs_1.readFile)(dbPath, { encoding: "utf-8", flag: "r" }, (err, data) => {
        if (err)
            res.status(404).end("<h2>Database not found</h3>");
        else
            res.status(200).end(data);
    });
}
exports.getAllData = getAllData;
// Function to process passed data
function postData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bodyData = req.body;
        const date = new Date().toISOString(); //Create new date
        let data = yield getDatabase();
        const database = JSON.parse(data);
        // Destructure the bodyData
        const { organization, products, marketValue, address, ceo, country, noOfEmployees, employees, } = bodyData;
        const newData = {
            organization,
            createdAt: date,
            updatedAt: date,
            products,
            marketValue,
            address,
            ceo,
            country,
            id: database.length + 1,
            noOfEmployees,
            employees,
        };
        // Validate data before writing to database
        if (!(0, data_validator_1.validate)(newData))
            return res.status(400).end("<h3>Error</h3><p>Wrong data input</p>");
        database.push(newData);
        createDatabase(dbPath, JSON.stringify(database));
        return res.status(201).end(JSON.stringify(database));
    });
}
exports.postData = postData;
