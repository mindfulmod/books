import { useId } from 'react';
import type { Entry } from './data';

// Hand-drawn scene illustrations for the poems. Each is a layered SVG landscape
// with a light paper grain, drawn for this companion. They are artistic settings
// for reading, not depictions of anyone in the poems.
export type SceneId = 'river' | 'lamp' | 'dawn' | 'garden' | 'crescent' | 'banyan' | 'storm';

export const sceneNames: Record<SceneId, string> = {
  river: 'Cranes over a moonlit river',
  lamp: 'An oil lamp in a doorway at night',
  dawn: 'Sunrise over mustard fields',
  garden: 'A rose garden under an arch',
  crescent: 'A thin crescent moon over rooftops',
  banyan: 'An old banyan tree at dusk',
  storm: 'A lamp burning in a storm',
};

const byId: Record<string, SceneId> = {
  '006-for-saeeda': 'banyan', '013-ajj-zulf': 'lamp', '014-everywhere-i-look': 'river', '022-the-lonely-crane': 'river',
  '026-every-breath': 'lamp', '030-i-am-the-sun': 'dawn', '032-something-different': 'garden', '033-it-looks-lovely': 'garden',
  '035-mansur-didnt-climb-for-nothing': 'crescent', '036-spring-came-at-a-price': 'garden', '043-thats-what-people-do': 'banyan',
  '046-light-a-lamp': 'storm', '048-who-will-bring-the-light': 'storm', '057-falcons-of-love': 'dawn', '059-your-days-will-pass-too': 'banyan',
  '080-saim-chishti-hajj': 'crescent', '106-farewell-for-hajj': 'crescent', '109-a-wish-on-eid': 'crescent', '098-mukhammas': 'crescent',
  '107-confession': 'crescent', '085-mother': 'garden', '087-seasons-change': 'banyan', '015-ishq': 'lamp', '009-mansurs-on-eyelashes': 'river',
  '011-spring-has-come': 'garden', '029-its-not-good': 'garden', '091-effort': 'dawn', '093-knowledge': 'dawn', '067-allama-iqbal': 'dawn', '099-poet-iqbal': 'dawn',
  '071-waris-shah': 'river', '065-urdu-ghazal': 'lamp', '101-portrait': 'lamp', '100-chaumisra-lamp-of-hope': 'storm',
};

export function sceneFor(entry: Pick<Entry, 'id' | 'themes' | 'lenses'>): SceneId {
  if (byId[entry.id]) return byId[entry.id];
  const t = new Set(entry.themes), l = new Set(entry.lenses);
  if (l.has('prophet') || t.has('devotion')) return 'crescent';
  if (t.has('elegy') || t.has('tribute') || t.has('family')) return 'banyan';
  if (t.has('homeland')) return 'dawn';
  if (t.has('society') && !t.has('sufi')) return 'storm';
  if (l.has('awake')) return 'dawn';
  if (l.has('passing')) return 'banyan';
  if (l.has('longing')) return 'river';
  return 'lamp';
}

function Grain({ id }: { id: string }) {
  return <filter id={id} x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 .5  0 0 0 0 .4  0 0 0 0 .3  0 0 0 .35 0"/>
    <feComposite in2="SourceGraphic" operator="in"/>
  </filter>;
}

function Stars({ seed = 1, count = 40, maxY = 220 }: { seed?: number; count?: number; maxY?: number }) {
  let s = seed * 9301;
  const rand = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  return <g fill="#fff6dc">{Array.from({ length: count }, (_, i) => <circle key={i} cx={rand() * 800} cy={rand() * maxY} r={rand() * 1.4 + .3} opacity={rand() * .6 + .3}/>)}</g>;
}

function Crane({ x, y, s = 1, flip = false }: { x: number; y: number; s?: number; flip?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} fill="none" stroke="#1d1a2c" strokeWidth={2.2 / s} strokeLinecap="round">
    <path d="M-22 4 Q-10 -10 0 0 Q10 -10 22 4"/><path d="M0 0 L14 2"/>
  </g>;
}

