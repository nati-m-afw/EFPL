const TeamModel = require("../models/Teams");
const FixtureModel = require("../models/Fixtures");
const asyncHandler = require("express-async-handler");

const { makeFile } = require("../utils/helpers");

const addTeam = asyncHandler(async (req, res) => {
  const {
    teamName,
    teamCity,
    teamStadium,
    teamLogo,
    logoName,
    foundedIn,
    stadiumCapacity,
    teamCoach,
  } = req.body;

  const verifyTeam = await TeamModel.findOne({
    teamName: req.body.teamName,
  });

  if (!verifyTeam) {
    const teamLogoPath = makeFile(teamLogo, logoName);

    if (teamLogoPath) {
      await new TeamModel({
        teamName,
        teamCity,
        teamStadium,
        teamLogo: teamLogoPath,
        stadiumCapacity,
        foundedIn,
        teamCoach,
      }).save();
      res.status(201).send(`${teamName} added Successfully `);
    } else {
      res.status(422).json("Error saving image. Please try again!");
    }
  } else {
    res.status(404).send(`${teamName} EXIST.`);
  }
});

const getTeams = asyncHandler(async (req, res) => {
  const team = await TeamModel.find();
  res.status(200).send(team);
});

const getTeam = asyncHandler(async (req, res) => {
  const team = await TeamModel.find({ teamId: req.params.id });

  res.status(200).send(team);
});

const updateTeam = asyncHandler(async (req, res) => {
  const { teamName, teamCity, teamStadium, teamLogo, logoName, teamCoach } =
    req.body;

  const newData = {
    teamName,
    teamCity,
    teamStadium,
    teamCoach,
  };

  // if image is changed
  if (teamLogo !== "") {
    const filePath = makeFile(teamLogo, logoName);
    console.log(filePath);

    if (filePath !== "") {
      newData.teamLogo = filePath;
    }
  }

  const verifyTeam = await TeamModel.findOne({ teamId: req.params.teamId });

  if (verifyTeam) {
    await TeamModel.updateOne(
      {
        teamId: req.params.teamId,
      },
      {
        $set: newData,
      }
    );
    res.status(201).send(`${teamName} Info updated Successfully `);
  } else {
    console.log("NO Team");
    res.status(404).send(`${teamName} EXIST.`);
  }
});

const deleteTeam = asyncHandler(async (req, res) => {
  // get team name
  const team = await TeamModel.find({ teamId: req.params.teamId });
  const teamName = team[0].teamName;

  // Delete team
  await TeamModel.deleteOne({ teamId: req.params.teamId });

  // Delete fixtures for team
  const deletedFixture = await FixtureModel.find();
  console.log(req.params.teamId);
  deletedFixture.forEach(async (fixture) => {
    if (fixture.matchId.toString().includes(req.params.teamId)) {
      await FixtureModel.deleteMany({ matchId: fixture.matchId });
    }
  });

  // console.log(deletedFixture);
  res.status(200).json(`${teamName} is removed.`);
});

module.exports = {
  addTeam,
  getTeams,
  getTeam,
  updateTeam,
  deleteTeam,
};
