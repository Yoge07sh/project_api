const Razorpay = require("razorpay");
const Transaction = require("../../models/Transaction");
const crypto = require("crypto");
const makePayment = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    console.log(req.body);
    let transaction = new Transaction(req.body);
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: req.body.firstName,
    };
    const order = await razorpay.orders.create(options);
    console.log(order);
    transaction.transactionId = order.id;
    await transaction.save();
    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");
    console.log(expectedSign, "expectedSign");
    if (razorpay_signature === expectedSign) {
      let transaction = await Transaction.findOne({
        transactionId: razorpay_order_id,
      });
      transaction.status = "Completed";
      await transaction.save();
      return res.status(200).json({
        message: "Payment verified successfully",
        data: razorpay_order_id,
      });
    } else {
      return res
        .status(400)
        .json({ message: "Invalid signature, payment failed!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getMyOrder = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const myOrders = await Transaction.find({ email: email });
    console.log(myOrders);
    res.status(200).json({ data: myOrders });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

module.exports = {
  makePayment,
  verifyPayment,
  getMyOrder,
};
