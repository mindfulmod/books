import {fullEditionFrames,editionSeal,editionCorner} from './full-edition-visuals.js';
// Each reading gets a deliberately selected ornamental identity.
// Extend this registry as the remaining names enter the edition. These are
// original decorative motifs, not traditional symbols assigned to the Names.
export const nameFrames = {
  ...fullEditionFrames,
  'al-musawwir': {motif:'mosaic',label:'An eight-point mosaic',day:'#3c78a0',night:'#90bdda'},
  'al-ghaffar': {motif:'wisteria',label:'A flowering wisteria stem',day:'#86618f',night:'#c2a0d0'},
  'al-qahhar': {motif:'cedar',label:'Layered cedar boughs',day:'#51746b',night:'#94b7ac'},
  'al-wahhab': {motif:'blossom',label:'An orange-blossom branch',day:'#b27639',night:'#d9b57e'},
  'ar-razzaq': {motif:'wheat',label:'A slender ear of wheat',day:'#957642',night:'#c9b17f'},
  'al-aziz': {motif:'tide',label:'A curling coastal wave',day:'#337b91',night:'#8bb7c8'},
  'al-jabbar': {motif:'bridge',label:'A single stone bridge',day:'#92784c',night:'#c4ad86'},
  'al-mutakabbir': {motif:'palm',label:'An open palm canopy',day:'#88723d',night:'#c7b184'},
  'al-khaliq': {motif:'fern',label:'An unfurling fern',day:'#527d51',night:'#9dbb90'},
  'al-bari': {motif:'fruit',label:'A pomegranate bough',day:'#9f5b54',night:'#d89e95'},
  'ar-rahman': {motif:'radiance',label:'Radiating arches',day:'#377c87',night:'#72bcc7'},
  'ar-rahim': {motif:'vine',label:'Interwoven vines',day:'#547649',night:'#a5bd88'},
  'al-latif': {motif:'sprig',label:'A fine olive sprig',day:'#558678',night:'#9acabd'},
  'al-ghafur': {motif:'arch',label:'Nested arches',day:'#5f689a',night:'#a5add8'},
  'al-wadud': {motif:'petal',label:'Petal rosette',day:'#ad665f',night:'#dfa39b'},
  'al-malik': {motif:'cypress',label:'A slender cypress',day:'#44716d',night:'#90b8b0'},
  'al-quddus': {motif:'iris',label:'Iris and fine stems',day:'#687ca2',night:'#b3c3df'},
  'as-salam': {motif:'ripple',label:'Open water ripples',day:'#40868c',night:'#90c1cd'},
  'al-mumin': {motif:'lantern',label:'A hanging lantern',day:'#a27b43',night:'#d6b986'},
  'al-muhaymin': {motif:'canopy',label:'A branching canopy',day:'#557851',night:'#a5b88b'},
};
export function frameFor(id) {return nameFrames[id] || {motif:'plain',label:'Unassigned frame',day:'#a7793a',night:'#d1b579'};}
export function frameStyle(id) {const f=frameFor(id);return `--enamel-day:${f.day};--enamel-night:${f.night}`;}
const svg=(body,kind)=>`<svg class="ornament ornament-${kind}" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
const seals={
  mosaic:'<path d="m32 5 8 12 14 1-1 14 6 12-14 4-13 11-13-11-14-4 6-12-1-14 14-1 8-12ZM32 14l13 18-13 18-13-18 13-18Zm0 6 18 12-18 12-18-12 18-12Z"/><path class="enamel-inlay" d="m32 26 6 6-6 6-6-6Z"/>',
  wisteria:'<path d="M9 12c12-8 33-8 47-2M18 10v32m14-35v48M46 9v34M18 14c-10-7-14 1-6 7l6-7Zm0 9c10-7 14 1 6 7l-6-7Zm0 8c-9-4-10 3-3 8l3-8ZM32 14c-10-5-12 2-4 8l4-8Zm0 11c10-6 14 2 6 8l-6-8Zm0 10c-10-5-12 2-4 8l4-8ZM46 15c10-5 12 3 4 8l-4-8Zm0 10c-10-5-12 2-4 8l4-8Z"/><path class="enamel-inlay" d="M32 43c-7 5-6 10 0 13 6-3 7-8 0-13Z"/>',
  cedar:'<path d="M32 8v49M9 56h46M32 9 19 22h9L12 33h13L5 46h24m6 0h24L39 33h13L36 22h9L32 9ZM32 54l-10 5m10-5 10 5M17 42l6-4m24 4-6-4"/><path class="enamel-inlay" d="m32 25 5 8-5 5-5-5Z"/>',
  blossom:'<path d="M10 55c12-15 18-24 39-45M19 44C5 44 5 33 11 28c10 1 16 8 8 16Zm10-13c-8-12-3-21 5-20 7 8 6 15-5 20Zm8 8c5-11 16-11 19-4-5 11-12 13-19 4ZM47 17c-10-11-18-1-10 7-11 9-1 18 8 10 9 10 19-1 9-9 11-9 1-18-7-8Z"/><circle class="enamel-inlay" cx="46" cy="25" r="3"/>',
  wheat:'<path d="M32 8v50M26 60l6-6 6 6M32 20c-9-1-14-7-13-14 9 2 14 7 13 14Zm0 10c-12-1-17-8-15-15 9 2 15 7 15 15Zm0 11c-12-1-18-9-16-16 10 2 16 9 16 16Zm0 10c-12-1-18-9-16-16 10 2 16 9 16 16Zm0-31c9-1 14-7 13-14-9 2-14 7-13 14Zm0 10c12-1 17-8 15-15-9 2-15 7-15 15Zm0 11c12-1 18-9 16-16-10 2-16 9-16 16Zm0 10c12-1 18-9 16-16-10 2-16 9-16 16Z"/><path class="enamel-inlay" d="M32 3c-5 4-5 9 0 13 5-4 5-9 0-13Z"/>',
  tide:'<path d="M5 45c10 8 19 8 29 0s17-8 25-3M7 54c9 5 18 5 27 0s17-5 24-1M9 38c13 1 11-26 28-27 13-1 20 8 18 18-9-8-17-5-16 2 1 6 6 7 10 5-6 11-17 12-24 6M28 37c-1-7 4-14 11-15"/><path class="enamel-inlay" d="M17 29c-6-8-4-13 2-18 4 8 5 13-2 18Z"/>',
  bridge:'<path d="M5 30h54M7 30v15h11c0-20 28-20 28 0h11V30M7 25c13-18 37-18 50 0M11 22l4 8m6-16 3 16m8-19v19m11-16-3 16m13-8-4 8M5 50c9-4 18 4 27 0s18 4 27 0M10 57c8-3 14 3 22 0s14 3 22 0"/><path class="enamel-inlay" d="m32 18 3 4-3 4-3-4Z"/>',
  palm:'<path d="M29 58c5-13 7-25 4-38M22 57h20M32 22C17 10 9 13 5 22c10-4 18-3 27 0Zm1-3C23 4 14 4 9 10c9 0 16 3 24 9Zm1 1C38 6 49 5 57 13c-10-1-17 1-23 7Zm0 3c14-7 24-2 26 8-10-7-17-8-26-8ZM32 9c4 3 5 6 2 11M30 39l5 3m-7 6 5 3"/><path class="enamel-inlay" d="M25 25c-6 6-5 11 0 11 5-2 6-7 0-11Z"/>',
  fern:'<path d="M14 57c9-12 13-20 13-31 0-14 8-22 18-18 11 5 9 20-1 22-8 1-12-8-6-12 4-3 8 2 5 5M26 30C13 29 8 22 11 16c10 1 16 5 15 14Zm-3 12C9 43 4 36 7 30c9 0 16 4 16 12Zm-7 11C6 55 2 49 5 44c6-1 12 2 11 9ZM25 38c11-7 18-4 18 3-7 7-15 7-18-3Zm-5 11c10-5 17-2 15 4-6 6-12 3-15-4Z"/><circle class="enamel-inlay" cx="44" cy="19" r="2"/>',
  fruit:'<path d="M31 22c-17-6-27 9-22 22 6 17 33 19 41 3 8-15-1-30-19-25ZM24 20l-2-9 9 4 8-5-1 11M31 14c-1-8 7-12 14-10-2 7-6 10-14 10ZM30 24c-5 8-6 18-1 29M45 33c3 4 3 8 1 11"/><path class="enamel-inlay" d="M54 21c-9 1-15-4-13-11 9-1 15 4 13 11Z"/>',
  cypress:'<path d="M32 6C24 16 27 17 21 26c-8 12-3 23 11 30 14-7 19-18 11-30-6-9-3-10-11-20ZM32 14v44M32 45 22 36m10 2 8-10m-8 1-5-7"/><path class="enamel-inlay" d="M32 19c-5 6-7 11 0 17 7-6 5-11 0-17Z"/>',
  iris:'<path d="M31 34v24M31 54C14 50 13 42 12 37c11 0 17 8 19 17Zm0-5c6-12 14-13 21-11-5 11-12 15-21 11ZM31 31C17 20 25 8 32 5c10 6 12 18-1 26ZM29 30C12 17 4 28 9 37c10 8 17 1 20-7Zm5 0c15-13 25-4 22 7-10 9-18 1-22-7Z"/><path class="enamel-inlay" d="m31 26 4 6-4 6-4-6Z"/>',
  ripple:'<path d="M5 43c9-6 13 6 27 0s18 6 27 0M10 51c9-5 15 4 22 0s13 5 22 0M13 35c10 5 28 5 38 0M32 31C20 28 16 21 19 16c8 0 13 7 13 15Zm0 0c12-3 16-10 13-15-8 0-13 7-13 15ZM32 25c-7-7-5-13 0-19 5 6 7 12 0 19Z"/><circle class="enamel-inlay" cx="32" cy="33" r="2.5"/>',
  lantern:'<path d="M32 5v7m-5 4a5 5 0 0 1 10 0M19 23l13-7 13 7-3 29-10 6-10-6-3-29ZM19 23h26M24 27l2 21m14-21-2 21M23 51h18M32 25v19"/><path class="enamel-inlay" d="M32 32c-7 7-7 13 0 15 7-2 7-8 0-15Z"/>',
  canopy:'<path d="M32 58V30M32 43 17 29m15 6 15-16M31 31 23 16M17 29C3 31 6 16 10 13c9 0 15 8 7 16ZM47 19c-2-14 10-16 13-10 2 10-4 14-13 10ZM23 16C10 12 15 3 22 4c7 5 8 9 1 12ZM34 27c-2-11 5-19 12-16 4 9 0 16-12 16Z"/><path class="enamel-inlay" d="M36 45c9-9 17-7 17 0-5 8-11 8-17 0Z"/>',
  radiance:'<path d="M32 53C13 47 9 33 12 19c11 1 18 10 20 22 2-12 9-21 20-22 3 14-1 28-20 34ZM32 41C20 30 22 17 32 7c10 10 12 23 0 34Z"/><path d="M32 49 17 27m15 22 15-22M21 53q11 8 22 0"/><path class="enamel-inlay" d="m32 42 4 5-4 5-4-5z"/>',
  vine:'<path d="M15 54C47 39 45 20 30 10c-16 10-15 29 19 43M15 53c-2-14 10-18 16-12-1 12-12 16-16 12ZM49 52c3-15-9-20-16-13 0 12 10 18 16 13ZM22 31C8 30 6 20 11 13c12 0 18 8 11 18ZM41 30c14-1 17-12 12-18-12 0-19 8-12 18Z"/><circle class="enamel-inlay" cx="31" cy="20" r="3"/>',
  sprig:'<path d="M14 56C28 43 31 27 38 8M24 43C9 44 6 33 10 26c12 0 18 9 14 17ZM29 32C42 36 52 27 51 19c-13-2-22 4-22 13ZM34 21C22 21 19 12 23 6c9 0 15 8 11 15ZM39 10q6-5 12-3"/><path class="enamel-inlay" d="M37 44c8-6 15-2 13 5-7 5-13 1-13-5Z"/>',
  arch:'<path d="M9 53V29C9 17 24 12 32 5c8 7 23 12 23 24v24H9ZM17 53V31c0-9 9-14 15-19 6 5 15 10 15 19v22M25 53V33c0-6 4-9 7-12 3 3 7 6 7 12v20M5 57h54"/><path class="enamel-inlay" d="m32 31 4 5-4 5-4-5z"/>',
  petal:'<path d="M32 18C17 1 5 16 18 32 1 47 17 60 32 46c15 17 30 1 14-14C63 16 47 2 32 18ZM32 18c-14-1-15 13-6 14-9 3-7 16 6 14 12 1 15-12 6-14 9-3 7-16-6-14Z"/><circle class="enamel-inlay" cx="32" cy="32" r="4"/><path d="M32 5v6M5 32h6m21 21v6m21-27h6"/>',
  plain:'<path d="m32 10 22 22-22 22-22-22Z"/><path d="m32 21 11 11-11 11-11-11Z"/>'
};
export function nameSeal(id) {const f=frameFor(id);return svg(f.family?editionSeal(f):seals[f.motif], 'seal');}
const corners={
  mosaic:'<path d="M6 55V25C6 13 13 6 25 6h30M13 45V28c0-9 6-15 15-15h17m-14 4 5 8 9 1-1 9 4 8-9 2-8 7-8-7-9-2 4-8-1-9 9-1 5-8Zm0 11 9 8-9 9-9-9 9-8Z"/><path class="enamel-inlay" d="m31 32 4 4-4 4-4-4Z"/>',
  wisteria:'<path d="M6 55V26C6 13 13 6 26 6h29M14 42V19m13 15V13m14 13V10M14 22c-8-4-10 2-3 7l3-7Zm0 9c8-5 10 2 4 7l-4-7ZM27 17c-8-4-10 2-3 7l3-7Zm0 9c8-4 10 2 4 7l-4-7ZM41 13c8-4 10 2 4 7l-4-7Z"/><path class="enamel-inlay" d="M14 40c-5 4-5 8 0 10 5-2 5-6 0-10Z"/>',
  cedar:'<path d="M6 55V28C6 14 14 6 28 6h27M15 51l27-34M41 16 23 21l5 5-16 3 7 6-10 9 11 1m4 2 11 5 3-15 7 5-1-15 7 5-10-16"/><path class="enamel-inlay" d="m31 28 1 8-7 1 1-7Z"/>',
  blossom:'<path d="M6 55V29C6 14 14 6 29 6h26M14 51c8-22 17-30 36-36M22 35C9 35 9 24 15 20c9 3 11 9 7 15Zm8 4c7-9 16-7 16 0-7 8-13 8-16 0ZM41 18c-7-9-16-1-9 6-9 8 0 15 7 8 8 9 17 0 9-7 9-8 0-16-7-7Z"/><circle class="enamel-inlay" cx="40" cy="25" r="2.5"/>',
  wheat:'<path d="M6 55V27C6 14 14 6 27 6h28M15 51 46 15M24 41c-9-4-11-11-7-16 8 4 11 10 7 16Zm7-9c-8-4-10-10-6-15 7 4 9 9 6 15Zm8-9c-6-4-7-9-4-13 6 3 8 8 4 13ZM24 41c9 4 16 1 17-5-8-4-15-2-17 5Zm8-9c8 4 14 1 15-5-7-3-13-2-15 5Zm7-9c7 3 12 0 12-5-6-2-10-1-12 5Z"/><path class="enamel-inlay" d="M44 16c0-7 5-11 10-9 1 6-3 10-10 9Z"/>',
  tide:'<path d="M6 55V27C6 14 14 6 27 6h28M13 45c11-1 7-23 21-25 10-1 15 6 14 13-7-6-13-3-12 2s5 5 8 3c-6 9-16 7-20 2M11 51c9 4 16-4 24-2M42 12l10 0"/><path class="enamel-inlay" d="M18 25c-5-6-3-12 2-16 4 7 3 12-2 16Z"/>',
  bridge:'<path d="M6 55V24C6 13 13 6 24 6h31M13 37h36M14 31c9-12 25-12 34 0M15 38v8h8c0-14 17-14 17 0h8v-8M20 27l4 9m7-13v13m12-9-4 9M12 52c10-4 18 4 28 0M15 13h17"/><path class="enamel-inlay" d="m42 12 3 4-3 4-3-4Z"/>',
  palm:'<path d="M6 55V30C6 14 14 6 30 6h25M16 51c8-10 11-20 11-29M26 23C14 12 8 18 9 25c7-3 11-3 17-2Zm1-2c-2-13 7-19 16-15-8 4-12 8-16 15Zm2 1c14-6 25 1 26 10-10-6-18-9-26-10M21 38l6 3m-10 6 6 3"/><path class="enamel-inlay" d="M33 29c-4 6-4 10 1 11 5-2 6-7-1-11Z"/>',
  fern:'<path d="M6 55V27C6 14 14 6 27 6h28M13 51c9-8 9-19 14-27 5-8 14-12 20-7 7 6 2 16-5 14-5-1-6-7-2-9M21 37C10 36 10 27 15 23c7 2 10 8 6 14Zm-4 11C7 47 7 39 11 35c7 2 11 7 6 13Zm9-15c10-3 17 2 14 8-7 2-12-1-14-8Z"/><circle class="enamel-inlay" cx="43" cy="24" r="2"/>',
  fruit:'<path d="M6 55V30C6 14 14 6 30 6h25M15 49c6-8 8-18 15-29M29 21l-1-8 6 3 6-4-1 8M34 21c-12-3-18 6-14 15 5 11 21 10 26-1 4-9-2-18-12-14ZM32 24c-3 5-3 11 0 16M17 35c-10-1-10-9-7-12 8 0 12 5 7 12Z"/><path class="enamel-inlay" d="M43 13c-1-7 6-10 12-7-2 6-6 8-12 7Z"/>',
  cypress:'<path d="M6 55V26C6 13 13 6 26 6h29M14 48l30-30M19 43C12 32 19 22 37 14c-2 18-6 27-18 29ZM22 35l10-5m-4-6 1 8M12 52l4-4"/><path class="enamel-inlay" d="M18 20c-2-6 3-11 9-10-1 6-4 10-9 10Z"/>',
  iris:'<path d="M6 54V30C6 15 15 6 30 6h24M14 49l24-24M18 44c-3-14 5-21 13-23-1 11-5 19-13 23ZM36 26c-11-1-15-8-10-14 8-2 14 4 10 14Zm1-1c-1-13 9-21 15-14 3 9-4 15-15 14Zm0 2c11-7 22-2 18 7-9 6-16 1-18-7Z"/><circle class="enamel-inlay" cx="37" cy="26" r="2.5"/>',
  ripple:'<path d="M6 55V34C6 15 15 6 34 6h21M13 48V35c0-14 8-22 22-22h13M20 45V34c0-9 5-14 14-14h11M11 55c8-4 12 4 20 0m8-43c4 8-4 12 0 20"/><path class="enamel-inlay" d="M31 35c-8-7-4-12 0-15 6 6 7 11 0 15Z"/>',
  lantern:'<path d="M6 55V20C6 11 11 6 20 6h35M15 10v10m-4 6 8-6 8 6-2 17-6 4-6-4-2-17ZM11 26h16m-13 15h10M34 12h17m-9 0v7m-4 6 4-6 4 6-1 9h-6l-1-9Z"/><path class="enamel-inlay" d="M19 29c-5 5-4 9 0 10 4-1 5-5 0-10Z"/>',
  canopy:'<path d="M6 55V31C6 15 15 6 31 6h24M13 51c4-20 17-29 38-38M22 37l-6-12m17 1 3-12M22 37c-11 0-14-8-8-13 7 0 11 6 8 13Zm10-10c1-12 9-15 15-8-3 8-8 10-15 8ZM37 15c-5-9 1-15 7-12 5 7 1 12-7 12Z"/><path class="enamel-inlay" d="M24 45c6-8 14-8 17-2-6 7-12 8-17 2Z"/>',
  radiance:'<path d="M6 57V26C6 14 14 6 26 6h31M12 51V28c0-9 7-16 16-16h23M19 46V31c0-7 5-12 12-12h15"/><path d="M18 18C33 14 42 22 39 33 29 35 20 29 18 18Zm0 0c-4 15 4 24 15 21 2-10-4-19-15-21Z"/><circle class="enamel-inlay" cx="13" cy="13" r="3"/>',
  vine:'<path d="M6 57V30C6 15 15 6 30 6h27M12 55V32c0-12 8-20 20-20h23M17 49C34 42 19 23 49 17"/><path d="M23 39c-11-2-13-10-7-15 10 1 12 9 7 15Zm11-13c0-10 8-15 15-10-1 10-8 14-15 10Z"/><circle class="enamel-inlay" cx="31" cy="32" r="2.5"/>',
  sprig:'<path d="M6 57V20A14 14 0 0 1 20 6h37M13 53c8-27 17-35 40-40"/><path d="M20 39C7 37 9 27 13 24c8 1 12 6 7 15Zm5-11c1-12 9-14 16-9-1 9-9 14-16 9Zm13-11c-7-7-2-14 3-14 7 4 5 10-3 14Z"/><path class="enamel-inlay" d="M17 48c3-6 11-7 12-2-1 6-8 8-12 2Z"/>',
  arch:'<path d="M6 57V19C6 12 12 6 19 6h38M12 52V23c0-6 5-11 11-11h29M19 47V29c0-6 4-10 10-10h18M26 43V32c0-3 3-6 6-6h11"/><path class="enamel-inlay" d="m36 32 5 5-5 5-5-5Z"/><path d="M8 48h7M48 8v7"/>',
  petal:'<path d="M6 57V37c0-8 4-13 10-16M57 6H37c-8 0-13 4-16 10M12 55V40c0-6 2-10 7-13M55 12H40c-6 0-10 2-13 7"/><path d="M25 15C13 2 4 15 15 25 2 38 16 47 25 35c11 13 24-1 10-10C49 14 35 2 25 15Z"/><circle class="enamel-inlay" cx="25" cy="25" r="4"/>',
  plain:'<path d="M6 57V6h51M13 51V13h38"/>'
};
export function nameFrame(id) {
  const f=frameFor(id),corner=svg(f.family?editionCorner(f):corners[f.motif],'corner');
  return `<div class="name-frame frame-${f.motif}" aria-hidden="true"><span class="frame-rule"></span>${['tl','tr','bl','br'].map(p=>`<span class="frame-corner corner-${p}">${corner}</span>`).join('')}</div>`;
}
