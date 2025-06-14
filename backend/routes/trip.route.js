const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const tripController = require("../controllers/trip.controller");
const router = express.Router();

router.post("/add-trip", authMiddleware, tripController.createTrip);
router.get("/get-trip", authMiddleware, tripController.getTrip);
router.get("/get-trip/:id", authMiddleware, tripController.getTripById);
router.delete("/delete-trip", authMiddleware, tripController.deleteTrip);

// Collaboration
router.post("/invite", authMiddleware, tripController.inviteCollaborator);
router.patch("/respond/:id", tripController.respondToInvite);
router.get(
  "/collaboration/:tripId",
  authMiddleware,
  tripController.getCollaborations
);
// add new expense
router.post("/add-expense", authMiddleware, tripController.addExpense);
router.get("/get-expense/:tripId", authMiddleware, tripController.getExpense);

module.exports = router;
