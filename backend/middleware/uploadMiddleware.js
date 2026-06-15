const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage:multer.memoryStorage()
});

module.exports = upload;