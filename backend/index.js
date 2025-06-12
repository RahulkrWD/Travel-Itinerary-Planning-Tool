const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const connectDB = require("./config/mongo.config");
const authRoutes = require("./routes/auth.route");
const app = express();
connectDB();


app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);


app.get("/", (req, res)=>{
  res.status(200).json({message: "Test Router", success: true})
})
app.use((req, res) => {
  res.status(404).json({ message: "Route not found", error: error.message, success: false });
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
