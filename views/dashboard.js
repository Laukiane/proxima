import { state } from '../js/state.js';
import { CLIENTS } from '../data/clients.js';
import { OFFRES } from '../data/offres.js';
import { GAINS } from '../data/gains.js';
import {
  currentUserName,
  visibleDossiers,
  dossierTable
} from '../js/utils.js';

export function viewDashboard(){
  const role = state.role;
  const meName = currentUserName();
  const visible = visibleDossiers();
  const mine = visible.filter(d=>d.createur===meName);
  const totalEpargne = visible.reduce((s,d)=>s+d.totalEpargne,0);
  const totalVerse = visible.reduce((s,d)=>s+d.totalVerse,0);

  let kpis;
  if(role==='chef'){
    kpis = [[mine.filter(d=>d.statut==='brouillon').length,'Dossiers en brouillon'],[mine.filter(d=>d.statut==='correction').length,'À corriger'],[mine.filter(d=>d.statut==='soumis'||d.statut==='anomalie'||d.statut==='controle_en_cours').length,'En cours de contrôle']];
  } else if(role==='assistant'){
    kpis = [[visible.filter(d=>d.statut==='soumis'||d.statut==='anomalie'||d.statut==='controle_en_cours').length,'À contrôler'],[visible.filter(d=>d.statut==='correction').length,'Correction demandée']];
  } else if(role==='responsable'){
    kpis = [[visible.filter(d=>d.statut==='valide_assistant'||d.statut==='soumis'||d.statut==='anomalie'||d.statut==='controle_en_cours').length,'À approuver'],[visible.filter(d=>d.statut==='correction').length,'Correction demandée']];
  } else if(role==='directeur'){
    kpis = [[visible.filter(d=>d.statut==='valide_responsable').length,'Validation finale requise']];
  } else {
    kpis = [[CLIENTS.length,'Clients'],[OFFRES.filter(o=>o.statut==='actif').length,'Offres actives'],[GAINS.length,'Gains au catalogue']];
  }

  return `
  <div class="page-head"><div><div class="eyebrow">Vue d'ensemble</div><h1>Tableau de bord — ${ROLES.find(r=>r.id===role).fn}</h1></div>
    <button class="btn btn-primary" data-action="new-dossier">+ Nouveau dossier</button>
  </div>
  <div class="kpi-row">${kpis.map(([n,l])=>`<div class="kpi"><div class="num">${n}</div><div class="lbl">${l}</div></div>`).join('')}</div>
  <div class="card">
    <div class="card-pad" style="border-bottom:1px solid var(--line);"><div class="section-title" style="margin:0;">Dossiers récents</div></div>
    ${dossierTable(visible.slice().reverse().slice(0,7))}
  </div>`;
}
