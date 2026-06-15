const express = require("express");

const router = express.Router();

const upload =
require("../middleware/uploadMiddleware");

const {
  uploadFile,
  getFiles,
  deleteFile,
  searchFiles,
  dashboardStats
} = require("../controllers/fileController");

router.post(
  "/upload",
  upload.single("file"),
  uploadFile
);

router.get(
 "/search",
 searchFiles
);

router.get(
  "/stats",
  dashboardStats
);

router.get(
  "/",
  getFiles
);

router.delete(
  "/:id",
  deleteFile
);

console.log({
  uploadFile: typeof exports.uploadFile,
  getFiles: typeof exports.getFiles,
  deleteFile: typeof exports.deleteFile,
  searchFiles: typeof exports.searchFiles,
  dashboardStats: typeof exports.dashboardStats,
});

module.exports = router;