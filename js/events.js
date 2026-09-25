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
      console.log(
        'WORKFLOW',
        workflowButton.dataset.workflow,
        workflowButton.dataset.num
      );

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

    const wizardClientRow = e.target.closest(
      '[data-select-wizard-client]'
    );

    if (wizardClientRow) {
      console.log(
        'SELECT WIZARD CLIENT',
        wizardClientRow.dataset.selectWizardClient
      );
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

    if
