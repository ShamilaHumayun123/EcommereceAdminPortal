const { executeQuery } = require("../config/db");

// Escape single quotes to avoid SQL errors
const escapeString = (str) => (str ? str.replace(/'/g, "''") : "");

const Product = {
  // 1️⃣ CREATE product with images
  create: async (product) => {
    const query = `
      INSERT INTO Products
      (Title, Price, Discount, Description, CategoryId, BrandId, Shipping, Tax, Tag)
      OUTPUT INSERTED.Id
      VALUES
      (
        '${escapeString(product.title)}',
        ${parseFloat(product.price) || 0},
        ${parseFloat(product.discount) || 0},
        '${escapeString(product.description)}',
        ${product.category || "NULL"},
        ${product.brand || "NULL"},
        ${parseFloat(product.shipping) || 0},
        ${parseFloat(product.tax) || 0},
        '${escapeString(product.tag)}'
      )
    `;

    const result = await executeQuery(query);
    const productId = result[0].Id;

    // Insert images
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

  // 2️⃣ GET ALL products with Brand + Category + Images
  getAll: async () => {
    const query = `
      SELECT 
        p.*,
        b.Name AS BrandName,
        c.Name AS CategoryName,
        i.ImagePath
      FROM Products p
      LEFT JOIN Brands b ON p.BrandId = b.Id
      LEFT JOIN Categories c ON p.CategoryId = c.Id
      LEFT JOIN Images i ON i.ForeignId = p.Id AND i.TableName='Products'
    `;

    const rows = await executeQuery(query);

    const productsMap = {};

    rows.forEach((row) => {
      if (!productsMap[row.Id]) {
        productsMap[row.Id] = {
          Id: row.Id,
          Title: row.Title,
          Price: row.Price,
          Discount: row.Discount,
          Description: row.Description,
          CategoryId: row.CategoryId,
          CategoryName: row.CategoryName,
          BrandId: row.BrandId,
          BrandName: row.BrandName,
          Shipping: row.Shipping,
          Tax: row.Tax,
          Tag: row.Tag,
          images: [],
        };
      }

      if (row.ImagePath) {
        productsMap[row.Id].images.push(row.ImagePath);
      }
    });

    return Object.values(productsMap);
  },

  // 3️⃣ UPDATE product + optional images
  update: async ({ id, product, images }) => {
    const query = `
      UPDATE Products SET
        Title='${escapeString(product.title)}',
        Price=${parseFloat(product.price) || 0},
        Discount=${parseFloat(product.discount) || 0},
        Description='${escapeString(product.description)}',
        CategoryId=${product.categoryId || "NULL"},
        BrandId=${product.brandId || "NULL"},
        Shipping=${parseFloat(product.shipping) || 0},
        Tax=${parseFloat(product.tax) || 0},
        Tag='${escapeString(product.tag)}'
      WHERE Id=${id}
    `;

    await executeQuery(query);

    // Replace images if provided
    if (images) {
      await executeQuery(`
        DELETE FROM Images 
        WHERE ForeignId=${id} AND TableName='Products'
      `);

      for (let imgPath of images) {
        await executeQuery(`
          INSERT INTO Images (ForeignId, TableName, ImagePath)
          VALUES (${id}, 'Products', '${escapeString(imgPath)}')
        `);
      }
    }

    return { Id: id, ...product, images };
  },

  // 4️⃣ DELETE product + images
  delete: async (id) => {
    await executeQuery(`
      DELETE FROM Images 
      WHERE ForeignId=${id} AND TableName='Products'
    `);

    return await executeQuery(`
      DELETE FROM Products 
      WHERE Id=${id}
    `);
  },
};

module.exports = Product;