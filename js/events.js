export function registerEvents(){

  document.addEventListener('click', (e)=>{

    const t = e.target.closest('[data-nav-to]');

    if(t){
      console.log('NAV TO =', t.dataset.navTo);
    }

  });

}
