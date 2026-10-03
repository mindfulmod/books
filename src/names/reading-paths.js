// Editorial reading sequences, not prescribed devotional programmes.
export const readingPaths = [
  {id:'mercy-and-return',title:'Mercy & return',line:'Know the mercy of the One to whom you return.',art:'ar-rahman',ids:['ar-rahman','ar-rahim','al-ghaffar','at-tawwab','al-afuw'],closing:'His mercy invites a truthful return. Revisit a meaning you want to understand more deeply.'},
  {id:'knowing-and-nearness',title:'Known by Allah',line:'His knowledge encompasses the outward and the hidden.',art:'al-latif',ids:['al-alim','as-sami','al-basir','al-khabir','al-latif'],closing:'Nothing about your life lies outside His knowledge. Carry that recognition into prayer with sincerity.'},
  {id:'trust-and-provision',title:'The One you rely on',line:'Contemplate His provision, sufficiency, and care.',art:'ar-razzaq',ids:['ar-razzaq','al-hasib','al-wakil','al-qayyum'],closing:'Every means of support depends on Him. Let recognising the Giver deepen gratitude and trust.'},
  {id:'creation-and-wonder',title:'Signs of the Creator',line:'From the giving of existence to the forms before you.',art:'al-musawwir',ids:['al-khaliq','al-bari','al-musawwir','al-badi','az-zahir'],closing:'Let the signs you notice lead you toward their Creator. There is more to recognise in the familiar.'},
  {id:'majesty-and-praise',title:'Majesty & praise',line:'Know His perfection and let understanding become praise.',art:'al-quddus',ids:['allah','al-quddus','al-jalil','al-hamid','dhul-jalali-wal-ikram'],closing:'The praise on your tongue can carry a deeper recognition of the One you worship.'},
  {id:'beginning-and-return',title:'Beginning & return',line:'Contemplate the Lord of existence, life, and final return.',art:'al-baith',ids:['al-awwal','al-mubdi','al-muid','al-baith','al-akhir'],closing:'Beginning and return belong to Allah. Let knowing Him give your passing days a lasting direction.'}
];
export const pathById = id => readingPaths.find(p=>p.id===id);
export function pathPlace(path,saved={}) {
  const remembered=saved.pathPlaces?.[path.id];
  return path.ids.includes(remembered)?remembered:path.ids.find(id=>!saved.finished?.includes(id))||path.ids[0];
}
export function pathNeighbours(path,id) {
  const index=path?.ids.indexOf(id)??-1;
  return index<0?null:{index,total:path.ids.length,previous:path.ids[index-1]||null,next:path.ids[index+1]||null};
}
