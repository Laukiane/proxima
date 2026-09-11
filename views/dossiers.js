import { state } from '../js/state.js';

import {
  visibleDossiers,
  dossierTable
} from '../js/utils.js';

export function viewDossiers(){
  let list = visibleDossiers();
  if(state.role==='assistant') list = list.slice().sort((a,b)=> (a.statut==='soumis'||a.statut==='anomalie'?-1:1) - (b.statut==='soumis'||b.statut==='anomalie'?-1:1));
  return `
  <div class="page-head"><div><div class="eyebrow">Suivi</div><h1>Dossiers d'animation commerciale</h1></div>
    <button class="btn btn-primary" data-action="new-dossier">+ Nouveau dossier</button></div>
  <div class="card">${dossierTable(list.slice().reverse())}</div>`;
}
