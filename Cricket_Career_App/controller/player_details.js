const PlayerDetails = require("../models/player_details");

exports.addPlayer = async (req, res, next) => {
  try {
    const {
      name,
      dateOfBirth,
      photoURL,
      birthplace,
      career,
      matches,
      score,
      fifties,
      centuries,
      wickets,
      average,
    } = req.body;

    const newPlayer = await PlayerDetails.create({
      name,
      dateOfBirth,
      photoURL,
      birthplace,
      career,
      matches,
      score,
      fifties,
      centuries,
      wickets,
      average,
    });

    res.status(201).json({ player: newPlayer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding player details" });
  }
};

exports.getPlayer = async (req, res, next) => {
  try {
    const players = await PlayerDetails.findAll();
    res.status(200).json({ players });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error getting player details" });
  }
};

exports.editPlayer = async (req, res, next) => {
  try {
    const playerId = req.params.id;
    const {
      name,
      dateOfBirth,
      photoURL,
      birthplace,
      career,
      matches,
      score,
      fifties,
      centuries,
      wickets,
      average,
    } = req.body;

    const player = await PlayerDetails.findByPk(playerId);

    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    player.name = name;
    player.dateOfBirth = dateOfBirth;
    player.photoURL = photoURL;
    player.birthplace = birthplace;
    player.career = career;
    player.matches = matches;
    player.score = score;
    player.fifties = fifties;
    player.centuries = centuries;
    player.wickets = wickets;
    player.average = average;

    await player.save();

    res.status(200).json({ message: "Player details updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error editing player details" });
  }
};

exports.deletePlayer = async (req, res, next) => {
  try {
    const playerId = req.params.id;
    const player = await PlayerDetails.findByPk(playerId);

    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    await player.destroy();

    res.status(200).json({ message: "Player deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting player details" });
  }
};
