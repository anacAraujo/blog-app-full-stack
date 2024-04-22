import mysql from "mysql2/promise";

// Create the connection to database
export const db = await mysql.createConnection({
  // TODO create .env file and add the following variables
  host: "localhost",
  user: "root",
  password: "root",
  database: "blog",
});

console.log("Connected to database!");
