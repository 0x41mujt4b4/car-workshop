const express = require("express");
const app = express();
const { check, validationResult } = require("express-validator");
const db = require("./config/db");
const cors = require("cors");

app.options(
  "*",
  cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 })
);

app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));

app.use(express.json({ extended: false }));

// Products routes

//@route    GET /products
//@desc     Gets all products
app.get("/products", (req, res) => {
  db.query("select * from car_workshop.product", (err, result) => {
    if (err) throw err;
    return res.json(result);
  });
});

//@route    GET /products/:id
//@desc     Get a product using its id
app.get("/products/:id", (req, res) => {
  db.query(
    `select * from car_workshop.product where id=${req.params.id}`,
    (err, result) => {
      if (err) throw err;
      // Check if the product exists
      if (result.length === 0)
        return res.status(404).json({ msg: "Product not found" });
      res.json(result);
    }
  );
});

//@route    POST /products
//@desc     Adds a new product
app.post(
  "/products",
  [
    check("name", "Name is required").notEmpty(),
    check("buy_price", "Please enter a valid buy price").isFloat({ min: 0 }),
    check("sell_price", "Please enter a valid sell price").isFloat({ min: 0 }),
  ],
  (req, res) => {
    // Check for required fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }
    const { name, buy_price, sell_price, quantity, status } = req.body;
    const product = { name, buy_price, sell_price };

    // Optional parameters
    if (quantity) product.quantity = quantity;
    if (status) product.status = status;

    db.query(
      "insert into car_workshop.product set ?",
      product,
      (err, result) => {
        if (err) throw err;
        return res.json(result);
      }
    );
  }
);

//@route    PATCH /products/:id
//@desc     Updates a product using its id
app.patch("/products/:id", (req, res) => {
  const { name, buy_price, sell_price, quantity, status } = req.body;
  const product = {};

  // Check for fields that will be modified
  if (name) product.name = name;
  if (buy_price) product.buy_price = buy_price;
  if (sell_price) product.sell_price = sell_price;
  if (quantity) product.quantity = quantity;
  if (status) product.status = status;

  db.query(
    `update car_workshop.product set ? where id=${req.params.id}`,
    product,
    (err, result) => {
      if (err) throw err;
      return res.send("Product modified");
    }
  );
});

//@route    DELETE /products/:id
//@desc     Deletes a product using its id
app.delete("/products/:id", (req, res) => {
  db.query(
    `delete from car_workshop.product where id=${req.params.id}`,
    (err, result) => {
      if (err) throw err;
      return res.send("Product deleted");
    }
  );
});

// Cars routes

//@route    GET /cars
//@desc     gets all cars
app.get("/cars", (req, res) => {
  db.query("select * from car_workshop.car", (err, result) => {
    if (err) throw err;
    return res.json(result);
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
