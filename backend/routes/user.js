const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware");

const signupSchema = zod.object({
  firstName: zod.string(),
  password: zod.string(),
  lastName: zod.string(),
  userName: zod.string().email(),
});

const updateSchema = zod.object({
  firstName: zod.string().optional(),
  password: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(body);

  if (!success) {
    return res.status(411).json({
      msg: "incorrect inputs",
    });
  }

  const user = User.findOne({
    userName: body.userName,
  });
  if (user._id) {
    return res.json({
      msg: "incorrect inputs/ email taken",
    });
  }

  const dbUser = await User.create(body);
  const userId = dbUser._id;

  const account = await Account.create({
    userId,
    balance: 1000,
  });
  const token = jwt.sign(
    {
      userId: dbUser._id,
    },
    JWT_SECRET
  );

  res.json({
    message: "USER CREATED SUCCESSFULLY",
    token: token,
  });
});

router.put("/", authMiddleware, async (req, res) => {
  const body = req.body;
  const { success } = updateSchema.safeParse(body);
  if (!success) {
    res.status(411).json({
      msg: "Error updating info",
    });
  }

  const updatedUser = await User.findOneAndUpdate(
    { userName: req.body.userName }, // filter
    { $set: req.body }, // update
    { new: true, writeConcern: { w: 1 } }
  );
  if (!updatedUser) {
    return res.status(411).json({
      msg: "incorrect inputs",
    });
  }
  console.log(updatedUser);
  res.json({
    msg: "USER UPDATED SUCCESSFULLY",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

const signinBody = zod.object({
  userName: zod.string(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  console.log(success);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const user = await User.findOne({
    userName: req.body.userName,
    password: req.body.password,
  });
  console.log(user);
  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
      user,
    });
    return;
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});

module.exports = router;
