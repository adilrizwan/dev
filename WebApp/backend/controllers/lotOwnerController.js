const lotOwnerOps = require("../db/lotOwnerOps");
const paginate = require("../middleware/pagination");
exports.dashboard = async (req, res) => {
  if (req.user.role === "LOTOWNER") {
    try {
      const pages = await paginate.paginate(req.query.page);
      const profile = await lotOwnerOps.dashboard(req.user.id, pages.start, pages.limit);
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
  if (req.user.role === "LOTOWNER") {
    try {
      const profile = await lotOwnerOps.getProfile(req.user.id);
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
  if (req.user.role === "LOTOWNER") {
    try {
      const post = req.body;
      const update = await lotOwnerOps.updateProfile(req.user.id, post);
      if (update === 1) {
        res.status(200).json({ message: "Success" });
      } else {
        res.status(204).json({ message: "Post not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
exports.addLot = async (req, res) => {
  if (req.user.role === "LOTOWNER") {
    try {
      const post = req.body;
      if (!post.AddressL1 || !post.City || !post.Country || !post.LotName) {
        res.status(400).json({ message: "Enter all required fields." });
        return;
      }
      if (!post.TotalZones || post.TotalZones < 1) {
        post.TotalZones = 1;
      }
      if (!post.PostalCode) {
        post.PostalCode = "";
      }
      if (!post.AddressL2) {
        post.AddressL2 = "";
      }
      const update = await lotOwnerOps.addLot(req.user.id, post);
      if (update === 1) {
        res.status(200).json({ message: "Success" });
      } else {
        res
          .status(204)
          .json({ message: "User not found. Please contact ParkSense" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
exports.updateLotStatus = async (req, res) => {
    if (req.user.role === "LOTOWNER") {
      try {
        const post = req.body
        const update = await lotOwnerOps.updateLotStatus(req.user.id, post);
        if (update === 1) {
          res.status(200).json({ message: "Success" });
        } else {
          res
            .status(204)
            .json({ message: "Lot not found" });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: error });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  };
