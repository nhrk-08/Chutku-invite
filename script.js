const $=s=>document.querySelector(s);let cur=0;
const pages=[...document.querySelectorAll('.pg')];
const dots=$('#dots');pages.forEach(()=>dots.append(document.createElement('i')));
function go(i){cur=i;pages.forEach((p,j)=>p.classList.toggle('on',j==i));[...dots.children].forEach((d,j)=>d.classList.toggle('on',j==i));
 $('#corner').classList.toggle('on',i==1||i==3);if(i==3)burst(120)}
go(0);
['n0','n1','n2'].forEach((id,i)=>$('#'+id).onclick=()=>go(i+1));
/* confetti */
const cv=$('#cv'),cx=cv.getContext('2d');let ps=[];
function rs(){cv.width=innerWidth;cv.height=innerHeight}rs();onresize=rs;
function burst(n,x=innerWidth/2,y=innerHeight/3){const c=['#e8b04a','#e58a9b','#f8e9d2','#9bd1c4'];
 for(let i=0;i<n;i++)ps.push({x,y,vx:(Math.random()-.5)*10,vy:Math.random()*-9-2,r:Math.random()*5+3,c:c[i%4],l:100})}
(function loop(){cx.clearRect(0,0,cv.width,cv.height);ps=ps.filter(p=>p.l>0);
 ps.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.25;p.l--;cx.globalAlpha=Math.min(1,p.l/30);cx.fillStyle=p.c;cx.fillRect(p.x,p.y,p.r,p.r*1.6)});requestAnimationFrame(loop)})();
/* diyas */
let lit=0;
for(let i=0;i<3;i++){const d=document.createElement('div');d.className='diya';
 d.innerHTML='<svg viewBox="0 0 80 70"><g class="flame"><path d="M40 4c10 14 12 20 0 30C28 24 30 18 40 4z" fill="#ffb347"/><path d="M40 16c5 8 6 11 0 16-6-5-5-8 0-16z" fill="#fff3b0"/></g><path d="M6 38h68c0 18-14 28-34 28S6 56 6 38z" fill="#b5532f" stroke="#e8b04a" stroke-width="3"/></svg>';
 d.onclick=()=>{if(d.classList.contains('lit'))return;d.classList.add('lit');lit++;$('#hint').textContent=lit+' of 3 lit';
  if(lit==3){document.body.classList.add('lit');$('#hint').textContent='The night is glowing ✨';$('#n0').classList.add('show');burst(60)}};
 $('#diyas').append(d)}
/* patches */
const PH=[['p1','Twirl time 💃'],['p2','Little diva ✨'],['p3','Sunshine baby ☀️'],['p4','Day one 🍼'],['p5','Birthday girl 👑'],['p6','Cool kid 😎']];
const lb=document.createElement('div');lb.className='lb';lb.innerHTML='<img><div></div>';document.body.append(lb);
lb.onclick=()=>lb.classList.remove('on');
function show(src,cap){lb.querySelector('img').src=src;lb.querySelector('div').textContent=cap;lb.classList.add('on')}
PH.forEach(([k,c])=>{const p=document.createElement('div');p.className='patch';
 p.style.backgroundImage=`url(images/${k}.jpg)`;p.innerHTML=`<span>${c}</span>`;
 p.onclick=()=>show(`images/${k}.jpg`,c);$('#quilt').append(p)});
$('#corner').style.backgroundImage='url(images/hand.jpg)';
$('#corner').textContent='';
$('#corner').onclick=()=>show('images/hand.jpg',"Chutku's little hand ✋");
/* balloons */
const W=["Neharika, 18 looks stunning on you. Shine like you always do! ✨","Chutku, may your giggles never stop, tiny queen! 👑","To two sisters: the best gift is each other 💕","May this new chapter be your brightest yet 🌸","Mundan day blessings: may Chutku grow strong, wise and happy 🙏","Eighteen! The world is ready for you, Neharika 🌍","Three years of chaos, cuteness and cake! 🎂","Come hungry, leave happy. See you at Meerav! 🍽️"];
const cols=['#e58a9b','#e8b04a','#9bd1c4','#b79be0'];let popped=0;
W.forEach((w,i)=>{const b=document.createElement('div');b.className='b';
 b.style.cssText+=`left:${(i%4)*24+3}%;top:${i<4?8:48}%;background:${cols[i%4]};animation-delay:${i*.35}s`;
 b.onclick=e=>{b.classList.add('pop');$('#wish').textContent=w;burst(30,e.clientX,e.clientY);
  if(++popped>=3)$('#n2').classList.add('show')};$('#sky').append(b)});