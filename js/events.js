import { state } from './state.js';

export function registerEvents() {
  document.addEventListener('click', (e) => {
    const navItem = e.target.closest('[data-nav]');

    if (navItem) {
      console.log('EVENT NAV =', navItem.dataset.nav);
      nav(navItem.dataset.nav);
    }

    const clientLink = e.target.closest('[data-open-client]');

    if (clientLink) {
      console.log('OPEN CLIENT =', clientLink.dataset.openClient);
      nav('fiche', { ficheClientId: clientLink.dataset.openClient });
    }

    const dossierRow = e.target.closest('[data-open-dossier]');

    if (dossierRow) {
      console.log('OPEN DOSSIER =', dossierRow.dataset.openDossier);
      nav('dossierDetail', { dossierDetailNum: dossierRow.dataset.openDossier });
    }

    const workflowButton = e.target.closest('[data-workflow]');

    if (workflowButton) {
      console.log('WORKFLOW', workflowButton.dataset.workflow, workflowButton.dataset.num);

      const to = workflowButton.dataset.workflow;
      const num = workflowButton.dataset.num;

      if (workflowButton.dataset.commentRequired === '1') {
        openCommentModal(num, to);
      } else {
        console.log('WORKFLOW DIRECT', to, num);
      }
    }

    const gainCard = e.target.closest('[data-select-gain]');

    if (gainCard) {
      console.log('SELECT GAIN', gainCard.dataset.selectGain);
    }

    const wizardClientRow = e.target.closest('[data-select-wizard-client]');

    if (wizardClientRow && state.wizard) {
      console.log('SELECT WIZARD CLIENT', wizardClientRow.dataset.selectWizardClient);

      state.wizard.clientId = wizardClientRow.dataset.selectWizardClient;
      renderView();
    }

    const lineCheckbox = e.target.closest('[data-line]');

    if (lineCheckbox) {
      console.log('SELECT LINE', lineCheckbox.dataset.line);
    }

    const actionButton = e.target.closest('[data-action]');

    if (actionButton?.dataset.action === 'new-dossier') {
      console.log('NEW DOSSIER');
      startWizard();
    }

    if (actionButton?.dataset.action === 'new-dossier-for') {
      console.log('NEW DOSSIER FOR', actionButton.dataset.client);
      startWizard(actionButton.dataset.client);
    }

    if (actionButton?.dataset.action === 'print-dossier') {
      console.log('PRINT DOSSIER', actionButton.dataset.num);
      printDossier(actionButton.dataset.num);
    }

    if (actionButton?.dataset.action === 'download-ventes-template') {
      console.log('DOWNLOAD VENTES TEMPLATE');
      downloadVentesTemplate();
    }

    if (actionButton?.dataset.action === 'reset-ventes') {
      console.log('RESET VENTES');
      resetVentesDefaut();
    }

    if (actionButton?.dataset.action === 'view-gain-doc') {
      console.log('VIEW GAIN DOC');

      const d = DOSSIERS.find(x => x.num === actionButton.dataset.num);
      const doc = d && d.documents[Number(actionButton.dataset.doc)];

      if (doc) {
        openGainDocPreviewModal(doc);
      }
    }

    if (actionButton?.dataset.action === 'change-wizard-client') {
      console.log('CHANGE WIZARD CLIENT');

      if (state.wizard) {
        state.wizard.clientId = null;
        state.wizard.clientSearchQuery = '';
        renderView();
      }
    }

    if (actionButton?.dataset.action === 'save-draft') {
      console.log('SAVE DRAFT MIGRATION OK');
    }

    if (actionButton?.dataset.action === 'submit-wizard') {
      console.log('SUBMIT WIZARD');
      openSubmitConfirmModal();
    }

    if (actionButton?.dataset.action === 'confirm-submit-wizard') {
      console.log('CONFIRM SUBMIT WIZARD MIGRATION OK');
    }

    if (actionButton?.dataset.action === 'correct-dossier') {
      console.log('CORRECT DOSSIER', actionButton.dataset.num);
      correctDossier(actionButton.dataset.num);
    }

    if (actionButton?.dataset.action === 'resume-draft') {
      console.log('RESUME DRAFT', actionButton.dataset.num);
      resumeDraft(actionButton.dataset.num);
    }

    if (e.target.dataset.wizardNext !== undefined) {
      console.log('WIZARD NEXT');
    }

    if (e.target.dataset.wizardPrev !== undefined) {
      console.log('WIZARD PREV');
    }

    if (e.target.dataset.closeModal !== undefined) {
      console.log('CLOSE MODAL');
      closeModal();
    }

    if (e.target.id === 'modal-overlay') {
      console.log('OVERLAY CLOSE');
      closeModal();
    }
  });

  document.addEventListener('change', (e) => {
    if (e.target.id === 'participation-check') {
      console.log('PARTICIPATION CHANGE', e.target.checked);

      if (state.wizard) {
        state.wizard.participation = e.target.checked;
      }
    }

    if (e.target.dataset.gainCheck) {
      console.log(
        'GAIN CHECK',
        e.target.dataset.gainCheck,
        e.target.dataset.num,
        e.target.checked
      );
    }

    if (e.target.id === 'ventes-import-input') {
      console.log('VENTES IMPORT', e.target.files?.[0]?.name);
    }

    if (e.target.dataset.justifUpload) {
      console.log(
        'JUSTIF UPLOAD',
        e.target.dataset.justifUpload,
        e.target.files?.[0]?.name
      );
    }

    if (e.target.dataset.gainDocUpload) {
      console.log(
        'GAIN DOC UPLOAD',
        e.target.dataset.gainDocUpload,
        e.target.files?.[0]?.name
      );
    }
  });
}
