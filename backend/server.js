const express = require("express");
const app = express();
const { check, validationResult } = require("express-validator");
const db = require("./config/db");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const auth = require("./middleware/auth");
const admin = require("./middleware/admin");
const config = require("config");

const cors = require("cors");

app.options(
  "*",
  cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 })
);

app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));

app.use(express.json({ extended: false }));

// Users routes

//@route    GET /users
//@desc     Gets all users
app.get("/users", [auth, admin], (req, res) => {
  db.query("select id, email, role from car_workshop.user", (err, result) => {
    if (err) throw err;
    return res.json(result);
  });
});

//@route    GET /users/:id
//@desc     Gets user by id
app.get("/users/:id", (req, res) => {
  db.query(
    `select id, email, role from car_workshop.user where id=${req.params.id}`,
    (err, result) => {
      if (err) throw err;
      if (result.length === 0)
        return res.status(404).json({ msg: "User not found" });
      return res.json(result);
    }
  );
});

//@route    GET /users/email/:email
//@desc     Gets user by email
app.get("/users/email/:email", (req, res) => {
  db.query(
    `select id, email, role from car_workshop.user where email="${req.params.email}"`,
    (err, result) => {
      if (err) throw err;
      if (result.length === 0)
        return res.status(404).json({ msg: "User not found" });
      return res.json(result);
    }
  );
});

//@route    POST /users
//@desc     Registers a new user
app.post(
  "/users",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid passowrd").notEmpty(),
    auth,
    admin,
  ],
  async (req, res) => {
    // Checking for required fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    const { email, password } = req.body;
    const user = { email };

    db.query(
      `Select * from car_workshop.user where email="${email}"`,
      async (err, result) => {
        if (err) throw err;
        // Check if email exists in DB
        if (result.length !== 0)
          return res
            .status(400)
            .json({ errors: [{ msg: "Email already in use" }] });
        try {
          // Encrypting the password
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(password, salt);

          db.query(
            "insert into car_workshop.user set ?",
            user,
            async (err, result) => {
              if (err) throw err;
              const payload = {
                user: {
                  id: result.insertId,
                  role: "user",
                },
              };

              const token = await jwt.sign(payload, config.get("JWTSecret"));

              res.json({ token });
            }
          );
        } catch (err) {
          return res.send("Server error");
        }
      }
    );
  }
);

//@route    POST /users/login
//@desc     Logs in user
app.post(
  "/users/login",
  [
    check("email", "Please enter a valid email").notEmpty(),
    check("password", "Please enter a valid passowrd").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    const { email, password } = req.body;

    db.query(
      `select * from car_workshop.user where binary email="${email}"`,
      async (err, result) => {
        if (err) throw err;
        if (result.length === 0)
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });
        try {
          const isMatch = await bcrypt.compare(password, result[0].password);
          if (!isMatch)
            return res
              .status(400)
              .json({ errors: [{ msg: "Invalid Credentials" }] });

          const payload = {
            user: {
              id: result[0].id,
              role: result[0].role,
            },
          };

          const token = await jwt.sign(payload, config.get("JWTSecret"));

          res.json({ token });
        } catch (err) {
          console.error(err.message);
          return res.status(500).send("Server error");
        }
      }
    );
  }
);

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
      return res.status(400).json(errors);
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
        return res.json({ msg: "Product added" });
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
      return res.json({ msg: "Product modified" });
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
      return res.json({ msg: "Product deleted" });
    }
  );
});

// Cars routes

//@route    GET /cars
//@desc     Gets all cars
app.get("/cars", (req, res) => {
  db.query("select * from car_workshop.car", (err, result) => {
    if (err) throw err;
    return res.json(result);
  });
});

//@route    GET /cars/:id
//@desc     Gets a car using its id
app.get("/cars/:id", (req, res) => {
  db.query(
    `select * from car_workshop.car where id=${req.params.id}`,
    (err, result) => {
      if (err) throw err;
      // Check if the car exists
      if (result.length === 0)
        return res.status(404).json({ msg: "Car not found" });
      res.json(result);
    }
  );
});

//@route    POST /cars
//@desc     Add a new car
app.post(
  "/cars",
  [
    check("plate_no", "Please enter a valid plate number").isInt({
      min: 1,
      max: 999999,
    }),
    check("model", "Please enter a valid model").notEmpty(),
    check("owner", "Please enter an owner").notEmpty(),
    check("total_cost", "Please enter a valid total cost").isFloat({
      min: 0,
    }),
    check("repair_cost", "Please enter a valid repair cost").isFloat({
      min: 0,
    }),
  ],
  (req, res) => {
    // Check for required fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const { plate_no, model, owner, total_cost, repair_cost } = req.body;
    const car = { plate_no, model, owner, total_cost, repair_cost };

    db.query("insert into car_workshop.car set ?", car, (err, result) => {
      if (err) throw err;
      return res.json({ msg: "car added" });
    });
  }
);

//@route    PATCH /cars/:id
//@desc     Updates a car using its id
app.patch("/cars/:id", (req, res) => {
  const { plate_no, model, owner, total_cost, repair_cost } = req.body;
  const car = {};

  // Check for fields that will be modified
  if (plate_no) car.plate_no = plate_no;
  if (model) car.model = model;
  if (owner) car.owner = owner;
  if (total_cost) car.total_cost = total_cost;
  if (repair_cost) car.repair_cost = repair_cost;

  db.query(
    `update car_workshop.car set ? where id=${req.params.id}`,
    car,
    (err, result) => {
      if (err) throw err;
      return res.json({ msg: "Car modified" });
    }
  );
});

//@route    DELETE /cars/:id
//@desc     Deletes a car using its id
app.delete("/cars/:id", (req, res) => {
  db.query(
    `delete from car_workshop.car where id=${req.params.id}`,
    (err, result) => {
      if (err) throw err;
      if (result.affectedRows === 0)
        return res.status(404).json({ msg: "Car not found" });
      res.json({ msg: "Car deleted" });
    }
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
