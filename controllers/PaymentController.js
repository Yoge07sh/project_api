const Transaction = require("../models/Transaction");

const getTransactions = async (req, res) => {
  try {
    let data = await Transaction.find({});
    console.log(data); 
    res.status(200).json({ data: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

module.exports = {
  getTransactions,
};
