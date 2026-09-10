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
