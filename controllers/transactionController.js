const transactionModel = require("../models/transactionModel");
const moment = require("moment");
const getAllTransactions = async (req, res) => {
  try {
    const { filterFrequency, selectedDate, type } = req.body; // Assuming filterFrequency is passed in the request body

    const transactions = await transactionModel.find({
      ...(filterFrequency !== "custom" // Condition for filterFrequency
        ? {
            date: {
              $gt: moment().subtract(Number(filterFrequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: moment(selectedDate[1]).add(1, "days").toDate(),
            },
          }),
      userid: req.body.userid,
      ...(type !== "all" && { type }), // condition for type
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json(error);
  }
};
// const getAllTransactions = async (req, res) => {
//   try {
//     const { filterFrequency, selectedDate, type, userid } = req.body;

//     if (!userid) {
//       return res.status(400).json({ error: "Missing userid" });
//     }

//     let dateFilter = {};

//     if (filterFrequency !== "custom") {
//       dateFilter.date = {
//         $gt: moment().subtract(Number(filterFrequency), "d").toDate(),
//       };
//     } else {
//       if (!selectedDate || selectedDate.length !== 2) {
//         return res.status(400).json({ error: "Invalid selectedDate" });
//       }

//       dateFilter.date = {
//         $gte: new Date(selectedDate[0]),
//         $lte: moment(selectedDate[1]).add(1, "days").toDate(),
//       };
//     }

//     const transactions = await transactionModel.find({
//       ...dateFilter,
//       userid,
//       ...(type !== "all" && { type }),
//     });

//     res.status(200).json(transactions);
//   } catch (error) {
//     console.error("getAllTransactions Error:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).send("Transaction added successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

const editTransaction = async (req, res) => {
  try {
    const { _id, ...updateData } = req.body;
    await transactionModel.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload
    );
    res.status(200).send("Transaction updated successfully");
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json(error);
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { _id, ...updateData } = req.body;
    await transactionModel.findOneAndDelete({ _id: req.body.transactionId });
    res.status(200).send("Transaction deleted successfully");
  } catch (error) {
    console.error("Error Deleting transaction:", error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
};
