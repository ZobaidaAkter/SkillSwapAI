const express = require("express");

const {
  sendSkillRequest,
  getIncomingRequests,
  getSentRequests,
  updateRequestStatus,
} = require("../controllers/requestController");

const router = express.Router();

router.post("/", sendSkillRequest);

router.get("/incoming/:user_id", getIncomingRequests);

router.get("/sent/:user_id", getSentRequests);

router.put("/:request_id/status", updateRequestStatus);

module.exports = router;