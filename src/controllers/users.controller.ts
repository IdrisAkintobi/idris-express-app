import { Request, Response } from "express";
import { readFile, writeFile } from "fs";
import path from "path";
import { promisify } from "util";
import { validate } from "./data.validator";

const readDatabase = promisify(readFile);
const createDatabase = promisify(writeFile);
const dbPath = path.join(__dirname, "../..", "data/database.json");

// Function to read database and create if not exist
async function getDatabase() {
  try {
    return await readDatabase(dbPath, {
      encoding: "utf8",
      flag: "r",
    });
  } catch (err) {
    await createDatabase(dbPath, JSON.stringify([]));
    return await readDatabase(dbPath, {
      encoding: "utf8",
      flag: "r",
    });
  }
}
// Read database if data, send to response else respond with Database not found
function getAllData(res: Response) {
  readFile(dbPath, { encoding: "utf-8", flag: "r" }, (err, data) => {
    if (err) res.status(404).end("<h2>Database not found</h3>");
    else res.status(200).end(data);
  });
}
// Function to process passed data
async function postData(req: Request, res: Response) {
  const bodyData = req.body;
  const date = new Date().toISOString(); //Create new date
  let data = await getDatabase();
  const database = JSON.parse(data);
  // Destructure the bodyData
  const {
    organization,
    products,
    marketValue,
    address,
    ceo,
    country,
    noOfEmployees,
    employees,
  } = bodyData;

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
  if (!validate(newData))
    return res.status(400).end("<h3>Error</h3><p>Wrong data input</p>");
  database.push(newData);
  createDatabase(dbPath, JSON.stringify(database));
  return res.status(201).end(JSON.stringify(database));
}
export {
  getAllData,
  postData,
  getDatabase,
  createDatabase,
  readDatabase,
  dbPath,
};
