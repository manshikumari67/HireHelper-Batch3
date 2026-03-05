const { cloudinary } = require("../config/cloudinary");

exports.uploadImageToCloudinary = async (file, folder) => {

  try {

    const options = { folder };
    options.resource_type = "auto";

    console.log("Uploading file from:", file.tempFilePath);

    const response = await cloudinary.uploader.upload(
      file.tempFilePath,
      options
    );

    return response;

  }

  catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }

};