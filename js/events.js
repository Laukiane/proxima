export function registerEvents(){

  document.addEventListener('click', (e)=>{

    const t = e.target.closest('[data-nav]');

    if(t){
      nav(t.dataset.nav);
    }

  });

}
