import { assetUrl } from '../assetUrl';
import { illustrationPath, scenePath, type Appearance } from './appearanceState';
import { seedIllustrations } from './illustrations';
import type { Seed } from './content';

// A portrait card (4:5) that reads well in messages and stories: the seed's
// painting, its one-line takeaway, and the title.
const WIDTH = 1080;
const HEIGHT = 1350;
const ART_HEIGHT = 720;
const palettes = {
  day: { paper: '#fffaf0', ink: '#2f4a44', muted: '#64685e', accent: '#28665e', rule: '#e4d6c0' },
  starlight: { paper: '#2c334b', ink: '#f3eadc', muted: '#c5c3d3', accent: '#efce9f', rule: '#4b4d68' },
};

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function wrap(context: CanvasRenderingContext2D, text: string, width: number) {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(' ')) {
    const next = line ? `${line} ${word}` : word;
    if (context.measureText(next).width > width && line) { lines.push(line); line = word; }
    else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

export async function seedCard(seed: Seed, scene: string, appearance: Appearance): Promise<Blob> {
  const colors = palettes[appearance];
  const frame = seedIllustrations[seed.id]?.[0];
  const art = frame ? illustrationPath(appearance === 'starlight' ? frame.starlight : frame.day, 1440) : scenePath(scene, 1440, appearance);
  const [image] = await Promise.all([
    loadImage(assetUrl(art)),
    document.fonts.load('400 64px "Instrument Serif"'),
    document.fonts.load('500 28px "DM Sans"'),
  ]);
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const context = canvas.getContext('2d')!;
  context.fillStyle = colors.paper;
  context.fillRect(0, 0, WIDTH, HEIGHT);

  // Painting, cropped to fill the top of the card.
  const scale = Math.max(WIDTH / image.naturalWidth, ART_HEIGHT / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  context.drawImage(image, (WIDTH - drawWidth) / 2, (ART_HEIGHT - drawHeight) / 2, drawWidth, drawHeight);

  const margin = 84;
  context.textBaseline = 'alphabetic';
  context.fillStyle = colors.accent;
  context.font = '500 26px "DM Sans", sans-serif';
  context.letterSpacing = '4px';
  context.fillText('TIMELESS SEEDS', margin, ART_HEIGHT + 86);
  context.letterSpacing = '0px';

  // The takeaway, shrinking a little if it needs more room.
  let size = 66;
  let lines: string[] = [];
  do {
    context.font = `400 ${size}px "Instrument Serif", Georgia, serif`;
    lines = wrap(context, seed.takeaway, WIDTH - margin * 2);
    size -= 4;
  } while (lines.length > 4 && size > 44);
  context.fillStyle = colors.ink;
  const lineHeight = (size + 4) * 1.14;
  lines.forEach((line, i) => context.fillText(line, margin, ART_HEIGHT + 170 + i * lineHeight));

  context.fillStyle = colors.rule;
  context.fillRect(margin, HEIGHT - 150, WIDTH - margin * 2, 2);
  context.fillStyle = colors.muted;
  context.font = '400 28px "DM Sans", sans-serif';
  const title = wrap(context, `Seed ${seed.id} · ${seed.title}`, WIDTH - margin * 2)[0];
  context.fillText(title, margin, HEIGHT - 92);

  return new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Could not draw the card')), 'image/jpeg', 0.9));
}

// Share the card through the device's share sheet where it accepts images,
// fall back to sharing the link, and finally to saving the picture.
export async function shareSeed(seed: Seed, scene: string, appearance: Appearance, url: string): Promise<'shared' | 'saved' | 'cancelled'> {
  const text = `${seed.takeaway}\n\n${seed.title} · Timeless Seeds`;
  const blob = await seedCard(seed, scene, appearance);
  const file = new File([blob], `timeless-seed-${seed.id}.jpg`, { type: 'image/jpeg' });
  try {
    if (navigator.canShare?.({ files: [file] })) { await navigator.share({ files: [file], title: seed.title, text: `${text}\n${url}` }); return 'shared'; }
  } catch (error) { if ((error as Error).name === 'AbortError') return 'cancelled'; }
  const link = document.createElement('a');
  const objectUrl = URL.createObjectURL(blob);
  link.href = objectUrl;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  return 'saved';
}
