"""Dependency-free preservation and delivery checks for the standalone companion."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import hashlib, json, re, subprocess, sys

ROOT = Path(__file__).resolve().parents[1]
class Element:
    def __init__(self, tag, attrs=()):
        self.tag, self.attrs, self.children = tag, dict(attrs), []
    def text(self):
        return ''.join(child if isinstance(child, str) else child.text() for child in self.children)
    def has_class(self, name):
        return name in (self.attrs.get('class') or '').split()
class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.root = Element('document'); self.stack = [self.root]; self.elements = []
        self.feed(source)
    def handle_starttag(self, tag, attrs):
        node = Element(tag, attrs); self.stack[-1].children.append(node); self.elements.append(node)
        if tag not in {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}: self.stack.append(node)
    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if self.stack[-1].tag == tag: self.stack.pop()
    def handle_endtag(self, tag):
        for index in range(len(self.stack)-1, 0, -1):
            if self.stack[index].tag == tag:
                del self.stack[index:]; break
    def handle_data(self, data): self.stack[-1].children.append(data)

source = (ROOT/'public/inner-dimensions-of-the-prayer.html').read_text()
page = Page(source)
def digest(items):
    return hashlib.sha256(json.dumps(items,ensure_ascii=False,separators=(',',':')).encode()).hexdigest()
protected = {}
for name, items in {
    'complete_reading_text':[el.text() for el in page.elements if el.tag=='main'],
    'english_passages':[el.text() for el in page.elements if el.has_class('reading-prose')],
    'arabic_originals':[el.text() for el in page.elements if el.has_class('arabic-original')],
    'quran_verses_and_notes':[el.text() for el in page.elements if el.has_class('quran-verse')],
    'hadith_responses':[el.text() for el in page.elements if el.has_class('hadith-response')],
}.items(): protected[name] = {'count':len(items),'sha256':digest(items)}
fixture = ROOT/'scripts/fixtures/inner-dimensions-content.json'
if '--record-baseline' in sys.argv:
    fixture.write_text(json.dumps(protected,indent=2)+'\n'); print('Recorded the reviewed content baseline.'); sys.exit()
assert protected == json.loads(fixture.read_text()), 'Authored prose or quoted text changed; review the content before changing the preservation baseline.'
ids = [el.attrs['id'] for el in page.elements if el.attrs.get('id')]
assert len(ids)==len(set(ids)), 'Duplicate HTML IDs'
for node in page.elements:
    href = node.attrs.get('href','')
    if href.startswith('#'): assert unquote(href[1:]) in ids, f'Broken anchor: {href}'
    for attr in ['aria-controls','aria-labelledby','aria-describedby']:
        for ref in (node.attrs.get(attr) or '').split(): assert ref in ids, f'Missing {attr}: {ref}'
    for attr in ['src','href']:
        value = node.attrs.get(attr,'')
        if value.startswith('assets/'):
            assert (ROOT/'public'/unquote(urlsplit(value).path)).is_file(), f'Missing asset: {value}'
for number in range(1,60): assert f'passage-{number}' in ids
assert len([n for n in page.elements if n.attrs.get('data-movement') is not None])==14
assert len({n.attrs['data-verse'] for n in page.elements if n.attrs.get('data-verse')})==49
for script in [n for n in page.elements if n.tag=='script' and not n.attrs.get('src')]:
    result=subprocess.run(['node','--check'],input=script.text(),text=True,capture_output=True)
    assert result.returncode==0,result.stderr
# Local delivery/export copies are optional outside this workspace. When present,
# keep them in sync so an older export cannot silently omit later reading aids.
standalone = ROOT.parent/'inner-dimensions-of-the-prayer.html'
if standalone.exists(): assert standalone.read_text() == source, 'Standalone Prayer delivery is out of sync.'
artifact = ROOT.parent/'artifact-inner-dimensions.html'
if artifact.exists():
    fragment = re.sub(r'<!DOCTYPE html>\s*|<html[^>]*>\s*|</html>\s*|<head>\s*|</head>\s*|<body[^>]*>\s*|</body>\s*', '', source, flags=re.I)
    assert artifact.read_text() == fragment, 'Prayer export is out of sync with the canonical reader.'
print('Inner Dimensions passed: complete reading text preserved, 59 English passages, 59 Arabic originals, 49 verses in 111 panels, 14 movements, anchors, assets and script syntax.')
