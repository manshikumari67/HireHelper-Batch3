const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const database = require("./config/database");
const fileUpload = require("express-fileupload");

// ================= LOAD ENV =================
dotenv.config();

// ================= CONNECT DATABASE =================
database.connect();

// ================= MIDDLEWARE =================
app.use(cors());


// ================= FILE UPLOAD =================
app.use(
 fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
 })
);

app.use(express.json());

// ================= CLOUDINARY =================
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// ================= ROUTES =================
// Auth routes
app.use("/api/auth",require("./routes/auth"));

// Task routes (Milestone-2)
app.use("/api/tasks",require("./routes/taskRoutes"));

// ================= DEFAULT ROUTE =================
app.get("/",  (req, res) => {
  res.send("HireHelper API is running");
});

// ================= START SERVER =================
const PORT = process.env.PORT || 4000;
app.listen(PORT,() => {
  console.log(
    `Server running on port ${PORT}`
  );
});