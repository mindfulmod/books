"""Rebuild the verbatim reading layer from the supplied PDF, without rewriting text.

Run with a Python runtime containing pdfplumber and pypdf. --check compares the
committed JSON and source glyphs against a fresh extraction instead of writing.
Whitespace and line wrapping may change; every printed non-whitespace character,
reference number, and inline honorific image is retained. Original typos remain.
"""
from pathlib import Path
from collections import defaultdict
import argparse, hashlib, json, re, logging

# The PDF has a known empty FontBBox on a fallback font. Glyph positions and
# character comparisons remain available; avoid repeating that warning per page.
logging.getLogger("pdfminer.pdffont").setLevel(logging.ERROR)
import pdfplumber
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
PDF = ROOT / 'public/assets/timeless-seeds/source.pdf'
OUT = ROOT / 'src/seeds/source-text.json'
AUDIT = ROOT / 'review/timeless-seeds/verbatim-audit.json'
ASSETS = ROOT / 'public/assets/timeless-seeds'
GLYPHS = {
 'cb0344f8df95': ('mercy', 'رحمه الله'),
 'aab05797339b': ('pleased', 'رضي الله عنه'),
 '7a67afdcd252': ('peace-him', 'عليه السلام'),
 '6764477ba59e': ('peace-her', 'عليها السلام'),
}


def nonspace(text):
 return re.sub(r'\s', '', text)


def merge_runs(runs):
 result=[]
 for run in runs:
  if isinstance(run,str) and result and isinstance(result[-1],str): result[-1]+=run
  else: result.append(run)
 # Only normalize whitespace. No spelling, punctuation or quote substitutions.
 for i,run in enumerate(result):
  if isinstance(run,str): result[i]=re.sub(r'\s+', ' ', run)
 if result and isinstance(result[0],str): result[0]=result[0].lstrip()
 if result and isinstance(result[-1],str): result[-1]=result[-1].rstrip()
 return [r for r in result if r!='']


def run_text(run):
 if isinstance(run,str): return run
 return str(run['note']) if 'note' in run else ''


