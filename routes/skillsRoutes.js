const express = require("express");

const {
  getAllSkills,
  addUserSkill,
  getUserSkills,
  deleteUserSkill,
  findStudentsBySkill,
} = require("../controllers/skillsController");

const router = express.Router();

router.get("/", getAllSkills);

router.post("/user", addUserSkill);

router.get("/user/:user_id", getUserSkills);

router.delete("/user/:user_skill_id", deleteUserSkill);

router.get("/find", findStudentsBySkill);

module.exports = router;