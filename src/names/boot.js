// Keep the static recovery screen available even if a module download fails.
import('./app.js').catch(()=>{
  const app=document.querySelector('#app');
  if(document.querySelector('#load-help')){
    document.querySelector('#load-status').hidden=true;
    document.querySelector('#load-help').hidden=false;
  }else{
    app.innerHTML='<main class="load-message"><h1>The Beautiful Names</h1><p>The book could not open. Your saved writing has not been changed.</p><p><a href="./">Try again</a> · <a href="../">Back to the bookshelf</a></p></main>';
  }
});
