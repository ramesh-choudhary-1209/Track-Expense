const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDb = require("./config/connectDb");

// rest object
const app = express();
const path = require("path");
dotenv.config();

// Connect DB
connectDb();

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// user routes
app.use("/api/v1/users", require("./routes/userRoutes"));
// transaction routes
app.use("/api/v1/transactions", require("./routes/transactionRoutes"));

// static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
