const { executeQuery } = require("../config/db");

const Category = {
  getAll: async () => {
    return await executeQuery("SELECT * FROM Categories");
  },

  create: async (category) => {
    const { id, name } = category;
    const query = `
      INSERT INTO Categories (Id, Name)
      VALUES ('${id}', '${name}')
    `;
    return await executeQuery(query);
  }
};

module.exports = Category;