export const DOSSIERS = [
  mkDossier('DA-2026-000087','C-100238','Archivé — gain remis','archive', 120, 120, {commande:true,recu:true,remis:true}, [{label:'Bon de commande Boulanger',par:"Julien Perrot (Assistant commerce)"},{label:'Facture Boulanger',par:"Julien Perrot (Assistant commerce)"},{label:'Attestation de remise du gain',par:"Marie Dubois (Chef de secteur)"}]),
  mkDossier('DA-2026-000091','C-100101','Validé par le responsable — attente direction','valide_responsable', 340, 300, {commande:true,recu:true,remis:true}, [{label:'Attestation de remise du gain',par:"Karim Belaïd (Chef de secteur)"}]),
  mkDossier('DA-2026-000094','C-100322','Anomalie détectée — doublon potentiel','anomalie', 610, 950, {commande:false,recu:false,remis:false}, []),
  mkDossier('DA-2026-000097','C-100489','Refusé','refuse', 90, 90, {commande:false,recu:false,remis:false}, []),
  mkDossier('DA-2026-000102','C-100512','Validé par l\'assistant — attente responsable','valide_assistant', 205, 180, {commande:true,recu:true,remis:true}, [{label:'Attestation de remise du gain',par:"Lucie Fontaine (Chef de secteur)"}]),
  mkDossier('DA-2026-000105','C-100410','Brouillon','brouillon', 60, 0, {commande:false,recu:false,remis:false}, []),
  mkDossier('DA-2026-000108','C-100322','Contrôle en cours — gain pas encore remis','controle_en_cours', 480, 480, {commande:true,recu:true,remis:false}, [{label:'Bon de commande Boulanger',par:"Julien Perrot (Assistant commerce)"},{label:'Facture Boulanger',par:"Julien Perrot (Assistant commerce)"}]),
  mkDossier('DA-2026-000111','C-100101','Archivé','archive', 900, 850, {commande:true,recu:true,remis:true}, [{label:'Bon de commande Boulanger',par:"Julien Perrot (Assistant commerce)"},{label:'Attestation de remise du gain',par:"Karim Belaïd (Chef de secteur)"}]),
  mkDossier('DA-2026-000113','C-100238','Correction demandée','correction', 150, 200, {commande:false,recu:false,remis:false}, []),
];