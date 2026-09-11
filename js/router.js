import { viewDashboard } from '../views/dashboard.js';
import { viewClients } from '../views/clients.js';
import { viewDossiers } from '../views/dossiers.js';
import { viewWizard } from '../views/wizard.js';
import { viewAdmin } from '../views/admin.js';
import { viewCatalogue } from '../views/catalogue.js';
import { viewOffres } from '../views/offres.js';
import { viewDossierDetail } from '../views/dossier-detail.js';
import { state } from './state.js';
export const ROUTES = {

  dashboard: () => viewDashboard(),

  clients: () => viewClients(),

  fiche: () => viewFicheClient(
    state.ficheClientId
  ),

  dossiers: () => viewDossiers(),

  archives: () => viewArchives(),

  dossierDetail: () =>
    viewDossierDetail(
      state.dossierDetailNum
    ),

  wizard: () => viewWizard(),

  catalogue: () => viewCatalogue(),

  offres: () => viewOffres(),

  admin: () => viewAdmin()

};

export function renderView(){

  const v =
    document.getElementById('view');

  const renderer =
    ROUTES[state.view];

  if(renderer){

    v.innerHTML = renderer();

  } else {

    v.innerHTML =
      '<p>Page introuvable.</p>';

  }

}
