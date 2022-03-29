const asyncHandler = require("express-async-handler");
const statUpdater = require("../utils/helpers").statUpdater;

const FixtureModel = require("../models/Fixtures");
const TeamModel = require("../models/Teams");

const MINUTE_COUNTERS = {};

const postFixture = asyncHandler(async function (req, res) {
  const { gameweekId, schedule, homeTeam, awayTeam } = req.body;

  // query team for id
  const homeTeamData = await TeamModel.findOne({ teamName: homeTeam });
  const awayTeamData = await TeamModel.findOne({ teamName: awayTeam });
  const matchId = `${homeTeamData.teamId}|${awayTeamData.teamId}`;
  const matchStat = {
    minutesPlayed: {},
    goalsScored: {},
    assists: {},
    yellows: {},
    reds: {},
    penaltiesMissed: {},
    penaltiesSaved: {},
    saves: {},
    fantasyScores: {},
  };

  const verifyMatch = await FixtureModel.find({ matchId: matchId });

  const homeTeamHasMatch = await FixtureModel.find({
    gameweekId: gameweekId,
    homeTeam: homeTeam,
  });

  const awayTeamHasMatch = await FixtureModel.find({
    gameweekId: gameweekId,
    awayTeam: awayTeam,
  });

  // If home team already has match
  if (homeTeamHasMatch.length > 0) {
    res
      .status(409)
      .send(
        `Team ${homeTeam} already has a match for game week ${gameweekId}.`
      );
  } else if (awayTeamHasMatch.length > 0) {
    res
      .status(409)
      .send(
        `Team ${awayTeam} already has a match for game week ${gameweekId}.`
      );
  } else if (!verifyMatch.length) {
    await new FixtureModel({
      gameweekId,
      matchId,
      schedule,
      homeTeam,
      awayTeam,
      matchStat,
    }).save();
    res.status(200).send("Fixture added!");
  } else {
    res
      .status(409)
      .send(
        `Fixture ${homeTeam} vs ${awayTeam} for game week ${gameweekId} already exists. `
      );
  }
});

const startFixture = asyncHandler(async function (req, res) {
  const matchId = req.params.matchId;

  const matchParent = await FixtureModel.findOne({ matchId });

  const homeTeam = await TeamModel.find({
    teamId: parseInt(matchId.split("|")[0]),
  });

  const awayTeam = await TeamModel.find({
    teamId: parseInt(matchId.split("|")[1]),
  });

  if (matchParent?.status === "scheduled") {
    matchParent.status = "liveFH"; // First half

    // Minutes Counter Id saved so it can be cleared when the match is done
    MINUTE_COUNTERS[matchId] = { status: "active" };
    MINUTE_COUNTERS[matchId].intervalId = setInterval(async () => {
      if (MINUTE_COUNTERS[matchId].status === "active") {
        console.log("MINUTE COUNTER ->");
        const match = await FixtureModel.findOne({ matchId }).lean();

        const update = { minutesPlayed: {} };

        for (const position in match.homeTeamLineUp.lineup) {
          if (position === "bench") continue;
          for (const playerId of match.homeTeamLineUp.lineup[position]) {
            update.minutesPlayed[playerId] = {
              playerId,
              noOfMinutes:
                match.matchStat.minutesPlayed[playerId].noOfMinutes + 1,
            };
          }
        }

        for (const position in match.awayTeamLineUp.lineup) {
          if (position === "bench") continue;
          for (const playerId of match.awayTeamLineUp.lineup[position]) {
            update.minutesPlayed[playerId] = {
              playerId,
              noOfMinutes:
                match.matchStat.minutesPlayed[playerId].noOfMinutes + 1,
            };
          }
        }

        const result = statUpdater({
          activeMatch: match,
          incomingUpdate: update,
        });

        await FixtureModel.findOneAndUpdate({ matchId }, result, {
          upsert: false,
        });
      }
    }, 1000);

    matchParent
      .save()
      .then(() =>
        res
          .status(200)
          .send(
            `Match ${homeTeam[0].teamName} vs ${awayTeam[0].teamName} is live!`
          )
      )
      .catch(() => res.status(500).send("Try again!"));
  } else if (!matchParent) {
    res
      .status(404)
      .send(
        `Match ${homeTeam[0].teamName} vs ${awayTeam[0].teamName} doesn't exist!`
      );
  } else if (matchParent.status === "FT") {
    res
      .status(400)
      .send(
        `Match ${homeTeam[0].teamName} vs ${awayTeam[0].teamName} has already ended!`
      );
  } else {
    res
      .status(400)
      .send(
        `Match ${homeTeam[0].teamName} vs ${awayTeam[0].teamName} is already live! Try using /fixtures/resume instead.`
      );
  }
});

