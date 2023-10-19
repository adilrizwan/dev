const carOwnerOps = require("../db/carOwnerOps");
const paginate = require("../middleware/pagination");
exports.dashboard = async (req, res) => {
  if (req.user.role === "CAROWNER") {
    try {
      const pages = await paginate.paginate(req.query.page);
      const profile = await carOwnerOps.dashboard(
        req.user.id,
        pages.start,
        pages.limit
      );
      res.json(profile);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
exports.getProfile = async (req, res) => {
  if (req.user.role === "CAROWNER") {
    try {
      const profile = await carOwnerOps.getProfile(req.user.id);
      res.json(profile);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
exports.updateProfile = async (req, res) => {
  if (req.user.role === "CAROWNER") {
    try {
      const post = req.body;
      const update = await carOwnerOps.updateProfile(req.user.id, post);
      if (update === 1) {
        res.status(200).json({ message: "Success" });
      } else {
        res.status(204).json({ message: "User not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
exports.addCar = async (req, res) => {
  if (req.user.role === "CAROWNER") {
    try {
      const post = req.body;
      if (
        !post.RegNo ||
        !post.Make ||
        !post.Model ||
        !post.RegYear ||
        !post.Color ||
        !post.Type
      ) {
        res.status(400).json({ message: "Enter all required fields." });
        return;
      }
      const update = await carOwnerOps.addCar(req.user.id, post);
      if (update === 1) {
        res.status(200).json({ message: "Success" });
      } else {
        res.status(204).json({ message: "Car is already registered." });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
exports.deleteCar = async (req, res) => {
  if (req.user.role === "CAROWNER") {
    try {
      const post = req.body;
      const update = await carOwnerOps.deleteCar(req.user.id, post);
      if (update === 1) {
        res.status(200).json({ message: "Success" });
      } else {
        res.status(204).json({ message: "Car not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
