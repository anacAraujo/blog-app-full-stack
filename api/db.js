import mysql from "mysql2";

// TODO create .env file and add the following variables
export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "blog",
});

console.log("Connected to database!");
