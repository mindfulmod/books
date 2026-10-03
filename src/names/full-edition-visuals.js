// Original decorative identities. Neither scenes nor ornaments are traditional
// symbols of divine attributes. Paintings are intentionally shared settings.
export const newScenes = {
  'library-court': {title:'The quiet library court',description:'A blue book on a carved cedar stand beside a round fountain, deep-blue tiles, cypresses and a distant lake.',focus:100},
  'rain-garden': {title:'After the rain',description:'Saffron and violet crocuses, rain-beaded leaves, and a wet terracotta path reflecting the sky beneath an almond tree.',focus:280},
  'mountain-pass': {title:'The winding mountain path',description:'A stone footpath among juniper and red wildflowers opens toward layered blue mountains and a winding turquoise river.',focus:210},
  'tidal-garden': {title:'The sheltered tidal pools',description:'Turquoise tidal pools between dark rocks, sea lavender, and a flowering tamarisk branch beside the open sea.',focus:400},
  'olive-seasons': {title:'The old olive grove',description:'An ancient olive tree with twisting bark stands among blue anemones and low terraces above a turquoise valley.',focus:300},
  'star-court': {title:'The open-sky courtyard',description:'An octagonal blue-tiled basin reflects the open sky, with a tall cypress, flowering pots, and distant blue hills.',focus:320}
};
for(const [id,scene] of Object.entries(newScenes))scene.file=`${id}-v1.webp`;

// name | scene | ornament family. Selection remains stable when readings move.
const assignments = `allah|star-court|star
al-fattah|al-ghafur|arch
al-alim|library-court|lattice
al-qabid|tidal-garden|ripple
al-basit|ar-rahman|fan
al-khafid|mountain-pass|reed
ar-rafi|al-malik|fan
al-muizz|al-aziz|star
al-mudhill|olive-seasons|leaf
as-sami|as-salam|ripple
al-basir|library-court|lattice
al-hakam|al-musawwir|lattice
al-adl|al-jabbar|arch
al-khabir|al-latif|leaf
al-halim|tidal-garden|ripple
al-azim|mountain-pass|fan
ash-shakur|rain-garden|flower
al-ali|al-malik|star
al-kabir|al-qahhar|reed
al-hafiz|olive-seasons|leaf
al-muqit|ar-razzaq|reed
al-hasib|ar-rahim|arch
al-jalil|al-musawwir|star
al-karim|al-wahhab|flower
ar-raqib|al-muhaymin|leaf
al-mujib|rain-garden|flower
al-wasi|star-court|fan
al-hakim|library-court|lattice
al-majid|al-wadud|flower
al-baith|al-khaliq|reed
ash-shahid|mountain-pass|fan
al-haqq|al-quddus|star
al-wakil|al-jabbar|arch
al-qawiyy|al-aziz|lattice
al-matin|al-qahhar|reed
al-wali|ar-rahim|leaf
al-hamid|al-bari|flower
al-muhsi|library-court|lattice
al-mubdi|al-khaliq|reed
al-muid|rain-garden|ripple
al-muhyi|al-bari|flower
al-mumit|tidal-garden|ripple
al-hayy|olive-seasons|leaf
al-qayyum|al-qahhar|reed
al-wajid|star-court|star
al-maajid|al-wahhab|flower
al-wahid|al-quddus|star
as-samad|al-mumin|arch
al-qadir|al-aziz|lattice
al-muqtadir|mountain-pass|fan
al-muqaddim|al-ghafur|arch
al-muakhkhir|al-ghaffar|leaf
al-awwal|al-khaliq|reed
al-akhir|star-court|fan
az-zahir|mountain-pass|star
al-batin|library-court|lattice
al-waali|al-malik|arch
al-mutaali|al-mutakabbir|fan
al-barr|al-wahhab|flower
at-tawwab|al-ghafur|arch
al-muntaqim|al-aziz|lattice
al-afuw|rain-garden|ripple
ar-rauf|al-latif|leaf
malik-al-mulk|al-muhaymin|reed
dhul-jalali-wal-ikram|star-court|star
al-muqsit|al-musawwir|lattice
al-jami|al-jabbar|arch
al-ghani|olive-seasons|leaf
al-mughni|ar-razzaq|reed
al-mani|al-mumin|arch
ad-darr|tidal-garden|ripple
an-nafi|rain-garden|flower
an-nur|star-court|star
al-hadi|mountain-pass|fan
al-badi|al-bari|flower
al-baqi|olive-seasons|leaf
al-warith|al-mutakabbir|fan
ar-rashid|library-court|lattice
as-sabur|as-salam|ripple`.split('\n');
const variants={};
export const visualIdentities = Object.fromEntries(assignments.map(row=>{
  const [id,scene,family]=row.split('|');
  const variation=variants[family]=(variants[family]||0)+1;
  return [id,{scene,family,variation}];
}));

