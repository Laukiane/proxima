import { state } from './state.js';
import { CLIENTS } from '../data/clients.js';
import { DOSSIERS } from '../data/dossiers.js';
import { Rules } from './rules.js';
import { applyWorkflow } from './workflow.js';

console.log("STATE =", state);
console.log("NB CLIENTS =", CLIENTS.length);
console.log("NB DOSSIERS =", DOSSIERS.length);
console.log("RULES =", Rules);
console.log("WORKFLOW =", applyWorkflow);
