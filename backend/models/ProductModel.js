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
      ${parseFloat(product.price).toFixed(2) || 0},        -- Decimal with 2 places
      ${parseFloat(product.discount).toFixed(2) || 0},     -- Decimal with 2 places
      '${escapeString(product.description)}',
      '${escapeString(product.category)}',
      '${escapeString(product.brand)}',
      ${parseFloat(product.shipping).toFixed(2) || 0},    -- Decimal with 2 places
      ${parseFloat(product.tax).toFixed(2) || 0},         -- Decimal with 2 places
      '${escapeString(product.tag)}',
      '${escapeString(JSON.stringify(product.images))}'    -- Images as JSON string
    )
  `;

  return executeQuery(query);
};

module.exports = { createProduct };