const pauseFixture = asyncHandler(async function (req, res) {
  const match = await FixtureModel.findOne({ matchId: req.params.matchId });

  const homeTeam = await TeamModel.find({
    teamId: parseInt(req.params.matchId.split("|")[0]),
  });

  const awayTeam = await TeamModel.find({
    teamId: parseInt(req.params.matchId.split("|")[1]),
  });

  if (match?.status === "liveFH") {
    match.status = "HT";

    MINUTE_COUNTERS[req.params.matchId].status = "paused";

    match
      .save()
      .then(() => {
        res.send(
          `Half Time for match ${homeTeam[0].teamName} vs ${awayTeam[0].teamName}!`
        );
      })
      .catch(() => res.status(500).send("Try again!"));
  } else if (!match) {
    res
      .status(404)
      .send(
        `Match ${homeTeam[0].teamName} vs ${awayTeam[0].teamName} doesn't exist!`
      );
  } else if (match.status === "FT") {
    res
      .status(400)
      .send(
        `Match ${homeTeam[0].teamName} vs ${awayTeam[0].teamName} has already ended!`
      );
  } else {
    res
      .status(400)
      .send(
        `Match ${homeTeam[0].teamName} vs ${awayTeam[0].teamName} is not live yet!`
      );
  }
});

const resumeFixture = asyncHandler(async function (req, res) {
  const match = await FixtureModel.findOne({ matchId: req.params.matchId });

  MINUTE_COUNTERS[req.params.matchId].status = "active";
  const homeTeam = await TeamModel.find({
    teamId: parseInt(req.params.matchId.split("|")[0]),
  });

  const awayTeam = await TeamModel.find({
    teamId: parseInt(req.params.matchId.split("|")[1]),
  });

  if (match?.status === "HT") {
    match.status = "liveSH"; // Second half
    match
      .save()
      .then(() =>
        res.send(
          `Match ${homeTeam[0].teamName} vs ${awayTeam[0].teamName} resumed!`
        )
      )
      .catch(() => res.status(500).send("Try again!"));
  } else if (!match) {
    res
      .status(404)
      .send(
        `Match ${homeTeam[0].teamName} vs ${awayTeam[0].teamName} doesn't exist!`
      );
  } else if (match.status === "FT") {
    res
      .status(400)
      .send(
        `Match ${homeTeam[0].teamName} vs ${awayTeam[0].teamName} has already ended!`
      );
  } else {
    res
      .status(400)
      .send(
        `Match ${homeTeam[0].teamName} vs ${awayTeam[0].teamName} can not be resumed!`
      );
  }
});

const endFixture = asyncHandler(async function (req, res) {
  const match = await FixtureModel.findOne({ matchId: req.params.matchId });

  const homeTeam = await TeamModel.find({
    teamId: parseInt(req.params.matchId.split("|")[0]),
  });

  const awayTeam = await TeamModel.find({
    teamId: parseInt(req.params.matchId.split("|")[1]),
  });

  if (match?.status === "liveSH") {
    match.status = "FT";

    MINUTE_COUNTERS[req.params.matchId].status = "ended";
    clearInterval(MINUTE_COUNTERS[req.params.matchId].intervalId);

    match
      .save()
      .then(() =>
        res.send(
          `Full time for match ${homeTeam[0].teamName} vs ${awayTeam[0].teamName}!`
        )
      )
      .catch(() => res.status(500).send("Try again!"));
  } else if (!match) {
    res
      .status(404)
      .send(
        `Match ${homeTeam[0].teamName} vs ${awayTeam[0].teamName} doesn't exist!`
      );
  } else if (match.status === "FT") {
    res
      .status(400)
      .send(
        `Match ${homeTeam[0].teamName} vs ${awayTeam[0].teamName} has already ended!`
      );
  } else {
    res
      .status(400)
      .send(
        `Match ${homeTeam[0].teamName} vs ${awayTeam[0].teamName} can not be ended!`
      );
  }
});

