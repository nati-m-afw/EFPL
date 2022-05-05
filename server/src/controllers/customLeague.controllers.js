const asyncHandler = require("express-async-handler");
const CustomLeagueModel = require("../models/CustomLeague");

const getAllCustomLeagues = asyncHandler(async function (req, res) {
  const result = await CustomLeagueModel.find({});

  res.send(result);
});

const createCustomLeague = asyncHandler(async function (req, res) {
  const {
    adminId,
    leagueName,
    leagueType = "Public",
    leagueStartGameWeek = 1,
  } = req.body;

  await new CustomLeagueModel({
    teams: [adminId],
    leagueType,
    leagueName,
    adminId,
    leagueStartGameWeek,
  }).save();

  res.send(`Custom league '${leagueName}' created!`);
});

const joinCustomLeague = asyncHandler(async function (req, res) {
  const { playerId, leagueId, leagueCode } = req.body;

  const customLeague = await CustomLeagueModel.findOne({ leagueId });

  if (!customLeague) {
    res.status(400).send("Couldn't find a custom league with the provided ID!");
    return;
  }

  if (customLeague.leagueType === "Public") {
    customLeague.teams.push(playerId);
    res.send(`Successfully joined ${customLeague.leagueName}!`);
  } else {
    if (customLeague.leagueCode === leagueCode) {
      customLeague.teams.push(playerId);
      res.send(`Successfully joined ${customLeague.leagueName}!`);
    } else {
      res.send("Incorrect league code!");
    }
  }

  await customLeague.save();
});

const clearAllCustomLeagues = asyncHandler(async (req, res) => {
  await CustomLeagueModel.deleteMany({});

  res.send("done");
});

module.exports = {
  getAllCustomLeagues,
  createCustomLeague,
  joinCustomLeague,
  clearAllCustomLeagues,
};