export default function Scene({ scene, className = '', label = true, lite = false }: { scene: SceneId; className?: string; label?: boolean; lite?: boolean }) {
  const u = 'z' + useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const g = (n: string) => `${u}-${n}`;
  const url = (n: string) => `url(#${g(n)})`;
  const common = lite ? null : <Grain id={g('grain')}/>;
  const finish = lite ? null : <rect width="800" height="450" filter={url('grain')} opacity=".22" style={{ mixBlendMode: 'multiply' }}/>;
  const props = { viewBox: '0 0 800 450', preserveAspectRatio: 'xMidYMid slice', className: `zulf-scene-art ${className}`, role: label ? 'img' : undefined, 'aria-label': label ? sceneNames[scene] : undefined, 'aria-hidden': label ? undefined : true } as const;

  if (scene === 'river') return <svg {...props}>
    <defs>{common}
      <linearGradient id={g('sky')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1c1838"/><stop offset=".6" stopColor="#3b3466"/><stop offset="1" stopColor="#7a5d8c"/></linearGradient>
      <linearGradient id={g('water')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4a3f72"/><stop offset="1" stopColor="#1a1630"/></linearGradient>
      <radialGradient id={g('glow')} cx="68%" cy="26%" r="40%"><stop offset="0" stopColor="#f6dca0" stopOpacity=".55"/><stop offset="1" stopColor="#f6dca0" stopOpacity="0"/></radialGradient>
    </defs>
    <rect width="800" height="450" fill={url('sky')}/><rect width="800" height="450" fill={url('glow')}/>
    <Stars seed={3} count={50} maxY={230}/>
    <circle cx="545" cy="112" r="38" fill="#f8e7bd"/><circle cx="560" cy="104" r="34" fill="#2d2752" opacity=".0"/>
    <path d="M0 268 C120 238 220 250 320 236 C430 222 520 246 640 232 C720 224 770 236 800 232 V300 H0Z" fill="#2a2348"/>
    <path d="M0 286 C150 270 300 284 420 276 C560 268 680 282 800 274 V310 H0Z" fill="#221c3c"/>
    <rect y="300" width="800" height="150" fill={url('water')}/>
    <g opacity=".7" stroke="#f8e7bd" strokeLinecap="round">{[0, 1, 2, 3, 4, 5, 6].map(i => <path key={i} d={`M${505 + (i % 2) * 14} ${318 + i * 16} h${70 - i * 6}`} strokeWidth={3 - i * .3} opacity={1 - i * .12}/>)}</g>
    <path d="M0 410 C140 392 260 420 400 404 C540 388 660 416 800 400 V450 H0Z" fill="#14112a"/>
    <g fill="#14112a">{[60, 90, 112, 690, 720, 748].map((x, i) => <path key={i} d={`M${x} 410 q4 -${40 + (i % 3) * 12} 8 0z`}/>)}</g>
    <Crane x={250} y={150} s={1.2}/><Crane x={300} y={128} s={.9}/><Crane x={338} y={168} s={1}/><Crane x={150} y={190} s={.75} flip/>
    {finish}
  </svg>;

  if (scene === 'lamp') return <svg {...props}>
    <defs>{common}
      <linearGradient id={g('wall')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2a1f33"/><stop offset="1" stopColor="#40283a"/></linearGradient>
      <linearGradient id={g('night')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#141230"/><stop offset="1" stopColor="#36305e"/></linearGradient>
      <radialGradient id={g('halo')} cx="50%" cy="66%" r="34%"><stop offset="0" stopColor="#ffd27a" stopOpacity=".75"/><stop offset=".5" stopColor="#e88a3c" stopOpacity=".2"/><stop offset="1" stopColor="#e88a3c" stopOpacity="0"/></radialGradient>
      <linearGradient id={g('flame')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff6d0"/><stop offset=".5" stopColor="#f8c45a"/><stop offset="1" stopColor="#e2722c"/></linearGradient>
    </defs>
    <rect width="800" height="450" fill={url('wall')}/>
    <path d="M280 450 V170 Q280 70 400 70 Q520 70 520 170 V450Z" fill={url('night')}/>
    <Stars seed={7} count={26} maxY={240}/>
    <path d="M280 450 V170 Q280 70 400 70 Q520 70 520 170 V450" fill="none" stroke="#5a3a44" strokeWidth="18"/>
    <path d="M462 128a26 26 0 1 0 18 40 22 22 0 1 1-18-40z" fill="#f5dc9a"/>
    <rect width="800" height="450" fill={url('halo')}/>
    <rect y="350" width="800" height="100" fill="#2b1c27"/>
    <path d="M330 350 c14 -8 34 -11 50 -11 h40 c16 0 36 3 50 11 c5 3 5 8 0 11 -20 24 -50 32 -70 32 s-50 -8 -70 -32 c-5 -3 -5 -8 0 -11z" fill="#b5553a"/>
    <path d="M330 350 c14 -8 34 -11 50 -11 h40 c16 0 36 3 50 11 -16 7 -46 11 -70 11 s-54 -4 -70 -11z" fill="#dc8a5c"/>
    <path d="M400 278 c-16 24 -19 41 -10 55 4 7 15 7 20 0 9 -14 6 -31 -10 -55z" fill={url('flame')}/>
    <path d="M400 306 c-5 9 -6 16 -2 21 1.5 2 3 2 4 0 4 -5 3 -12 -2 -21z" fill="#fffbe8"/>
    <g transform="translate(452 260) rotate(-16)" fill="#efe3cc"><path d="M0 0 c-12 -14 -28 -16 -31 -6 -2 8 11 12 31 6z"/><path d="M0 0 c12 -14 28 -16 31 -6 2 8 -11 12 -31 6z"/><ellipse cy="2" rx="2.4" ry="7" fill="#5e4234"/></g>
    {finish}
  </svg>;

  if (scene === 'dawn') return <svg {...props}>
    <defs>{common}
      <linearGradient id={g('sky')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7b8fc0"/><stop offset=".45" stopColor="#f2b38a"/><stop offset=".75" stopColor="#f8d79a"/></linearGradient>
      <radialGradient id={g('sun')} cx="50%" cy="58%" r="40%"><stop offset="0" stopColor="#fff2c6"/><stop offset=".25" stopColor="#ffd98a" stopOpacity=".7"/><stop offset="1" stopColor="#ffd98a" stopOpacity="0"/></radialGradient>
    </defs>
    <rect width="800" height="450" fill={url('sky')}/><rect width="800" height="450" fill={url('sun')}/>
    <circle cx="400" cy="262" r="44" fill="#fff1c4"/>
    <g fill="#fff4e0" opacity=".7"><ellipse cx="170" cy="120" rx="90" ry="14"/><ellipse cx="640" cy="96" rx="110" ry="12"/><ellipse cx="560" cy="150" rx="60" ry="8"/></g>
    <path d="M0 270 C140 250 260 262 400 256 C540 250 660 262 800 252 V300 H0Z" fill="#9c8fa8"/>
    <path d="M0 292 C160 276 300 292 460 284 C600 278 700 290 800 282 V330 H0Z" fill="#7d8a5a"/>
    <path d="M0 318 C200 300 420 330 800 306 V450 H0Z" fill="#e2b938"/>
    <path d="M0 360 C220 340 460 372 800 346 V450 H0Z" fill="#d4a62a"/>
    <g stroke="#9b7a1c" strokeWidth="1.4" opacity=".55">{Array.from({ length: 40 }, (_, i) => <path key={i} d={`M${i * 21} 450 L${i * 21 + 6} ${376 + (i % 4) * 8}`}/>)}</g>
    <path d="M0 410 C200 396 520 420 800 400 V450 H0Z" fill="#b78a1e"/>
    <g fill="#4a5a33"><path d="M120 300 q-4 -38 4 -60 q10 26 4 60z"/><circle cx="124" cy="236" r="18"/><circle cx="660" cy="262" r="22"/><path d="M656 300 q-2 -30 4 -40 q6 18 4 40z"/></g>
    <Crane x={300} y={150} s={.8}/><Crane x={334} y={138} s={.65}/>
    {finish}
  </svg>;

  if (scene === 'garden') return <svg {...props}>
    <defs>{common}
      <linearGradient id={g('sky')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f3d9c4"/><stop offset="1" stopColor="#f6e9d6"/></linearGradient>
      <linearGradient id={g('arch')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e9dcc7"/><stop offset="1" stopColor="#d8c4a6"/></linearGradient>
      <radialGradient id={g('light')} cx="50%" cy="40%" r="45%"><stop offset="0" stopColor="#fff8e6"/><stop offset="1" stopColor="#fff8e6" stopOpacity="0"/></radialGradient>
    </defs>
    <rect width="800" height="450" fill={url('sky')}/><rect width="800" height="450" fill={url('light')}/>
    <path d="M0 0 H800 V450 H560 V200 Q560 80 400 64 Q240 80 240 200 V450 H0Z" fill={url('arch')}/>
    <path d="M240 450 V200 Q240 80 400 64 Q560 80 560 200 V450" fill="none" stroke="#c3a682" strokeWidth="10"/>
    <path d="M262 450 V206 Q262 100 400 86 Q538 100 538 206 V450" fill="none" stroke="#b08a63" strokeWidth="2" opacity=".6"/>
    <path d="M262 330 C330 310 470 316 538 330 V450 H262Z" fill="#a9b98a"/>
    <path d="M262 370 C340 352 460 360 538 372 V450 H262Z" fill="#7f9a64"/>
    <path d="M330 450 L382 300 H418 L470 450Z" fill="#e8d7b6"/>
    {[[90, 300], [150, 340], [60, 380], [700, 310], [650, 360], [740, 390], [300, 360], [500, 362]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`}>
      <path d="M0 0 q-2 30 2 60" stroke="#5b7a46" strokeWidth="3" fill="none"/><ellipse cx="-10" cy="22" rx="10" ry="5" fill="#6d8f52" transform="rotate(-30 -10 22)"/><ellipse cx="10" cy="34" rx="10" ry="5" fill="#6d8f52" transform="rotate(30 10 34)"/>
      <circle r="14" fill="#c4445a"/><circle r="9" fill="#d95c6e"/><circle r="4" fill="#e9808e"/></g>)}
    <g fill="none" stroke="#c4445a" strokeWidth="2" opacity=".35" strokeLinecap="round"><path d="M360 270 c20 -20 -10 -40 10 -60 s-10 -40 10 -60"/><path d="M430 280 c20 -20 -10 -40 10 -60 s-10 -40 10 -56"/></g>
    <g fill="#c4445a" opacity=".55"><ellipse cx="380" cy="160" rx="4" ry="2.4" transform="rotate(30 380 160)"/><ellipse cx="452" cy="200" rx="4" ry="2.4" transform="rotate(-20 452 200)"/><ellipse cx="410" cy="130" rx="3.6" ry="2.2"/></g>
    {finish}
  </svg>;

  if (scene === 'crescent') return <svg {...props}>
    <defs>{common}
      <linearGradient id={g('sky')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#21345a"/><stop offset=".55" stopColor="#5a5a8a"/><stop offset=".85" stopColor="#d9927a"/><stop offset="1" stopColor="#f0b98a"/></linearGradient>
    </defs>
    <rect width="800" height="450" fill={url('sky')}/>
    <Stars seed={11} count={34} maxY={200}/>
    <path d="M560 70a40 40 0 1 0 34 64 34 34 0 1 1-34-64z" fill="#fbe9b8"/>
    <g fill="#2a2440">
      <path d="M0 450 V330 h70 v-24 h60 v40 h50 v-60 h80 v70 h40 v-36 h70 V450Z"/>
      <path d="M370 450 V300 q0 -60 60 -84 q60 24 60 84 V450Z"/><rect x="424" y="196" width="12" height="22"/><path d="M430 176 l6 20 h-12z"/>
      <rect x="480" y="330" width="100" height="120"/><rect x="520" y="226" width="22" height="224"/><path d="M516 226 h30 l-15 -40z"/><rect x="512" y="270" width="38" height="8"/>
      <path d="M560 450 V320 h60 v-30 h70 v50 h50 v-30 h60 V450Z"/>
    </g>
    <g fill="#f4c46a">{[[90, 360], [210, 330], [250, 330], [600, 340], [650, 312], [700, 360], [410, 330], [446, 330]].map(([x, y], i) => <rect key={i} x={x} y={y} width="10" height="14" rx="5"/>)}</g>
    {finish}
  </svg>;

  if (scene === 'banyan') return <svg {...props}>
    <defs>{common}
      <linearGradient id={g('sky')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5d4f7a"/><stop offset=".55" stopColor="#d28a76"/><stop offset="1" stopColor="#f4c99a"/></linearGradient>
    </defs>
    <rect width="800" height="450" fill={url('sky')}/>
    <circle cx="610" cy="300" r="36" fill="#fbe0b0" opacity=".9"/>
    <path d="M0 330 C200 316 420 336 800 318 V450 H0Z" fill="#7a5a5c"/>
    <path d="M0 370 C240 352 520 380 800 360 V450 H0Z" fill="#4b3646"/>
    <g fill="#3a2a3a">
      <path d="M330 372 C334 320 320 270 300 240 L320 236 C342 264 350 300 352 330 C356 296 372 262 398 240 L414 252 C390 276 378 320 380 372Z"/>
      {[250, 280, 430, 460, 300, 410].map((x, i) => <rect key={i} x={x} y={250 + (i % 3) * 10} width="3" height={110 - (i % 3) * 10}/>)}
      <ellipse cx="350" cy="200" rx="190" ry="70"/><ellipse cx="250" cy="226" rx="90" ry="44"/><ellipse cx="460" cy="222" rx="100" ry="46"/><ellipse cx="350" cy="150" rx="120" ry="50"/>
    </g>
    <g fill="#3a2a3a">{[[580, 180], [608, 160], [640, 186], [672, 150]].map(([x, y], i) => <path key={i} d={`M${x - 8} ${y} q8 -6 8 0 q0 -6 8 0`} stroke="#3a2a3a" strokeWidth="2" fill="none"/>)}</g>
    {finish}
  </svg>;

  // storm
  return <svg {...props}>
    <defs>{common}
      <linearGradient id={g('sky')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#262b3c"/><stop offset="1" stopColor="#4a4d62"/></linearGradient>
      <radialGradient id={g('halo')} cx="62%" cy="70%" r="26%"><stop offset="0" stopColor="#ffd27a" stopOpacity=".7"/><stop offset="1" stopColor="#ffd27a" stopOpacity="0"/></radialGradient>
    </defs>
    <rect width="800" height="450" fill={url('sky')}/>
    <g fill="#5a5d74" opacity=".8"><ellipse cx="160" cy="90" rx="200" ry="50"/><ellipse cx="560" cy="70" rx="260" ry="56"/><ellipse cx="380" cy="130" rx="180" ry="36"/></g>
    <g stroke="#9aa3c2" strokeWidth="1.4" opacity=".35">{Array.from({ length: 60 }, (_, i) => <path key={i} d={`M${(i * 53) % 800} ${(i * 37) % 300 + 60} l-10 26`}/>)}</g>
    <path d="M0 360 C200 340 440 370 800 346 V450 H0Z" fill="#23222e"/>
    <g fill="#1a1922"><rect x="120" y="270" width="140" height="100"/><path d="M110 270 l80 -50 80 50z"/><rect x="560" y="290" width="150" height="80"/></g>
    <rect width="800" height="450" fill={url('halo')}/>
    <rect x="482" y="300" width="28" height="22" rx="4" fill="#ffcf73"/><rect x="590" y="312" width="22" height="18" rx="3" fill="#ffcf73" opacity=".85"/>
    <g transform="translate(496 280)"><path d="M0 -26 c-8 12 -9 20 -5 27 2 3 8 3 10 0 4 -7 3 -15 -5 -27z" fill="#f8c45a"/><rect x="-10" y="2" width="20" height="8" rx="3" fill="#b5553a"/></g>
    {finish}
  </svg>;
}