const postponeFixture = asyncHandler(async function (req, res) {
  const match = await FixtureModel.findOne({ matchId: req.params.matchId });

  if (match?.status === "scheduled") {
    match.status = "postponed";
    match
      .save()
      .then(() => res.send("Match postponed!"))
      .catch(() => res.status(500).send("Try again!"));
  } else if (!match) {
    res.status(404).send("Match doesn't exist!");
  } else {
    res.status(400).send("Match is ongoing!");
  }
});

const updateFixture = asyncHandler(async function (req, res) {
  const { gameweekId, schedule, status, homeTeam, awayTeam } = req.body;

  const matchId = req.params.matchId;

  const match = await FixtureModel.findOne({ matchId });

  if (match) {
    match.gameweekId = gameweekId ?? match.gameweekId;
    match.matchId = matchId ?? match.matchId;
    match.schedule = schedule ?? match.schedule;
    match.status = status ?? match.status;
    match.homeTeam = homeTeam ?? match.homeTeam;
    match.awayTeam = awayTeam ?? match.awayTeam;
    await match.save();

    res.send("Match updated!");
  } else if (!match) {
    res.status(404).send("Match doesn't exist!");
  } else {
    res.status(400).send("Match with provided matchid doesn't exist.");
  }
});

const updateLineup = asyncHandler(async (req, res) => {
  const { homeTeamLineUp, awayTeamLineUp } = req.body;

  const matchId = req.params.matchId;

  const match = await FixtureModel.findOne({ matchId });

  if (match) {
    match.homeTeamLineUp = homeTeamLineUp ?? match.homeTeamLineUp;
    match.awayTeamLineUp = awayTeamLineUp ?? match.awayTeamLineUp;
    await match.save();

    res.send("Match lineup updated!");
  } else if (!match) {
    res.status(404).send("Match doesn't exist!");
  } else {
    res.status(400).send("Match with provided matchid doesn't exist.");
  }
});

const updateStats = asyncHandler(async (req, res) => {
  const matchId = req.params.matchId;

  const match = await FixtureModel.findOne({ matchId }).lean();

  if (match) {
    const result = statUpdater({
      activeMatch: match,
      incomingUpdate: req.body,
    });

    await FixtureModel.findOneAndUpdate({ matchId }, result, { upsert: false });

    res.send("Match stats updated!");
  } else if (!match) {
    res.status(404).send("Match doesn't exist!");
  } else {
    res.status(400).send("Match with provided matchid doesn't exist.");
  }
});

const getAllFixtures = asyncHandler(async function (req, res) {
  const matches = await FixtureModel.find().select("-__v");

  res.status(200).send(matches);
});

const getFixture = asyncHandler(async function (req, res) {
  const match = await FixtureModel.findOne({
    matchId: req.params.matchId,
  }).select("-__v");

  match
    ? res.send(match)
    : res.status(400).send("Fixture with provided matchid doesn't exist.");
});

const deleteFixture = asyncHandler(async function (req, res) {
  const deleted = await FixtureModel.deleteOne({ matchId: req.params.matchId });
  deleted
    ? res.send("Match deleted!")
    : res.status(400).send("Match with provided matchid doesn't exist");
});

module.exports = {
  postFixture,
  startFixture,
  pauseFixture,
  resumeFixture,
  endFixture,
  postponeFixture,
  getAllFixtures,
  getFixture,
  deleteFixture,
  updateFixture,
  updateLineup,
  updateStats,
};
