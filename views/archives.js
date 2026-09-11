export function viewArchives(){
  const list = archivedDossiers();
  return `
  <div class="page-head"><div><div class="eyebrow">Audit</div><h1>Dossiers archivés</h1></div></div>
  <div class="alert a-blue">Dossiers dont le circuit de signature est complet (chef de secteur → assistant commerce → responsable commerce → directeur). Conservés ici pour consultation, téléchargement et impression en cas d'audit — visibles par tous les profils, indépendamment de leur créateur.</div>
  <div class="card">${list.length? dossierTable(list.slice().reverse()) : `<div class="card-pad subtle">Aucun dossier archivé pour le moment.</div>`}</div>`;
}
