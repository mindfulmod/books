import {loadReader,saveReader,storageKey} from './reader-storage.js';
import {createReadingRoom} from './reading-room.js';
import {readingList,toggleReadingList,searchReadings,searchExcerpt} from './reading-room-data.js';
import { names, themes, sourceUrl, publisherUrl } from './content.js';
import { frameFor, frameStyle, nameFrame, nameSeal } from './name-frames.js';
import { chapterArt, endingArt } from './chapter-art.js';
import { filterNames } from './discovery.js';
import { pageOfNames, readingPlace } from './name-navigation.js';
import { readingPreferences } from './reading-preferences.js';
import { keptExport } from './kept-export.js';
import { keptEntries, noteExcerpt } from './kept-collection.js';
import {readingMinutes,nextSuggestion,revisitSuggestion,toggleFinished} from './reader-journey.js';
import {readingPaths,pathById,pathPlace,pathNeighbours} from './reading-paths.js';
import {namePairs,pairFor} from './name-pairs.js';
import {passageKey,capturePassage,passagesFor,libraryData,createBackup,parseBackup,mergeLibrary,backupLimit} from './personal-library.js';

const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const esc = value => String(value ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const assetBase=import.meta.env.BASE_URL+'assets/beautiful-names/art/';
const art=assetBase+'garden.webp';
let browserStorage;try{browserStorage=window.localStorage;}catch{}
const loaded=loadReader(browserStorage,names);
let storageStamp;try{storageStamp=browserStorage?.getItem(storageKey);}catch{}
let otherTabChanged=false;
const recoveryUrl=loaded.recovery?URL.createObjectURL(new Blob([loaded.recovery],{type:'application/json'})):null;
let saved=loaded.saved;
let state={design:'folio',palette:'ink',theme:saved.theme,view:'home',index:0,page:0};
let artView=null,keptCopyUrl=null,pendingBackup=null,backupReadToken=0,sheetOpener=null;
let storageAvailable=loaded.available, positionTimer, toastTimer, suppressScroll=false;
let contentsState={query:'',theme:'all',status:'all',page:0};
let keptState={query:'',type:'all',page:0};
const keptCount=()=>keptEntries(names,saved).length;
function updateKeptBadge(){const button=$('.app-nav [data-action="kept"]');if(button)button.innerHTML='Saved'+(keptCount()?`<span class="kept-count">${keptCount()}</span>`:'');}
const current = () => names[state.index];
const nameSizeClass = name => name.length>18?'compound-name':name.length>12?'very-long-name':name.length>10?'long-name':'';
const hasSaved = id => saved.bookmarks.includes(id);
const isFinished = id => saved.finished.includes(id);
const icon = name => {
  const paths={book:'<path d="M12 5v15M3 4c4-1 7 0 9 2 2-2 5-3 9-2v15c-4-1-7 0-9 2-2-2-5-3-9-2z"/>',bookmark:'<path d="M6 3h12v18l-6-4-6 4z"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 1v2m0 18v2M1 12h2m18 0h2M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/>',moon:'<path d="M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11z"/>',arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',back:'<path d="M20 12H4m6-6-6 6 6 6"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',pen:'<path d="m4 16 12-12 4 4L8 20H4zm10-10 4 4"/>',check:'<path d="m5 12 4 4L19 6"/>'};
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.book}</svg>`;
};
const room=createReadingRoom({names,themes,esc,icon,chapterScene,nameSeal,chapterArt,sourceUrl,
  getSaved:()=>saved,currentId:()=>state.view==='read'?current().id:null,getTheme:()=>state.theme,
  sheet,closeSheet,toast,refreshJourney,
  savePatch:patch=>{const before=saved;saved={...saved,...patch};if(persist())return true;saved=before;return false;},
  openSearch:()=>{contentsState={query:'',theme:'all',status:'all',page:0,scope:'book'};contents();$('#name-search').focus();},
  openSection:(id,section)=>{openReading(id,false);if(section!==null){if(state.design==='book')navigate('read',state.index,section);else requestAnimationFrame(()=>jumpToSection(`section-${section}`));}}
});
function refreshJourney(){
  if(state.view==='home'){const y=window.scrollY;render();window.scrollTo({top:y,behavior:'instant'});}
  else {const next=$('#next-invitation');if(next)next.outerHTML=nextInvitation();}
}
const artObserver=typeof IntersectionObserver==='function'?new IntersectionObserver(entries=>{for(const {target,isIntersecting} of entries){if(!isIntersecting)continue;target.setAttribute('href',target.dataset.artSrc);target.removeAttribute('data-art-src');artObserver.unobserve(target);}},{rootMargin:'250px'}):null;
function loadArtwork(){artObserver?.disconnect();for(const el of document.querySelectorAll('[data-art-src]')){if(artObserver)artObserver.observe(el);else{el.setAttribute('href',el.dataset.artSrc);el.removeAttribute('data-art-src');}}}
const artworkChanges=new MutationObserver(()=>loadArtwork());
artworkChanges.observe($('#app'),{childList:true,subtree:true});
artworkChanges.observe($('#sheet'),{childList:true,subtree:true});
function scene(className='', label='An enamel garden, with gold-edged trees, a reflecting pool and mountains beyond.') {
  return `<div class="scene ${className}" ${className==='environment'?'aria-hidden="true"':''}><svg viewBox="${state.theme==='day'?0:887} 0 887 887" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(label)}"><image href="${art}" width="1774" height="887"/></svg></div>`;
}
function chapterScene(className='', id=current().id, full=false, theme=state.theme) {
  const asset=chapterArt[id];
  if(!asset)return scene(className);
  // Exclude the pair's one-pixel seam. Each artwork has an intentional mobile focal point.
  const x=full?0:asset.focus??443;
  return `<div class="scene chapter-scene ${className}" data-art="${id}"><svg viewBox="${x} ${theme==='day'?1:445} ${full?1774:888} 441" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(asset.description)} ${theme==='day'?'Daylight':'Night'}, in enamel and gold."><image data-art-src="${assetBase}${asset.file}" width="1774" height="887"/></svg></div>`;
}
function courtyardScene(className='') {
  return `<div class="scene courtyard-scene ${className}"><svg viewBox="${state.theme==='day'?0:887} 0 887 887" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Looking through a deep stone arch into a courtyard, past a reflecting pool toward the mountains."><image href="${assetBase}courtyard-v1.webp" width="1774" height="887"/></svg></div>`;
}
function applyPalette() {
  document.body.dataset.palette=state.palette;
  $$('[data-palette-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.paletteChoice===state.palette)));
  $('meta[name="theme-color"]').content=getComputedStyle(document.body).getPropertyValue('--paper').trim();
}
function persist() {
  storageAvailable=saveReader(browserStorage,saved,loaded.writable&&!otherTabChanged,storageStamp);
  if(storageAvailable)storageStamp=JSON.stringify(saved);
  const notice=$('#storage-notice');if(notice)notice.hidden=storageAvailable;
  return storageAvailable;
}
function toast(message) { clearTimeout(toastTimer); $('#toast').textContent=message; $('#toast').classList.add('visible'); toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),2600); }
function savePosition() {
  if(state.view!=='read'||suppressScroll) return;
  const marker=$$('.prose-section, #reflection').filter(el=>el.getBoundingClientRect().top<window.innerHeight*.55).at(-1);
  const section=marker?.id==='reflection'?'A moment to reflect':marker?.querySelector('h2')?.textContent||'The opening';
  const path=activeReadingPath();if(path)saved.pathPlaces[path.id]=current().id;
  saved.last={id:current().id,page:state.page,design:state.design,scroll:window.scrollY,anchor:readingAnchor(),section,reflectionOpen:Boolean($('.journal-disclosure')?.open)}; saved.positions[current().id]={...saved.last}; persist();
}
function route(push=true) {
  const url=new URL(location.href); url.searchParams.delete('design'); url.searchParams.delete('palette'); url.hash=state.view==='read'?`read/${current().id}/${state.page}`:'home';
  history[push?'pushState':'replaceState']({},'',url);
}
function readRoute() {
  const parts=location.hash.slice(1).split('/');
  if(parts[0]==='read'&&names.some(n=>n.id===parts[1])) { state.view='read'; state.index=names.findIndex(n=>n.id===parts[1]);state.page=Math.max(0,Math.min(3,Number(parts[2])||0)); }
  else { state.view='home';state.page=0; }
}
function navigate(view,index=state.index,page=0,resumeScroll=0,place=null) {
  clearTimeout(positionTimer); savePosition();
  state.view=view;state.index=index;state.page=page;
  if(view==='read'){const path=activeReadingPath();if(path)saved.pathPlaces[path.id]=current().id;saved.last={...place,id:current().id,page,design:state.design,scroll:resumeScroll};saved.positions[current().id]={...saved.last};}
  persist(); route();render(); suppressScroll=true;restorePlace({...place,scroll:resumeScroll});requestAnimationFrame(()=>{suppressScroll=false;$('#app-main')?.focus({preventScroll:true});});
}
function openReading(id, resume=true) {
  const index=names.findIndex(n=>n.id===id); if(index<0)return;
  savePosition();
  const last=resume?readingPlace(saved,id,state.design):null;
  navigate('read',index,last?.page||0,last?.scroll||0,last);
  if(last?.reflectionOpen&&$('.journal-disclosure')){ $('.journal-disclosure').open=true; requestAnimationFrame(()=>restorePlace(last)); }
}
function navigation() {
  if(state.design==='folio'&&state.view==='read') return `<header class="app-nav folio-reader-nav"><button class="garden-back" data-action="home" aria-label="Back to the garden">${icon('back')}<span>Back to garden</span></button><nav aria-label="Reading tools"><button class="reading-settings-button" data-action="reading-settings" aria-label="Reading settings"><span aria-hidden="true">Aa</span></button><button data-action="kept" aria-label="Saved Names, passages, and reflections">Saved${keptCount()?`<span class="kept-count">${keptCount()}</span>`:''}</button><button class="appearance-button" data-action="theme" aria-label="Switch to ${state.theme==='night'?'daylight':'night'}">${icon(state.theme==='night'?'sun':'moon')}</button></nav></header>`;
  return `<header class="app-nav"><button class="app-brand" data-action="home">${icon('book')}<span>The Beautiful Names<small>AL-GHAZALI · AL-MAQSAD AL-ASNA</small></span></button><nav aria-label="Book navigation"><button data-action="contents">Contents</button><button data-action="kept" aria-label="Saved Names, passages, and reflections">Saved${keptCount()?`<span class="kept-count">${keptCount()}</span>`:''}</button><button class="appearance-button" data-action="theme" aria-label="Switch to ${state.theme==='night'?'daylight':'night'}">${icon(state.theme==='night'?'sun':'moon')}<span>${state.theme==='night'?'Daylight':'Night'}</span></button></nav></header>`;
}
function startAction() {
  const last=saved.last&&names.find(n=>n.id===saved.last.id);
  return `<button class="primary" data-action="${last?'resume':'begin'}">${last?`Return to ${esc(last.name)}`:'Begin with Allah'}${icon('arrow')}</button><button class="text-button" data-action="contents">Browse the names <span aria-hidden="true">↗</span></button>`;
}
function bookmarkedFolio() {
  const n=names.find(n=>n.id===saved.last?.id);if(!n)return '';
  const next=isFinished(n.id)&&nextSuggestion(names,saved,n.id);
  return `<section class="return-folio name-style" style="${frameStyle(n.id)}" aria-label="Your reading place"><span class="bookmark-ribbon" aria-hidden="true">${icon('bookmark')}</span><div class="return-name">${nameSeal(n.id)}<div><span class="eyebrow">${next?'YOUR LAST READING':'YOUR PLACE IS SAVED'}</span><h2>${esc(n.name)}</h2><p>${esc(n.meaning)}</p></div></div><p class="return-place">${icon(isFinished(n.id)?'check':'book')}<span>${isFinished(n.id)?'Read · ready to revisit':esc(saved.last.section||'The opening')}</span></p>${next?`<p class="return-next-reason">${esc(next.reason)}</p><button class="primary" data-name="${next.name.id}">Read ${esc(next.name.name)} ${icon('arrow')}</button><button class="text-button return-revisit" data-action="resume">Revisit ${esc(n.name)}</button>${next.kind==='chosen'?'<button class="text-button remove-next" data-action="clear-next">Remove from next time</button>':''}`:`<button class="primary" data-action="resume">Continue reading ${icon('arrow')}</button>`}</section>`;
}

