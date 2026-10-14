/* Pixel Party Edition v3: 16 complete, fixed character portraits.
   The selected ID is the only avatar customization data sent to the server. */
(function(){
'use strict';
const names=[
 ['Nova','Short curls'],['Jules','Wavy bob'],['Kai','Fade'],['Amara','Long locs'],
 ['River','Side-swept'],['Zuri','Afro'],['Milo','Messy crop'],['Sage','Hijab'],
 ['Indigo','Braids'],['Piper','High ponytail'],['Remy','Silver waves'],['Ari','Beanie'],
 ['Toni','Bun'],['Skye','Coily crop'],['Ash','Long straight'],['Cleo','Cornrows']
];
const defaults={character:0};
function safe(value){const id=Number(value?.character);return {character:Number.isInteger(id)&&id>=0&&id<names.length?id:0};}
function draw(value){const {character}=safe(value);const [name]=names[character];return `<img src="/avatars/${String(character).padStart(2,'0')}.svg" alt="${name} pixel-art character" loading="lazy" decoding="async">`;}
function random(){return {character:Math.floor(Math.random()*names.length)};}
window.PixelAvatar={defaults,safe,draw,random,characters:names.map(([name,description],id)=>({id,name,description}))};
})();
