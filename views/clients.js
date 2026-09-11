import { state } from '../js/state.js';
import { CLIENTS } from '../data/clients.js';

import {
  esc,
  fmtEUR
} from '../js/utils.js';

export function viewClients(){
  const q = state.clientSearch.toLowerCase();
  const list = CLIENTS.filter(c=> c.nom.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.ville.toLowerCase().includes(q));
  return `
  <div class="page-head"><div><div class="eyebrow">Clients</div><h1>Recherche client</h1></div></div>
  <div class="search-bar"><input id="client-search-input" placeholder="Numéro de compte, raison sociale ou ville…" value="${esc(state.clientSearch)}"></div>
  <div class="card">${list.length? `<table class="tbl"><thead><tr><th>Compte</th><th>Raison sociale</th><th>Chef de secteur</th><th>Ville</th><th class="tright">Solde épargné</th><th class="tright">Solde engagé</th><th>Statut</th></tr></thead>
  <tbody>${list.map(c=>`<tr class="clickable" data-open-client="${c.id}">
    <td class="mono">${c.id}</td><td>${c.nom}${c.alerte?` <span class="badge b-orange">${c.alerte}</span>`:''}</td><td>${c.chef}</td><td>${c.ville}</td>
    <td class="tright mono">${fmtEUR(c.soldeEpargne)}</td><td class="tright mono">${fmtEUR(c.soldeEngage)}</td>
    <td><span class="badge ${c.statut==='actif'?'b-green':'b-red'}">${c.statut}</span></td></tr>`).join('')}</tbody></table>`
    : `<div class="card-pad subtle">Aucun client ne correspond à cette recherche.</div>`}</div>`;
}
