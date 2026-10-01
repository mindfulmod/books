"""Export reviewed image masters and publish complete seed illustration records.

This script never generates or modifies painting content. Generation uses image_gen.
"""
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / 'artwork/timeless-seeds/seed-illustrations'
OUT = ROOT / 'public/assets/timeless-seeds/illustrations'
REVIEW = ROOT / 'review/timeless-seeds/seed-illustrations'


def sync():
    records = [json.loads(p.read_text()) for p in sorted((ART / 'records').glob('*.json'))]
    reviewed = {r['key']: r for r in records if r.get('review') == 'approved'}
    entries = {}
    exports = []
    for record in reviewed.values():
        master = ART / f"{record['key']}.png"
        im = Image.open(master).convert('RGB')
        if im.width * 2 != im.height * 3:
            raise ValueError(f'Expected 3:2 painting, got {im.size}: {master}')
        for width in [480, 960, 1440]:
            target = OUT / f"{record['key']}-{width}.webp"
            if not target.exists() or master.stat().st_mtime > target.stat().st_mtime:
                im.resize((width, width * 2 // 3), Image.Resampling.LANCZOS).save(target, 'WEBP', quality=80, method=6)
            exports.append({'file': str(target.relative_to(ROOT)), 'width': width, 'bytes': target.stat().st_size})
    queue = json.loads((ART / 'production-queue.json').read_text())['queue']
    for row in queue:
        day = reviewed.get(row['dayKey'])
        if not day:
            continue
        if row['policy'] == 'paired':
            night = reviewed.get(row['dayKey'] + '-starlight')
            if not night:
                continue
            frames = [{
                'day': f"assets/timeless-seeds/illustrations/{day['key']}",
                'starlight': f"assets/timeless-seeds/illustrations/{night['key']}",
                'alt': day['alt'], 'nightAlt': night['alt'], 'caption': row['caption'],
            }]
        elif row['policy'] == 'shared-source-light':
            frames = [{
                'day': f"assets/timeless-seeds/illustrations/{day['key']}",
                'starlight': f"assets/timeless-seeds/illustrations/{day['key']}",
                'alt': day['alt'], 'caption': row['caption'],
            }]
        else:
            sequence = [reviewed.get(key) for key in row['sequenceKeys']]
            if not all(sequence):
                continue
            frames = [{
                'day': f"assets/timeless-seeds/illustrations/{frame['key']}",
                'starlight': f"assets/timeless-seeds/illustrations/{frame['key']}",
                'alt': frame['alt'], 'caption': row['caption'], 'label': label,
            } for frame, label in zip(sequence, row['sequenceLabels'])]
        entries[str(row['seed'])] = frames
    (ROOT / 'src/seeds/illustrations-generated.json').write_text(json.dumps(entries, ensure_ascii=False, indent=2) + '\n')
    (REVIEW / 'remaining-exports.json').write_text(json.dumps(exports, indent=2) + '\n')
    remaining = [row['seed'] for row in queue if str(row['seed']) not in entries]
    status = {'illustratedSeeds': 6 + len(entries), 'totalSeeds': 111, 'remaining': remaining,
              'reviewedNewMasters': len(reviewed), 'generatedNewMasters': len(records)}
    (REVIEW / 'production-status.json').write_text(json.dumps(status, indent=2) + '\n')
    print(json.dumps(status))


if __name__ == '__main__':
    sync()
