// controllers handle things about routes, such as what status the route is going
// to send, what it's sending back. will interact with model to get data to send back

const Product = require("../models/productModel");
const { getPostData } = require("../utils");

/**
 * @desc    Gets all Products
 * @route   GET /api/products
 */
async function getProducts(req, res) {
  try {
    const products = await Product.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

/**
 * @desc    Gets Single Products
 * @route   GET /api/products/:id
 */
async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      // have to serialise the data to send it over a network
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * @desc    Create a Products
 * @route   POST /api/products
 */
async function createProduct(req, res) {
  try {
    const body = await getPostData(req);

    const { title, description, price } = JSON.parse(body);
    const product = {
      title,
      description,
      price,
    };

    const newProduct = await Product.create(product);

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

/**
 * @desc Update a Product
 * @route PUT /api/product/:id
 */
async function updateProduct(req, res, id) {
  try {
    const product = Product.findById(id);
    console.log("product = " + product)

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      const body = await getPostData(req);

      const { title, description, price } = JSON.parse(body);
      const productData = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      };

      const updatedProduct = await Product.update(id, productData);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ updatedProduct }));
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * @desc Update a Product
 * @route PUT /api/product/:id
 */
 async function deleteProduct(req, res, id) {
  try {
    const product = Product.findById(id);
    console.log("product = " + product)

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      const deletedProduct = await Product.remove(id)

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ deletedProduct }));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
