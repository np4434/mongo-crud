const Emp = require("../models/emp");

function create(req, res, next) {
  const fields = req.body;
  try {
    let emp = new Emp(fields);
    emp.save().then((data) => {
      res.send(data);
    });
  } catch (e) {
    next(e);
  }
}

function view(req, res, next) {
  Emp.find({}).then((data) => {
    res.send(data);
  });
}

function update(req, res, next) {
  try {
    Emp.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if (err) {
        return res
          .status(500)
          .send({ error: "Problem with Updating the   Employee recored " });
      }
      res.send({ success: "Updation successfull" });
    });
  } catch (e) {
    next(e);
  }
}

function remove(req, res, next) {
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
}

module.exports.remove = remove;
module.exports.create = create;
module.exports.view = view;
module.exports.update = update;
