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
//@access   Admin
app.get("/users", admin, (req, res) => {
  db.query(
    "select id, email, role from car_workshop.user where is_deleted=0",
    (err, result) => {
      if (err) throw err;
      return res.json(result);
    }
  );
});

//@route    GET /users/current
//@desc     Gets current user
//@access   User
app.get("/users/current", auth, (req, res) => {
  db.query(
    `select id, email, role from car_workshop.user where id=${req.user.id} and is_deleted=0`,
    (err, result) => {
      if (err) throw err;
      return res.json(result);
    }
  );
});

//@route    GET /users/:id
//@desc     Gets user by id
//@access   Admin
app.get("/users/:id", admin, (req, res) => {
  db.query(
    `select id, email, role from car_workshop.user where id=${req.params.id} and is_deleted=0`,
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
//@access   Admin
app.get("/users/email/:email", admin, (req, res) => {
  db.query(
    `select id, email, role from car_workshop.user where email="${req.params.email}" and is_deleted=0`,
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
//@access   Admin
app.post(
  "/users",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid passowrd").notEmpty(),
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
//@access   Public
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
      `select * from car_workshop.user where binary email="${email} and is_deleted=0"`,
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

// Items routes

//@route    GET /items
//@desc     Gets all items
//@access   User
app.get("/items", auth, (req, res) => {
  db.query(
    "select id, name, buy_price, sell_price, quantity, status from car_workshop.item where is_deleted=0",
    (err, result) => {
      if (err) throw err;
      return res.json(result);
    }
  );
});

//@route    GET /items/:id
//@desc     Get a item using its id
//@access   User
app.get("/items/:id", auth, (req, res) => {
  db.query(
    `select id, name, buy_price, sell_price, quantity, status from car_workshop.item where id=${req.params.id} and is_deleted=0`,
    (err, result) => {
      if (err) throw err;
      // Check if the item exists
      if (result.length === 0)
        return res.status(404).json({ msg: "Item not found" });
      res.json(result);
    }
  );
});

//@route    POST /items
//@desc     Adds a new item
//@access   User
app.post(
  "/items",
  [
    check("name", "Name is required").notEmpty(),
    check("buy_price", "Please enter a valid buy price").isFloat({ min: 0 }),
    check("sell_price", "Please enter a valid sell price").isFloat({ min: 0 }),
    auth,
  ],
  (req, res) => {
    // Check for required fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    const { name, buy_price, sell_price, quantity, status } = req.body;
    const item = { name, buy_price, sell_price };

    // Optional parameters
    if (quantity) item.quantity = quantity;
    if (status) item.status = status;

    db.query("insert into car_workshop.item set ?", item, (err, result) => {
      if (err) throw err;
      return res.json({ msg: "Item added" });
    });
  }
);

//@route    PATCH /items/:id
//@desc     Updates a item using its id
//@access   User
app.patch("/items/:id", auth, (req, res) => {
  const { name, buy_price, sell_price, quantity, status } = req.body;
  const item = {};

  // Check for fields that will be modified
  if (name) item.name = name;
  if (buy_price) item.buy_price = buy_price;
  if (sell_price) item.sell_price = sell_price;
  if (quantity) item.quantity = quantity;
  if (status) item.status = status;

  db.query(
    `update car_workshop.item set ? where id=${req.params.id}`,
    item,
    (err, result) => {
      if (err) throw err;
      return res.json({ msg: "Item modified" });
    }
  );
});

//@route    DELETE /items/:id
//@desc     Deletes a item using its id
//@access   User
app.delete("/items/:id", auth, (req, res) => {
  db.query(
    `update car_workshop.item set ? where id=${req.params.id}`,
    { is_deleted: true },
    (err, result) => {
      if (err) throw err;
      return res.json({ msg: "Item deleted" });
    }
  );
});

// Cars routes

//@route    GET /cars
//@desc     Gets all cars
//@access   User
app.get("/cars", auth, (req, res) => {
  db.query(
    "select * from car_workshop.car where is_deleted=0",
    (err, result) => {
      if (err) throw err;
      return res.json(result);
    }
  );
});

//@route    GET /cars/:id
//@desc     Gets a car using its id
//@access   User
app.get("/cars/:id", auth, (req, res) => {
  db.query(
    `select * from car_workshop.car where id=${req.params.id} and is_deleted=0`,
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
//@access   User
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
    auth,
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
//@access   User
app.patch("/cars/:id", auth, (req, res) => {
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
//@access   User
app.delete("/cars/:id", auth, (req, res) => {
  db.query(
    `update car_workshop.car where id=${req.params.id}`,
    { is_deleted: true },
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
