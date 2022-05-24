const express = require("express");
const router = express.Router();
const {
    findAllUsers,
    findUser,
    updateUser,
    deleteUser,
} = require("../controllers/users");

router.route("/").get(findAllUsers);

router.route("/:id").get(findUser).patch(updateUser).delete(deleteUser);

module.exports = router;
