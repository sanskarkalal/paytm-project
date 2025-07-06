const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const router = express.Router();
const { authMiddleware } = require("../middleware");
const { default: mongoose } = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    const { amount, to } = req.body;

    const account = await Account.findOne({
      userId: req.userId,
    }).session(session);

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        msg: "Insufficient balance/ account not detected",
      });
    }

    const toAccount = await Account.findOne({
      userId: to,
    }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        msg: "Invalid account",
      });
    }

    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userId: to },
      {
        $inc: {
          balance: amount,
        },
      }
    ).session(session);

    await session.commitTransaction();
    session.endSession();
    res.json({ msg: "Transaction successful" });
  } catch (error) {
    console.log("hagg dia");
    res.status(400).json({
      msg: "Something went wrong",
    });
  }
});

module.exports = router;
