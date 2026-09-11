import { state } from './state.js';
import { ROLES } from '../data/roles.js';
import { DOSSIERS } from '../data/dossiers.js';

function fmtEUR(n){
  return (Math.round(n*100)/100)
    .toLocaleString(
      'fr-FR',
      {
        minimumFractionDigits:2,
        maximumFractionDigits:2
      }
    ) + ' €';
}

function fmtDate(iso){
  const [y,m,d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

function esc(s){
  return String(s).replace(
    /[&<>"']/g,
    c => ({
      '&':'&amp;',
      '<':'&lt;',
      '>':'&gt;',
      '"':'&quot;',
      "'":'&#39;'
    }[c])
  );
}

export function currentUserName(){
  return ROLES.find(
    r => r.id === state.role
  ).name;
}

export function visibleDossiers(){

  const role = state.role;

  const meName = currentUserName();

  let list = DOSSIERS.filter(
    d =>
      (d.statut !== 'brouillon' || d.createur === meName)
      && d.statut !== 'archive'
  );

  if(role === 'chef'){

    list = list.filter(
      d => d.createur === meName
    );

  } else if(role === 'directeur'){

    list = list.filter(
      d => d.statut === 'valide_responsable'
    );

  }

  return list;

}
