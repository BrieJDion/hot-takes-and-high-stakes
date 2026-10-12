/* Deterministic, accessible pixel-face avatars. Every feature is available to every player. */
(function(){
const choices={skin:['#FCE4D4','#F5D3AF','#EBC49C','#DDAA81','#C88C61','#B97D55','#A86C46','#96603F','#875238','#78452E','#693E2B','#593528','#4D3027','#422922','#35231F','#291C1A'],face:['Round','Oval','Square','Heart','Long','Angular'],hair:['None','Buzz cut','Short','Side part','Pixie','Bob','Long straight','Long wavy','Curly short','Curly long','Afro','High-top','Coily crop','Locs short','Locs long','Braids','Box braids','Cornrows','Twists','Ponytail','Bun','Two buns','Fade','Mohawk'],hairColor:['Black','Dark brown','Brown','Chestnut','Auburn','Ginger','Blonde','Platinum','Gray','White','Pink','Purple','Teal','Blue'],eyes:['Round','Narrow','Wide','Sleepy','Upturned','Downturned','Closed'],eyeColor:['Dark','Brown','Hazel','Green','Blue','Gray','Violet'],brows:['Natural','Thick','Thin','Arched','Straight','None'],nose:['Small','Button','Wide','Long','Angular','Freckles only'],mouth:['Smile','Grin','Neutral','Open smile','Smirk','Lips','Surprised'],facialHair:['None','Stubble','Mustache','Goatee','Short beard','Full beard','Sideburns','Soul patch'],headwear:['None','Hijab','Turban','Headwrap','Beanie','Baseball cap','Wide-brim hat','Bandana','Kufi'],glasses:['None','Round glasses','Square glasses','Cat-eye glasses','Sunglasses'],hearingAid:['None','Left hearing aid','Right hearing aid','Both hearing aids'],earrings:['None','Studs','Hoops','One stud','Dangling'],shirt:['T-shirt','Sweater','Collar','Hoodie','Jacket','Striped shirt','Button-up','Tank top','Jersey','Turtleneck','Overalls','Scarf'],shirtColor:['Teal','Orange','Pink','Purple','Blue','Green','Yellow','Red','Cream','Black','White','Lavender']};
const colors={hairColor:['#241b23','#432a23','#775038','#9b573a','#a83d27','#e37835','#e6bb5d','#f8e8a6','#93919e','#f5f2e9','#e66caa','#a477e7','#18bdb3','#4e82e7'],eyeColor:['#251c2c','#69412d','#867046','#448c69','#4882bf','#798399','#8c57b0'],shirtColor:['#24d9cc','#ffac42','#ff83b3','#6746b9','#428bd5','#49b87d','#f4d35e','#d35b65','#fff4db','#332842','#fafafa','#b59aef']};
const defaults={skin:4,face:0,hair:9,hairColor:1,eyes:0,eyeColor:0,brows:0,nose:0,mouth:0,facialHair:0,headwear:0,glasses:0,hearingAid:0,earrings:0,shirt:0,shirtColor:0};
const safe=a=>Object.fromEntries(Object.keys(choices).map(k=>{let n=Number(a?.[k]);return [k,Number.isInteger(n)&&n>=0&&n<choices[k].length?n:defaults[k]]}));
function draw(data){
 const a=safe(data), skin=choices.skin[a.skin], hair=colors.hairColor[a.hairColor], shirt=colors.shirtColor[a.shirtColor], iris=colors.eyeColor[a.eyeColor];
 const dark='#30253e', outline='#3b294c', shade=mix(skin,'#5b3045',.18), light=mix(skin,'#ffffff',.16), hshade=mix(hair,'#181023',.33), hlight=mix(hair,'#ffffff',.22);
 const layers={background:[],backHair:[],body:[],ears:[],face:[],features:[],frontHair:[],headwear:[],accessories:[]};let L=layers.background;
 function rect(x,y,w,h,c){L.push(`<rect x="${Math.round(x)}" y="${Math.round(y)}" width="${Math.round(w)}" height="${Math.round(h)}" fill="${c}"/>`)}
 function path(d,c){L.push(`<path d="${d}" fill="${c}"/>`)}
 function ellipse(cx,cy,rx,ry,c){for(let y=Math.ceil(cy-ry);y<=Math.floor(cy+ry);y+=2){const t=(y-cy)/ry, dx=Math.floor(rx*Math.sqrt(Math.max(0,1-t*t)));if(dx>0)rect(cx-dx,y,dx*2,2,c)}}
 function strand(x,y,len,w=4){ // staggered rope with separated shaded segments, not a solid curtain
  for(let j=0;j<len;j+=4){const xx=x+Math.round(Math.sin(j/7+x)*1.5);rect(xx,y+j,w,Math.min(4,len-j),j%8===0?hshade:hair);rect(xx+1,y+j,1,Math.min(3,len-j),hlight)}
 }
 // soft backdrop with simple 8-bit checker corners
 rect(0,0,96,96,'#e6d9ff');rect(0,77,96,19,'#cbb7f7');for(let i=0;i<4;i++){rect(5+i*4,7,2,2,'#ffffff');rect(76+i*4,68,2,2,'#ffffff')}
 // Hair behind the head is always below the face and above the background.
 L=layers.backHair;
 if([5,6,7,9,14,15,16,17,18,19].includes(a.hair)){rect(22,27,52,52,hshade);rect(19,43,9,36,hair);rect(68,43,9,36,hair)}
 if([10,11,12].includes(a.hair)){ellipse(48,37,32,31,hshade);ellipse(48,33,29,29,hair)}
 if(a.hair===21){ellipse(17,28,13,14,hair);ellipse(79,28,13,14,hair)}
 L=layers.body;rect(13,85,70,11,outline);rect(17,79,62,17,shirt);rect(26,75,44,21,shirt);rect(39,69,18,15,shade);rect(41,68,14,14,skin);
 if(a.shirt===3){rect(29,77,38,9,outline);rect(32,77,32,9,shirt)}
 if([2,6,7].includes(a.shirt)){rect(45,81,6,15,'#fff2dc')}
 if(a.shirt===5){for(let y=83;y<96;y+=6)rect(19,y,58,2,'#fff2dc')}
 if(a.shirt===11){rect(43,80,10,16,'#fff2dc')}
 L=layers.ears;rect(21,47,8,15,shade);rect(67,47,8,15,shade);rect(23,49,5,10,skin);rect(68,49,5,10,skin);
 L=layers.face;
 // all silhouettes leave the same central safe zone for eyes/nose/mouth
 const shape=a.face;
 if(shape===2){rect(27,24,42,43,outline);rect(29,26,38,39,skin)}
 else if(shape===4){rect(30,20,36,51,outline);rect(32,22,32,47,skin)}
 else {rect(29,23,38,42,outline);rect(31,25,34,38,skin);rect(27,33,42,23,skin);rect(33,62,30,6,skin);if(shape===3){rect(29,29,38,21,skin);rect(34,62,28,6,shade)}if(shape===5){rect(32,62,32,5,shade)}}
 rect(32,32,4,26,light);rect(61,33,3,23,shade);rect(36,65,24,2,shade);
 L=layers.features;
 // eyes have separated sclera/iris/pupils for recognizable expressions
 const ey=a.eyes===3?45:44;const narrow=[1,3,6].includes(a.eyes);
 for(const x of [36,54]){rect(x,ey,9,narrow?4:7,'#fef9ee');rect(x+3,ey,4,narrow?4:6,iris);rect(x+4,ey,2,narrow?3:4,dark);rect(x+3,ey,1,2,'#fff');if(a.eyes===6)rect(x,ey,9,3,shade)}
 if(a.brows!==5){for(const x of [35,53]){rect(x,39,12,a.brows===1?3:2,hshade);if(a.brows===3)rect(x+7,37,5,2,hshade)}}
 if(a.nose===5){rect(34,55,2,2,shade);rect(61,55,2,2,shade)}else{rect(47,51,a.nose===2?5:3,7,shade);rect(46,57,a.nose===2?8:5,2,mix(skin,'#80494a',.42))}
 const lip='#93465f';if(a.mouth===6){rect(46,61,5,6,lip)}else if(a.mouth===2){rect(42,63,13,2,lip)}else if(a.mouth===4){rect(42,62,11,2,lip);rect(53,60,3,2,lip)}else{rect(42,61,13,2,lip);rect(44,63,9,2,lip);if([1,3].includes(a.mouth))rect(44,61,9,2,'#fff5ee')}
 if(a.facialHair){if([2,3,5,7].includes(a.facialHair)){rect(42,59,6,2,hshade);rect(49,59,6,2,hshade)}if([1,3,4,5].includes(a.facialHair)){rect(34,64,6,4,hshade);rect(40,68,16,4,hair);rect(56,64,6,4,hshade);if(a.facialHair===5){rect(31,55,5,13,hair);rect(60,55,5,13,hair)}}if(a.facialHair===6){rect(29,50,4,13,hair);rect(63,50,4,13,hair)}}
 L=layers.frontHair;
 const h=a.hair;
 if(h===1||h===22){rect(29,22,38,7,hair);rect(34,19,28,4,hlight);if(h===22){rect(28,25,6,17,hshade);rect(62,25,6,17,hshade)}}
 else if([2,3,4,5,6].includes(h)){rect(26,19,44,12,hair);rect(30,15,34,8,hair);rect(27,28,7,h===6?42:14,hshade);rect(64,27,7,[5,6].includes(h)?44:12,hshade);if(h===3){rect(30,29,24,5,hair)}if(h===4){rect(32,17,13,6,hlight)}}
 else if(h===7){ // clearly wavy: stepped S-shaped locks
  rect(27,17,42,12,hair);for(const x of [23,67]){for(let y=27;y<74;y+=6){const shift=Math.round(Math.sin((y-27)/6*Math.PI/2)*3);rect(x+shift,y,7,5,hair);rect(x+shift+1,y,2,3,hlight)}}rect(34,20,26,3,hlight)
 }
 else if([8,9].includes(h)){ // curls are individual rounded clusters, not flat slabs
  for(let y=17;y<=31;y+=8)for(let x=25;x<=69;x+=9){ellipse(x+(y%3),y,6,6,(x+y)%3===0?hshade:hair);rect(x-2,y-3,3,2,hlight)}
  if(h===9){for(let y=34;y<=69;y+=9){ellipse(24+Math.round(Math.sin(y)*2),y,7,7,hair);ellipse(72+Math.round(Math.cos(y)*2),y,7,7,hair)}}
 }
 else if([10,11,12].includes(h)){ // afro, high-top, coily crop
  const top=h===11?7:h===12?19:12;for(let y=top;y<=32;y+=8)for(let x=23;x<=73;x+=9){ellipse(x,y,6,6,(x+y)%2?hshade:hair);rect(x-1,y-2,2,2,hlight)}if(h===11){rect(29,9,38,10,hair)}
 }
 else if([13,14,17].includes(h)){ // locs: distinct shaded cylindrical strands with gaps
  rect(29,18,38,10,hair);for(const x of [24,31,38,59,66,73])strand(x,26,h===14?49:29,4);if(h===17){for(const x of [26,67])strand(x,29,37,5)}
 }
 else if([15,16,18].includes(h)){ // braids/twists: alternating plaited pixels
  rect(28,18,40,11,hair);for(const x of [24,31,65,72]){const len=h===16?49:31;for(let y=28;y<28+len;y+=5){rect(x+(Math.floor(y/5)%2?1:0),y,5,3,hair);rect(x+(Math.floor(y/5)%2?0:2),y+3,4,2,hshade);rect(x+1,y+1,1,2,hlight)}}
 }
 else if(h===19){rect(29,18,38,11,hair);rect(66,25,8,21,hair);ellipse(77,51,9,11,hair)}
 else if(h===20){rect(29,20,38,11,hair);ellipse(48,12,13,12,hair)}
 else if(h===21){rect(29,23,38,9,hair)}
 else if(h===23){rect(28,27,40,8,hair);rect(41,7,14,24,hair);rect(43,5,10,7,hlight)}
 // Headwear is above hair; covered styles hide conflicting bulky hair for a clean silhouette.
 L=layers.headwear;
 const hat=a.headwear;
 if(hat===1){rect(24,13,48,18,'#7655bf');rect(21,28,12,48,'#7655bf');rect(63,28,12,48,'#7655bf');rect(32,23,32,7,'#bca7f2')}
 if(hat===2){rect(24,13,48,15,'#ffac42');rect(31,7,34,10,'#ffdf8b');rect(30,17,34,4,'#c87e39')}
 if(hat===3){rect(24,14,48,15,'#24d9cc');rect(22,26,10,42,'#24d9cc');rect(32,17,32,4,'#b0f7ee')}
 if(hat===4){rect(25,14,46,17,'#ff83b3');rect(28,12,40,6,'#ffc0d7')}
 if(hat===5){rect(25,15,46,13,'#4c7fdd');rect(54,26,29,5,'#4c7fdd');rect(32,17,30,3,'#92b3ff')}
 if(hat===6){rect(16,27,64,5,'#ffac42');rect(28,13,40,15,'#ffac42')}
 if(hat===7){rect(27,24,42,7,'#f27e9f');rect(62,30,9,13,'#f27e9f')}
 if(hat===8){rect(27,17,42,12,'#fff4d6');rect(31,15,34,4,'#c6ae84')}
 L=layers.accessories;
 if(a.glasses){const c=a.glasses===4?'#36274e':'#eaa74a';for(const x of [33,52]){rect(x,42,14,2,c);rect(x,42,2,12,c);rect(x+12,42,2,12,c);rect(x,52,14,2,c)}rect(47,45,5,2,c);if(a.glasses===4){rect(35,45,10,7,'#443d67');rect(54,45,10,7,'#443d67')}}
 if([1,3].includes(a.hearingAid)){rect(19,47,4,13,'#3a9fb8');rect(21,49,2,7,'#c2f5fc')}
 if([2,3].includes(a.hearingAid)){rect(73,47,4,13,'#3a9fb8');rect(73,49,2,7,'#c2f5fc')}
 if(a.earrings){rect(23,63,3,a.earrings===4?9:4,'#f5c94f');if(a.earrings!==3)rect(70,63,3,a.earrings===4?9:4,'#f5c94f')}
 return `<svg viewBox="0 0 96 96" role="img" aria-label="Customized pixel avatar" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">${Object.values(layers).flat().join('')}</svg>`;
}
function mix(a,b,t){const n=x=>parseInt(x.slice(1),16),u=n(a),v=n(b);return '#'+[16,8,0].map(s=>Math.round(((u>>s)&255)*(1-t)+((v>>s)&255)*t).toString(16).padStart(2,'0')).join('')}
window.PixelAvatar={choices,defaults,safe,draw,random(){return Object.fromEntries(Object.entries(choices).map(([k,v])=>[k,Math.floor(Math.random()*v.length)]))}};
})();
