const express = require("express");
var router = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Emp = require("../models/emp");
const auth = require("../middleware/auth");
const bodyparser = require("body-parser");
router.use(bodyparser.json());

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, companyName, email, password, phone } =
      req.body;
      console.log('req.body', req.body);

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await Emp.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);
    console.log('encryptedPassword', encryptedPassword)

    const user = await Emp.create({
      firstName,
      lastName,
      companyName,
      email,
      password: encryptedPassword,
      phone,
    });

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await Emp.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user._id, email },
        "jwt",
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      res.status(200).json(user);
    }

    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

router.get("/health", (req, res, next) => {
  res.status(200).send("OK");
})

router.get("/", auth, (req, res, next) => {
  try {
    Emp.find({}).then((data) => {
      res.send(data);
    });
  } catch (e) {
    next(e);
  }
});

router.put("/:id", auth, (req, res, next) => {
  try {
    Emp.updateMany({ _id: req.params.id }, req.body).then(() => {
      res.send("update successfully");
    });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", auth, (req, res, next) => {
  try {
    Emp.findByIdAndDelete(req.params.id, (err, emp) => {
      if (err) {
        return res
          .status(500)
          .send({ error: "Problem with Deleting the Employee recored " });
      }
      res.send({ success: "Employee deleted successfully" });
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;


// router.post('/', (req, res, next) => {
//     const fields = req.body;
//     try {
//         let emp = new Emp(fields)
//         emp.save().then((data) => {
//             res.send(data);
//         })
//     } catch (e) {
//         next(e);
//     }
// });

// router.put('/:id', (req, res, next) => {
//     var myquery = { _id: req.params.id };
//     var newvalues = { $set: req.body };
//     Emp.updateOne(myquery, newvalues).then(
//         (result) => {
//             res.status(200).json(result)
//         }).catch((err) => { console.log(err) })
// })

// router.put('/:id', (req, res, next) => {
//     try {
//         Emp.findByIdAndUpdate(req.params.id, req.body).then(() => {
//             res.send("update successfully");
//         })
//     } catch (e) {
//         next(e);
//     }
// })