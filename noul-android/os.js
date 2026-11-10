const $=s=>document.querySelector(s),pad=n=>String(n).padStart(2,'0');
const store={get:(k,d)=>{try{return localStorage.getItem(k)??d}catch{return d}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch{}}};
const tick=()=>{const d=new Date(),t=pad(d.getHours())+':'+pad(d.getMinutes());
 document.querySelectorAll('.clk').forEach(e=>e.textContent=t);$('#lt').textContent=t;
 $('#ld').textContent=d.toLocaleDateString('ro-RO',{weekday:'long',day:'numeric',month:'long'});
 const c=$('#bigclk');if(c)c.textContent=t+':'+pad(d.getSeconds())};
setInterval(tick,1000);tick();
const boot=()=>{$('#boot').style.display='flex';$('#boot').style.opacity=1;$('#lock').classList.remove('up');closeApp();
 const b=$('.bar span');b.style.animation='none';b.offsetWidth;b.style.animation='';
 setTimeout(()=>{$('#boot').style.opacity=0;setTimeout(()=>$('#boot').style.display='none',500)},2700)};
boot();
$('#lock').onclick=()=>$('#lock').classList.add('up');
const apps=[
 {n:'Calculator',i:'🧮',c:'#ff9f43',r:()=>{let e='';const b=$('#ab');
  b.innerHTML='<div class="calc"><div class="d" id="cd">0</div>'+'C ( ) /|7|8|9|*|4|5|6|-|1|2|3|+|0|.|⌫|='.replace(/ /g,'|').split('|').map(k=>`<button class="${'/*-+='.includes(k)?'o':''}">${k}</button>`).join('')+'</div>';
  b.querySelectorAll('button').forEach(x=>x.onclick=()=>{const k=x.textContent;
   if(k==='C')e='';else if(k==='⌫')e=e.slice(0,-1);else if(k==='='){try{e=String(+(Function('"use strict";return('+(e||0)+')')()).toFixed(8))}catch{e=''}}else e+=k;
   $('#cd').textContent=e||'0'})}},
 {n:'Notițe',i:'📝',c:'#feca57',r:()=>{$('#ab').innerHTML='<textarea id="nt" placeholder="Scrie ceva..."></textarea>';const t=$('#nt');t.value=store.get('note','');t.oninput=()=>store.set('note',t.value)}},
 {n:'Ceas',i:'⏰',c:'#54a0ff',r:()=>{$('#ab').innerHTML='<div class="big2" id="bigclk"></div>';tick()}},
 {n:'Setări',i:'⚙️',c:'#8395a7',r:()=>{$('#ab').innerHTML='<div class="row"><span>Repornește telefonul</span><button id="rb">Repornește</button></div><div class="row"><span>Șterge notițele</span><button id="cn">Șterge</button></div><div class="row"><span>Versiune</span><span>Android Nou 1.0</span></div>';
  $('#rb').onclick=boot;$('#cn').onclick=()=>store.set('note','')}},
 {n:'Cameră',i:'📷',c:'#ee5253',r:()=>{$('#ab').innerHTML='<p style="margin-top:30px;text-align:center;opacity:.7">Camera va fi disponibilă într-o versiune viitoare.</p>'}},
 {n:'Muzică',i:'🎵',c:'#5f27cd',r:()=>{$('#ab').innerHTML='<p style="margin-top:30px;text-align:center;opacity:.7">Nicio melodie încă.</p>'}}
];
const mk=a=>{const b=document.createElement('button');b.className='ic';b.innerHTML=`<span style="background:${a.c}">${a.i}</span>${a.n}`;b.onclick=()=>open(a);return b};
apps.slice(0,4).forEach(a=>$('#grid').append(mk(a)));
apps.slice(4).forEach(a=>$('#dock').append(mk(a)));
const open=a=>{$('#at').textContent=a.n;$('#app').hidden=false;a.r()};
function closeApp(){$('#app').hidden=true}
$('#back').onclick=$('#hm').onclick=closeApp;
$('#rc').onclick=boot;
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
