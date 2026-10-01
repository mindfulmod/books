import generatedIllustrations from './illustrations-generated.json';

export type IllustrationFrame = {
  day: string;
  starlight: string;
  alt: string;
  nightAlt?: string;
  caption: string;
  label?: string;
};

const seedAsset = (name: string) => `assets/timeless-seeds/illustrations/${name}`;
const sceneAsset = (name: string, night = false) => `assets/timeless-seeds/coastal/${night ? 'starlight/' : ''}${name}`;

// Only reviewed, exported artwork belongs here. Unillustrated seeds render no placeholder.
export const seedIllustrations: Partial<Record<number, IllustrationFrame[]>> = {
  ...generatedIllustrations,
  1: [{
    day: seedAsset('seed-001'), starlight: seedAsset('seed-001-starlight'),
    alt: 'A watchful brown dog stands behind a wooden garden gate, with a shepherd’s crook leaning against the near post and a sunny bay beyond.',
    nightAlt: 'The same dog, wooden gate and shepherd’s crook in warm light, with a starry blue sky and pink clouds above the bay.',
    caption: 'Seek the shepherd’s help instead of fighting the dog. This comparison reminds you to ask Allah for protection.',
  }],
  27: [{
    day: seedAsset('seed-027'), starlight: seedAsset('seed-027-starlight'),
    alt: 'A golden fish swims underwater in a clear turquoise pond, surrounded by smooth stones and floating lily leaves.',
    nightAlt: 'The same golden fish swims in a blue pond, with pink clouds and stars above the far edge of the water.',
    caption: 'A fish needs water. Your heart needs remembrance of Allah.',
  }],
  46: [{
    day: seedAsset('seed-046-morning'), starlight: seedAsset('seed-046-morning'),
    alt: 'Two brown birds set out from a nest on a leafy branch above a coastal garden at dawn.',
    caption: 'The birds go out to look for food. Trust Allah and take the steps available to you.',
    label: 'Morning · Setting out',
  }, {
    day: seedAsset('seed-046-evening'), starlight: seedAsset('seed-046-evening'),
    alt: 'At sunset, one brown bird rests beside the nest while a second bird flies back toward it.',
    caption: 'The birds return in the evening after finding food. Rely on Allah while making an effort.',
    label: 'Evening · Coming home',
  }],
  48: [{
    day: sceneAsset('plant-and-bee'), starlight: sceneAsset('plant-and-bee', true),
    alt: 'A young plant bends in the breeze, while a bee rests lightly on a flower.',
    caption: 'A plant bends while staying rooted. A bee lands gently, without harming the flower.',
  }],
  69: [{
    day: sceneAsset('prayer-breeze'), starlight: sceneAsset('prayer-breeze', true),
    alt: 'A prayer mat in a peaceful coastal room, with an open window and a curtain moving in the breeze.',
    caption: 'A quiet moment to give your prayer your attention.',
  }],
  108: [{
    day: seedAsset('seed-108'), starlight: seedAsset('seed-108-starlight'),
    alt: 'A plain closed book on a wooden stand beside a green prayer mat, with a lamp and an open window overlooking the sunny sea.',
    nightAlt: 'The same book, stand and prayer mat lit by a warm table lamp, beside a window overlooking stars, pink clouds and the sea.',
    caption: 'Make room in your day for learning, worship, and remembering Allah.',
  }],
};
