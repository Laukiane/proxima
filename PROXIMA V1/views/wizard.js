function viewWizard(){
  const w = state.wizard;
  if(!w) return `<p>Aucun dossier en cours de création.</p>`;
  let c = w.clientId ? findClient(w.clientId) : null;
  if(!c && w.step>0){ w.step = 0; } // sécurité : impossible d'avancer sans client sélectionné

  let body = '';
  if(w.step===0) body = wizardStepClient();
  else if(w.step===1) body = wizardStepAchats(c);
  else if(w.step===2) body = wizardStepSimulation(c);
  else if(w.step===3) body = wizardStepGain(c);
  else if(w.step===4) body = wizardStepJustif(w);
  else if(w.step===5) body = wizardStepControle(c);

  const nextDisabled = (w.step===0 && !w.clientId) ? 'disabled' : '';
  const sourceDossier = w.editingDossier ? DOSSIERS.find(x=>x.num===w.editingDossier) : null;
  const isResumeDraft = sourceDossier && sourceDossier.statut==='brouillon';
  const eyebrow = isResumeDraft ? 'Reprise de brouillon' : (w.editingDossier ? 'Correction guidée' : 'Création guidée');
  const title = isResumeDraft ? `Reprise du dossier ${w.editingDossier}` : (w.editingDossier ? `Correction du dossier ${w.editingDossier}` : "Nouveau dossier d'animation");
  const submitLabel = isResumeDraft ? 'Soumettre le dossier' : (w.editingDossier ? 'Resoumettre le dossier' : 'Soumettre le dossier');
  return `
  <div class="page-head"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1></div>
    <button class="btn btn-ghost" data-nav-to="dossiers">Annuler</button></div>
  ${w.editingDossier && !isResumeDraft? `<div class="alert a-blue">Vous corrigez le dossier <b>${w.editingDossier}</b> — resélectionnez les achats, ajustez le gain et complétez les justificatifs manquants avant de resoumettre.</div>` : ''}
  ${isResumeDraft? `<div class="alert a-blue">Vous reprenez le brouillon <b>${w.editingDossier}</b> là où vous l'aviez laissé.</div>` : ''}
  <div class="steps-bar">${WSTEPS.map((s,i)=>`<div class="step-pill ${i<w.step?'done':i===w.step?'active':''}">${i+1}. ${s}</div>`).join('')}</div>
  ${body}
  <div class="wizard-actions">
    ${w.step>0? `<button class="btn btn-ghost" data-wizard-prev>← Précédent</button>` : `<div></div>`}
    <div style="display:flex;gap:10px;">
      ${w.clientId? `<button class="btn btn-ghost" data-action="save-draft">Enregistrer comme brouillon</button>` : ''}
      ${w.step<WSTEPS.length-1? `<button class="btn btn-primary" data-wizard-next ${nextDisabled}>Suivant →</button>` : `<button class="btn btn-primary" data-action="submit-wizard">${submitLabel}</button>`}
    </div>
  </div>`;
}