export function registerEvents(){

  document.addEventListener('click', (e)=>{

    const t = e.target;

    if(t.dataset.navTo){
      console.log('NAV TO =', t.dataset.navTo);
    }

  });

}
