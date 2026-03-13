const { executeQuery } = require("../config/db");

const Brand = {
  getAll: async () => {
    return await executeQuery("SELECT * FROM Brands");
  },

  create: async (brand) => {
    const { id, name } = brand;
    const query = `
      INSERT INTO Brands (Id, Name)
      VALUES ('${id}', '${name}')
    `;
    return await executeQuery(query);
  }
};

module.exports = Brand;