const colours={star:['#98713e','#d2b584'],arch:['#9a7550','#ccb089'],lattice:['#537896','#9dbbd1'],ripple:['#427f8b','#8fbac5'],fan:['#66789c','#adb9d9'],leaf:['#637c63','#acc1a1'],flower:['#a56a70','#d9a3a8'],reed:['#947644','#cbb789']};
export const fullEditionFrames=Object.fromEntries(Object.entries(visualIdentities).map(([id,v])=>[id,{...v,motif:`edition-${v.family}`,label:`${{star:'Inlaid star',arch:'Open arcade',lattice:'Woven tile',ripple:'Water lines',fan:'Unfolding fan',leaf:'Olive tracery',flower:'Petal rosette',reed:'Reed spray'}[v.family]} · ${v.variation}`,day:colours[v.family][0],night:colours[v.family][1]}]));

const path=d=>`<path d="${d}"/>`;
const point=(r,a)=>[32+r*Math.cos(a),32+r*Math.sin(a)].map(n=>Number(n.toFixed(2)));
const xy=(r,a)=>point(r,a).join(' ');
export function editionSeal({family,variation:v}) {
  const n=4+v, turn=v%2?0:Math.PI/n;
  let body='';
  if(family==='star') {
    const count=5+v%6,r=21+(v%3);
    body=path(Array.from({length:count*2},(_,i)=>`${i?'L':'M'}${xy(i%2?10+v/3:r,i*Math.PI/count-Math.PI/2)}`).join(' ')+'Z');
    body+=path(Array.from({length:count},(_,i)=>`M${xy(r,i*2*Math.PI/count-Math.PI/2)} 32 32`).join(' '));
  } else if(family==='flower'||family==='fan') {
    const count=family==='fan'?5+v%5:5+v%7,spread=family==='fan'?Math.PI*1.3:Math.PI*2;
    body=Array.from({length:count},(_,i)=>{const a=turn+i*spread/count-(family==='fan'?Math.PI*1.15:Math.PI/2),b=a+.3,c=a-.3;return path(`M32 32 Q${xy(31,c)} ${xy(24,a)} Q${xy(31,b)} 32 32`);}).join('');
    if(family==='fan')body+=path(`M20 49 Q32 ${54+v/3} 44 49 M24 55h16`);
  } else if(family==='lattice') {
    const count=3+v%5,step=36/count;
    body=path('M32 6 58 32 32 58 6 32Z');
    for(let i=1;i<count;i++){const d=i*step;body+=path(`M${14+d/2} ${32-d/2} ${32+d/2} ${50-d/2} M${32-d/2} ${14+d/2} ${50-d/2} ${32+d/2}`);}
    body+=`<circle cx="32" cy="32" r="${4+v/3}"/>`;
  } else if(family==='arch') {
    for(let i=0;i<3+v%3;i++){const left=8+i*5,right=64-left,top=6+i*5+(v%4);body+=path(`M${left} 55V${top+21} Q${left} ${top+10} 32 ${top} Q${right} ${top+10} ${right} ${top+21}V55`);}
    body+=path(`M${12+v} 59H${52-v}`);
  } else if(family==='ripple') {
    for(let i=0;i<3+v%4;i++){const y=25+i*6,w=25-i*2;body+=path(`M${32-w} ${y} Q${20} ${y-5-v/3} 32 ${y} T${32+w} ${y}`);}
    body+=path(`M32 6Q${20-v/2} 19 32 25Q${44+v/2} 19 32 6Z`);
  } else if(family==='leaf') {
    body=path('M14 57Q31 36 42 6');
    for(let i=0;i<3+v%3;i++){const y=18+i*8,x=39-i*4,side=i%2?1:-1;body+=path(`M${x} ${y} Q${x+side*(15+v/2)} ${y-12} ${x+side*15} ${y} Q${x+side*8} ${y+7} ${x} ${y}Z`);}
  } else {
    for(let i=0;i<3+v%4;i++){const x=12+i*(40/(2+v%4)),top=7+Math.abs(32-x)/2;body+=path(`M32 58Q${x} 34 ${x} ${top+9} M${x} ${top+9}Q${x-5} ${top} ${x} ${top-3}Q${x+5} ${top} ${x} ${top+9}Z`);}
  }
  return body+`<path class="enamel-inlay" d="M32 ${29-v/12}l3 3-3 3-3-3Z"/>`;
}
export function editionCorner(f) {
  const inset=5+f.variation%4;
  return path(`M6 57V30Q6 6 30 6H57 M12 48V31Q12 12 31 12H48`)+`<g transform="translate(${inset} ${inset}) scale(.69)">${editionSeal(f)}</g>`;
}
