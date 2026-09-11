export function registerEvents(){

  document.addEventListener('click', (e)=>{

    const t = e.target.closest('[data-nav]');

    if(t){
      console.log('NAV =', t.dataset.nav);
    }

  });

}
