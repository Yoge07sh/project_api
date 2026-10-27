const express = require("express");
const router = express.Router();
const PaymentController = require("../../controllers/User/PaymentController");
router.post("/create-order", (req, res) => {
  PaymentController.makePayment(req, res);
});

router.post("/verify-payment", (req, res) => {
  PaymentController.verifyPayment(req, res);
});

router.post("/my/orders", (req, res) => {
  PaymentController.getMyOrder(req, res);
});

module.exports = router;
