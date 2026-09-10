function viewFicheClient(id){
  const c = findClient(id);
  if(!c) return `<p>Client introuvable.</p>`;
  const dossiersClient = visibleDossiers().filter(d=>d.clientId===id);
  const soldeDispo = c.soldeEpargne - c.soldeEngage;
  return `
  <div class="page-head">
    <div><div class="eyebrow">Fiche client · ${c.id}</div><h1>${c.nom}</h1></div>
    <div style="display:flex;gap:8px;">
      <button class="btn btn-ghost" data-nav-to="clients">← Retour</button>
      <button class="btn btn-primary" data-action="new-dossier-for" data-client="${c.id}">+ Nouveau dossier pour ce client</button>
    </div>
  </div>
  ${c.alerte?`<div class="alert a-orange"><b>Alerte —</b> ${c.alerte}</div>`:''}
  <div class="kpi-row">
    <div class="kpi"><div class="num">${fmtEUR(c.soldeEpargne)}</div><div class="lbl">Solde épargné (cagnotte)</div></div>
    <div class="kpi"><div class="num">${fmtEUR(c.soldeEngage)}</div><div class="lbl">Montant engagé</div></div>
    <div class="kpi"><div class="num">${fmtEUR(soldeDispo)}</div><div class="lbl">Solde disponible</div></div>
    <div class="kpi"><div class="num">${dossiersClient.length}</div><div class="lbl">Dossiers</div></div>
  </div>
  <div class="card" style="margin-bottom:18px;"><div class="card-pad">
    <div class="section-title">Informations générales</div>
    <table class="tbl"><tbody>
      <tr><td style="width:200px;color:var(--muted);">Chef de secteur</td><td>${c.chef}</td></tr>
      <tr><td style="color:var(--muted);">Ville</td><td>${c.ville}</td></tr>
      <tr><td style="color:var(--muted);">Statut du compte</td><td><span class="badge ${c.statut==='actif'?'b-green':'b-red'}">${c.statut}</span></td></tr>
      <tr><td style="color:var(--muted);">Pneus achetés (période en cours)</td><td>${c.pneusAchetesPeriode}</td></tr>
    </tbody></table>
  </div></div>
  <div class="card"><div class="card-pad" style="border-bottom:1px solid var(--line);"><div class="section-title" style="margin:0;">Historique des dossiers</div></div>
    ${dossiersClient.length? dossierTable(dossiersClient) : `<div class="card-pad subtle">Aucun dossier pour ce client.</div>`}
  </div>`;
}