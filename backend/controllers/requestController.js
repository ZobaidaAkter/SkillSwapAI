const pool = require("../config/db");

// Send a skill request
const sendSkillRequest = async (req, res) => {
  try {
    const {
      sender_id,
      receiver_id,
      skill_id,
      message,
    } = req.body;

    if (!sender_id || !receiver_id || !skill_id) {
      return res.status(400).json({
        success: false,
        message: "Sender, receiver and skill are required",
      });
    }

    if (Number(sender_id) === Number(receiver_id)) {
      return res.status(400).json({
        success: false,
        message: "You cannot send a request to yourself",
      });
    }

    // Check sender exists
    const [sender] = await pool.query(
      "SELECT user_id FROM users WHERE user_id = ?",
      [sender_id]
    );

    if (sender.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Sender not found",
      });
    }

    // Check receiver exists
    const [receiver] = await pool.query(
      "SELECT user_id FROM users WHERE user_id = ?",
      [receiver_id]
    );

    if (receiver.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Receiver not found",
      });
    }

    // Check whether the receiver can teach this skill
    const [teacherSkill] = await pool.query(
      `SELECT user_skill_id
       FROM user_skills
       WHERE user_id = ?
       AND skill_id = ?
       AND skill_type = 'teach'`,
      [receiver_id, skill_id]
    );

    if (teacherSkill.length === 0) {
      return res.status(400).json({
        success: false,
        message: "This student does not teach this skill",
      });
    }

    // Check existing pending request
    const [existingRequest] = await pool.query(
      `SELECT request_id
       FROM skill_requests
       WHERE sender_id = ?
       AND receiver_id = ?
       AND skill_id = ?
       AND status = 'pending'`,
      [sender_id, receiver_id, skill_id]
    );

    if (existingRequest.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Request already sent",
      });
    }

    await pool.query(
      `INSERT INTO skill_requests
       (sender_id, receiver_id, skill_id, message)
       VALUES (?, ?, ?, ?)`,
      [
        sender_id,
        receiver_id,
        skill_id,
        message || null,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Skill request sent successfully",
    });

  } catch (error) {
    console.error("Send Request Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send skill request",
    });
  }
};


// Get incoming requests
const getIncomingRequests = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Check user exists
    const [user] = await pool.query(
      "SELECT user_id FROM users WHERE user_id = ?",
      [user_id]
    );

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const [requests] = await pool.query(
      `SELECT
        sr.request_id,
        sr.sender_id,
        sr.receiver_id,
        sr.skill_id,
        sr.message,
        sr.status,
        sr.created_at,
        u.full_name AS sender_name,
        u.username AS sender_username,
        s.skill_name
       FROM skill_requests sr
       JOIN users u
         ON sr.sender_id = u.user_id
       JOIN skills s
         ON sr.skill_id = s.skill_id
       WHERE sr.receiver_id = ?
       ORDER BY sr.created_at DESC`,
      [user_id]
    );

    res.json({
      success: true,
      requests,
    });

  } catch (error) {
    console.error("Incoming Requests Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch incoming requests",
    });
  }
};


// Get sent requests
const getSentRequests = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Check user exists
    const [user] = await pool.query(
      "SELECT user_id FROM users WHERE user_id = ?",
      [user_id]
    );

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const [requests] = await pool.query(
      `SELECT
        sr.request_id,
        sr.sender_id,
        sr.receiver_id,
        sr.skill_id,
        sr.message,
        sr.status,
        sr.created_at,
        u.full_name AS receiver_name,
        u.username AS receiver_username,
        s.skill_name
       FROM skill_requests sr
       JOIN users u
         ON sr.receiver_id = u.user_id
       JOIN skills s
         ON sr.skill_id = s.skill_id
       WHERE sr.sender_id = ?
       ORDER BY sr.created_at DESC`,
      [user_id]
    );

    res.json({
      success: true,
      requests,
    });

  } catch (error) {
    console.error("Sent Requests Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch sent requests",
    });
  }
};


// Accept or reject request
const updateRequestStatus = async (req, res) => {
  try {
    const { request_id } = req.params;
    const { status, user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid request status",
      });
    }

    // Make sure the logged-in user is the receiver
    const [request] = await pool.query(
      `SELECT request_id, receiver_id, status
       FROM skill_requests
       WHERE request_id = ?`,
      [request_id]
    );

    if (request.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    if (Number(request[0].receiver_id) !== Number(user_id)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this request",
      });
    }

    if (request[0].status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Request has already been processed",
      });
    }

    await pool.query(
      `UPDATE skill_requests
       SET status = ?
       WHERE request_id = ?`,
      [status, request_id]
    );

    res.json({
      success: true,
      message: `Request ${status} successfully`,
    });

  } catch (error) {
    console.error("Update Request Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update request",
    });
  }
};


module.exports = {
  sendSkillRequest,
  getIncomingRequests,
  getSentRequests,
  updateRequestStatus,
};