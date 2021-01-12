import ping from './ping.js';
import createTeam from './create-team.js';
import createTestTeams from './create-test-teams.js';
import argsInfo from './args-info.js';
import help from './help.js';

const commands = [ping, createTeam, createTestTeams, argsInfo, help];

export default commands;