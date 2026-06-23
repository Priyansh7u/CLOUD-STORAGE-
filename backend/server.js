require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const upload = require("./middleware/uploadMiddleware");

const app = express();

connectDB();

app.set("trust proxy", 1);

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:4173",
  "https://cloudwx.vercel.app",
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`⚠️  Blocked by CORS: ${origin}`);
      callback(null, true);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin"
  ],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 86400
}));

app.options("/*splat", cors());

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "blob:", "https:"],
        mediaSrc: ["'self'", "https:"],
        connectSrc: ["'self'", ...allowedOrigins],
        fontSrc: ["'self'", "https:", "data:"],
        objectSrc: ["'none'"],
        frameSrc: ["'self'"],
        upgradeInsecureRequests: []
      }
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    }
  })
);

app.use(compression({ level: 6 }));

app.use(
  morgan(
    ":date[iso] | :method :url :status | :response-time ms | :remote-addr",
    {
      skip: (req) => req.url === "/health"
    }
  )
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
    retryAfter: "15 minutes"
  },
  skip: (req) => req.ip === "127.0.0.1" || req.ip === "::1",
  handler: (req, res) => {
    console.warn(`⚠️  Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: "Too many requests, please try again later.",
      retryAfter: "15 minutes"
    });
  }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many authentication attempts. Please try again later."
  }
});

app.use(globalLimiter);
app.use("/api/auth", authLimiter);

app.post(
  "/test-upload",
  upload.single("file"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded. Please select a file."
      });
    }

    console.log("✅ Test upload successful:", req.file.originalname);
    
    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      file: req.file
    });
  }
);

app.use("/api/auth", authRoutes);
app.use("/api/files", require("./routes/fileRoutes"));
app.use("/api/notes", require("./routes/noteRoutes"));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Personal Cloud API Running 🚀",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
    version: process.env.npm_package_version || "1.0.0"
  });
});

app.get("/health", (req, res) => {
  const healthCheck = {
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    cpu: process.cpuUsage(),
    environment: process.env.NODE_ENV || "development",
    nodeVersion: process.version,
    platform: process.platform
  };

  res.status(200).json(healthCheck);
});

app.use((req, res) => {
  console.warn(`⚠️  404 - Route not found: ${req.method} ${req.originalUrl}`);
  
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
    timestamp: new Date().toISOString()
  });
});

app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  
  if (err.name === "MulterError") {
    return res.status(400).json({
      success: false,
      message: `Upload error: ${err.message}`,
      code: err.code
    });
  }

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "CORS error: Origin not allowed"
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === "production" 
      ? "Internal server error" 
      : err.message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack })
  });
});

process.on("uncaughtException", (error) => {
  console.error("💥 Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("⚠️  Unhandled Rejection at:", promise, "reason:", reason);
});

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log("╔══════════════════════════════════════════╗");
  console.log("║   🚀 Personal Cloud Server Running       ║");
  console.log(`║   📍 Port: ${PORT}                          ║`);
  console.log(`║   🌍 Host: ${HOST}                      ║`);
  console.log(`║   🔧 Environment: ${process.env.NODE_ENV || "development"}              ║`);
  console.log(`║   🔗 URL: http://localhost:${PORT}          ║`);
  console.log("╚══════════════════════════════════════════╝");
});

module.exports = app;