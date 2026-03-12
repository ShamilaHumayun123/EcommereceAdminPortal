const sql = require("msnodesqlv8");

const connectionString = "server=localhost;Database=EcommerceDB;Trusted_Connection=Yes;Encrypt=yes;TrustServerCertificate=yes;Driver={ODBC Driver 18 for SQL Server}";

const executeQuery = (query) => {
  return new Promise((resolve, reject) => {
    sql.query(connectionString, query, (err, rows) => {
      if (err) {
        console.error("DB Query Error:", err);
        return reject(err);
      }
      resolve(rows);
    });
  });
};

module.exports = { executeQuery };