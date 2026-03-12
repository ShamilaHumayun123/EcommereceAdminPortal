const { executeQuery } = require("../config/db");

// Escape single quotes to avoid SQL errors
const escapeString = (str) => (str ? str.replace(/'/g, "''") : "");

const createProduct = async (product) => {
  const query = `
    INSERT INTO Products
    (Title, Price, Discount, Description, Category, Brand, Shipping, Tax, Tag, Images)
    VALUES
    (
      '${escapeString(product.title)}',
      ${parseFloat(product.price) || 0},
      ${parseFloat(product.discount) || 0},
      '${escapeString(product.description)}',
      '${escapeString(product.category)}',
      '${escapeString(product.brand)}',
      ${parseFloat(product.shipping) || 0},
      ${parseFloat(product.tax) || 0},
      '${escapeString(product.tag)}',
      '${escapeString(product.images)}'
    )
  `;

  return executeQuery(query);
};

module.exports = { createProduct };