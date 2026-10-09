import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import postcss from 'postcss';
const html=fs.readFileSync('public/inner-dimensions-of-the-prayer.html','utf8');
const bootstrap=html.match(/<script id="prayer-theme-bootstrap">([\s\S]*?)<\/script>/)[1];
for(const preference of [null,'light','dark','invalid','toString']) for(const deviceDark of [false,true]) for(const blocked of [false,true]) {
 const meta={};const document={documentElement:{dataset:{},style:{}},querySelector:()=>meta};
 vm.runInNewContext(bootstrap,{document,localStorage:{getItem:()=>{if(blocked)throw new Error('Storage unavailable');return preference;}},matchMedia:()=>({matches:deviceDark})});
 const expected=!blocked&&['light','dark'].includes(preference)?preference:deviceDark?'dark':'light';
 assert.equal(document.documentElement.dataset.theme,expected);
 assert.equal(document.documentElement.style.colorScheme,expected);
 assert.equal(meta.content,expected==='dark'?'#181d1e':'#e8e4da');
}
const css=html.match(/<style id="production-reading-refinements">([\s\S]*?)<\/style>/)[1];
const palettes={light:{},dark:{}};
postcss.parse(css).walkRules(rule=>{
 if(rule.parent.type!=='root')return;
 const palette=rule.selector===':root,:root[data-theme=light]'?palettes.light:rule.selector===':root[data-theme=dark]'?palettes.dark:null;
 if(palette)rule.walkDecls(/^--/,declaration=>palette[declaration.prop.slice(2)]=declaration.value);
});
const luminance=hex=>{
 assert.match(hex,/^#[a-f\d]{6}$/i);
 return [1,3,5].map(index=>parseInt(hex.slice(index,index+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
};
let minimum=Infinity,count=0;
for(const [theme,palette] of Object.entries(palettes)) {
 const pairs=['publication-page','publication-backdrop','reader-soft','water-wash'].flatMap(surface=>['ink','ink-soft','muted','water','gold'].map(foreground=>[palette[foreground],palette[surface],`${foreground} on ${surface}`]));
 pairs.push([palette['reader-gold-ink'],palette['reader-gold-fill'],'gold action'],[theme==='dark'?'#243b31':palette['publication-page'],palette.water,'active depth']);
 for(const [fg,bg,label] of pairs){const [low,high]=[luminance(fg),luminance(bg)].sort((a,b)=>a-b);const ratio=(high+.05)/(low+.05);assert(ratio>=4.5,`${theme} ${label}: ${ratio.toFixed(2)}:1`);minimum=Math.min(minimum,ratio);count++;}
}
console.log(`Inner appearance passed: 40 first-paint scenarios including blocked storage; ${count} text contrast pairs, minimum ${minimum.toFixed(2)}:1.`);

// Teaching plates use their own opaque ink and paper in both appearance modes.
const diagramCss=html.match(/<style id="teaching-diagram-refinements">([\s\S]*?)<\/style>/)[1];
const diagramPalettes={light:{},dark:{}};
postcss.parse(diagramCss).walkRules(rule=>{
 const palette=rule.selector===':root'?diagramPalettes.light:rule.selector===':root[data-theme=dark]'?diagramPalettes.dark:null;
 if(palette)rule.walkDecls(/^--diagram-/,declaration=>palette[declaration.prop.slice(10)]=declaration.value);
});
let diagramPairs=0;
for(const [theme,palette] of Object.entries(diagramPalettes)) {
 for(const surface of ['paper','panel']) for(const foreground of ['ink','muted','blue']) {
  const [low,high]=[luminance(palette[foreground]),luminance(palette[surface])].sort((a,b)=>a-b);
  assert((high+.05)/(low+.05)>=4.5,`${theme} diagram ${foreground} on ${surface}`);
  diagramPairs++;
 }
}
console.log(`Teaching diagrams passed: ${diagramPairs} text and selection contrast pairs.`);
