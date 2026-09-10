function viewCatalogue(){
  const cats = [...new Set(GAINS.map(g=>g.cat))];
  return `<div class="page-head"><div><div class="eyebrow">Référentiel</div><h1>Catalogue des gains</h1></div></div>
  <div class="alert a-blue">Catalogue de démonstration — produits « Boulanger » et prestataires fictifs, à connecter à un vrai référentiel fournisseur.</div>
  ${cats.map(cat=>`<div class="section-title" style="margin-top:22px;">${cat}</div>
    <div class="gain-grid">${GAINS.filter(g=>g.cat===cat).map(g=>`
      <div class="gain-card"><div class="gain-cat">${g.nature}</div><div class="gain-name">${g.nom}</div>
      <div class="gain-price">${g.variable?'Montant variable':fmtEUR(g.prix)}</div>
      <div class="subtle" style="margin-top:6px;">${g.fournisseur} · délai ${g.delai}</div></div>`).join('')}</div>`).join('')}`;
}