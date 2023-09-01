const express = require('express');

const playerDetailsController = require('../controller/player_details');

const router = express.Router();

router.post("/player_details/add-playerdata", playerDetailsController.addPlayer);

router.get("/player_details/get-playerdata", playerDetailsController.getPlayer);

router.put("/player_details/edit-playerdata/:id", playerDetailsController.editPlayer);

router.delete("/player_details/delete-playerdata/:id", playerDetailsController.deletePlayer);

module.exports = router;