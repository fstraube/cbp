import ping from './ping.js';
import createTeam from './create-team.js';
import createTestTeams from './create-test-teams.js';
import groupDraw from './group-draw.js';
import roundRobin from './round-robin.js';
import startRound from './start-round.js';
import argsInfo from './args-info.js';
import result from './result.js';
import help from './help.js';

const commands = [ping, createTeam, createTestTeams, groupDraw, roundRobin, startRound, result, argsInfo, help];

export default commands;