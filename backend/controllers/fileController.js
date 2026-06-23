const File = require("../models/File");
const uploadToCloudinary =
require("../utils/cloudinaryUpload");
const cloudinary =
require("../config/cloudinary");

const { nanoid } =
require("nanoid");

exports.uploadFile = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result =
      await uploadToCloudinary(
        req.file.buffer
      );

    const file =
      await File.create({
        user: req.user._id,
        name: req.file.originalname,
        originalName:
          req.file.originalname,
        url: result.secure_url,
        publicId: result.public_id,
        fileType: req.file.mimetype,
        size: req.file.size,
      });

      if (global.io) {
  global.io.emit("fileUploaded", file);
    }

    res.status(201).json({
      success: true,
      file,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

exports.getFiles = async (req, res) => {
  try {

    const files =
      await File.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: files.length,
      files,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

exports.deleteFile = async (
  req,
  res
) => {

  try {

    const file =
      await File.findById(
        req.params.id
      );

    if (!file) {

      return res.status(404).json({
        success: false,
        message: "File not found",
      });

    }

    console.log("FILE:");
    console.log(file);

    if (file.publicId) {

      if (
        file.fileType &&
        file.fileType.startsWith("video")
      ) {

        await cloudinary.uploader.destroy(
          file.publicId,
          {
            resource_type: "video",
          }
        );

      } else {

        await cloudinary.uploader.destroy(
          file.publicId
        );

      }

    }

    await file.deleteOne();
    if (global.io) {
  global.io.emit("fileDeleted", file._id);
   }
    res.json({
      success: true,
      message: "Deleted Successfully",
    });

  } catch (error) {

    console.error(
      "DELETE ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

exports.searchFiles =
async (req, res) => {

  try {

    const keyword =
      req.query.search || "";

    const files =
      await File.find({
        name: {
          $regex: keyword,
          $options: "i",
        },
      });

    res.json({
      success: true,
      files,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

exports.dashboardStats =
async (req, res) => {

  try {

    const totalFiles =
      await File.countDocuments();

    const storage =
      await File.aggregate([
        {
          $group: {
            _id: null,
            total: {
              $sum: "$size",
            },
          },
        },
      ]);

    res.json({
      success: true,
      totalFiles,
      totalStorage:
        storage[0]?.total || 0,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

exports.createShareLink =
async (req, res) => {

  try {

    const file =
      await File.findById(
        req.params.id
      );

    if (!file) {

      return res.status(404).json({
        success: false,
        message: "File not found"
      });

    }

    file.shareId =
      nanoid(10);

    file.isPublic =
      true;

    await file.save();

    res.json({
      success: true,
      shareLink:
      `http://localhost:5173/share/${file.shareId}`
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
exports.getSharedFile =
async (req, res) => {

  try {

    const file =
      await File.findOne({

        shareId:
        req.params.shareId,

        isPublic: true

      });

    if (!file) {

      return res.status(404).json({
        success: false,
        message:
        "File not found"
      });

    }

    res.json({
      success: true,
      file
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};