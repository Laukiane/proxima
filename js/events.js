export function registerEvents() {

  document.addEventListener('click', (e) => {

    const navItem =
      e.target.closest('[data-nav]');

    if (navItem) {

      console.log(
        'EVENT NAV =',
        navItem.dataset.nav
      );

      nav(navItem.dataset.nav);

    }

    const clientLink =
      e.target.closest('[data-open-client]');

    if (clientLink) {

      console.log(
        'OPEN CLIENT =',
        clientLink.dataset.openClient
      );

      nav(
        'fiche',
        {
          ficheClientId:
            clientLink.dataset.openClient
        }
      );

    }

    const dossierRow =
      e.target.closest('[data-open-dossier]');

    if (dossierRow) {

      console.log(
        'OPEN DOSSIER =',
        dossierRow.dataset.openDossier
      );

      nav(
        'dossierDetail',
        {
          dossierDetailNum:
            dossierRow.dataset.openDossier
        }
      );

    }

    const actionButton =
      e.target.closest('[data-action]');

    if (
      actionButton &&
      actionButton.dataset.action === 'new-dossier'
    ) {

      console.log(
        'NEW DOSSIER'
      );

    }

  });

}