def extract():
 reader=PdfReader(PDF)
 page_ids={p.indirect_reference.idnum:i+1 for i,p in enumerate(reader.pages)}
 assets={}; page_audit=[]
 with pdfplumber.open(PDF) as doc:
  def page_blocks(page_num):
   page=doc.pages[page_num-1]; raw=reader.pages[page_num-1]
   chars=page.chars; notes=[]; consumed=set(); extras=[]
   # Source endnote links are explicitly encoded in the PDF; don't guess digits.
   for ann in raw.get('/Annots',[]):
    ann=ann.get_object(); dest=ann.get('/Dest')
    if not isinstance(dest,list) or not hasattr(dest[0],'idnum'): continue
    target=page_ids.get(dest[0].idnum,0)
    if not 136<=target<=252 or page_num>=136: continue
    ref=target-135; x0,y0,x1,y1=map(float,ann['/Rect'])
    found=[i for i,c in enumerate(chars) if x0-.4<=(c['x0']+c['x1'])/2<=x1+.4 and y0-.4<=(c['y0']+c['y1'])/2<=y1+.4 and c['text'].strip()]
    assert ''.join(chars[i]['text'] for i in found)==str(ref),(page_num,ref,found)
    consumed.update(found); notes.append(ref)
    extras.append({'x0':x0,'x1':x1,'baseline':page.height-chars[found[0]]['matrix'][5], 'run':{'note':ref}, 'kind':'note'})
   # Group the ordinary glyphs by their actual baseline, including font changes.
   lines={}
   for i,c in enumerate(chars):
    if i in consumed: continue
    b=round(page.height-c['matrix'][5],1)
    lines.setdefault(b,[]).append({'x0':c['x0'],'x1':c['x1'],'run':c['text'],'size':c['size']})
   lines={b:items for b,items in lines.items() if any(str(it['run']).strip() for it in items)}
   for extra in extras:
    # Superscripts sit above their line; the closest following baseline is it.
    candidates=[b for b in lines if 0<b-extra['baseline']<22]
    assert candidates,(page_num,extra)
    lines[min(candidates,key=lambda b:b-extra['baseline'])].append(extra)
   image_names={}
   for im in raw.images:
    sha=hashlib.sha256(im.data).hexdigest()[:12]
    assert sha in GLYPHS,(page_num,sha)
    name,alt=GLYPHS[sha];filename=f'honorific-{name}.jpg'
    assets[filename]=im.data;image_names[im.name.rsplit('.',1)[0]]=(filename,alt)
   for im in page.images:
    filename,alt=image_names[im['name']]
    baseline=im['bottom']
    b=min(lines,key=lambda b:abs(b-baseline))
    assert abs(b-baseline)<4,(page_num,im)
    lines[b].append({'x0':im['x0'],'x1':im['x1'],'run':{'image':filename,'alt':alt,'width':round(im['width']/12.0094,3),'height':round(im['height']/12.0094,3)}})
   blocks=[]; previous=None; previous_heading=False; previous_right=0
   ordered=[]
   for baseline,items in sorted(lines.items()):
    items.sort(key=lambda it:it['x0'])
    runs=[];last=None
    for it in items:
     # Spaces between separate positioned runs can be absent from the text stream.
     if last is not None and it['x0']-last['x1']>1.6 and isinstance(it['run'],str) and not str(it['run']).isspace() and (not isinstance(last['run'],str) or not last['run'].endswith((' ','\n'))): runs.append(' ')
     runs.append(it['run']);last=it
    runs=merge_runs(runs)
    heading=any(it.get('size',0)>20.5 for it in items)
    line_note=any(isinstance(it['run'],dict) and 'note' in it['run'] for it in items)
    line_text=''.join(run_text(r) for r in runs)
    list_start=bool(re.match(r'^\d+[.)]\s',line_text))
    new_para=previous is None or heading or previous_heading or list_start or baseline-previous>(24 if line_note else 23)
    if new_para:blocks.append({'page':page_num,'kind':'heading' if heading else 'paragraph','runs':runs})
    else:
     last_text=''.join(run_text(r) for r in blocks[-1]['runs'])
     # Keep intentional short lines and verse lines, not print-width wrapping.
     separator = [{'break':True}] if previous_right<220 or page_num==124 else ([''] if last_text.endswith('-') else [' '])
     blocks[-1]['runs']=merge_runs(blocks[-1]['runs']+separator+runs)
    previous=baseline;previous_heading=heading;previous_right=max(it['x1'] for it in items)
    ordered.extend(runs)
   actual=nonspace(''.join(run_text(r) for r in ordered))
   # Compare against the PDF's own text paint order. Only superscripts are placed
   # with their lines; their source order is already the normal reading order.
   expected=nonspace(''.join(c['text'] for c in chars))
   assert actual==expected, f'Character preservation failed on PDF page {page_num}: {actual[:80]!r} != {expected[:80]!r}'
   assert sum(isinstance(r,dict) and 'image' in r for b in blocks for r in b['runs'])==len(page.images)
   page_audit.append({'page':page_num,'characters':len(expected),'sha256':hashlib.sha256(expected.encode()).hexdigest(),'images':len(page.images),'notes':notes})
   return blocks,notes
  # Each entry occupies whole PDF pages; the published page map is explicit.
  entries=[]
  for item in json.loads((ROOT/'src/seeds/source-pages.json').read_text()):
   blocks=[];notes=[]
   for pn in range(item['page'],item['lastPage']+1):
    b,n=page_blocks(pn);blocks.extend(b);notes.extend(n)
   entries.append({**item,'blocks':blocks,'notes':list(dict.fromkeys(notes))})
  notes=[]
  for ref in range(1,118):
   blocks,_=page_blocks(ref+135)
   notes.append({'id':ref,'page':ref+135,'blocks':blocks})
 covered={p['page'] for p in page_audit}
 blank_pages=sorted(set(range(7,253))-covered)
 for pn in blank_pages:
  assert not nonspace(reader.pages[pn-1].extract_text()), f'Uncovered non-empty source page {pn}'
 result={'edition':'2019','entries':entries,'notes':notes}
 audit={'sourceSha256':hashlib.sha256(PDF.read_bytes()).hexdigest(),'entries':111,'notes':117,'blankPages':blank_pages,'method':'PDF glyphs in reading order; unchanged punctuation, spelling, numbers and embedded honorific images. Only whitespace and line wrapping normalized.','pages':page_audit}
 return result,audit,assets


if __name__=='__main__':
 parser=argparse.ArgumentParser();parser.add_argument('--check',action='store_true');args=parser.parse_args()
 result,audit,assets=extract()
 outputs={OUT:json.dumps(result,ensure_ascii=False,indent=2)+'\n',AUDIT:json.dumps(audit,ensure_ascii=False,indent=2)+'\n'}
 if args.check:
  for path,value in outputs.items():assert path.read_text()==value,f'Source data differs: {path}'
  for name,data in assets.items():assert (ASSETS/name).read_bytes()==data,f'Glyph differs: {name}'
  print(f'PASS: all 111 entries, 117 notes, {len(audit["pages"])} pages, {sum(p["characters"] for p in audit["pages"]):,} non-whitespace characters and {sum(p["images"] for p in audit["pages"])} inline honorifics match the PDF.')
 else:
  for path,value in outputs.items():path.write_text(value)
  for name,data in assets.items():(ASSETS/name).write_bytes(data)
  print('Extracted all 111 entries and 117 endnotes without rewriting their text.')
