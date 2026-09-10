function viewAdmin(){
  const sections = [
    ['Utilisateurs & rôles','5 profils actifs · gestion des droits par module.'],
    ['Offres, Index & Taux exceptionnels','Paramétrage des taux, seuils et fenêtres de campagne — CRUD simulé dans ce prototype.'],
    ['Seuils de validation','Ex. : validation direction obligatoire au-delà de 800 € versés (paramètre fictif, à confirmer).'],
    ["Journal d'activité",'Historique complet des actions, y compris dérogations et forçages.'],
  ];
  const debutFenetre = subtractMonths(TODAY, FENETRE_VENTES_MOIS);
  const nbClientsCouverts = new Set(VENTES.map(v=>v.numCompteClient)).size;
  const imp = state.ventesImport;
  return `<div class="page-head"><div><div class="eyebrow">Administration</div><h1>Paramètres de la plateforme</h1></div></div>
  <div class="alert a-blue">Espace simplifié pour le prototype — la version cible propose un CRUD complet par entité (offres, index, taux exceptionnels, catalogue, utilisateurs).</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
  ${sections.map(([t,d])=>`<div class="card card-pad"><div class="section-title">${t}</div><div class="subtle">${d}</div></div>`).join('')}
  </div>
  <div class="card card-pad" style="margin-top:14px;">
    <div class="section-title">Base de ventes — import Excel</div>
    <div class="subtle" style="margin-bottom:12px;">Cette base alimente l'étape "Achats éligibles" de l'assistant de création de dossier : à la sélection d'un client, la plateforme filtre automatiquement ces lignes sur son numéro de compte et sur une fenêtre glissante de ${FENETRE_VENTES_MOIS} mois (actuellement du ${fmtDate(debutFenetre)} au ${fmtDate(TODAY)}).</div>
    <div class="alert ${imp?'a-green':'a-blue'}" style="margin-bottom:14px;">
      ${imp
        ? `<b>Fichier importé —</b> ${esc(imp.fileName)} · ${imp.count} lignes chargées le ${imp.importedAt}.`
        : `<b>Jeu de données par défaut —</b> ${VENTES.length} lignes de ventes fictives couvrant ${nbClientsCouverts} clients du portefeuille.`}
    </div>
    <input type="file" id="ventes-import-input" accept=".xlsx,.xls,.csv" style="margin-bottom:10px;display:block;">
    <button class="btn btn-ghost btn-sm" data-action="download-ventes-template">Télécharger un modèle</button>
    <button class="btn btn-ghost btn-sm" data-action="reset-ventes">Réinitialiser les données par défaut</button>
    <div class="subtle" style="margin-top:10px;font-size:11.5px;">Colonnes attendues : Numéro de compte client, Date de vente, N° Facture, Référence, Quantité, PU — et facultativement Statut, Dossier lié, Qté utilisée.</div>
  </div>`;
}