import { collectionTwo, collectionThree, collectionFour } from './art-collection.js';
import {newScenes,visualIdentities} from './full-edition-visuals.js';
// Original garden scenes, not literal representations of divine attributes.
// Each sprite holds a matching daylight panorama above a night panorama.
const earlierArt = {
  ...Object.fromEntries(collectionFour.map(a=>[a.id,a])),
  ...Object.fromEntries(collectionTwo.map(a=>[a.id,a])),
  ...Object.fromEntries(collectionThree.map(a=>[a.id,a])),
  'ar-rahman': {title:'The open garden', file:'ar-rahman-v1.webp', description:'An open reflecting pool, olive canopy and a river stretching toward layered blue mountains.'},
  'ar-rahim': {title:'The sheltered courtyard', file:'ar-rahim-v1.webp', description:'A sheltered sandstone courtyard with an octagonal fountain, jasmine and a stone bench.'},
  'al-latif': {title:'The quiet branch', focus:100, file:'al-latif-v1.webp', description:'A fine flowering branch above a water channel, with fallen petals and a garden path beyond.'},
  'al-ghafur': {title:'The open doorway', focus:30, file:'al-ghafur-v1.webp', description:'An open wooden door beneath a jasmine-covered stone arch, with a path leading into the garden.'},
  'al-wadud': {title:'The flowering terrace', focus:790, file:'al-wadud-v1.webp', description:'Coral roses around a sandstone terrace, a quiet pool and a view of the blue hills.'},
};
export const chapterArt={...earlierArt,...Object.fromEntries(Object.entries(visualIdentities).map(([id,v])=>[id,{...(newScenes[v.scene]||earlierArt[v.scene]),sharedScene:v.scene}]))};

// Sparse botanical endings complement the illustrated openings.
export const endingArt = {
  'al-quddus': {file:'iris-ending-v2.webp'},
  'as-salam': {file:'lily-ending-v2.webp'}
};
