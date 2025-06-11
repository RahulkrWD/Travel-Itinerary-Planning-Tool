const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
 const connectDB = require("./config/mongo.config");
 const authRoutes = require("./routes/auth.route");

const app = express();
connectDB();
app.use(express.json());

 app.use("/auth", authRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
