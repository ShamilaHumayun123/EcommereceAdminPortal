const { executeQuery } = require("../config/db");

const Brand = {
  getAll: async () => {
    const query = `
      SELECT b.*, i.ImagePath
      FROM Brands b
      LEFT JOIN Images i ON i.ForeignId = b.Id AND i.TableName='Brands'
    `;
    return await executeQuery(query);
  },

  create: async ({ name, imagePath }) => {
   
    const result = await executeQuery(`
      INSERT INTO Brands (Name)
      OUTPUT INSERTED.Id
      VALUES ('${name}')
    `);

    const brandId = result[0].Id; // Now it's defined

    // Insert image if provided
    if (imagePath) {
      await executeQuery(`
        INSERT INTO Images (ForeignId, TableName, ImagePath)
        VALUES (${brandId}, 'Brands', '${imagePath}')
      `);
    }

    return { Id: brandId, Name: name, ImagePath: imagePath };
  },

  update: async ({ id, name, imagePath }) => {
    let query = `UPDATE Brands SET Name='${name}'`;
    if (imagePath !== undefined) query += `, ImagePath='${imagePath}'`;
    query += ` WHERE Id=${id}`;
    return await executeQuery(query);
  },

  delete: async (id) => {
    await executeQuery(`DELETE FROM Images WHERE ForeignId=${id} AND TableName='Brands'`);
    return await executeQuery(`DELETE FROM Brands WHERE Id=${id}`);
  },
};

module.exports = Brand;