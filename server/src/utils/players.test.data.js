const reqaddPlayer = {   
    playerName: "tomas",
    position: "GK",
    currentPrice:9.0,
    eplTeamId:"arsenal",
    score: {
        gameweekId: 1,
        price: 8.0,
        fantasyScore: 4,
        minutesPlayed:62,
        goal:0,
        assists:3, 
        cleanSheet:4,
        yellows:1,
        reds:1,
        penalitiesMissed:1,
        penalitiesSaved:5,
        saves:5,
        ownGoal:0,
        transfersIn:3,
        transfersOut:3,
        form:6
     },
     availability : {
         injuryStatus: false,
         injuryMessage: "fit to play"
    },
    history:{
        startingPrice:5.5,
        endingPrice:7.0,
        totalFantasyScore:34,
        totalMinutesPlayed:87,
        totalGoals:2,
        totalAssists:3,
        totalCleanSheets:1,
        totalYellows:1,
        totalReds:2,
        totalPenalitiesMissed:12,
        totalPenalitiesSaved:11,
        totalSaves:1,
        totalOwnGoal:2,
        totalTransfersIn:3,
        totalTransfersOut:4,
        totalform:7
    }    
} 

const requpdatePlayer = {
    playerName: "tomas",
    position: "GK",
    currentPrice:19.0,
    eplTeamId:"arsenal",
    availablity : {
        injuryStatus: false,
        injuryMessage: "fit to play"
    },
    history:{
        startingPrice:5.5,
        endingPrice:7.0,
        totalFantasyScore:34,
        totalMinutesPlayed:87,
        totalGoals:2,
        totalAssists:3,
        totalCleanSheets:1,
        totalYellows:1,
        totalReds:2,
        totalPenalitiesMissed:12,
        totalPenalitiesSaved:11,
        totalSaves:1,
        totalOwnGoal:2,
        totalTransfersIn:3,
        totalTransfersOut:4,
        totalform:7
    }    
}

const reqaddScore = {
    score: {
        gameweekId: 4,
        price: 18.0,
        fantasyScore: 7,
        minutesPlayed:62,
        goal:0,
        assist:3, 
        cleanSheet:4,
        yellows:1,
        reds:1,
        penalitiesMissed:1,
        penalitiesSaved:5,
        saves:5,
        ownGoal:0,
        transfersIn:3,
        transfersOut:3,
        form:6
     }
}

const requpdateScore = {
    score: {
        gameweekId: 100034,
        price: 8.0,
        fantasyScore: 4,
        minutesPlayed:62,
        goal:0,
        assist:3, 
        cleanSheet:4,
        yellows:1,
        reds:1,
        penalitiesMissed:1,
        penalitiesSaved:5,
        saves:5,
        ownGoal:0,
        transfersIn:3,
        transfersOut:3,
        form:6
    },
}

const playerId = 100062;
const gameweekId = 1;

module.exports = [reqaddPlayer,requpdatePlayer,reqaddScore, requpdateScore, playerId,gameweekId];