function gardenDiscoveries() {
  const invitations=[{id:'ash-shakur',label:'Know His generous reward'},{id:'al-hadi',label:'Turn to the One who guides'},{id:'as-sabur',label:'Trust His perfect timing'}];
  return `<section class="garden-discovery" aria-labelledby="garden-discovery-title"><div class="discovery-heading"><span class="eyebrow">A DIFFERENT PLACE TO BEGIN</span><h2 id="garden-discovery-title">Further in <em>the garden.</em></h2><p>Know His generosity, guidance, and patience more deeply.</p></div><div class="garden-invitations">${invitations.map(({id,label})=>{const n=names.find(n=>n.id===id);return `<button class="garden-invitation name-style" style="${frameStyle(id)}" data-name="${id}" aria-label="${esc(label)}: read ${esc(n.name)}"><span class="discovery-art" aria-hidden="true">${chapterScene('',id)}</span><span class="discovery-copy"><small>${esc(label)}</small><strong>${esc(n.name)}</strong><span>${esc(n.meaning)}</span></span><span class="discovery-seal" aria-hidden="true">${nameSeal(id)}</span></button>`;}).join('')}</div></section>`;
}
function home() {
  const purpose='An illustrated companion to al-Ghazali’s writing on the Beautiful Names of Allah. Know His attributes, contemplate His perfection, and draw nearer through worship and daily life.';
  if(state.design==='book') return `<main id="app-main" tabindex="-1" class="home home-book"><section class="home-copy"><span class="eyebrow">A LITTLE TIME. A DEEPER READING.</span><h1>Open a little.<br>Carry it <em>with you.</em></h1><p>${purpose}</p><div class="home-actions">${startAction()}</div><p class="home-whisper">Read at your own pace. Reflection is always optional.</p></section><button class="closed-book" data-action="begin" aria-label="Open The Beautiful Names at Allah"><span class="book-cover"><span class="cover-border"></span><span class="cover-author">AL-GHAZALI</span><span class="cover-arabic" lang="ar" dir="rtl">الأسماء الحسنى</span><span class="cover-title">The Beautiful<br><em>Names</em></span>${scene('cover-art')}<span class="cover-bottom">AL-MAQSAD AL-ASNA</span></span><span class="closed-book-pages" aria-hidden="true"></span></button><span class="home-colophon">An invitation to know Allah and draw nearer to Him.</span></main>`;
  if(state.design==='folio') {
    const returning=names.some(n=>n.id===saved.last?.id);
    return `<main id="app-main" tabindex="-1" class="home home-folio courtyard-home ${returning?'returning-home':''}"><section class="invitation-folio"><div class="courtyard-entrance"><button class="courtyard-art" data-action="courtyard-art" aria-label="Look into the courtyard">${courtyardScene()}<span class="courtyard-caption">A little room for wonder.</span></button><div class="stone-sill" aria-hidden="true"></div></div><div class="folio-welcome"><span class="eyebrow">${returning?'RETURN TO KNOWING ALLAH':'KNOW ALLAH THROUGH HIS NAMES'}</span><h1>${returning?'Your place<br>is <em>waiting.</em>':'Come in.<br>Stay with <em>a Name.</em>'}</h1>${returning?`${bookmarkedFolio()}<button class="text-button browse-names" data-action="contents">Browse the names ${icon('arrow')}</button>`:`<p>Explore 99 Names of Allah through short English readings. Understand His attributes, then let that knowledge deepen your worship and daily life.</p><div class="home-actions">${startAction()}</div><p class="home-whisper">Read at your own pace. Reflection is always optional.</p>`}<button class="text-button reader-guide-link" data-action="reader-guide">New here? How to read this book ${icon('arrow')}</button></div></section>${homeRemembered()}${room.homeEntrance()}${pathHome()}${gardenDiscoveries()}</main>`;
  }
  return `<main id="app-main" tabindex="-1" class="home home-window"><div class="window-view">${scene('seat-landscape')}<div class="view-inscription"><span lang="ar" dir="rtl">الأسماء الحسنى</span><p>The Beautiful Names</p></div></div><section class="seat-welcome"><span class="eyebrow">A READING COMPANION TO AL-GHAZALI</span><h1>Make room<br>for <em>a name.</em></h1><div class="small-rule"></div><p>${purpose}</p><div class="home-actions">${startAction()}</div><p class="home-whisper">One reading is enough for today.</p><span class="seat-colophon">AL-MAQSAD AL-ASNA</span></section></main>`;
}
function bookmark() {return `<button class="bookmark-button ${hasSaved(current().id)?'is-saved':''}" data-action="save" aria-pressed="${hasSaved(current().id)}">${icon('bookmark')}<span>${hasSaved(current().id)?'Saved':'Save name'}</span></button>`;}
function titleBlock(compact=false, showMeta=true) {
  const n=current();return `<div class="name-heading ${compact?'compact':''}">${showMeta?`<span class="eyebrow">${esc(n.theme)} · ${String(state.index+1).padStart(2,'0')}</span>`:''}<div class="arabic-name ${n.name.length>18?'compound-arabic':''}" lang="ar" dir="rtl">${n.arabic}</div><h1 class="${nameSizeClass(n.name)}">${esc(n.name)}</h1><p class="name-meaning">${esc(n.meaning)}</p><p class="name-takeaway">${esc(n.takeaway)}</p></div>`;
}
function reflection(showQuestion=true) {
  const n=current(); return `<div class="reflection-content">${showQuestion?`<p class="reflection-prompt">${esc(n.reflection)}</p>`:''}<label for="reflection-note">A thought to keep <span>(optional)</span></label><textarea id="reflection-note" rows="4" dir="auto" aria-describedby="note-status" placeholder="Write a little, or simply sit with the question…">${esc(saved.notes[n.id]||'')}</textarea><p class="note-status" id="note-status" role="status">${saved.notes[n.id]?'Saved in this browser.':'Your writing stays in this browser.'}</p>${state.design==='book'?dailyPractice():''}</div>`;
}
function dailyPractice() {
  return `<aside class="daily-practice" aria-labelledby="practice-title"><span class="practice-seal" aria-hidden="true">${nameSeal(current().id)}</span><div><h3 id="practice-title">A way to respond</h3><p>${esc(current().practice)}</p></div></aside>`;
}
function completion() {
  const n=current();return `<div class="completion"><button class="primary finish-button" data-action="finish" aria-pressed="${isFinished(n.id)}">${icon(isFinished(n.id)?'check':'book')}${isFinished(n.id)?'Marked as read':'Mark as read'}</button><span class="completion-status" role="status">${isFinished(n.id)?'Reading remembered. Tap again to undo.':'Your place is saved. Mark as read whenever you are ready.'}</span><div class="completion-recall" ${isFinished(n.id)?'':'hidden'}><details><summary>Recall what this Name teaches about Allah <span aria-hidden="true">+</span></summary><p>Put the meaning into your own words, then consider this reminder.</p><blockquote>${esc(n.takeaway)}</blockquote><button class="text-button" data-reading-section="section-0">Reread the explanation ${icon('arrow')}</button></details></div></div>`;
}

function endNavigation() {
  const {next,path}=readingNeighbours();return `${path&&!next?`<div class="path-closing"><span class="eyebrow">THE END OF THIS PATH</span><h3>${esc(path.title)}</h3><p>${esc(path.closing)}</p><button class="text-button" data-open-path="${path.id}">Return to this path ${icon('arrow')}</button></div>`:''}<div class="end-navigation"><button class="rest-choice" data-action="home">${icon('back')}<span><small>REST HERE</small><strong>Return to the garden</strong></span></button>${state.design==='folio'?`<button class="text-button" data-action="contents">Browse all Names ${icon('arrow')}</button>`:next?`<button class="next-name name-style" style="${frameStyle(next.id)}" data-name="${next.id}">${nameSeal(next.id)}<span>WHEN YOU’RE READY</span><strong>${next.name}</strong>${icon('arrow')}</button>`:'<button class="text-button" data-action="contents">Explore the names '+icon('arrow')+'</button>'}</div>`;
}
function proseSections() {
  const n=current();return `<p class="opening-paragraph" data-reading-anchor="introduction">${esc(n.introduction)}</p>${n.sections.map((s,i)=>`<section class="prose-section" id="section-${i}" tabindex="-1"><div class="passage-heading"><h2 data-reading-anchor="heading-${i}">${esc(s.title)}</h2>${passageButton(i)}</div>${s.paragraphs.map((p,j)=>`<p data-reading-anchor="paragraph-${i}-${j}">${esc(p)}</p>`).join('')}</section>`).join('')}${pairInvitation()}<button class="source-link" data-action="source">Reading notes &amp; source <span aria-hidden="true">↗</span></button>`;
}
function endingOrnament() {const art=endingArt[current().id];return art?`<img class="reading-ending-art" src="${assetBase}${art.file}" alt="" loading="lazy" width="150" height="100">`:'';}
function continuousEnding() {return `<section class="pause-section" id="reflection" data-reading-anchor="reflection" tabindex="-1" aria-labelledby="reflection-title">${endingOrnament()}<span class="eyebrow">FROM KNOWING TO WORSHIP</span><h2 id="reflection-title">Turn toward<br><em>Allah.</em></h2>${dailyPractice()}<div class="reflection-question"><span class="eyebrow">A MOMENT TO REFLECT</span><p class="pause-question">${esc(current().reflection)}</p></div><details class="journal-disclosure"><summary>${icon('pen')} Write a reflection <span class="optional">Optional</span><span aria-hidden="true">+</span></summary>${reflection(false)}</details>${completion()}${nextInvitation()}${state.index===names.length-1?'<div class="full-edition-close"><span class="eyebrow">A PLACE TO RETURN</span><h3>The book ends.<br>Knowing Him continues.</h3><p>Return to a Name, deepen what you understand of Allah, and let that knowledge guide your worship and care. There is more to know each time you return.</p></div>':''}${endNavigation()}</section>`;}

