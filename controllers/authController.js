const pool = require("../config/db");
const bcrypt = require("bcrypt");

// REGISTER
const registerUser = async (req, res) => {
  try {
    const { full_name, username, email, password } = req.body;

    if (!full_name || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const [existingUser] = await pool.query(
      "SELECT user_id FROM users WHERE email = ? OR username = ?",
      [email, username]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email or username already exists",
      });
    }

    // Hash password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users 
      (role_id, full_name, username, email, password)
      VALUES (?, ?, ?, ?, ?)`,
      [1, full_name, username, email, hashedPassword]
    );

    res.status(201).json({
      success: true,
      message: "Registration successful",
    });

  } catch (error) {
    console.error("Register Error:", error);

    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};


// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const [users] = await pool.query(
      `SELECT user_id, role_id, full_name, username, email, password
       FROM users
       WHERE email = ?`,
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = users[0];

    // Compare entered password with hashed password
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        user_id: user.user_id,
        role_id: user.role_id,
        full_name: user.full_name,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};


module.exports = {
  registerUser,
  loginUser,
};