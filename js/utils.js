import { state } from './state.js';
import { ROLES } from '../data/roles.js';
import { DOSSIERS } from '../data/dossiers.js';
import { STATUT_LABELS } from '../data/statuts.js';
import { CLIENTS } from '../data/clients.js';
import { REFS } from '../data/refs.js';

function fmtEUR(n){
  return (Math.round(n*100)/100)
    .toLocaleString(
      'fr-FR',
      {
        minimumFractionDigits:2,
        maximumFractionDigits:2
      }
    ) + ' €';
}

function fmtDate(iso){
  const [y,m,d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

function esc(s){
  return String(s).replace(
    /[&<>"']/g,
    c => ({
      '&':'&amp;',
      '<':'&lt;',
      '>':'&gt;',
      '"':'&quot;',
      "'":'&#39;'
    }[c])
  );
}

export function currentUserName(){
  return ROLES.find(
    r => r.id === state.role
  ).name;
}

export function visibleDossiers(){

  const role = state.role;

  const meName = currentUserName();

  let list = DOSSIERS.filter(
    d =>
      (d.statut !== 'brouillon' || d.createur === meName)
      && d.statut !== 'archive'
  );

  if(role === 'chef'){

    list = list.filter(
      d => d.createur === meName
    );

  } else if(role === 'directeur'){

    list = list.filter(
      d => d.statut === 'valide_responsable'
    );

  }

  return list;

}

export function dossierTable(list){
  return `<table class="tbl"><thead><tr><th>Réf.</th><th>Client</th><th>Créé par</th><th>Date</th><th class="tright">Épargné</th><th class="tright">Versé</th><th>Statut</th></tr></thead>
  <tbody>${list.map(d=>{
    const cl = findClient(d.clientId);
    const [lbl,cls] = STATUT_LABELS[d.statut];
    return `<tr class="clickable" data-open-dossier="${d.num}">
      <td class="mono">${d.num}</td><td>${cl?cl.nom:'—'}</td><td>${d.createur||d.chef}</td><td>${fmtDate(d.date)}</td>
      <td class="tright mono">${fmtEUR(d.totalEpargne)}</td><td class="tright mono">${fmtEUR(d.totalVerse)}</td>
      <td><span class="badge ${cls}">${lbl}</span></td></tr>`;
  }).join('')}</tbody></table>`;
}

export const findClient = id =>
  CLIENTS.find(c => c.id === id);

export const findRef = r =>
  REFS.find(x => x.ref === r);
