export function registerEvents(){

  document.addEventListener('click', (e)=>{

    const t = e.target.closest('[data-nav]');

    if(t){
      console.log('EVENT NAV =', t.dataset.nav);

      nav(t.dataset.nav);
    }

    const clientLink =
      e.target.closest('[data-open-client]');

    if(clientLink){
      console.log(
        'OPEN CLIENT =',
        clientLink.dataset.openClient
      );
    }

  });

}
