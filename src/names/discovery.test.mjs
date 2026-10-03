import test from 'node:test';
import assert from 'node:assert/strict';
import { filterNames } from './discovery.js';
import { names } from './content.js';

const ids = (options, saved) => filterNames(names, options, saved).map(n => n.id);

test('finds names with and without Arabic marks, transliteration accents and punctuation', () => {
  for (const query of ['اللطيف', 'اللَّطِيف', 'أَللَّطِيف', 'al latif', 'AL-LAṬĪF', 'latif']) {
    assert.deepEqual(ids({query}), ['al-latif'], query);
  }
  assert.deepEqual(ids({query:'arrahman'}), ['ar-rahman']);
  assert.deepEqual(ids({query:'merciful'}), ['ar-rahman', 'ar-rahim']);
  for (const query of ['al mu\'min','Al-Mu’min','المؤمن','الْمُؤْمِن','security']) {
    assert.deepEqual(ids({query}), ['al-mumin'], query);
  }
  assert.deepEqual(ids({query:'holiness'}), ['al-quddus']);
  for (const query of ['المتكبر','الْمُتَكَبِّر','Al-Mutakabbir']) {
    assert.deepEqual(ids({query}), ['al-mutakabbir'], query);
  }
  for (const query of ['البارئ','Al-Bāri’']) assert.deepEqual(ids({query}), ['al-bari'], query);
  assert.deepEqual(ids({query:'creation'}), ['al-khaliq','al-bari','al-musawwir','al-baith','al-mubdi','al-muid','al-muhyi','al-mumit','al-badi']);
  assert.deepEqual(ids({query:'majesty'}), ['al-mutakabbir','dhul-jalali-wal-ikram']);
  for (const query of ['الغفار','Al-Ghaffar']) assert.deepEqual(ids({query}), ['al-ghaffar'], query);
  assert.deepEqual(ids({query:'الغفور'}), ['al-ghafur']);
  assert.deepEqual(ids({query:'الرزاق'}), ['ar-razzaq']);
  assert.deepEqual(ids({query:'steadiness'}), ['al-aziz']);
  assert.deepEqual(ids({query:'humility'}), ['al-mutakabbir']);
});

test('combines theme, search and reading status without changing the edition order', () => {
  const saved={bookmarks:['al-latif','ar-rahim'],finished:['ar-rahman','al-latif']};
  assert.deepEqual(ids({status:'saved'},saved), ['ar-rahim','al-latif']);
  assert.deepEqual(ids({status:'saved',theme:'mercy'},saved), ['ar-rahim']);
  assert.deepEqual(ids({status:'finished',query:'لطيف'},saved), ['al-latif']);
  assert.deepEqual(ids({status:'finished',theme:'love'},saved), []);
  assert.deepEqual(ids({status:'saved'}), []);
  assert.deepEqual(ids({query:'   '}), names.map(n=>n.id));
  assert.equal(ids({theme:'trust'}).length,26);
  assert.equal(ids({theme:'trust'}).at(-1),'al-warith');
  assert.deepEqual(ids({theme:'trust',query:'guardian'}), ['al-muhaymin']);
  assert.deepEqual(ids({theme:'creation',query:'originator'}), ['al-bari','al-mubdi','al-badi']);
});