function bookReader() {
  const n=current(),s=n.sections[Math.min(state.page,2)];
  return `<main id="app-main" tabindex="-1" class="reader reader-book ${state.page>0?'inner-page':''}"><div class="book-overline"><button class="text-button" data-action="home">${icon('back')} Close the book</button><span>${esc(n.name)} · ${esc(n.meaning)}</span></div><div class="book-spread"><aside class="frontispiece"><div class="page-running-head">THE BEAUTIFUL NAMES</div>${titleBlock()}<button class="art-enlarge" data-action="art" aria-label="Enlarge the garden illustration">${scene('chapter-art')}<span class="art-enlarge-label">Take a closer look ↗</span></button><span class="frontispiece-foot">Al-Ghazali · Al-Maqsad al-Asna</span></aside><article class="reading-leaf"><header class="leaf-running-head"><span>${state.page===3?'A MOMENT TO REFLECT':'ON '+n.theme.toUpperCase()}</span>${bookmark()}</header><div class="leaf-prose prose">${state.page===3?`<span class="eyebrow">PAUSE HERE, IF YOU WISH</span><h2 class="reflection-title">A little room<br>for reflection.</h2>${reflection()}${completion()}<button class="source-link" data-action="source">Reading notes &amp; source ↗</button>`:`<span class="section-index">${['I','II','III'][state.page]}</span><h2>${esc(s.title)}</h2>${state.page===0?`<p class="opening-paragraph">${esc(n.introduction)}</p>`:''}${s.paragraphs.map(p=>`<p>${esc(p)}</p>`).join('')}`}</div><footer class="leaf-pagination"><button data-action="previous-page" ${state.page===0?'disabled':''} aria-label="Previous page">${icon('back')}</button><span>PAGE ${state.page+1} OF 4</span><button data-action="${state.page===3?'next-name':'next-page'}" aria-label="${state.page===3?'Next name':'Next page'}">${icon('arrow')}</button></footer></article></div><nav class="book-dock" aria-label="Reading navigation"><button data-action="contents">${icon('book')} Contents</button><span>${esc(n.name)}<small>${state.page+1} / 4</small></span><button data-action="reflect">${icon('pen')} Reflect</button></nav></main>`;
}
function folioReader() {
  return `<main id="app-main" tabindex="-1" class="reader reader-folio name-style" style="${frameStyle(current().id)}"><article class="folio-sheet has-name-frame" data-frame="${frameFor(current().id).motif}">${nameFrame(current().id)}<header class="folio-title-area" id="reading-opening" tabindex="-1"><div class="folio-meta"><span class="eyebrow">${esc(current().theme)} · ${String(state.index+1).padStart(2,'0')}</span><span class="chapter-seal" aria-hidden="true">${nameSeal(current().id)}</span>${bookmark()}</div>${titleBlock(false,false)}<button class="quiet-return text-button" data-action="garden-view">Return to the garden view ${icon('arrow')}</button><button class="art-enlarge name-illustration" data-action="art" aria-label="Enlarge the illustration for ${esc(current().name)}">${chapterScene('folio-opening-art')}<span class="art-enlarge-label">Take a closer look ↗</span></button></header><div class="folio-body prose">${pathRibbon()}<div class="reading-orientation"><span>About ${readingMinutes(current())} min · 3 short sections</span><button data-action="reader-guide" aria-label="How to read this book">Reader’s guide</button><button class="name-tools-button" data-room="tools" aria-haspopup="dialog">Stay with this Name</button></div>${proseSections()}${continuousEnding()}</div></article>${continuousDock()}</main>`;
}
function continuousDock() {
  const {previous,next,path,step}=readingNeighbours();
  return `<nav class="continuous-dock name-navigation" aria-label="Reading navigation"><button class="name-step" data-action="previous-name" ${previous?'':'disabled'} aria-label="${previous?(path?'Previous in this path: ':'Previous in book order: ')+esc(previous.name):(path?'First name in this path':'First name in the book')}" title="${previous?esc(previous.name):'First name'}">${icon('back')}</button><button class="name-chooser" data-action="contents" aria-haspopup="dialog" aria-label="Explore names. Current name: ${esc(current().name)}"><strong>${esc(current().name)}</strong><span>${path?`Path · ${step.index+1} of ${step.total}`:'Explore names'} <span aria-hidden="true">⌃</span></span></button><button class="name-step" data-action="next-name" ${next?'':'disabled'} aria-label="${next?(path?'Next in this path: ':'Next in book order: ')+esc(next.name):(path?'Last name in this path':'Last name in the book')}" title="${next?esc(next.name):(path?'Last name in this path':'Last name in the book')}">${icon('arrow')}</button><button class="dock-reflect" data-action="reflect" aria-label="Go to reflection">${icon('pen')}<span>Reflect</span></button></nav>`;
}
function windowReader() {
  return `<main id="app-main" tabindex="-1" class="reader reader-window"><aside class="reading-view">${scene('reading-landscape')}<div class="landscape-name"><span class="eyebrow">THE BEAUTIFUL NAMES</span><div lang="ar" dir="rtl">${current().arabic}</div><p>${esc(current().meaning)}</p></div><button class="landscape-expand" data-action="art">Take a closer look ↗</button></aside><article class="window-reading-page"><header class="window-reading-heading"><div class="folio-meta"><span>${String(state.index+1).padStart(2,'0')} · ${esc(current().theme)}</span>${bookmark()}</div><h1>${esc(current().name)}</h1><p class="name-takeaway">${esc(current().takeaway)}</p></header><div class="prose">${proseSections()}${continuousEnding()}</div></article>${continuousDock()}</main>`;
}
function render() {
  document.body.dataset.design=state.design;document.body.dataset.theme=state.theme;document.body.dataset.view=state.view;applyPalette();applyReadingPreferences();
  $$('[data-design-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.designChoice===state.design)));
  artObserver?.disconnect();
  $('#app').innerHTML=`${scene('environment')}<div class="environment-shade" aria-hidden="true"></div>${navigation()}<aside id="storage-notice" class="storage-notice" role="alert" ${storageAvailable?'hidden':''}>${otherTabChanged?'Your library changed in another tab. Keep a copy of any writing here, then reload to continue with the newest library.':'This browser could not save your latest change. Keep a copy of your writing before leaving.'}<button class="text-button" data-action="export-kept">Save a text copy</button></aside>${recoveryUrl?`<aside class="recovery-notice" role="status">Some saved data could not be read. An unchanged copy is available.<a href="${recoveryUrl}" download="beautiful-names-recovery.json">Download recovery copy</a></aside>`:''}${state.view==='home'?home():folioReader()}${editionFooter()}`;
  document.title=state.view==='read'?`${current().name} · ${current().meaning} · The Beautiful Names`:'The Beautiful Names · Know Allah through His Names';
  enhanceReadingAccess($('#app'));
  loadArtwork($('#app'));
}
function sheet(title,body,className='') {
  releaseKeptCopy();room.cleanup();
  if(!$('#sheet').open)sheetOpener=document.activeElement;
  $('#sheet').className=className;$('#sheet').innerHTML=`<header class="sheet-heading"><h2 id="sheet-title" tabindex="-1">${title}</h2><button class="icon-button" data-action="close-sheet" aria-label="Close panel">${icon('close')}</button></header>${body}`;
  $('#sheet').scrollTop=0;
  if(!$('#sheet').open)$('#sheet').showModal();
  enhanceReadingAccess($('#sheet'));
  loadArtwork($('#sheet'));
  $('#sheet-title').focus({preventScroll:true});
}
function exploreNames() {
  const anchor=state.view==='read'?current():names.find(n=>n.id===saved.last?.id);
  const index=anchor?names.indexOf(anchor):0;
  const nearby=names.slice(Math.max(0,index-1),Math.min(names.length,index+2));
  sheet('Find a Name',`<div class="explore-scroll"><p class="sheet-intro">Search all 99 Names, follow a short reading path, or explore an attribute.</p>${state.view==='read'&&state.design==='folio'?`<button class="within-reading" data-action="reading-outline">${nameSeal(current().id)}<span><small>SECTIONS &amp; READING SETTINGS</small><strong>${esc(current().name)}</strong></span>${icon('arrow')}</button>`:''}<button class="explore-search" data-action="name-index">${icon('book')}<span>Search names or meanings</span><span aria-hidden="true">↗</span></button><button class="room-tool" data-room="home"><span><strong>Your reading room</strong><small>Map, recall, questions, and your reading list</small></span>${icon('arrow')}</button><div class="explore-study-tools">${state.view==='read'&&activeReadingPath()?`<button data-open-path="${activeReadingPath().id}"><strong>${esc(activeReadingPath().title)}</strong><small>Your current path · ${readingNeighbours().step.index+1} of ${activeReadingPath().ids.length}</small>${icon('arrow')}</button>`:''}<button data-action="paths"><strong>Reading paths</strong><small>A few Names, read together</small>${icon('arrow')}</button><button data-action="pairs"><strong>Read Names together</strong><small>Understand related meanings</small>${icon('arrow')}</button></div><details class="attribute-browser"><summary>Browse by attribute <span aria-hidden="true">+</span></summary><section class="name-pathways" aria-labelledby="pathways-title"><h3 id="pathways-title">Ways of knowing Allah</h3><div class="pathways-grid">${themes.filter(t=>names.some(n=>n.theme===t.id)).map(t=>{const n=names.find(n=>n.theme===t.id);return `<button class="pathway" data-pathway="${t.id}"><span class="pathway-image" aria-hidden="true">${chapterScene('',n.id)}</span><span><strong>${esc(t.label)}</strong><small>${esc(t.invitation)}</small></span>${icon('arrow')}</button>`;}).join('')}</div></section></details><section class="nearby-names" aria-labelledby="nearby-title"><h3 id="nearby-title">${anchor?(state.view==='read'&&activeReadingPath()?'Nearby in book order':'Around your place'):'Begin anywhere'}</h3><div style="--nearby-count:${nearby.length}">${nearby.map(n=>`<button class="name-style" style="${frameStyle(n.id)}" data-name="${n.id}" ${n.id===anchor?.id?'aria-current="location"':''}>${nameSeal(n.id)}<span><strong class="${nameSizeClass(n.name)}">${esc(n.name)}</strong><small>${n.id===anchor?.id?'Your place':esc(n.meaning)}</small></span>${icon('arrow')}</button>`).join('')}</div></section><div class="explore-links"><button data-action="all-names">All names ${icon('arrow')}</button><button data-action="saved-index">${icon('bookmark')} Saved names</button></div><button class="text-button reader-guide-link" data-action="reader-guide">How to read this book ${icon('arrow')}</button><p class="edition-note">All 99 Names · Read in order, or begin anywhere.</p></div>`,'explore-sheet');
}
function contents() {
  sheet(contentsState.scope==='book'?'Search the book':'Find a Name',`<div class="contents-controls"><button class="index-back" data-action="contents">${icon('back')} Back to exploring</button><label class="search-label" for="name-search">Search by Name, meaning, number, or phrase</label><div class="contents-search"><input id="name-search" type="search" placeholder="${contentsState.scope==='book'?'Try a phrase, such as complete knowledge':'Try mercy, اللطيف, or 99'}" autocomplete="off" value="${esc(contentsState.query)}"><button data-action="clear-search" aria-label="Clear search">${icon('close')}</button></div><div class="search-scope" role="group" aria-label="Search scope"><button data-search-scope="names" aria-pressed="${contentsState.scope!=='book'}">Names & meanings</button><button data-search-scope="book" aria-pressed="${contentsState.scope==='book'}">Inside the readings</button></div><div class="contents-filters"><nav aria-label="Filter readings">${[['all','All'],['saved','Saved'],['finished','Read']].map(([key,label])=>`<button data-status="${key}" aria-pressed="${contentsState.status===key}">${label}</button>`).join('')}</nav><label class="theme-filter"><span class="sr-only">Browse by theme</span><select id="theme-filter"><option value="all">Every theme</option>${themes.filter(t=>names.some(n=>n.theme===t.id)).map(t=>`<option value="${t.id}" ${contentsState.theme===t.id?'selected':''}>${esc(t.label)}</option>`).join('')}</select></label></div><div class="contents-result-meta"><p id="contents-count" role="status" aria-live="polite"></p><button class="text-button" data-action="clear-filters">Reset</button></div></div><div class="contents-results"><div class="contents-list"></div><div id="no-results" class="contents-empty" hidden><h3>A little room to explore.</h3><p id="empty-message"></p><button class="text-button" data-action="clear-filters">Show all readings ${icon('arrow')}</button></div></div><nav class="index-pagination" aria-label="Index pages" hidden><button data-action="index-previous" aria-label="Previous group of names">${icon('back')}</button><label class="index-group"><span class="sr-only">Jump to a group of names</span><select id="index-group"></select></label><span id="index-page" class="sr-only" role="status"></span><button data-action="index-next" aria-label="Next group of names">${icon('arrow')}</button></nav><p class="edition-note">The Beautiful Names · 99 readings</p>`,'contents-sheet');
  updateContents();
}
function updateContents() {
  const fullResults=contentsState.scope==='book'&&contentsState.query.trim()?searchReadings(names,contentsState.query):null;
  const matches=fullResults?filterNames(fullResults.map(r=>r.name),{...contentsState,query:''},saved):filterNames(names,contentsState,saved);
  const group=pageOfNames(matches,contentsState.page);contentsState.page=group.page;
  const currentId=state.view==='read'?current().id:saved.last?.id;
  $('.contents-list').innerHTML=group.items.map(n=>{
    const here=n.id===currentId, index=names.indexOf(n),result=fullResults?.find(r=>r.name.id===n.id);
    const badges=[here?'<span class="current-marker">Your place</span>':'',hasSaved(n.id)?`<span>${icon('bookmark')}Saved</span>`:'',isFinished(n.id)?`<span>${icon('check')}Read</span>`:''].join('');
    return `<button class="name-style ${here?'is-current':''} ${result?'has-excerpt':''}" style="${frameStyle(n.id)}" ${result?`data-search-reading="${n.id}" data-search-section="${result.section??-1}"`:`data-name="${n.id}" data-resume="true"`} ${here?'aria-current="location"':''}><span class="contents-emblem" aria-hidden="true">${nameSeal(n.id)}<small>${String(index+1).padStart(2,'0')}</small></span><span class="contents-name"><strong class="${nameSizeClass(n.name)}">${esc(n.name)}</strong><small>${esc(n.meaning)}</small>${badges?`<span class="reading-markers">${badges}</span>`:''}${result?`<span class="search-excerpt"><strong>${esc(result.section===null?'The opening':n.sections[result.section].title)}</strong>${esc(searchExcerpt(result.snippet,contentsState.query))}</span>`:''}</span><span class="contents-arabic ${n.name.length>18?'compound-arabic':''}" lang="ar" dir="rtl">${n.arabic}</span>${icon('arrow')}</button>`;
  }).join('');
  const selectedTheme=themes.find(t=>t.id===contentsState.theme);
  $('#contents-count').textContent=`${matches.length} ${matches.length===1?'reading':'readings'}${selectedTheme?' · '+selectedTheme.label:''}`;
  $('#no-results').hidden=matches.length>0;
  $('.index-pagination').hidden=group.pages<=1;
  $('#index-page').textContent=`${group.start}–${group.end} of ${matches.length}`;
  $('#index-group').innerHTML=Array.from({length:group.pages},(_,i)=>`<option value="${i}" ${i===group.page?'selected':''}>${i*8+1}–${Math.min((i+1)*8,matches.length)} of ${matches.length}</option>`).join('');
  $('[data-action="index-previous"]').disabled=group.page===0;
  $('[data-action="index-next"]').disabled=group.page>=group.pages-1;
  $('#empty-message').textContent=contentsState.status==='saved'?'No saved names match. Save a name while reading to find it here.':contentsState.status==='finished'?'No readings marked as read match. Use “Mark as read” at the end of a reading whenever you choose.':'Try another spelling, meaning, or theme.';
  $('[data-action="clear-search"]').hidden=!contentsState.query;
  $$('[data-status]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.status===contentsState.status)));
  $('.contents-results').scrollTop=0;
}
function resetContents() {
  contentsState={query:'',theme:'all',status:'all',page:0,scope:contentsState.scope};
  $('#name-search').value='';$('#theme-filter').value='all';updateContents();
}

function kept() {
  keptState={query:'',type:'all',page:0};
  if(!keptCount()){sheet('Your saved collection',`<div class="empty-kept"><img class="keepsake-flourish" src="${assetBase}olive-edge-v1.webp" width="2172" height="724" alt=""><h3>A place for<br>what stays with you.</h3><p>Save a Name, keep a passage, or write a reflection. You’ll find it here when you return.</p><button class="primary" data-action="contents">Explore the names ${icon('arrow')}</button><button class="text-button path-all" data-action="backup">Backup &amp; restore</button></div>`);return;}
  sheet('Your saved collection',`<div class="kept-controls"><p class="sheet-intro">Names, passages, and thoughts you chose to return to.</p><label class="search-label" for="kept-search">Search your saved Names, passages, and reflections</label><div class="contents-search"><input id="kept-search" type="search" placeholder="Find a name or a phrase" autocomplete="off"><button data-action="kept-clear" aria-label="Clear saved search" hidden>${icon('close')}</button></div><nav class="kept-filters" aria-label="Your collection">${[['all','All'],['names','Saved names'],['reflections','Reflections'],['passages','Passages']].map(([value,label])=>`<button data-kept-type="${value}" aria-pressed="${value==='all'}">${label}</button>`).join('')}</nav><p id="kept-result-count" role="status" aria-live="polite"></p></div><div class="kept-results"><div id="kept-entries"></div><div class="kept-no-results" hidden><h3>A little room to look again.</h3><p id="kept-empty-message"></p><button class="text-button" data-action="kept-reset">Show everything saved ${icon('arrow')}</button></div></div><nav class="index-pagination kept-pagination" aria-label="Saved collection pages" hidden><button data-action="kept-previous" aria-label="Previous saved entries">${icon('back')}</button><span id="kept-page" role="status"></span><button data-action="kept-next" aria-label="Next saved entries">${icon('arrow')}</button></nav><footer class="kept-footer"><p class="kept-storage-note">Your writing stays in this browser.</p><button class="text-button kept-download" data-action="export-kept">Save a text copy ${icon('arrow')}</button><button class="text-button" data-action="backup">Backup &amp; restore</button></footer>`,'kept-sheet');
  updateKept();
}
function updateKept() {
  const entries=keptEntries(names,saved,keptState),group=pageOfNames(entries,keptState.page,6);keptState.page=group.page;
  $('#kept-entries').innerHTML=group.items.map(n=>{
    const note=typeof saved.notes[n.id]==='string'?saved.notes[n.id]:'';
    return `<article class="kept-entry name-style" style="${frameStyle(n.id)}"><button class="kept-open" data-name="${n.id}" aria-label="Read ${esc(n.name)}"><span class="kept-art" aria-hidden="true">${chapterScene('',n.id)}</span><span class="kept-title"><small>${hasSaved(n.id)?'Saved name':note.trim()?'Your reflection':'Saved passage'}</small><strong>${esc(n.name)}</strong><span>${esc(n.meaning)}</span></span>${icon('arrow')}</button>${note.trim()?`<details class="kept-reflection"><summary><span class="kept-preview">${esc(noteExcerpt(note))}</span><span class="kept-expand"><span class="when-closed">Read full reflection</span><span class="when-open">Close reflection</span><span aria-hidden="true">⌄</span></span></summary><p class="kept-full-note">${esc(note)}</p></details><button class="kept-edit text-button" data-edit-note="${n.id}">${icon('pen')} Return to your writing</button>`:''}${keptPassages(n)}</article>`;
  }).join('');
  $$('[data-kept-type]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.keptType===keptState.type)));
  $('#kept-result-count').textContent=`${entries.length} ${entries.length===1?'entry':'entries'}${keptState.query?' found':''}`;
  $('.kept-no-results').hidden=entries.length>0;
  $('#kept-empty-message').textContent=keptState.query?'Try another name, meaning, or phrase from your writing.':keptState.type==='reflections'?'Your reflections will appear here whenever you choose to write.':keptState.type==='passages'?'Use the bookmark beside a section heading to keep a passage.':'Names you save while reading will appear here.';
  $('[data-action="kept-clear"]').hidden=!keptState.query;
  $('.kept-pagination').hidden=group.pages<=1;
  $('#kept-page').textContent=`${group.start}–${group.end} of ${entries.length}`;
  $('[data-action="kept-previous"]').disabled=group.page===0;
  $('[data-action="kept-next"]').disabled=group.page>=group.pages-1;
  $('.kept-results').scrollTop=0;
}
// Keep the same paragraph in place when type settings or device size changes.
function readingAnchor() {
  const nodes=$$('[data-reading-anchor]');
  const node=nodes.find(el=>el.getBoundingClientRect().bottom>window.innerHeight*.22);
  if(!node||node.getBoundingClientRect().top>window.innerHeight)return null;
  return {key:node.dataset.readingAnchor,offset:node.getBoundingClientRect().top};
}
function restorePlace(place) {
  const anchor=place?.anchor;
  const node=anchor&&Number.isFinite(anchor.offset)?$$('[data-reading-anchor]').find(el=>el.dataset.readingAnchor===anchor.key):null;
  if(node)window.scrollBy({top:node.getBoundingClientRect().top-anchor.offset,behavior:'instant'});
  else window.scrollTo({top:place?.scroll||0,behavior:'instant'});
}
function applyReadingPreferences() {
  document.body.dataset.readingSize=saved.reading.size;
  document.body.dataset.readingSpacing=saved.reading.spacing;
  document.body.dataset.readingFocus=saved.reading.focus;
}
function showReadingSettings() {
  sheet('Make yourself comfortable',`<p class="sheet-intro">A little adjustment can make the page feel like yours.</p><div class="reading-settings-scroll"><fieldset class="reading-choice"><legend>Text size</legend><div>${[['standard','Standard'],['larger','Larger'],['largest','Largest']].map(([value,label])=>`<button data-reading-pref="size" data-value="${value}" aria-pressed="${saved.reading.size===value}"><span class="size-sample size-${value}" aria-hidden="true">Aa</span>${label}</button>`).join('')}</div></fieldset><fieldset class="reading-choice spacing-choice"><legend>Space between lines</legend><div>${[['standard','Standard'],['open','More space']].map(([value,label])=>`<button data-reading-pref="spacing" data-value="${value}" aria-pressed="${saved.reading.spacing===value}">${label}</button>`).join('')}</div></fieldset><fieldset class="reading-choice"><legend>Reading atmosphere</legend><div>${[['garden','Garden'],['quiet','Quiet page']].map(([value,label])=>`<button data-reading-pref="focus" data-value="${value}" aria-pressed="${saved.reading.focus===value}">${label}</button>`).join('')}</div><p class="library-caption">Quiet page sets the artwork aside while keeping your place and reading tools.</p></fieldset><div class="reading-type-preview"><span class="eyebrow">A MOMENT ON THE PAGE</span><p>${esc(current().sections[0].paragraphs[0])}</p></div><p class="settings-status" role="status">Your choices stay with this browser.</p></div>`,'reading-settings-sheet');
}
function setReadingPreference(key,value) {
  const place={scroll:window.scrollY,anchor:readingAnchor()};
  saved.reading=readingPreferences({...saved.reading,[key]:value});
  applyReadingPreferences();restorePlace(place);const ok=persist();
  $$('[data-reading-pref]').forEach(b=>b.setAttribute('aria-pressed',String(saved.reading[b.dataset.readingPref]===b.dataset.value)));
  if($('.settings-status'))$('.settings-status').textContent=ok?'Your choices stay with this browser.':'Could not save this choice. It still applies to this visit.';
  savePosition();
}
function showReadingOutline() {
  const n=current();
  const parts=[{id:'reading-opening',label:'The opening'},...n.sections.map((section,i)=>({id:`section-${i}`,label:section.title})),{id:'reflection',label:'A moment to reflect'}];
  const active=parts.filter(part=>document.getElementById(part.id)?.getBoundingClientRect().top<innerHeight*.55).at(-1)?.id||'reading-opening';
  sheet(n.name,`<p class="outline-meaning">${esc(n.meaning)}</p><nav class="reading-outline" aria-label="Sections in this reading">${parts.map((part,i)=>`<button data-reading-section="${part.id}" ${part.id===active?'aria-current="location"':''}><span class="outline-number">${String(i+1).padStart(2,'0')}</span><span>${esc(part.label)}${part.id===active?'<small>Your place</small>':''}</span>${icon('arrow')}</button>`).join('')}</nav><button class="outline-settings" data-action="reading-settings"><span aria-hidden="true">Aa</span> Reading settings</button><button class="text-button reader-guide-link" data-action="reader-guide">How to read this book ${icon('arrow')}</button><button class="text-button outline-back" data-action="contents">${icon('back')} Back to the names</button>`,'reading-outline-sheet');
}
function jumpToSection(id) {
  const target=document.getElementById(id);if(!target)return;
  if(id==='reading-opening')window.scrollTo({top:0,behavior:'instant'});else target.scrollIntoView({block:'start',behavior:'instant'});
  target.focus({preventScroll:true});savePosition();
}
function relatedReadings() {
  const related=current().related.map(id=>names.find(n=>n.id===id)).filter(n=>n&&n.id!==names[state.index+1]?.id).slice(0,2);
  if(!related.length)return '';
  return `<section class="related-readings" aria-labelledby="related-title"><span class="eyebrow">A THREAD TO FOLLOW</span><h3 id="related-title">Stay with the meaning.</h3><div>${related.map(n=>`<button class="related-reading" data-name="${n.id}" aria-label="Read ${esc(n.name)}: ${esc(n.meaning)}"><span class="related-art" aria-hidden="true">${chapterScene('',n.id)}</span><span><strong>${esc(n.name)}</strong><small>${esc(n.meaning)}</small></span>${icon('arrow')}</button>`).join('')}</div></section>`;
}
function releaseKeptCopy() {
  if(keptCopyUrl){URL.revokeObjectURL(keptCopyUrl);keptCopyUrl=null;}
}
function downloadKept() {
  const copy=keptExport(names,saved);if(!copy)return;
  const url=URL.createObjectURL(new Blob(['\uFEFF',copy],{type:'text/plain;charset=utf-8'}));
  sheet('Your personal copy',`<p class="sheet-intro">Save a text file, or copy your words wherever you keep them.</p><label class="search-label" for="kept-copy-text">Saved Names, passages, reflections, and questions</label><textarea id="kept-copy-text" readonly spellcheck="false" dir="auto">${esc(copy)}</textarea><div class="kept-copy-actions"><a class="primary" href="${url}" download="beautiful-names-kept.txt">Download text file</a><button class="text-button" data-action="copy-kept">Copy text</button></div><p class="copy-status" role="status">This copy includes your saved collection and questions.</p><button class="text-button outline-back" data-action="kept">${icon('back')} Back to Saved</button>`,'kept-copy-sheet');
  keptCopyUrl=url;
}
async function copyKeptText() {
  const field=$('#kept-copy-text');if(!field)return;
  try{await navigator.clipboard.writeText(field.value);if($('.copy-status'))$('.copy-status').textContent='Copied. Your words are ready to keep elsewhere.';}
  catch{field.focus();field.select();$('.copy-status').textContent='Your text is selected. Use Copy to keep it elsewhere.';}
}
function editionFooter(){return `<footer class="edition-footer"><a href="${import.meta.env.BASE_URL}">← Back to the bookshelf</a><button data-action="about">About this companion &amp; privacy</button><p>An original companion to al-Ghazali’s <em>Al-Maqsad al-Asna</em>, with 99 readings. Not a published translation.</p></footer>`;}
function showAbout(){
  sheet('About this companion',`<div class="about-book"><p>Know Allah through His Names. These 99 original English readings draw on al-Ghazali’s <em>Al-Maqsad al-Asna</em>, beginning with the divine attributes and their perfection before inviting worship and reflection.</p><h3>Reading with the source</h3><p>This is an editorial reading companion, not a translation or a replacement for the complete work. Arabic excerpts and source notes accompany every Name. English meanings are brief guides; a single English word cannot convey every shade of a Name.</p><p>The prayers, practices, groupings, and questions are original suggestions, not transmitted devotional formulas or prescribed routines. Independent scholarly review of the companion is still pending. Read the full source alongside it for deeper study.</p><div class="about-links"><a href="${sourceUrl}" target="_blank" rel="noreferrer">Arabic source text ↗</a><a href="${publisherUrl}" target="_blank" rel="noreferrer">Published English translation ↗</a></div><h3>Your writing belongs to you</h3><p>Reading places, saved passages, reflections, questions, and preferences are stored only in this browser. There is no account, analytics, or automatic cloud sync. Clearing browser data, private browsing, or changing devices can remove access to them. Use Backup &amp; restore to keep a private copy and bring it to another browser.</p><button class="text-button" data-action="backup">Backup &amp; restore ${icon('arrow')}</button><p>The site is hosted on GitHub Pages. The host receives normal web requests; your writing is not included. Source links open external sites with their own privacy practices.</p><h3>The garden and the page</h3><p>The enamel-and-gold gardens are AI-generated illustrations of created landscapes. They are contemplative settings, not depictions of Allah or literal representations of divine attributes. Twenty-six settings accompany 99 individual ornamental identities.</p><p>Set Daylight or Night for the light around you. Reading settings offer larger text, wider line spacing, and a Quiet page that sets the artwork aside.</p><p>Typefaces: Amiri, Cormorant Garamond, and Manrope, used under the SIL Open Font License.</p><div class="about-links">${['amiri','cormorantgaramond','manrope'].map(f=>`<a href="${import.meta.env.BASE_URL}assets/beautiful-names/fonts/${f}-OFL.txt" target="_blank" rel="noreferrer">${f==='amiri'?'Amiri':f==='manrope'?'Manrope':'Cormorant Garamond'} licence ↗</a>`).join('')}</div><p>Edition 1.0 · <a href="https://github.com/mindfulmod/books/issues" target="_blank" rel="noreferrer">Report a problem or correction ↗</a></p></div>`,'about-book-sheet');
}
function showSource() {
  const n=current();sheet('Reading notes',`<p class="sheet-intro">Al-Ghazali · Al-Maqsad al-Asna</p><div class="source-reading"><p>${esc(n.sourceNote)}</p><blockquote lang="ar" dir="rtl">${n.arabicExcerpt}</blockquote><p>This original companion adaptation explains Allah’s attributes and invites a personal response through worship and conduct. It follows al-Ghazali’s discussion; it is not a quotation or published translation. The suggested prayers, practices, and reflection questions are optional original writing, not transmitted devotional formulas. The complete source discussion remains the reference for study. Independent scholarly review of this companion is still pending.</p><a class="source-link" href="${sourceUrl}" target="_blank" rel="noreferrer">Arabic source text ↗</a><a class="source-link" href="${publisherUrl}" target="_blank" rel="noreferrer">Published English translation ↗</a></div>`);
}
function showArt() {
  if(state.design!=='folio'){sheet('The garden',`${scene('full-art')}<p class="prototype-note">Enamel &amp; gold · ${state.theme==='day'?'Daylight':'Moonlight'}</p>`,'art-sheet');return;}
  const asset=chapterArt[current().id];
  artView={theme:state.theme,fit:false};
  sheet(asset?.title||'The garden',`<div class="art-view-toolbar"><div class="art-light-options" role="group" aria-label="Illustration light"><button data-art-light="day">Daylight</button><button data-art-light="night">Moonlight</button></div><button class="art-fit-button" data-action="art-fit" aria-pressed="false">Whole scene</button></div><div class="panorama-scroll" tabindex="0" role="region" aria-label="Illustration panorama" aria-describedby="panorama-help">${chapterScene('full-art',current().id,true)}</div><div class="panorama-tools"><button data-action="art-left" aria-label="Look left">${icon('back')}</button><p id="panorama-help">Swipe or use the arrows to explore</p><button data-action="art-right" aria-label="Look right">${icon('arrow')}</button></div><p class="art-caption">${esc(asset.description)}</p>`,'art-sheet chapter-art-sheet');
  const panorama=$('.panorama-scroll');
  panorama.scrollLeft=(asset?.focus??443)/1774*panorama.scrollWidth;
  panorama.addEventListener('scroll',updatePanoramaControls,{passive:true});
  panorama.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)||artView.fit)return;
    event.preventDefault();
    if(event.key==='ArrowLeft'||event.key==='ArrowRight')movePanorama(event.key==='ArrowLeft'?-1:1);
    else {panorama.scrollTo({left:event.key==='Home'?0:panorama.scrollWidth,behavior:'instant'});updatePanoramaControls();}
  });
  updateArtLight();updatePanoramaControls();
}
function updateArtLight() {
  const svg=$('.panorama-scroll .chapter-scene svg');if(!svg)return;
  svg.setAttribute('viewBox',`0 ${artView.theme==='day'?1:445} 1774 441`);
  svg.setAttribute('aria-label',`${chapterArt[current().id].description} ${artView.theme==='day'?'Daylight':'Night'}, in enamel and gold.`);
  $$('[data-art-light]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.artLight===artView.theme)));
}
function updatePanoramaControls() {
  const p=$('.panorama-scroll');if(!p)return;
  $('[data-action="art-left"]').disabled=artView.fit||p.scrollLeft<=1;
  $('[data-action="art-right"]').disabled=artView.fit||p.scrollLeft>=p.scrollWidth-p.clientWidth-1;
  $('#panorama-help').textContent=artView.fit?'The whole scene':'Swipe or use the arrows to explore';
}
function toggleArtFit() {
  const p=$('.panorama-scroll');artView.fit=!artView.fit;
  if(artView.fit)artView.left=p.scrollLeft;
  p.classList.toggle('is-fit',artView.fit);
  $('[data-action="art-fit"]').setAttribute('aria-pressed',String(artView.fit));
  $('[data-action="art-fit"]').textContent=artView.fit?'Explore details':'Whole scene';
  if(!artView.fit)p.scrollLeft=artView.left||0;
  updatePanoramaControls();
}
function movePanorama(direction) {
  const p=$('.panorama-scroll');if(!p||artView.fit)return;
  p.scrollTo({left:p.scrollLeft+direction*p.clientWidth*.75,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}
function enhanceReadingAccess(root){
  root.querySelectorAll('a[target="_blank"]').forEach(link=>{if(link.querySelector('.new-tab-note'))return;const note=document.createElement('span');note.className='sr-only new-tab-note';note.textContent=' (opens in a new tab)';link.append(note);});
  root.querySelectorAll('[data-room], [data-room-connections], [data-question-name], [data-room-card]').forEach(b=>{if(!['copy-text','add-list','reveal'].includes(b.dataset.room))b.setAttribute('aria-haspopup','dialog');});
  const actions=new Set(['contents','kept','reader-guide','reading-settings','reading-outline','source','paths','pairs','backup','art','courtyard-art']);
  root.querySelectorAll('button').forEach(button=>{if(actions.has(button.dataset.action)||button.hasAttribute('data-open-path')||button.hasAttribute('data-pair'))button.setAttribute('aria-haspopup','dialog');});
}
function showReaderGuide(){
  const example=names.find(n=>n.id==='ar-rahman');
  sheet('A first step into the book',`<p class="guide-lead">Know Allah through His Names. Each reading begins with His attributes and leads toward worship.</p><p class="guide-copy">No Arabic knowledge is needed. You’ll find the Arabic Name beside its spelling in English letters and its English meaning.</p><div class="guide-name"><span lang="ar" dir="rtl">${example.arabic}</span><div><strong>${esc(example.name)}</strong><span>${esc(example.meaning)}</span></div></div><div class="guide-actions"><button class="primary" data-action="first-reading">Begin with Allah ${icon('arrow')}</button><button class="text-button" data-action="close-sheet">${state.view==='read'?'Back to my reading':'Back to the garden'}</button></div><ol class="guide-steps"><li><strong>Know the attribute.</strong><p>The first two sections explain what the Name means and what makes Allah’s attribute perfect.</p></li><li><strong>Let understanding become worship.</strong><p>The third section connects the meaning to prayer and conduct. Reflection follows; writing is optional.</p></li><li><strong>Keep a thread for your return.</strong><p>Save a passage with its bookmark. Follow a connected Name, or keep it for your next visit.</p></li></ol><p class="guide-copy">Most readings take a few minutes. Your place is remembered automatically. The arrows move in book order, or in the order of your chosen reading path. Open <strong>Reading settings</strong> for larger text, more space, or a quiet page.</p><p class="guide-source">An original reading companion to al-Ghazali’s <em>Al-Maqsad al-Asna</em>. It is not a published translation. Every Name includes reading notes and a link to the source.</p>`,'reader-guide-sheet');
}
function nextInvitation(){
  const suggestion=nextSuggestion(names,saved,current().id);if(!suggestion)return '';
  const {name,reason}=suggestion,queued=readingList(saved,names).includes(name.id);
  return `<section class="next-invitation" id="next-invitation" tabindex="-1" aria-labelledby="next-invitation-title"><span class="eyebrow">${isFinished(current().id)?'YOUR NEXT READING':'A CONNECTION TO EXPLORE'}</span><h3 id="next-invitation-title">Let one Name<br>lead to <em>another.</em></h3><p class="next-reason">${esc(reason)}</p><div class="next-reading-preview"><span class="next-reading-art" aria-hidden="true">${chapterScene('',name.id)}</span><div><h4>${esc(name.name)}</h4><p>${esc(name.meaning)}</p></div></div><p class="next-takeaway">${esc(name.takeaway)}</p><div class="next-reading-actions"><button class="primary" data-name="${name.id}">Read ${esc(name.name)} ${icon('arrow')}</button><button class="text-button" data-queue-name="${name.id}" aria-pressed="${queued}">${icon(queued?'check':'bookmark')}${queued?'Kept for next time':'Keep for next time'}</button></div><p class="next-pacing">${queued?'In your reading list. Tap again to remove it.':'Continue now, or leave a reading waiting for your next visit.'}</p><button class="text-button room-back" data-room="list">Arrange your reading list ${icon('arrow')}</button></section>`;
}
function homeRemembered(){
  const queued=names.find(n=>n.id===saved.nextReading&&n.id!==saved.last?.id),revisit=revisitSuggestion(names,saved);
  const showQueue=queued&&(!isFinished(saved.last?.id)||nextSuggestion(names,saved,saved.last?.id)?.kind!=='chosen');
  if(!showQueue&&!revisit)return '';
  return `<section class="home-remembered" aria-labelledby="remembered-title"><span class="eyebrow">A THREAD TO PICK UP</span><h2 id="remembered-title">Here for your <em>return.</em></h2>${showQueue?`<div class="remembered-row"><button class="remembered-reading" data-name="${queued.id}"><span class="remembered-art" aria-hidden="true">${chapterScene('',queued.id)}</span><span><small>YOU CHOSE FOR NEXT TIME</small><strong>${esc(queued.name)}</strong><span>${esc(queued.takeaway)}</span></span>${icon('arrow')}</button><button class="text-button remove-next" data-action="clear-next">Remove from next time</button></div>`:''}${revisit?`<div class="remembered-row"><p class="remembered-reason">${esc(revisit.reason)}</p><button class="remembered-reading" ${revisit.kind==='reflection'?`data-edit-note="${revisit.name.id}"`:`data-revisit-saved="${revisit.name.id}"`}><span class="remembered-art" aria-hidden="true">${chapterScene('',revisit.name.id)}</span><span><small>${revisit.kind==='reflection'?'YOUR REFLECTION':'YOUR SAVED PASSAGE'}</small><strong>${esc(revisit.name.name)}</strong><span>${esc(revisit.name.takeaway)}</span></span>${icon('arrow')}</button></div>`:''}</section>`;
}
function queueReading(id){
  if(!names.some(n=>n.id===id))return;
  const before=saved,wasQueued=readingList(saved,names).includes(id);saved=toggleReadingList(saved,id,names);
  if(!persist()){saved=before;toast('This choice could not be saved. Please try again.');return;}
  refreshJourney();
  const target=$(`[data-queue-name="${id}"]`)||$('#next-invitation')||$('#app-main');target?.focus({preventScroll:true});
  toast(wasQueued?'Removed from your reading list.':'Added to your reading list. Arrange it in your reading room.');
}

function activeReadingPath(){const path=pathById(saved.activePath);return pathNeighbours(path,current().id)?path:null;}
function readingNeighbours(){
  const path=activeReadingPath(),step=pathNeighbours(path,current().id);
  return {path,step,previous:step?names.find(n=>n.id===step.previous):names[state.index-1],next:step?names.find(n=>n.id===step.next):names[state.index+1]};
}
function pathRibbon(){
  const {path,step}=readingNeighbours();if(!path)return '';
  return `<aside class="path-ribbon" aria-label="Current reading path"><button data-open-path="${path.id}"><span class="eyebrow">${step.index+1} OF ${step.total} · READING PATH</span><strong>${esc(path.title)}</strong></button><button class="text-button" data-action="leave-path">Book order</button></aside>`;
}
function pathHome(){
  const path=pathById(saved.activePath),id=path&&pathPlace(path,saved),n=names.find(n=>n.id===id);
  return `<section class="home-paths" aria-labelledby="home-paths-title"><div class="paths-heading"><span class="eyebrow">A FEW NAMES, READ TOGETHER</span><h2 id="home-paths-title">Ways of <em>knowing Him.</em></h2><p>Stay with a meaning as it unfolds across a short path.</p></div>${path?`<button class="path-resume" data-path-start="${path.id}">${nameSeal(n.id)}<span><small>YOUR PATH · ${esc(path.title)}</small><strong>Return to ${esc(n.name)}</strong></span>${icon('arrow')}</button>`:''}<div class="home-path-grid">${readingPaths.slice(0,3).map(p=>`<button class="path-preview" data-open-path="${p.id}"><span class="path-preview-art" aria-hidden="true">${chapterScene('',p.art)}</span><span><small>${p.ids.length} NAMES</small><strong>${esc(p.title)}</strong><span>${esc(p.line)}</span></span>${icon('arrow')}</button>`).join('')}</div><button class="text-button path-all" data-action="paths">Explore all six paths ${icon('arrow')}</button></section>`;
}
function showPaths(){
  sheet('Paths through the Names',`<p class="sheet-intro">A few Names, read together to deepen one meaning. Follow a path at your own pace, or return to book order whenever you wish.</p><div class="path-catalogue">${readingPaths.map(p=>`<button class="path-preview" data-open-path="${p.id}"><span class="path-preview-art" aria-hidden="true">${chapterScene('',p.art)}</span><span><small>${p.ids.length} NAMES${saved.activePath===p.id?' · YOUR PATH':''}</small><strong>${esc(p.title)}</strong><span>${esc(p.line)}</span></span>${icon('arrow')}</button>`).join('')}</div><p class="library-caption">These are editorial reading sequences, with no prescribed schedule or devotional count.</p>`,'paths-sheet');
}
function showPath(id){
  const path=pathById(id);if(!path)return;
  const resume=pathPlace(path,saved),done=path.ids.every(id=>isFinished(id));
  sheet(path.title,`<div class="path-frontispiece" aria-hidden="true">${chapterScene('',path.art,true)}</div><p class="sheet-intro">${esc(path.line)}</p><p class="path-pacing">${path.ids.length} readings · Your own pace</p><button class="primary path-begin" data-path-start="${path.id}">${saved.pathPlaces[path.id]?'Continue this path':'Begin this path'} ${icon('arrow')}</button><ol class="path-readings">${path.ids.map((id,i)=>{const n=names.find(n=>n.id===id);return `<li><button data-path-reading="${id}" data-path-id="${path.id}" ${saved.activePath===path.id&&resume===id?'aria-current="location"':''}><span class="path-number">${String(i+1).padStart(2,'0')}</span><span><strong>${esc(n.name)}</strong><small>${esc(n.meaning)}</small>${isFinished(id)?'<small class="path-read">Read · yours to revisit</small>':''}</span><span class="path-seal" aria-hidden="true">${nameSeal(id)}</span></button></li>`;}).join('')}</ol>${done?`<div class="path-closing"><span class="eyebrow">A PLACE TO RETURN</span><p>${esc(path.closing)}</p></div>`:''}<button class="text-button path-all" data-action="paths">${icon('back')} All reading paths</button>`,'path-detail-sheet');
}
function beginPath(pathId,nameId){
  const path=pathById(pathId);if(!path)return;
  const id=path.ids.includes(nameId)?nameId:pathPlace(path,saved);
  saved.activePath=path.id;saved.pathPlaces[path.id]=id;persist();closeSheet();openReading(id);
}
function leavePath(){
  const place={scroll:window.scrollY,anchor:readingAnchor()};saved.activePath=null;persist();render();restorePlace(place);toast('Reading in book order. Your path’s place is kept.');
}
function pairInvitation(){
  const pair=pairFor(current().id);if(!pair)return '';
  const other=names.find(n=>n.id===pair.ids.find(id=>id!==current().id));
  return `<button class="pair-invitation" data-pair="${pair.id}"><span class="pair-seal" aria-hidden="true">${nameSeal(other.id)}</span><span><small>UNDERSTAND THEM TOGETHER</small><strong>Read with ${esc(other.name)}</strong></span>${icon('arrow')}</button>`;
}
function showPairs(){
  sheet('Read Names together',`<p class="sheet-intro">Some Names illuminate one another. Hold their meanings together, and notice what each teaches about Allah.</p><div class="pair-list">${namePairs.map(p=>`<button data-pair="${p.id}"><span><strong>${esc(p.title)}</strong><small>${p.ids.map(id=>esc(names.find(n=>n.id===id).name)).join(' · ')}</small></span>${icon('arrow')}</button>`).join('')}</div>`,'pairs-sheet');
}
function showPair(id){
  const pair=namePairs.find(p=>p.id===id);if(!pair)return;
  sheet(pair.title,`<p class="pair-connection">${esc(pair.connection)}</p><div class="pair-columns">${pair.ids.map(id=>{const n=names.find(n=>n.id===id);return `<article class="pair-reading name-style" style="${frameStyle(id)}"><div class="pair-art" aria-hidden="true">${chapterScene('',id)}</div><span class="pair-arabic" lang="ar" dir="rtl">${n.arabic}</span><h3>${esc(n.name)}</h3><span class="pair-meaning">${esc(n.meaning)}</span><p>${esc(n.introduction)}</p><details class="pair-depth"><summary>Understand the attribute <span aria-hidden="true">+</span></summary>${n.sections.slice(0,2).map(s=>`<h4>${esc(s.title)}</h4>${s.paragraphs.map(p=>`<p>${esc(p)}</p>`).join('')}`).join('')}</details><button class="text-button" data-name="${id}" aria-label="Open the full reading for ${esc(n.name)}">Open full reading ${icon('arrow')}</button></article>`;}).join('')}</div><p class="library-caption">Original companion explanations. Each full reading includes its source notes.</p><button class="text-button path-all" data-action="pairs">${icon('back')} More connected Names</button>`,'pair-detail-sheet');
}
function passageButton(section){
  const key=passageKey(current().id,section),has=Boolean(saved.passages[key]);
  return `<button class="passage-mark" data-keep-passage="${section}" aria-pressed="${has}" aria-label="${has?'Remove saved passage':'Keep passage'}: ${esc(current().sections[section].title)}" title="${has?'Passage kept':'Keep this passage'}">${icon(has?'check':'bookmark')}</button>`;
}
function togglePassage(section){
  const passage=capturePassage(current(),section);if(!passage)return;
  const key=passageKey(current().id,section),before=saved.passages,had=Boolean(before[key]);
  saved.passages={...before};if(had)delete saved.passages[key];else saved.passages[key]=passage;
  if(!persist()){saved.passages=before;toast('Could not save this passage. Please keep a copy before closing.');return;}
  $$(`[data-keep-passage="${section}"]`).forEach(button=>{button.setAttribute('aria-pressed',String(!had));button.setAttribute('aria-label',`${had?'Keep passage':'Remove saved passage'}: ${passage.title}`);button.title=had?'Keep this passage':'Passage kept';button.innerHTML=icon(had?'bookmark':'check');});
  updateKeptBadge();toast(had?'Passage removed from Saved.':'Passage saved. Find it in Saved beside your reflections.');
}
function keptPassages(n){
  return passagesFor(saved,n.id).map(p=>`<div class="kept-passage"><span class="eyebrow">COMPANION PASSAGE</span><h4>${esc(p.title)}</h4><blockquote>${esc(p.text)}</blockquote><div class="passage-actions"><button class="text-button" data-return-passage="${passageKey(n.id,p.section)}">Return to passage ${icon('arrow')}</button><button class="text-button" data-remove-passage="${passageKey(n.id,p.section)}" aria-label="Remove saved passage: ${esc(p.title)}">Remove</button></div></div>`).join('');
}
function removePassage(key){
  if(!saved.passages[key])return;
  const before=saved.passages;saved.passages={...before};delete saved.passages[key];
  if(!persist()){saved.passages=before;toast('This change could not be saved.');return;}
  updateKeptBadge();if($('#kept-entries'))updateKept();
  const [id,section]=key.split(':');if(id===current().id){const button=$(`[data-keep-passage="${section}"]`);if(button){button.setAttribute('aria-pressed','false');button.setAttribute('aria-label',`Keep passage: ${current().sections[section].title}`);button.innerHTML=icon('bookmark');button.title='Keep this passage';}}
  toast('Passage removed. Your reflection is unchanged.');
}
function librarySummary(data){const count=(n,singular,plural=singular+'s')=>`${n} ${n===1?singular:plural}`;return `${count(data.bookmarks.length,'saved Name')} · ${count(Object.keys(data.passages).length,'passage')} · ${count(Object.keys(data.notes).length,'reflection')} · ${count(Object.keys(data.questions).length,'question')}`;}
function showBackup(){
  pendingBackup=null;backupReadToken++;
  let copy;
  try{copy=createBackup(saved,names);}catch(error){sheet('Keep your writing',`<p class="sheet-intro">${esc(error.message)}</p><button class="primary" data-action="export-kept">Save a text copy ${icon('arrow')}</button><button class="text-button path-all" data-action="kept">${icon('back')} Back to Saved</button>`,'backup-sheet');return;}
  const data=libraryData(saved,names),url=URL.createObjectURL(new Blob([copy],{type:'application/json;charset=utf-8'}));
  sheet('Keep your library safe',`<p class="sheet-intro">Keep a backup for another browser or device. The backup contains your personal writing. Keep it somewhere private.</p><section class="backup-section"><span class="eyebrow">YOUR LIBRARY</span><p class="backup-summary">${esc(librarySummary(data))}</p><p class="library-caption">Includes reading places, Names marked as read, saved paths, your ordered reading list, recall choices, questions, and reading preferences.</p><a class="primary" href="${url}" download="beautiful-names-backup.json">Download backup ${icon('arrow')}</a><details class="backup-copy"><summary>Or copy the backup text</summary><label class="sr-only" for="backup-copy">Your backup JSON</label><textarea id="backup-copy" readonly spellcheck="false">${esc(copy)}</textarea><button class="text-button" data-action="copy-backup">Copy backup text</button></details></section><section class="backup-section"><h3>Bring a library here.</h3><p>Preview a backup before combining it with this library. Your existing writing stays.</p><label class="backup-file-label" for="backup-file">Choose a backup file</label><input id="backup-file" type="file" accept="application/json,.json"><details class="backup-paste"><summary>Or paste backup text</summary><label class="sr-only" for="backup-paste">Backup JSON to restore</label><textarea id="backup-paste" spellcheck="false" placeholder="Paste your Beautiful Names backup here"></textarea><button class="text-button" data-action="preview-backup">Preview pasted backup ${icon('arrow')}</button></details><p class="backup-status" role="status"></p></section>`,'backup-sheet');
  keptCopyUrl=url;
}
function previewBackup(text){
  try{
    const incoming=parseBackup(text,names),plan=mergeLibrary(saved,incoming,names);pendingBackup=incoming;
    sheet('Preview your library',`<p class="sheet-intro">${esc(librarySummary(incoming))}</p><dl class="backup-plan"><div><dt>Saved Names to add</dt><dd>${plan.addedNames}</dd></div><div><dt>Passages to add</dt><dd>${plan.addedPassages}</dd></div><div><dt>New reflections</dt><dd>${plan.addedNotes}</dd></div><div><dt>Reflections with two versions</dt><dd>${plan.conflicts}</dd></div><div><dt>New questions</dt><dd>${plan.addedQuestions}</dd></div><div><dt>Questions with two versions</dt><dd>${plan.questionConflicts}</dd></div><div><dt>Names marked as read to add</dt><dd>${plan.addedFinished}</dd></div></dl><p class="backup-explanation">${plan.conflicts?'Both versions of differing reflections will be kept in the same note, separated by “Imported reflection”.':'Existing reflections will remain unchanged.'} ${plan.questionConflicts?'Both versions of differing questions will be kept, separated by “Imported question”. ':''}Your existing reading list comes first; new imported Names are added after it. Existing passage snapshots and reading places take precedence. Your current reading appearance stays the same unless you choose otherwise.</p><label class="backup-preferences"><input id="backup-preferences" type="checkbox"> Use the backup’s text size, spacing, and reading atmosphere</label><button class="primary" data-action="merge-backup">Merge into this library ${icon('arrow')}</button><button class="text-button path-all" data-action="backup">${icon('back')} Choose a different backup</button><p class="backup-status" role="status">${incoming.nextReading?`Next reading in this backup: ${esc(names.find(n=>n.id===incoming.nextReading).name)}. Your current choice takes precedence. `:''}Nothing has been imported yet.</p>`,'backup-sheet');
  }catch(error){pendingBackup=null;const status=$('.backup-status');if(status)status.textContent=error.message;}
}
async function readBackupFile(input){
  const file=input.files?.[0];if(!file)return;
  const token=++backupReadToken;
  if(file.size>backupLimit){$('.backup-status').textContent='Choose a backup under 2 MB. Nothing was imported.';return;}
  try{const text=await file.text();if(token===backupReadToken&&$('#sheet').open&&$('#backup-file'))previewBackup(text);}catch{if(token===backupReadToken&&$('.backup-status'))$('.backup-status').textContent='This file could not be read. Try choosing it again.';}
}
function applyBackup(){
  if(!pendingBackup)return;
  let plan;try{plan=mergeLibrary(saved,pendingBackup,names,{useReadingPreferences:$('#backup-preferences')?.checked===true});}catch(error){$('.backup-status').textContent=error.message;return;}
  const before=saved;saved=plan.data;
  if(!persist()){saved=before;$('.backup-status').textContent='The browser could not save this library. Nothing was changed; keep your backup file.';return;}
  pendingBackup=null;const place={scroll:window.scrollY,anchor:readingAnchor()};render();restorePlace(place);kept();toast('Your libraries are combined. Existing writing has been kept.');
}
async function copyBackup(){
  const field=$('#backup-copy');if(!field)return;
  try{await navigator.clipboard.writeText(field.value);if($('.backup-status'))$('.backup-status').textContent='Backup copied. Save it somewhere private before leaving.';}
  catch{field.focus();field.select();if($('.backup-status'))$('.backup-status').textContent='Backup text selected. Use Copy to keep it elsewhere.';}
}

function closeSheet(){backupReadToken++;pendingBackup=null;if($('#sheet').open)$('#sheet').close();}
function reflect(write=false) {
  if(state.design==='book') {navigate('read',state.index,3);return;}
  const journal=$('.journal-disclosure');if(write&&journal)journal.open=true;
  const target=$('#reflection');if(target){target.scrollIntoView({block:'start',behavior:'instant'});(write?$('#reflection-note'):target)?.focus({preventScroll:true});savePosition();}
}
document.addEventListener('click',event=>{
  if(room.handleClick(event))return;
  if(event.target.closest('.skip-link')){event.preventDefault();$('#app-main')?.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});return;}
  const scope=event.target.closest('[data-search-scope]');if(scope){contentsState.scope=scope.dataset.searchScope;contentsState.page=0;contents();$('#name-search').focus();return;}
  const searchResult=event.target.closest('[data-search-reading]');if(searchResult){closeSheet();openReading(searchResult.dataset.searchReading,false);const section=Number(searchResult.dataset.searchSection);if(section>=0){if(state.design==='book')navigate('read',state.index,section);else requestAnimationFrame(()=>jumpToSection(`section-${section}`));}return;}
  const queue=event.target.closest('[data-queue-name]');if(queue){queueReading(queue.dataset.queueName);return;}
  const reopen=event.target.closest('[data-revisit-saved]');if(reopen){kept();keptState.query=names.find(n=>n.id===reopen.dataset.revisitSaved)?.name||'';$('#kept-search').value=keptState.query;updateKept();return;}

  const pathOpen=event.target.closest('[data-open-path]');if(pathOpen){showPath(pathOpen.dataset.openPath);return;}
  const pathStart=event.target.closest('[data-path-start]');if(pathStart){beginPath(pathStart.dataset.pathStart);return;}
  const pathReading=event.target.closest('[data-path-reading]');if(pathReading){beginPath(pathReading.dataset.pathId,pathReading.dataset.pathReading);return;}
  const pair=event.target.closest('[data-pair]');if(pair){showPair(pair.dataset.pair);return;}
  const passage=event.target.closest('[data-keep-passage]');if(passage){togglePassage(Number(passage.dataset.keepPassage));return;}
  const remove=event.target.closest('[data-remove-passage]');if(remove){removePassage(remove.dataset.removePassage);return;}
  const returnPassage=event.target.closest('[data-return-passage]');if(returnPassage){const p=saved.passages[returnPassage.dataset.returnPassage];if(p){closeSheet();openReading(p.nameId,false);if(state.design==='book')navigate('read',state.index,p.section);else requestAnimationFrame(()=>jumpToSection(`section-${p.section}`));}return;}

  const preference=event.target.closest('[data-reading-pref]');
  if(preference){setReadingPreference(preference.dataset.readingPref,preference.dataset.value);return;}
  const section=event.target.closest('[data-reading-section]');
  if(section){const id=section.dataset.readingSection;closeSheet();jumpToSection(id);return;}
  const artLight=event.target.closest('[data-art-light]');
  if(artLight){artView.theme=artLight.dataset.artLight;updateArtLight();return;}

  const keptFilter=event.target.closest('[data-kept-type]');
  if(keptFilter){keptState.type=keptFilter.dataset.keptType;keptState.page=0;updateKept();return;}
  const path=event.target.closest('[data-pathway]');
  if(path){contentsState={query:'',theme:path.dataset.pathway,status:'all',page:0};contents();return;}
  const status=event.target.closest('[data-status]');
  if(status){contentsState.status=status.dataset.status;contentsState.page=0;updateContents();return;}
  const name=event.target.closest('[data-name]');if(name){closeSheet();openReading(name.dataset.name);return;}
  const edit=event.target.closest('[data-edit-note]');if(edit){closeSheet();openReading(edit.dataset.editNote);requestAnimationFrame(()=>reflect(true));return;}
  const control=event.target.closest('[data-action]');if(!control)return;
  switch(control.dataset.action){
    case 'reader-guide':showReaderGuide();break;
    case 'first-reading':closeSheet();openReading('allah',false);break;
    case 'clear-next':queueReading(saved.nextReading);break;
    case 'home':closeSheet();navigate('home');break;
    case 'begin':closeSheet();openReading(names[0].id,false);break;
    case 'resume':if(saved.last)openReading(saved.last.id,true);break;
    case 'contents':savePosition();exploreNames();break;
    case 'name-index':contentsState={query:'',theme:'all',status:'all',page:0};contents();$('#name-search').focus();break;
    case 'all-names':contentsState={query:'',theme:'all',status:'all',page:0};contents();break;
    case 'saved-index':contentsState={query:'',theme:'all',status:'saved',page:0};contents();break;
    case 'index-previous':contentsState.page--;updateContents();break;
    case 'index-next':contentsState.page++;updateContents();break;
    case 'clear-filters':resetContents();break;
    case 'clear-search':contentsState.query='';contentsState.page=0;$('#name-search').value='';updateContents();$('#name-search').focus();break;
    case 'kept':kept();break;
    case 'kept-previous':keptState.page--;updateKept();break;
    case 'kept-next':keptState.page++;updateKept();break;
    case 'kept-clear':keptState.query='';keptState.page=0;$('#kept-search').value='';updateKept();$('#kept-search').focus();break;
    case 'kept-reset':keptState={query:'',type:'all',page:0};$('#kept-search').value='';updateKept();break;
    case 'source':showSource();break;
    case 'paths':showPaths();break;
    case 'pairs':showPairs();break;
    case 'leave-path':leavePath();break;
    case 'garden-view':setReadingPreference('focus','garden');break;
    case 'backup':showBackup();break;
    case 'copy-backup':copyBackup();break;
    case 'preview-backup':previewBackup($('#backup-paste').value);break;
    case 'merge-backup':applyBackup();break;
    case 'reading-settings':showReadingSettings();break;
    case 'reading-outline':showReadingOutline();break;
    case 'export-kept':downloadKept();break;
    case 'copy-kept':copyKeptText();break;
    case 'art-fit':toggleArtFit();break;
    case 'art-left':movePanorama(-1);break;
    case 'art-right':movePanorama(1);break;
    case 'about':showAbout();break;
    case 'close-sheet':closeSheet();break;
    case 'art':showArt();break;
    case 'courtyard-art':sheet('Through the courtyard',courtyardScene('full-art'),'art-sheet');break;
    case 'theme':{
      savePosition();const y=window.scrollY;state.theme=state.theme==='day'?'night':'day';saved.theme=state.theme;persist();const openJournal=$('.journal-disclosure')?.open;render();if(openJournal&&$('.journal-disclosure'))$('.journal-disclosure').open=true;window.scrollTo({top:y,behavior:'instant'});break;
    }
    case 'save':{
      const id=current().id,before=saved.bookmarks;saved.bookmarks=hasSaved(id)?saved.bookmarks.filter(v=>v!==id):[...saved.bookmarks,id];const ok=persist();if(!ok)saved.bookmarks=before;updateKeptBadge();$$('.bookmark-button').forEach(b=>{b.classList.toggle('is-saved',hasSaved(id));b.setAttribute('aria-pressed',String(hasSaved(id)));$('span',b).textContent=hasSaved(id)?'Saved':'Save name';});toast(ok?(hasSaved(id)?'Kept with your saved names.':'Removed from saved names.'):'Your browser could not save this change.');break;
    }
    case 'reflect':reflect();break;
    case 'next-page':navigate('read',state.index,Math.min(3,state.page+1));break;
    case 'previous-page':navigate('read',state.index,Math.max(0,state.page-1));break;
    case 'previous-name':{const {previous}=readingNeighbours();if(previous)openReading(previous.id,false);break;}
    case 'next-name':{const {next,path}=readingNeighbours();if(next)openReading(next.id,false);else if(path)showPath(path.id);else exploreNames();break;}
    case 'finish':{
      const id=current().id,before=saved;saved=toggleFinished(saved,id);const ok=persist();if(!ok)saved=before;
      $$('.completion').forEach(el=>{$('.finish-button',el).setAttribute('aria-pressed',String(isFinished(id)));$('.finish-button',el).innerHTML=icon(isFinished(id)?'check':'book')+(isFinished(id)?'Marked as read':'Mark as read');$('.completion-status',el).textContent=ok?(isFinished(id)?'Reading remembered. Tap again to undo.':'Your place is saved. Mark as read whenever you are ready.'):'This change could not be saved. Please try again.';$('.completion-recall',el).hidden=!isFinished(id);});
      const next=$('#next-invitation');if(next)next.outerHTML=nextInvitation();
      break;
    }
  }
});
document.addEventListener('input',event=>{
  if(room.handleInput(event))return;
  if(event.target.id==='reflection-note'){
    const value=event.target.value;if(value.trim())saved.notes[current().id]=value;else delete saved.notes[current().id];const ok=persist();$('#note-status').textContent=ok?'Saved in this browser.':'Could not save. Keep a copy before closing this page.';
    updateKeptBadge();
  }
  if(event.target.id==='name-search'){
    contentsState.query=event.target.value;contentsState.page=0;updateContents();
  }
  if(event.target.id==='kept-search'){keptState.query=event.target.value;keptState.page=0;updateKept();}
});
document.addEventListener('change',event=>{if(event.target.id==='theme-filter'){contentsState.theme=event.target.value;contentsState.page=0;updateContents();}});
$('#sheet').addEventListener('close',()=>{if(!$('#sheet').open){releaseKeptCopy();room.cleanup();pendingBackup=null;backupReadToken++;if(document.activeElement===document.body||$('#sheet').contains(document.activeElement)){const target=sheetOpener?.isConnected&&sheetOpener.getClientRects().length?sheetOpener:$('#app-main');target?.focus({preventScroll:true});}}});
$('#sheet').addEventListener('click',event=>{if(event.target!==$('#sheet'))return;const r=$('#sheet').getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeSheet();});
window.addEventListener('scroll',()=>{clearTimeout(positionTimer);positionTimer=setTimeout(savePosition,180);},{passive:true});
window.addEventListener('pagehide',savePosition);
window.addEventListener('popstate',()=>{clearTimeout(positionTimer);savePosition();readRoute();render();const place=state.view==='read'?readingPlace(saved,current().id,state.design):null;if(place?.reflectionOpen&&$('.journal-disclosure'))$('.journal-disclosure').open=true;suppressScroll=true;restorePlace(place);requestAnimationFrame(()=>{suppressScroll=false;savePosition();});});
document.body.dataset.shape='open';
document.documentElement.style.setProperty('--study-height','0px');
readRoute();render();route(false);
if(state.view==='read'&&saved.last?.id===current().id&&saved.last?.design===state.design&&saved.last?.page===state.page){suppressScroll=true;if(saved.last.reflectionOpen&&$('.journal-disclosure'))$('.journal-disclosure').open=true;requestAnimationFrame(()=>{restorePlace(saved.last);suppressScroll=false;});}

document.addEventListener('change',event=>{if(event.target.id==='index-group'){contentsState.page=Number(event.target.value);updateContents();}});

document.addEventListener('change',event=>{if(event.target.id==='backup-file')readBackupFile(event.target);});

window.addEventListener('storage',event=>{if((event.key===storageKey||event.key===null)&&event.newValue!==storageStamp){otherTabChanged=true;storageAvailable=false;const notice=$('#storage-notice');if(notice){notice.hidden=false;notice.firstChild.textContent='Your library changed in another tab. Keep a copy of any writing here, then reload to continue with the newest library.';}}});
