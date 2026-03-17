const { executeQuery } = require("../config/db");

const Brand = {
  getAll: async () => await executeQuery("SELECT * FROM Brands"),

  create: async ({ name, imagePath }) => {
    const query = `INSERT INTO Brands (Name, ImagePath) VALUES ('${name}', '${imagePath}')`;
    return await executeQuery(query);
  },

  update: async ({ id, name, imagePath }) => {
    let query = `UPDATE Brands SET Name='${name}'`;
    if (imagePath !== undefined) query += `, ImagePath='${imagePath}'`;
    query += ` WHERE Id=${id}`;
    return await executeQuery(query);
  },

  delete: async (id) => {
    const query = `DELETE FROM Brands WHERE Id=${id}`;
    return await executeQuery(query);
  },
};

module.exports = Brand;