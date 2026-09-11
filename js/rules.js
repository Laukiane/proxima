import {
  findRef,
  idx,
  findExceptionTaux,
  fmtDate
} from './utils.js';

export const Rules = {
  // Détermine le taux applicable à une référence à la date de la facture
  tauxApplicable(ref, dateFacture){
    const r = findRef(ref);
    if(!r) return {taux:0, index:null, exception:null, raison:"Référence inconnue."};

    const index = idx(r.indexId);
    const exception = findExceptionTaux(ref, dateFacture);

    if(exception){
      const raison = exception.periode
        ? `Taux exceptionnel de ${(exception.tauxExceptionnel*100).toFixed(0)}% applicable du ${fmtDate(exception.periode.debut)} au ${fmtDate(exception.periode.fin)} (${exception.motif}). En dehors de cette période, le taux standard de l'index ${index?index.numero:'—'} (${index?(index.taux*100).toFixed(0):'0'}%) s'applique.`
        : `Taux exceptionnel de ${(exception.tauxExceptionnel*100).toFixed(0)}% applicable en permanence sur cette référence (${exception.motif}), au lieu du taux standard de l'index ${index?index.numero:'—'} (${index?(index.taux*100).toFixed(0):'0'}%).`;

      return {taux:exception.tauxExceptionnel, index, exception, raison};
    }

    const raison = index
      ? `Index ${index.numero} — ${index.nom} — taux standard.`
      : "Aucun index associé à cette référence.";

    return {
      taux:index?index.taux:0,
      index,
      exception:null,
      raison
    };
  },

  statutLigne(ligne){
    if(ligne.statut==='utilisee'){
      return {
        niveau:'bloquant',
        message:`Ligne déjà utilisée dans le dossier ${ligne.dossierRef}. La référence ${ligne.ref} de la facture ne peut pas être réutilisée.`
      };
    }

    if(ligne.statut==='partiel'){
      const dispo = ligne.qte - ligne.qteUtilisee;

      return {
        niveau:'attention',
        message:`Quantité partiellement utilisée : ${ligne.qteUtilisee} sur ${ligne.qte} déjà employées dans un autre dossier. Il reste ${dispo} unité(s) disponible(s).`,
        qteDisponible:dispo
      };
    }

    return {
      niveau:'conforme',
      message:'Ligne disponible, jamais utilisée.',
      qteDisponible:ligne.qte
    };
  },

  calculerMontant(ligne, dateFacture){

    const statut = this.statutLigne(ligne);

    if(statut.niveau==='bloquant'){
      return {
        montant:0,
        qte:0,
        taux:0,
        tauxInfo:null,
        statut
      };
    }

    const qte = statut.qteDisponible;

    const tauxInfo =
      this.tauxApplicable(
        ligne.ref,
        dateFacture
      );

    const taux = tauxInfo.taux || 0;

    const montant =
      Math.round(
        qte*ligne.pu*taux*100
      )/100;

    return {
      montant,
      qte,
      taux,
      tauxInfo,
      statut
    };
  },

  eligibiliteOffre(offre, client){

    if(offre.nature!=='OP'){
      return {
        eligible:true,
        nature:'PAPR',
        message:"Remise automatique liée au PAPR du mois."
      };
    }

    if(offre.statut==='expiré'){
      return {
        eligible:false,
        message:`Offre expirée (clôturée le ${offre.fin}).`
      };
    }

    const achete =
      client.pneusAchetesPeriode || 0;

    if(offre.famille==='Pneus'){

      if(achete >= offre.qteMin){
        return {
          eligible:true,
          message:`Client éligible : ${achete} pneus achetés sur la période, seuil requis ${offre.qteMin}.`
        };
      }

      return {
        eligible:false,
        message:`Offre non applicable : ${achete} pneus achetés sur les ${offre.qteMin} requis.`,
        progres:{
          fait:achete,
          requis:offre.qteMin
        }
      };
    }

    return {
      eligible:true,
      message:"Conditions de quantité respectées."
    };
  },

  controleSolde(soldeDisponible, montantGain){

    if(montantGain <= soldeDisponible){
      return {
        ok:true,
        depassement:0
      };
    }

    return {
      ok:false,
      depassement:
        Math.round(
          (montantGain-soldeDisponible)*100
        )/100
    };
  }
};
