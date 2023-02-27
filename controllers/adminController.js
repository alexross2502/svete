const { Admin } = require("../models/models");
const ApiError = require("../error/ApiError");
const jwt = require("jsonwebtoken");
const Validator = require("../middleware/validator");
const bcrypt = require("bcrypt");

class AdminController {
  async check(req, res, next) {
    return res.json([
      {
        title: "JavaScript, the Definitive Guide",
        publisher: "O'Reilly",
        author: "David Flanagan",
        cover: "/images/cover_defguide.jpg",
      },
      {
        title: "You Don't Know JS",
        publisher: "O'Reilly",
        author: "Kyle Simpson",
        cover: "/images/cover_defguide.jpg",
      },
      {
        title: "JavaScript Ninja",
        publisher: "Manning",
        author: "John Resig",
        cover: "/images/cover_defguide.jpg",
      },
      {
        title: "DOM Scripting",
        publisher: "Friends of Ed",
        author: "Jeremy Keith",
        cover: "/images/cover_domscripting.jpg",
      },
    ]);
  }

  async create(req, res, next) {
    let { email, password } = req.body;
    let availability = await Admin.findOne({
      where: { email: email },
    });
    try {
      if (!availability && Validator.checkEmail(email)) {
        const salt = await bcrypt.genSalt(3);
        password = await bcrypt.hash(password, salt);
        let admin = await Admin.create({ email, password });
        return res.json(admin);
      } else {
        return res.json("Такой логин уже используется");
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new AdminController();
