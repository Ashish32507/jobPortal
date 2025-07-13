const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dbConnection = require("./config/dbConnection");
const userRoutes = require("./Routes/userRoutes");
const companyRoutes = require("./Routes/companyRoutes");
const jobRoutes = require("./Routes/jobRoutes");
const ApplicationRoutes = require("./Routes/applicationRoute");

require("dotenv").config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOption = {
  origin: "https://job-portal-n4v3.vercel.app",
  credentials: true,
};

app.use(cors(corsOption));

const PORT = process.env.PORT || 3000;

app.use("/ap1/v1/user", userRoutes);
app.use("/ap1/v1/company", companyRoutes);
app.use("/ap1/v1/job", jobRoutes);
app.use("/ap1/v1/application", ApplicationRoutes);
// Connect to the database
dbConnection();

app.listen(PORT, () => {
  console.log(`Your Server Is Running On ${PORT}`);
});
