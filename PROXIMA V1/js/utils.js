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
