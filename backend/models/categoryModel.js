const { executeQuery } = require("../config/db");

const Category = {
  // GET ALL
  getAll: async () => {
    return await executeQuery("SELECT * FROM Categories");
  },

  // CREATE
  create: async (name) => {
    const query = `INSERT INTO Categories (Name) VALUES ('${name.replace("'", "''")}')`;
    return await executeQuery(query);
  },

  // UPDATE
  update: async (id, name) => {
    const query = `UPDATE Categories SET Name='${name.replace("'", "''")}' WHERE Id=${id}`;
    return await executeQuery(query);
  },

  // DELETE
  delete: async (id) => {
    const query = `DELETE FROM Categories WHERE Id=${id}`;
    return await executeQuery(query);
  }
};

module.exports = Category;