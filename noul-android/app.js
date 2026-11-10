let dp;const btn=document.getElementById('install'),hint=document.getElementById('hint');
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e;hint.textContent='Gata de instalare.'});
addEventListener('appinstalled',()=>{hint.textContent='Instalat! Deschide pictograma „Android” de pe ecranul tău.'});
btn.onclick=async()=>{
  if(dp){dp.prompt();await dp.userChoice;dp=null}
  else hint.textContent='Din meniul browserului alege „Instalează aplicația” sau „Adaugă pe ecranul principal”.';
};
if(matchMedia('(display-mode: standalone)').matches)location.replace('os.html');
