import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const css=readFileSync(new URL('./courtyard.css',import.meta.url),'utf8');
function luminance(hex){
  const channels=hex.match(/[a-f\d]{2}/gi).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
  return channels.reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
}
function contrast(a,b){const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}

test('text tokens meet 4.5:1 on every paper surface in all eight theme/palette combinations',()=>{
  let count=0;
  for(const match of css.matchAll(/(body\[data-(?:theme|palette)[^{}]+)\{([^}]+)\}/g)){
    const colors=Object.fromEntries([...match[2].matchAll(/--([\w-]+):\s*(#[\da-f]{6})(?=\s*[;}])/gi)].map(m=>[m[1],m[2]]));
    if(!colors.paper)continue;count++;
    for(const fg of ['ink','muted','gold'])for(const bg of ['paper','paper-alt','soft']){
      assert.ok(contrast(colors[fg],colors[bg])>=4.5,`${match[1]} ${fg} on ${bg}: ${contrast(colors[fg],colors[bg])}`);
    }
    assert.ok(contrast(colors['button-ink'],colors.button)>=4.5);
  }
  assert.equal(count,8);
});
