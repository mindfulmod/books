import {libraryData} from './personal-library.js';

export const storageKey='beautiful-names-library-v1';
export const legacyKey='beautiful-names-layout-studies-v1';
const recoveryKey=`${storageKey}-recovery`;

/** Invalid browser data must never prevent reading or silently destroy writing. */
export function loadReader(storage,names) {
  const empty={...libraryData({},names),theme:'night',palette:'ink'};
  let raw=null,source=storageKey,recovery=null;
  try {
    recovery=storage.getItem(recoveryKey);
    raw=storage.getItem(storageKey);
    if(raw===null){source=legacyKey;raw=storage.getItem(legacyKey);}
    if(raw===null)return {saved:empty,recovery,available:true,writable:true};
    let value;
    try{value=JSON.parse(raw);}catch{value=null;}
    const valid=value&&typeof value==='object'&&!Array.isArray(value);
    if(valid&&value.last?.id&&!value.positions?.[value.last.id])value.positions={...value.positions,[value.last.id]:value.last};
    const data=valid?libraryData(value,names):libraryData({},names);
    const changed=!valid||['notes','questions','passages'].some(key=>
      value[key]!==undefined&&JSON.stringify(value[key])!==JSON.stringify(data[key]));
    if(changed){
      // Keep the exact original before any future save can replace it.
      // If recovery storage is full, keep reading in memory and leave the source untouched.
      if(!recovery){recovery=raw;try{storage.setItem(recoveryKey,raw);}catch{return {saved:{...empty,...data},recovery,available:false,writable:false};}}
      else if(source===storageKey&&raw!==recovery){return {saved:{...empty,...data},recovery:raw,available:false,writable:false};}
    }
    return {saved:{...empty,...data,theme:value?.theme==='day'?'day':'night'},recovery,available:true,writable:true};
  }catch{return {saved:empty,recovery:raw||recovery,available:false,writable:false};}
}

export function saveReader(storage,saved,writable=true,expected) {
  if(!writable)return false;
  try{
    // A second tab must not replace writing saved after this tab opened.
    if(expected!==undefined&&storage.getItem(storageKey)!==expected)return false;
    storage.setItem(storageKey,JSON.stringify(saved));return true;
  }catch{return false;}
}
