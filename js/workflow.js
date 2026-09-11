import { state } from './state.js';

import { CONTROLEURS } from '../data/controleurs.js';
import { STATUT_LABELS } from '../data/statuts.js';

export function applyWorkflow(num, to, comment){

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

export function dossierActionsFor(d){

  const role = state.role;
  const A = [];

  const gainBloquant =
    d.lignesGains.length > 0 &&
    !d.gainSuivi.remis;

  if(role === 'chef' && d.statut === 'brouillon'){
    A.push({
      label:'Reprendre la création',
      kind:'resume',
      style:'btn-primary'
    });
  }

  if(role === 'chef' && d.statut === 'correction'){
    A.push({
      label:'Corriger le dossier',
      kind:'correct',
      style:'btn-primary'
    });
  }

  if(
    CONTROLEURS.includes(role)
    &&
    (
      d.statut === 'soumis'
      ||
      d.statut === 'anomalie'
    )
  ){
    A.push({
      label:'Prendre en charge (Contrôle en cours)',
      to:'controle_en_cours',
      style:'btn-ghost'
    });
  }

  if(role === 'assistant' && d.statut === 'controle_en_cours'){

    if(gainBloquant){

      A.push({
        label:'Valider le dossier (gain pas encore remis au client)',
        style:'btn-primary',
        disabled:true
      });

    } else {

      A.push({
        label:'Valider le dossier',
        to:'valide_assistant',
        style:'btn-primary'
      });

    }

    A.push({
      label:'Demander une correction',
      to:'correction',
      style:'btn-ghost',
      commentRequired:true
    });

    A.push({
      label:'Refuser le dossier',
      to:'refuse',
      style:'btn-danger',
      commentRequired:true
    });

  }

  if(role === 'responsable' && d.statut === 'valide_assistant'){

    A.push({
      label:'Approuver',
      to:'valide_responsable',
      style:'btn-primary'
    });

    A.push({
      label:'Demander une correction',
      to:'correction',
      style:'btn-ghost',
      commentRequired:true
    });

    A.push({
      label:'Refuser',
      to:'refuse',
      style:'btn-danger',
      commentRequired:true
    });

  }

  if(role === 'responsable' && d.statut === 'controle_en_cours'){

    if(gainBloquant){

      A.push({
        label:'Valider directement (gain pas encore remis au client)',
        style:'btn-primary',
        disabled:true
      });

    } else {

      A.push({
        label:"Valider directement (sans passer par l'assistant)",
        to:'valide_responsable',
        style:'btn-primary'
      });

    }

    A.push({
      label:'Demander une correction',
      to:'correction',
      style:'btn-ghost',
      commentRequired:true
    });

    A.push({
      label:'Refuser',
      to:'refuse',
      style:'btn-danger',
      commentRequired:true
    });

  }

  if(role === 'directeur' && d.statut === 'valide_responsable'){

    A.push({
      label:'Validation finale',
      to:'archive',
      style:'btn-primary'
    });

    A.push({
      label:'Demander une correction',
      to:'correction',
      style:'btn-ghost',
      commentRequired:true
    });

    A.push({
      label:'Refuser',
      to:'refuse',
      style:'btn-danger',
      commentRequired:true
    });

  }

  return A;

}
