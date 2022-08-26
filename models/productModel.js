// models handle anything to do with data, e.g. database
const { v4: uuidv4 } = require("uuid");

const products = require("../data/products.json");
const { writeDataToFile } = require("../utils.js");

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((p) => p.id === id);
    resolve(product);
  });
}

function create(product) {
  return new Promise((resolve, reject) => {
    const newProduct = { id: uuidv4(), ...product };
    products.push(newProduct);
    writeDataToFile("./data/products.json", products);
    resolve(newProduct);
  });
}

function update(id, product) {
  return new Promise((resolve, reject) => {
    const index = products.findIndex((p) => p.id === id);

    products[index] = { id, ...product };
    writeDataToFile("./data/products.json", products);
    resolve(products[index]);
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    const deletedProduct = findById(id);

    const updatedProducts = products.map((p) => {
      if (p.id !== id) {
        return p;
      }
    });
    delete writeDataToFile("./data/products.json", updatedProducts);
    resolve(deletedProduct);
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
