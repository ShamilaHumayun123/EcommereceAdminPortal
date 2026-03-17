const { executeQuery } = require("../config/db");

// Escape single quotes to avoid SQL errors
const escapeString = (str) => (str ? str.replace(/'/g, "''") : "");

const Product = {
  // Create product with multiple images
  create: async (product) => {
    // Insert product and get the new Id
    const query = `
      INSERT INTO Products
      (Title, Price, Discount, Description, Category, Brand, Shipping, Tax, Tag)
      OUTPUT INSERTED.Id
      VALUES
      (
        '${escapeString(product.title)}',
        ${parseFloat(product.price).toFixed(2) || 0},
        ${parseFloat(product.discount).toFixed(2) || 0},
        '${escapeString(product.description)}',
        '${escapeString(product.category)}',
        '${escapeString(product.brand)}',
        ${parseFloat(product.shipping).toFixed(2) || 0},
        ${parseFloat(product.tax).toFixed(2) || 0},
        '${escapeString(product.tag)}'
      )
    `;

    const result = await executeQuery(query);
    const productId = result[0].Id;

    // Insert each image into Images table
    if (product.images && product.images.length > 0) {
      for (let imgPath of product.images) {
        await executeQuery(`
          INSERT INTO Images (ForeignId, TableName, ImagePath)
          VALUES (${productId}, 'Products', '${escapeString(imgPath)}')
        `);
      }
    }

    return { Id: productId, ...product };
  },

  //  Get all products with images grouped
  getAll: async () => {
    const query = `
      SELECT p.*, i.ImagePath
      FROM Products p
      LEFT JOIN Images i ON i.ForeignId = p.Id AND i.TableName='Products'
    `;
    const rows = await executeQuery(query);

    // Group images into array per product
    const productsMap = {};
    rows.forEach((row) => {
      if (!productsMap[row.Id]) {
        productsMap[row.Id] = { ...row, images: [] };
      }
      if (row.ImagePath) productsMap[row.Id].images.push(row.ImagePath);
    });

    return Object.values(productsMap);
  },

  // Update product and optionally images
  update: async ({ id, product, images }) => {
    // Update product info
    const query = `
      UPDATE Products SET
        Title='${escapeString(product.title)}',
        Price=${parseFloat(product.price).toFixed(2) || 0},
        Discount=${parseFloat(product.discount).toFixed(2) || 0},
        Description='${escapeString(product.description)}',
        Category='${escapeString(product.category)}',
        Brand='${escapeString(product.brand)}',
        Shipping=${parseFloat(product.shipping).toFixed(2) || 0},
        Tax=${parseFloat(product.tax).toFixed(2) || 0},
        Tag='${escapeString(product.tag)}'
      WHERE Id=${id}
    `;
    await executeQuery(query);

    // Replace images if provided
    if (images) {
      await executeQuery(`DELETE FROM Images WHERE ForeignId=${id} AND TableName='Products'`);
      for (let imgPath of images) {
        await executeQuery(`
          INSERT INTO Images (ForeignId, TableName, ImagePath)
          VALUES (${id}, 'Products', '${escapeString(imgPath)}')
        `);
      }
    }

    return { Id: id, ...product, images };
  },

  // Delete product and its images
  delete: async (id) => {
    await executeQuery(`DELETE FROM Images WHERE ForeignId=${id} AND TableName='Products'`);
    return await executeQuery(`DELETE FROM Products WHERE Id=${id}`);
  },
};

module.exports = Product;