export const EXCEPTIONS_TAUX = [
  {
    id:'EXC-1',
    refs:['BAT-ERP-7001'],
    tauxExceptionnel:0.60,
    motif:'Produit phare — batteries EUROREPAR',
    periode:null,
    statut:'actif'
  },
  {
    id:'EXC-2',
    refs:['HUI-ERP-5001'],
    tauxExceptionnel:0.49,
    motif:"Produit phare — fûts d'huile EUROREPAR",
    periode:null,
    statut:'actif'
  },
  {
    id:'EXC-3',
    refs:['FLT-PURFLUX-9001'],
    tauxExceptionnel:0.65,
    motif:'Opération télévente PURFLUX',
    periode:{
      debut:'2026-07-05',
      fin:'2026-07-05'
    },
    statut:'actif'
  },
];
