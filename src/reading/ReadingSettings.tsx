import { ThemeButton, type ReadingTheme } from '../ReadingTheme';
import { ReaderDialog } from './ReaderDialog';
import { defaultPreferences, type ReadingPreferences } from './readingWorkspace';

export function ReadingSettings({ value, onChange, theme, onToggleTheme, onClose }: { value: ReadingPreferences; onChange: (value: ReadingPreferences) => void; theme: ReadingTheme; onToggleTheme: () => void; onClose: () => void }) {
  return <ReaderDialog title="Reading comfort" eyebrow="Make yourself at home" className="reading-settings-dialog" onClose={onClose}>
    <div className="reader-dialog-body">
      <div className="reading-settings-theme"><span>Daylight or lantern light</span><ThemeButton theme={theme} onToggle={onToggleTheme}/></div>
      <fieldset><legend>Text size</legend><div className="reading-setting-choices">{([18,21,24] as const).map((size,index)=><button key={size} aria-pressed={value.textSize===size} onClick={()=>onChange({...value,textSize:size})}><span style={{fontSize:size}}>Aa</span>{['Standard','Large','Extra large'][index]}</button>)}</div></fieldset>
      <fieldset><legend>Line spacing</legend><div className="reading-setting-choices">{(['normal','open'] as const).map(spacing=><button key={spacing} aria-pressed={value.spacing===spacing} onClick={()=>onChange({...value,spacing})}>{spacing==='normal'?'Comfortable':'More breathing room'}</button>)}</div></fieldset>
      <fieldset><legend>Reading width <small>On larger screens</small></legend><div className="reading-setting-choices">{(['balanced','focused'] as const).map(width=><button key={width} aria-pressed={value.width===width} onClick={()=>onChange({...value,width})}>{width==='balanced'?'Balanced page':'Narrow column'}</button>)}</div></fieldset>
      <div className="reading-settings-sample" style={{fontSize:value.textSize,lineHeight:value.spacing==='open'?2:1.8}}><span>Your reading preview</span><p>A little reading. A little reflection. Make room for the idea, then return to it in your own time.</p></div>
      <div className="reading-settings-footer"><p>Your preferences stay in this browser.</p><button onClick={()=>onChange({...defaultPreferences})}>Reset reading settings</button></div>
    </div>
  </ReaderDialog>;
}
