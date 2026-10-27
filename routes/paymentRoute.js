const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/PaymentController");
router.get("/transactions", (req, res) => {
  paymentController.getTransactions(req, res);
});

module.exports = router;
