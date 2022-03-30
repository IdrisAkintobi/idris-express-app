import { Request, Response } from "express";
import {
  getDatabase,
  getAllData,
  createDatabase,
  postData,
  dbPath,
} from "./users.controller";
import { validate } from "./data.validator";

interface Data {
  organization: string;
  createdAt: string;
  updatedAt: string;
  products: string[];
  marketValue: string;
  address: string;
  ceo: string;
  country: string;
  id: number;
  noOfEmployees: number;
  employees: string[];
}
// Function to get user by their id number
async function getUserById(req: Request, res: Response) {
  const id = req.params.id;
  const data = await getDatabase();
  const database = JSON.parse(data);
  const user = database.find((item: Data) => item.id === +id);
  if (!user)
    return res.status(404).end(`<h3>Error</h3><p>User ${id} not found</p>`);
  return res.status(200).end(JSON.stringify(user));
}
// Function to edit user
async function editUser(req: Request, res: Response) {
  const id = req.params.id;
  const data = await getDatabase();
  const bodyData = req.body;
  const date = new Date().toISOString(); // Create date
  const database = JSON.parse(data);
  const curr = database[+id - 1];
  // If user not found return with the message
  if (!curr)
    return res.status(404).end(`<h3>Error</h3><p>User ${id} not found</p>`);
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
  if (!validate(newData))
    return res.status(400).end("<h3>Error</h3><p>Wrong data input</p>");
  database[+id - 1] = newData;
  createDatabase(dbPath, JSON.stringify(database));
  return res.status(202).end(JSON.stringify(database[+id - 1]));
}
// function deleteUser(req: Request, res: Response) {
// }
async function deleteUser(req: Request, res: Response) {
  const id = req.params.id;
  const data = await getDatabase();
  const database: Data[] = JSON.parse(data);
  const currIndex = database.findIndex((item) => item.id == +id);
  // If user not in database return with the message
  if (currIndex === -1)
    return res.status(404).end(`<h3>Error</h3><p>User ${id} not found</p>`);
  database.splice(currIndex, 1);
  createDatabase(dbPath, JSON.stringify(database));
  return res.status(202).end(`<h3>User ${id} was deleted successfully</h3>`);
}

export { getUserById, getAllData, editUser, deleteUser, postData };
