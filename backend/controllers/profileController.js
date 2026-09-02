const pool = require("../config/db");

// GET USER PROFILE
const getProfile = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Get user information
    const [users] = await pool.query(
      `SELECT user_id, full_name, username, email, created_at
       FROM users
       WHERE user_id = ?`,
      [user_id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = users[0];

    // Get user's skills
    const [skills] = await pool.query(
      `SELECT 
        s.skill_id,
        s.skill_name,
        s.category_id,
        s.description,
        us.skill_type,
        us.proficiency
       FROM user_skills us
       JOIN skills s ON us.skill_id = s.skill_id
       WHERE us.user_id = ?
       ORDER BY us.skill_type, s.skill_name`,
      [user_id]
    );

    res.status(200).json({
      success: true,
      user,
      skills,
    });

  } catch (error) {
    console.error("Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load profile",
    });
  }
};

module.exports = {
  getProfile,
};