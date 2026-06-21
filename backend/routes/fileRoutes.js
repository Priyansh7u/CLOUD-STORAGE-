const express = require("express");

const router = express.Router();

const upload =
require("../middleware/uploadMiddleware");

const auth =
require("../middleware/authMiddleware");

const {
  uploadFile,
  getFiles,
  deleteFile,
  searchFiles,
  dashboardStats
} =
require("../controllers/fileController");

router.post(
  "/upload",
  auth,
  upload.single("file"),
  uploadFile
);

router.get(
  "/search",
  auth,
  searchFiles
);

router.get(
  "/stats",
  auth,
  dashboardStats
);

router.get(
  "/",
  auth,
  getFiles
);

router.delete(
  "/:id",
  auth,
  deleteFile
);

module.exports = router;