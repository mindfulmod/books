import {normalizeSearch} from './discovery.js';
import {pairFor} from './name-pairs.js';

export function readingList(saved={},names=[]){
  const known=new Set(names.map(n=>n.id));
  return [...new Set([saved.nextReading,...(Array.isArray(saved.readingList)?saved.readingList:[])].filter(id=>known.has(id)))];
}
export function withReadingList(saved,ids,names){
  const known=new Set(names.map(n=>n.id)),list=[...new Set(ids.filter(id=>known.has(id)))];
  return {...saved,readingList:list,nextReading:list[0]||null};
}
export function toggleReadingList(saved,id,names){
  const list=readingList(saved,names);
  return withReadingList(saved,list.includes(id)?list.filter(value=>value!==id):[...list,id],names);
}
export function moveReadingList(saved,id,direction,names){
  const list=readingList(saved,names),index=list.indexOf(id),to=index+direction;
  if(index<0||to<0||to>=list.length||![-1,1].includes(direction))return saved;
  [list[index],list[to]]=[list[to],list[index]];
  return withReadingList(saved,list,names);
}
export function recallNames(names,saved={},mode='reading',limit=5){
  const history=saved.recalledNames||[];
  const olderFirst=list=>[...list].sort((a,b)=>history.indexOf(a)-history.indexOf(b));
  const revisits=olderFirst(saved.reviewNames||[]);
  const familiar=olderFirst([...new Set([...(saved.finished||[]),...(saved.bookmarks||[])])]);
  const candidates=mode==='revisit'?revisits:mode==='saved'?olderFirst(saved.bookmarks||[]):[...revisits,...familiar];
  const unique=[...new Set(candidates)].filter(id=>names.some(n=>n.id===id));
  return (unique.length?unique:mode==='reading'?['allah','ar-rahman','as-salam']:[]).slice(0,limit).map(id=>names.find(n=>n.id===id)).filter(Boolean);
}
export function nameConnections(name,names){
  if(!name)return [];
  const pair=pairFor(name.id),connections=new Map();
  const add=(id,kind,reason)=>{if(id!==name.id&&!connections.has(id)&&names.some(n=>n.id===id))connections.set(id,{name:names.find(n=>n.id===id),kind,reason});};
  pair?.ids.forEach(id=>add(id,'pair',pair.connection));
  name.related.forEach(id=>add(id,'related','Connected in this reading companion.'));
  names.filter(n=>n.theme===name.theme).forEach(n=>add(n.id,'theme','Explore the same attribute group.'));
  return [...connections.values()].slice(0,6);
}
export function searchReadings(names,query){
  const needle=normalizeSearch(query);if(!needle)return [];
  return names.flatMap(name=>{
    const label=normalizeSearch([name.name,name.arabic,name.meaning,...(name.aliases||[])].join(' '));
    if((/^\d+$/.test(needle)&&name.number===Number(needle))||label.includes(needle))return [{name,section:null,snippet:name.introduction}];
    if(normalizeSearch(name.introduction).includes(needle))return [{name,section:null,snippet:name.introduction}];
    for(let i=0;i<name.sections.length;i++){
      const section=name.sections[i],text=section.paragraphs.find(p=>normalizeSearch(p).includes(needle));
      if(text||normalizeSearch(section.title).includes(needle))return [{name,section:i,snippet:text||section.paragraphs[0]}];
    }
    return [];
  });
}
export function readingStats(names,saved={}){
  const known=new Set(names.map(n=>n.id)),count=list=>new Set((list||[]).filter(id=>known.has(id))).size;
  return {read:count(saved.finished),saved:count(saved.bookmarks),questions:Object.keys(saved.questions||{}).filter(id=>known.has(id)&&saved.questions[id]?.trim()).length,queued:readingList(saved,names).length,revisit:count(saved.reviewNames)};
}
// Each idea leads to the existing companion explanation rather than a second, competing definition.
export const keyIdeas=[
  {term:'Divine perfection',id:'al-quddus',section:1},
  {term:'Mercy',id:'ar-rahman',section:0},
  {term:'Knowledge',id:'al-alim',section:0},
  {term:'Power',id:'al-qadir',section:0},
  {term:'Creation',id:'al-khaliq',section:0},
  {term:'Sovereignty',id:'al-malik',section:0},
  {term:'Self-sufficiency',id:'al-ghani',section:0},
  {term:'Forgiveness',id:'al-ghafur',section:0},
  {term:'Wisdom',id:'al-hakim',section:0},
  {term:'Reliance',id:'al-wakil',section:1}
];
export function readingCardText(name,sourceUrl){
  return [name.name,name.arabic,name.meaning,name.takeaway,name.sections[0].paragraphs.join('\n\n'),'THE BEAUTIFUL NAMES','Original companion adaptation of al-Ghazali’s Al-Maqsad al-Asna; not a quotation from a published translation.',`Source: ${sourceUrl}`].join('\n\n')+'\n';
}
export function gardenSettings(names,art){
  const settings=new Map();
  for(const n of names){const a=art[n.id];if(!a)continue;if(!settings.has(a.file))settings.set(a.file,{...a,id:n.id,names:[]});settings.get(a.file).names.push(n);}
  return [...settings.values()];
}

export function searchExcerpt(text,query,limit=200){
  if(text.length<=limit)return text;
  const positions=[],normalized=[];let offset=0;
  for(const character of text){const value=normalizeSearch(character);for(const letter of value){normalized.push(letter);positions.push(offset);}offset+=character.length;}
  const hit=normalized.join('').indexOf(normalizeSearch(query));
  const point=hit>=0?positions[hit]:0;
  const desired=Math.max(0,point-55),start=desired?text.lastIndexOf(' ',desired)+1:0;
  let end=Math.min(text.length,start+limit);if(end<text.length){const space=text.lastIndexOf(' ',end);if(space>start)end=space;}
  return (start?'…':'')+text.slice(start,end)+(end<text.length?'…':'');
}
