require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/database");
const upload = require("./middleware/uploadMiddleware");

const app = express();

connectDB();

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(morgan("dev"));

app.use(express.json());


app.post("/test-upload", upload.single("file"), (req, res) => {
  console.log(req.file);

  res.json({
    success: true,
    file: req.file
  });
});

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200
  })
);

app.use(
 "/api/files",
 require("./routes/fileRoutes")
);

app.use(
 "/api/notes",
 require("./routes/noteRoutes")
);

app.use(
 "/api/auth",
 authRoutes
);



app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Personal Cloud API Running"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});