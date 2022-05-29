const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

autoIncrement.initialize(mongoose.connection);

const availabilitySchema = mongoose.Schema({
  injuryStatus: { type: String, default: "" },
  injuryMessage: { type: String, default: "" },
});

const scoreSchema = mongoose.Schema({
  gameweekId: { type: Number },
  price: { type: Number },
  fantasyScore: { type: Number, default: 0 },
  minutesPlayed: { type: Number, default: 0 },
  goals: { type: Number, default: 0 },
  assists: { type: Number, default: 0 },
  cleanSheet: { type: Number, default: 0 },
  yellows: { type: Number, default: 0 },
  reds: { type: Number, default: 0 },
  penalitiesMissed: { type: Number, default: 0 },
  penalitiesSaved: { type: Number, default: 0 },
  saves: { type: Number, default: 0 },
  ownGoal: { type: Number, default: 0 },
  transfersIn: { type: Number, default: 0 },
  transfersOut: { type: Number, default: 0 },
  form: { type: Number, default: 0 },
});

const historySchema = mongoose.Schema({
  startingPrice: { type: Number },
  endingPrice: { type: Number },
  totalFanstasyScore: { type: Number },
  totalMinutesScore: { type: Number },
  totalGoals: { type: Number },
  totalAssists: { type: Number },
  totalCleanSheets: { type: Number },
  totalYellows: { type: Number },
  totalReds: { type: Number },
  totalPenalitiesMissed: { type: Number },
  totalPenalitiesSaved: { type: Number },
  totalSaves: { type: Number },
  totalOwnGoal: { type: Number },
  totalTransfersIn: { type: Number },
  totalTransfersOut: { type: Number },
  totalForm: { type: Number },
});

const playerSchema = mongoose.Schema({
  playerName: {
    type: String,
    required: [
      true,
      "Custom Error - required Value *: Player Name is required.",
    ],
  },
  eplTeamId: {
    type: String,
    required: [
      true,
      "Custom Error - required Value *: Player Team is required.",
    ],
  },
  currentPrice: {
    type: Number,
    required: [
      true,
      "Custom Error - required Value *: Player Price is required.",
    ],
  },
  position: {
    type: String,
    required: [
      true,
      "Custom Error - required Value *: Player Position is required.",
    ],
  },
  availability: { type: availabilitySchema },

  playerImage: {
    type: String,
  },
  score: { type: [scoreSchema], default: [] },
  history: { type: [historySchema], default: [] },
  maxBudget: { type: Number, default: 100 },
});

playerSchema.plugin(autoIncrement.plugin, {
  model: "players",
  field: "playerId",
  startAt: 100000,
  incrementBy: 1,
});

module.exports = mongoose.model("players", playerSchema);
