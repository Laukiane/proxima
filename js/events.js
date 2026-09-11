export function registerEvents(){

  console.log('EVENTS OK');

  setTimeout(() => {

    document.addEventListener('click', () => {
      console.log('CLICK TEST');
    });

    console.log('LISTENER REGISTERED');

  }, 1000);

}
