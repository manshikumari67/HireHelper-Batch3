const express = require("express");
const router = express.Router();

const {sendRequest,getRequestsForOwner,getMyRequests,acceptRequest,rejectRequest, cancelRequest} = require("../controllers/requestController");

const { authMiddleware } = require("../middleware/auth");

router.post("/send", authMiddleware, sendRequest);

router.get("/received", authMiddleware, getRequestsForOwner);

router.get("/myRequests", authMiddleware, getMyRequests);

router.put("/accept/:requestId", authMiddleware, acceptRequest);

router.put("/reject/:requestId", authMiddleware, rejectRequest);

router.delete("/cancel/:requestId", authMiddleware, cancelRequest);

module.exports = router;