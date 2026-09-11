export function viewDossierDetail(num){
  const d = DOSSIERS.find(x=>x.num===num);
  if(!d) return `<p>Dossier introuvable.</p>`;
  if(d.statut==='brouillon' && d.createur!==currentUserName()){
    return `<div class="page-head"><div><div class="eyebrow">Accès restreint</div><h1>Dossier non accessible</h1></div>
      <button class="btn btn-ghost" data-nav-to="dossiers">← Retour</button></div>
      <div class="alert a-orange">Ce dossier est encore à l'état de brouillon et n'est visible que par son créateur (${esc(d.createur)}).</div>`;
  }
  const c = findClient(d.clientId);
  const [lbl,cls] = STATUT_LABELS[d.statut];
  const actions = dossierActionsFor(d);
  const isControleur = CONTROLEURS.includes(state.role);
  const isCreateurChef = state.role==='chef' && d.createur===currentUserName();
  const hasGain = d.lignesGains.length>0;
  const canAddDoc = isControleur || (isCreateurChef && d.gainSuivi.remis);
  const gainRows = [['commande','Gain commandé'],['recu','Gain reçu (nous)'],['remis','Gain remis au client']];

  return `
  <div class="page-head">
    <div><div class="eyebrow mono">${d.num}</div><h1>${c.nom} <span class="badge ${cls}">${lbl}</span></h1></div>
    <div style="display:flex;gap:8px;"><button class="btn btn-ghost" data-nav-to="dossiers">← Retour</button>
      <button class="btn btn-ghost" data-action="print-dossier" data-num="${d.num}">Aperçu imprimable (A4)</button></div>
  </div>

  <div style="display:grid;grid-template-columns:2fr 1fr;gap:18px;">
    <div>
      <div class="card" style="margin-bottom:16px;"><div class="card-pad">
        <div class="section-title">Montants épargnés</div>
        <table class="tbl"><thead><tr><th>Nature</th><th>Période</th><th>Libellé</th><th class="tright">Montant</th></tr></thead>
        <tbody>${d.lignesEpargne.map(l=>`<tr><td>${l.nature}</td><td>${l.periode}</td><td>${l.libelle}</td><td class="tright mono">${fmtEUR(l.montant)}</td></tr>`).join('')}
        <tr><td colspan="3" style="font-weight:600;">Total</td><td class="tright mono" style="font-weight:600;">${fmtEUR(d.totalEpargne)}</td></tr></tbody></table>
      </div></div>

      <div class="card" style="margin-bottom:16px;"><div class="card-pad">
        <div class="section-title">Montants & cadeaux versés</div>
        ${d.lignesGains.length? `<table class="tbl"><thead><tr><th>Nature</th><th>Libellé</th><th class="tright">Qté</th><th class="tright">PU</th><th class="tright">Montant</th></tr></thead>
        <tbody>${d.lignesGains.map(l=>`<tr><td>${l.nature}</td><td>${l.libelle}</td><td class="tright">${l.qte}</td><td class="tright mono">${fmtEUR(l.pu)}</td><td class="tright mono">${fmtEUR(l.montant)}</td></tr>`).join('')}
        <tr><td colspan="4" style="font-weight:600;">Total</td><td class="tright mono" style="font-weight:600;">${fmtEUR(d.totalVerse)}</td></tr></tbody></table>`
        : `<div class="subtle">Aucun gain demandé pour le moment — montant conservé en cagnotte.</div>`}
      </div></div>

      <div class="card" style="margin-bottom:16px;"><div class="card-pad">
        <div class="section-title">Suivi de la remise du gain</div>
        <div class="subtle" style="margin-bottom:10px;">Visible par tous ; modifiable uniquement par les contrôleurs (assistant, responsable, directeur, administrateur).</div>
        ${!hasGain ? `<div class="subtle">Aucun gain demandé pour ce dossier — aucun suivi nécessaire.</div>` : `
          ${gainRows.map(([key,label])=>{
            const checked = !!d.gainSuivi[key];
            if(isControleur){
              return `<label style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--line);font-size:13px;cursor:pointer;"><span>${label}</span><input type="checkbox" data-gain-check="${key}" data-num="${d.num}" ${checked?'checked':''}></label>`;
            }
            return `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--line);font-size:13px;"><span>${label}</span><span class="badge ${checked?'b-green':'b-gray'}">${checked?'Fait':'À faire'}</span></div>`;
          }).join('')}
          <div style="margin-top:14px;padding-top:14px;border-top:1px solid var(--line);">
            <div style="font-size:12.5px;font-weight:500;margin-bottom:8px;">Documents joints (facultatif — bon de commande, facture, attestation de remise, etc. selon la nature du gain)</div>
            ${d.documents.length? d.documents.map(doc=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;font-size:12.5px;border-bottom:1px solid var(--line);gap:10px;">
              <span>${esc(doc.label)}<span class="subtle"> — ${esc(doc.par)}</span></span>
              <span style="display:flex;gap:6px;flex-shrink:0;">
                ${doc.previewUrl? `<button type="button" class="btn btn-ghost btn-sm" style="margin:0;" data-action="view-gain-doc" data-num="${d.num}" data-doc="${d.documents.indexOf(doc)}">Voir</button>
                <a href="${doc.previewUrl}" download="${esc(doc.previewName||doc.label)}" class="btn btn-ghost btn-sm" style="margin:0;">Télécharger</a>`
                : `<button type="button" class="btn btn-ghost btn-sm" style="margin:0;opacity:.5;cursor:not-allowed;" disabled title="Document de démonstration — aucun fichier réel n'est associé dans ce prototype">Télécharger</button>`}
              </span>
            </div>`).join('') : `<div class="subtle" style="margin-bottom:6px;">Aucun document joint pour le moment.</div>`}
            ${canAddDoc ? `<div style="display:flex;gap:6px;margin-top:10px;align-items:center;flex-wrap:wrap;">
              <input id="gain-doc-label-${d.num}" placeholder="Nom du document (ex. Bon de commande Boulanger)" style="flex:1;min-width:180px;padding:8px 10px;border:1px solid var(--line);border-radius:6px;font-size:12.5px;">
              <input type="file" id="gain-doc-upload-${d.num}" data-gain-doc-upload="${d.num}" style="display:none;">
              <label for="gain-doc-upload-${d.num}" class="btn btn-ghost btn-sm" style="margin:0;">Charger un fichier</label>
            </div>` : (isCreateurChef && !d.gainSuivi.remis ? `<div class="subtle" style="margin-top:8px;">Vous pourrez joindre l'attestation de remise une fois que le contrôleur aura coché « Remis au client ».</div>` : '')}
          </div>
        `}
      </div></div>

      <div class="card"><div class="card-pad">
        <div class="section-title">Pièces justificatives</div>
        ${Object.entries({facture:'Facture',offre:"Justificatif de l'offre",papr:'PAPR du mois'}).map(([k,lab])=>{
          const ok = d.justificatifs[k];
          const fichier = (d.justificatifsFichiers||{})[k];
          const iconOeil = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>`;
          const actions = fichier
            ? `<button type="button" class="btn btn-ghost btn-sm" style="margin:0;padding:6px 8px;" data-action="view-dossier-justif" data-num="${d.num}" data-key="${k}" title="Visualiser">${iconOeil}</button>
               <a href="${fichier.url}" download="${esc(fichier.name)}" class="btn btn-ghost btn-sm" style="margin:0;">Télécharger</a>`
            : `<button type="button" class="btn btn-ghost btn-sm" style="margin:0;padding:6px 8px;opacity:.5;cursor:not-allowed;" disabled title="Document de démonstration — aucun fichier réel n'est associé dans ce prototype">${iconOeil}</button>
               <button type="button" class="btn btn-ghost btn-sm" style="margin:0;opacity:.5;cursor:not-allowed;" disabled title="Document de démonstration — aucun fichier réel n'est associé dans ce prototype">Télécharger</button>`;
          return `<div style="display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid var(--line);font-size:13px;gap:10px;"><span>${lab}</span><span style="display:flex;align-items:center;gap:8px;flex-shrink:0;"><span class="badge ${ok?'b-green':'b-orange'}">${ok?'Fourni':'Manquant'}</span>${actions}</span></div>`;
        }).join('')}
      </div></div>
    </div>

    <div>
      <div class="card" style="margin-bottom:16px;"><div class="card-pad">
        <div class="section-title">Synthèse financière</div>
        <div class="calc-box">
          <div class="cb-row"><span>Solde disponible avant</span><span class="mono">${fmtEUR(c.soldeEpargne)}</span></div>
          <div class="cb-row"><span>Épargné (ce dossier)</span><span class="mono">+ ${fmtEUR(d.totalEpargne)}</span></div>
          <div class="cb-row"><span>Gains demandés</span><span class="mono">− ${fmtEUR(d.totalVerse)}</span></div>
          <div class="cb-row" style="border-top:1px solid var(--line);margin-top:4px;padding-top:4px;"><b>Solde après validation</b><b class="mono">${fmtEUR(c.soldeEpargne + d.totalEpargne - d.totalVerse)}</b></div>
        </div>
      </div></div>

      <div class="card" style="margin-bottom:16px;"><div class="card-pad">
        <div class="section-title">Actions</div>
        ${actions.length? actions.map(a=> a.disabled
            ? `<button class="btn ${a.style} btn-block" style="margin-bottom:8px;opacity:.45;cursor:not-allowed;" disabled title="Cochez « Remis au client » dans le suivi du gain ci-contre pour débloquer.">${a.label}</button>`
            : a.kind==='correct'
            ? `<button class="btn ${a.style} btn-block" style="margin-bottom:8px;" data-action="correct-dossier" data-num="${d.num}">${a.label}</button>`
            : a.kind==='resume'
            ? `<button class="btn ${a.style} btn-block" style="margin-bottom:8px;" data-action="resume-draft" data-num="${d.num}">${a.label}</button>`
            : `<button class="btn ${a.style} btn-block" style="margin-bottom:8px;" data-workflow="${a.to}" data-num="${d.num}" data-comment-required="${a.commentRequired?1:0}">${a.label}</button>`
          ).join('')
          : `<div class="subtle">Aucune action disponible pour votre rôle sur ce statut.</div>`}
      </div></div>

      <div class="card"><div class="card-pad">
        <div class="section-title">Historique</div>
        ${d.timeline.slice().reverse().map(t=>`
          <div class="tl-item"><div class="tl-dot"></div><div>
            <div class="tl-meta">${fmtDate(t.date)} · ${t.heure} · ${t.auteur}</div>
            <div class="tl-title">${t.action}${t.ancien!=='—'?` (${t.ancien} → ${t.nouveau})`:''}</div>
            ${t.commentaire?`<div class="tl-comment">« ${esc(t.commentaire)} »</div>`:''}
          </div></div>`).join('')}
      </div></div>
    </div>
  </div>`;
}
