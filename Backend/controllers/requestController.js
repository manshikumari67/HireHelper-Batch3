const Request = require("../models/Request");
const Task = require("../models/Task");

// ---------------- SEND REQUEST ----------------
exports.sendRequest = async (req, res) => {
  try {
    const { task_id } = req.body;
    const requester_id = req.user.id;

    const existing = await Request.findOne({ task_id, requester_id });
    if (existing) {
      return res.status(400).json({ message: "Already requested" });
    }

    const request = await Request.create({
      task_id,
      requester_id,
    });

    res.json({ success: true, request });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- GET REQUESTS (OWNER) ----------------
exports.getRequestsForOwner = async (req, res) => {
  try {
    const user_id = req.user.id;

    const tasks = await Task.find({ createdBy: user_id }).select("_id");
    const taskIds = tasks.map((t) => t._id);

    const requests = await Request.find({
      task_id: { $in: taskIds },
    })
      .populate("requester_id", "first_name last_name")
      .populate(
        "task_id",
        "title description location start_time end_time picture status"
      );

    res.json({ success: true, requests });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- MY REQUESTS ----------------
exports.getMyRequests = async (req, res) => {
  try {
    const requester_id = req.user.id;

    const requests = await Request.find({ requester_id })
      .populate({
        path: "task_id",
        select:
          "title description location start_time end_time picture createdBy status",
        populate: {
          path: "createdBy",
          select: "first_name last_name",
        },
      });

    res.json({ success: true, requests });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- ACCEPT ----------------
exports.acceptRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await Request.findById(requestId);

    request.status = "accepted";
    await request.save();

    await Request.updateMany(
      { task_id: request.task_id, _id: { $ne: requestId } },
      { status: "rejected" }
    );

    await Task.findByIdAndUpdate(request.task_id, {
      status: "accepted",
      helper_id: request.requester_id,
    });

    res.json({ success: true });

  } catch {
    res.status(500).json({ message: "Error" });
  }
};

// ---------------- REJECT ----------------
exports.rejectRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    await Request.findByIdAndUpdate(requestId, {
      status: "rejected",
    });

    res.json({ success: true });

  } catch {
    res.status(500).json({ message: "Error" });
  }
};

// ---------------- CANCEL ----------------
exports.cancelRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.user.id;

    const request = await Request.findById(requestId);

    if (String(request.requester_id) !== String(userId)) {
      return res.status(403).json({ message: "Not allowed" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ message: "Only pending can cancel" });
    }

    await Request.findByIdAndDelete(requestId);

    res.json({ success: true });

  } catch {
    res.status(500).json({ message: "Error" });
  }
};