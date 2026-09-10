import { state } from './state.js';
import { CLIENTS } from '../data/clients.js';
import { DOSSIERS } from '../data/dossiers.js';
import { Rules } from './rules.js';
import { applyWorkflow } from './workflow.js';
import { ROUTES, renderView } from './router.js';
import { viewDashboard } from '../views/dashboard.js';

console.log("STATE =", state);
console.log("NB CLIENTS =", CLIENTS.length);
console.log("NB DOSSIERS =", DOSSIERS.length);
console.log("RULES =", Rules);
console.log("WORKFLOW =", applyWorkflow);
console.log("ROUTES =", ROUTES);
console.log("RENDERVIEW =", renderView);
console.log("DASHBOARD =", viewDashboard);
