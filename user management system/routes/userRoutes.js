const basicAuth = require("basic-auth");

const auth = (req, res, next) => {
    const user = basicAuth(req);

    if (!user || user.name !== "admin" || user.pass !== "1234") {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
};

module.exports = auth;
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

// CREATE USER
router.post("/users", auth, async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET ALL USERS
router.get("/users", auth, async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// GET SINGLE USER
router.get("/users/:id", auth, async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});

// UPDATE USER
router.put("/users/:id", auth, async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(updatedUser);
});

// DELETE USER
router.delete("/users/:id", auth, async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
});

module.exports = router;