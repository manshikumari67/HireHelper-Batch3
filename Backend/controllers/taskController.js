const Task = require("../models/Task");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// -------------------------CHECK FILE TYPE -------------------------

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}


// ----------------- CREATE TASK -------------------------

exports.createTask = async (req, res) => {

  try {

    const { title, description, location, start_time, end_time } = req.body || {};

    const userId = req.user.id;

    const file = req.files.picture;

    console.log("FILE FOUND:", file);

    // validate file type
    const supportedTypes = ["jpg", "jpeg", "png"];

    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {

      return res.status(400).json({
        success: false,
        message: "File Format is not supported",
      });

    }


    // upload to cloudinary
    const response = await uploadImageToCloudinary(
      file,
      "hirehelper"
    );

    console.log("CLOUDINARY URL:", response);


    // save to database
    const task = await Task.create({

      createdBy: userId,
      title,
      description,
      location,
      start_time,
      end_time,
      picture: response.secure_url,

    });


    // success response
    res.status(200).json({

      success: true,
      message: "Task created successfully",
      imageUrl: response.secure_url,

    });

  }

  catch (error) {

     console.error(error);
        res.status(400).json({
            success: false,
            message: 'Something went wrong'
        })

  }

};

// ------------------------- GET ALL TASKS -------------------------


exports.getAllTasks = async (req, res) => {

  try {

    const tasks = await Task.find().populate("createdBy", "first_name email_id").sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      tasks,
    });
  }
  catch (error) {
    console.error("GET ALL TASK ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ------------------------- GET MY TASKS -------------------------


exports.getMyTasks = async (req, res) => {

  try {

    const userId = req.user.id;
    const tasks = await Task.find({
      createdBy: userId,
    })
    .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      tasks,
    });
  }

  catch (error) {
    console.error("GET MY TASK ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};