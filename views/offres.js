export function viewOffres(){
  return `<div class="page-head"><div><div class="eyebrow">Référentiel</div><h1>Offres & PAPR</h1></div></div>
  <div class="section-title">Offres commerciales</div>
  <div class="card" style="margin-bottom:20px;"><table class="tbl"><thead><tr><th>Code</th><th>Nom</th><th>Nature</th><th>Remise</th><th>Cumul</th><th>Statut</th></tr></thead>
  <tbody>${OFFRES.map(o=>`<tr><td class="mono">${o.code}</td><td>${o.nom}<div class="subtle">${o.desc}</div></td><td><span class="badge ${o.nature==='OP'?'b-blue':'b-gray'}">${o.nature}</span></td>
  <td class="mono">${(o.remise*100).toFixed(0)}%</td><td>${o.cumul?'Autorisé':'Interdit'}</td><td><span class="badge ${o.statut==='actif'?'b-green':'b-gray'}">${o.statut}</span></td></tr>`).join('')}</tbody></table></div>

  <div class="section-title">Index</div>
  <div class="card" style="margin-bottom:20px;"><table class="tbl"><thead><tr><th>N°</th><th>Nom</th><th>Famille</th><th>Taux</th><th>Priorité</th></tr></thead>
  <tbody>${INDEXES.map(i=>`<tr><td class="mono">${i.numero}</td><td>${i.nom}</td><td>${i.famille}</td><td class="mono">${(i.taux*100).toFixed(0)}%</td><td>${i.priorite}</td></tr>`).join('')}</tbody></table></div>

  <div class="section-title">PAPR mensuels</div>
  <div class="card"><table class="tbl"><thead><tr><th>Période</th><th>Familles couvertes</th><th>Statut</th></tr></thead>
  <tbody>${PAPR.map(p=>`<tr><td>${p.mois}</td><td>${p.familles.join(', ')}</td><td><span class="badge ${p.statut==='actif'?'b-green':'b-gray'}">${p.statut}</span></td></tr>`).join('')}</tbody></table></div>`;
}
