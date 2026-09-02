const pool = require("../config/db");

// Get all available skills
const getAllSkills = async (req, res) => {
  try {
    const [skills] = await pool.query(`
      SELECT 
        s.skill_id,
        s.skill_name,
        s.description,
        c.category_id,
        c.category_name
      FROM skills s
      LEFT JOIN categories c 
        ON s.category_id = c.category_id
      ORDER BY c.category_name, s.skill_name
    `);

    res.json({
      success: true,
      skills,
    });
  } catch (error) {
    console.error("Get Skills Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch skills",
    });
  }
};


// Add skill to user
const addUserSkill = async (req, res) => {
  try {
    const { user_id, skill_id, skill_type, proficiency } = req.body;

    if (!user_id || !skill_id || !skill_type) {
      return res.status(400).json({
        success: false,
        message: "User, skill and skill type are required",
      });
    }

    if (!["teach", "learn"].includes(skill_type)) {
      return res.status(400).json({
        success: false,
        message: "Skill type must be teach or learn",
      });
    }

    await pool.query(
      `INSERT INTO user_skills
       (user_id, skill_id, skill_type, proficiency)
       VALUES (?, ?, ?, ?)`,
      [user_id, skill_id, skill_type, proficiency || null]
    );

    res.status(201).json({
      success: true,
      message: "Skill added successfully",
    });

  } catch (error) {
    console.error("Add User Skill Error:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "This skill has already been added",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to add skill",
    });
  }
};


// Get skills of a user
const getUserSkills = async (req, res) => {
  try {
    const { user_id } = req.params;

    const [skills] = await pool.query(
      `SELECT
        us.user_skill_id,
        us.skill_type,
        us.proficiency,
        s.skill_id,
        s.skill_name,
        c.category_name
       FROM user_skills us
       JOIN skills s
         ON us.skill_id = s.skill_id
       LEFT JOIN categories c
         ON s.category_id = c.category_id
       WHERE us.user_id = ?
       ORDER BY us.skill_type, s.skill_name`,
      [user_id]
    );

    res.json({
      success: true,
      skills,
    });

  } catch (error) {
    console.error("Get User Skills Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user skills",
    });
  }
};


// Delete user's skill
const deleteUserSkill = async (req, res) => {
  try {
    const { user_skill_id } = req.params;
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Check whether this skill belongs to the logged-in user
    const [skill] = await pool.query(
      `SELECT user_skill_id
       FROM user_skills
       WHERE user_skill_id = ? AND user_id = ?`,
      [user_skill_id, user_id]
    );

    if (skill.length === 0) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to remove this skill",
      });
    }

    await pool.query(
      "DELETE FROM user_skills WHERE user_skill_id = ? AND user_id = ?",
      [user_skill_id, user_id]
    );

    res.json({
      success: true,
      message: "Skill removed successfully",
    });

  } catch (error) {
    console.error("Delete User Skill Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to remove skill",
    });
  }
};

// Find students by skill
const findStudentsBySkill = async (req, res) => {
  try {
    const { skill_id, user_id } = req.query;

    let query = `
      SELECT
        u.user_id,
        u.full_name,
        u.username,
        u.email,
        s.skill_id,
        s.skill_name,
        us.proficiency
      FROM user_skills us
      JOIN users u
        ON us.user_id = u.user_id
      JOIN skills s
        ON us.skill_id = s.skill_id
      WHERE us.skill_type = 'teach'
    `;

    const params = [];

    if (skill_id) {
      query += " AND s.skill_id = ?";
      params.push(skill_id);
    }

    if (user_id) {
      query += " AND u.user_id != ?";
      params.push(user_id);
    }

    query += " ORDER BY u.full_name";

    const [students] = await pool.query(query, params);

    res.json({
      success: true,
      students,
    });
  } catch (error) {
    console.error("Find Students Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to find students",
    });
  }
};

module.exports = {
  getAllSkills,
  addUserSkill,
  getUserSkills,
  deleteUserSkill,
  findStudentsBySkill,
};

