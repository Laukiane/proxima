function applyWorkflow(num, to, comment){

  const d =
    DOSSIERS.find(
      x => x.num === num
    );

  const ancien =
    STATUT_LABELS[d.statut][0];

  d.statut = to;

  const nouveau =
    STATUT_LABELS[to][0];

  d.timeline.push({

    date:'2026-07-22',

    heure:
      new Date()
        .toTimeString()
        .slice(0,5),

    auteur:
      ROLES.find(
        r => r.id === state.role
      ).name,

    action:'Changement de statut',

    ancien,

    nouveau,

    commentaire:
      comment || ''

  });

  renderView();

}