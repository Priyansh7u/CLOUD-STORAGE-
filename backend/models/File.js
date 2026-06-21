const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({

  user: {
  type: require("mongoose").Schema.Types.ObjectId,
  ref: "User",
  required: true
},


    name: {
      type: String,
      required: true,
    },

    originalName: String,

    url: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },

    fileType: String,

    size: Number,

    tags: [String],

    favourite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

fileSchema.index({ name: "text" });

module.exports = mongoose.model("File", fileSchema);