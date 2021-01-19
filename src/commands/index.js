import ping from './ping.js';
import startTournament from './start-tournament.js';
import createTournament from './create-tournament.js';
import createTeam from './create-team.js';
import createTestTeams from './create-test-teams.js';
import listTeams from './list-teams.js';
import groupDraw from './group-draw.js';
import roundRobin from './round-robin.js';
import startRound from './start-round.js';
import groupTables from './group-tables.js';
import startSemifinals from './start-semifinals.js';
import startFinals from './start-finals.js';
import argsInfo from './args-info.js';
import result from './result.js';
import help from './help.js';

const commands = [startTournament, ping, createTournament, createTeam, createTestTeams,
	listTeams, groupDraw, roundRobin, startRound,
	groupTables, startSemifinals, startFinals, result, argsInfo, help];

export default commands;