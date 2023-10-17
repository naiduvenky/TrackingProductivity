const joiProductivity = require("joi");
const { schema } = require("../validations/userProductivityValidations");
const Sequelize = require("sequelize");
const { Prodictivitie, User } = require("../models");
const { Op } = require("sequelize"); // Import the Op operator for range queries
// Create a new userProductivity
// Function to calculate productivity percentage
function calculateProductivity(totalStudyTime, optimalStudyTime) {
  // Ensure that both totalStudyTime and optimalStudyTime are non-negative numbers
  if (totalStudyTime < 0 || optimalStudyTime < 0) {
    throw new Error("Study times must be non-negative numbers.");
  }

  // Calculate the productivity as a percentage
  const productivity = (totalStudyTime / optimalStudyTime) * 100;
  return productivity;
}

exports.createUserProductivity = async (req, res) => {
  try {
    console.log(req.body);
    // Validate userProductivity input
    const { error, value } = await schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const totalStudyTime = req.body.timing.reduce((a, b) => a + b, 0);
    const productivity = calculateProductivity(totalStudyTime, 360);
    const productivityObject = {
      UserId: req.user.id,
      dateOfEntry: req.body.dateOfEntry || new Date(),
      subjects: req.body.subjects,
      timing: req.body.timing,
      productivity: productivity,
    };
    // Create a new userProductivity
    const UserProductivity = await Prodictivitie.create(productivityObject);
    return res.status(201).json(UserProductivity);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create UserProductivity" });
  }
};

// Get all userProductivity
exports.getAllUserProductivity = async (req, res) => {
  try {
    const userProductivity = await Prodictivitie.findAll();
    return res.status(200).json(userProductivity);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to retrieve userProductivity" });
  }
};

// Controller function to get records between start and end dates for a specific user
exports.getRecordsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const userId = req.user.id;
    console.log(userId, startDate, endDate);
    // Validate input (you may want to add more validation)
    if (!userId || !startDate || !endDate) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    // Find the user by their ID to ensure it exists
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Retrieve records for the specified user and date range
    const records = await Prodictivitie.findAll({
      where: {
        UserId: userId,
        dateOfEntry: {
          [Op.between]: [startDate, endDate],
        },
      },
      order: [["dateOfEntry", "DESC"]],
      // Order by dateOfEntry in descending order
    });

    return res.status(200).json(records);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error fetching records" });
  }
};

// Get a specific userProductivity by ID
exports.getUserProductivityById = async (req, res) => {
  const { id } = req.params;
  try {
    const UserProductivity = await Prodictivitie.findByPk(id);
    if (!UserProductivity) {
      return res.status(404).json({ error: "Prodictivitie not found" });
    }
    return res.status(200).json(UserProductivity);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to retrieve UserProductivity" });
  }
};

// Update a userProductivity by ID
exports.updateUserProductivityById = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Prodictivitie.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedUserProductivity = await Prodictivitie.findByPk(id);
      return res.status(200).json(updatedUserProductivity);
    }
    return res.status(404).json({ error: "Prodictivitie not found" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update UserProductivity" });
  }
};

// Delete a userProductivity by ID
exports.deleteUserProductivityById = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Prodictivitie.destroy({
      where: { id },
    });
    if (deleted) {
      return res.status(204).send({message: "Productivity Record Deleted Successfully!"});
    }
    return res.status(404).json({ error: "Prodictivitie not found" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete UserProductivity" });
  }
};
