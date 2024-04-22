import mysql from "mysql2/promise";

// Create the connection pool. The pool-specific settings are the defaults
export const db = mysql.createPool({
  // TODO create .env file and add the following variables
  host: "localhost",
  user: "root",
  password: "root",
  database: "blog",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000 (1min)
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

console.log("Connected to database!");
