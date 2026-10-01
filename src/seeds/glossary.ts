// Plain meanings for words and phrases a newcomer may not know. The book's text
// is never changed: these only add a tap-to-explain layer on top of it.
export type GlossaryEntry = { id: string; term: string; meaning: string; match: string[] };

export const glossary: GlossaryEntry[] = [
  { id: 'allah', term: 'Allah', meaning: 'The Arabic word for God.', match: ['Allah'] },
  { id: 'saw', term: 'ﷺ', meaning: 'A short blessing written after the Prophet Muhammad’s name. It means “peace and blessings be upon him.”', match: ['ﷺ'] },
  { id: 'swt', term: 'ﷻ', meaning: 'A phrase of praise written after the name of God. It means “exalted is His majesty.”', match: ['ﷻ'] },
  { id: 'prophet', term: 'The Prophet', meaning: 'Muhammad, whose sayings and example are quoted throughout these readings.', match: ['the Prophet', 'The Prophet', 'Allah’s Messenger', 'the Messenger of Allah', 'The Messenger of Allah'] },
  { id: 'quran', term: 'Qur’an', meaning: 'The holy book of Islam. A reference like “Quran 14:24” points to chapter 14, verse 24.', match: ['Quran', 'Qur’an'] },
  { id: 'sunnah', term: 'Sunnah', meaning: 'The Prophet’s way of life: what he said, did and approved of.', match: ['Sunnah', 'Sunna'] },
  { id: 'judgment', term: 'Day of Judgment', meaning: 'The day when every person is raised and their life is weighed and accounted for.', match: ['Day of Judgment', 'Day of Resurrection'] },
  { id: 'hereafter', term: 'Hereafter', meaning: 'The life that comes after this one.', match: ['Hereafter'] },
  { id: 'paradise', term: 'Paradise', meaning: 'The garden of reward and peace in the life to come.', match: ['Paradise', 'Jannah'] },
  { id: 'fire', term: 'The Fire', meaning: 'Hell: the punishment of the life to come.', match: ['the Fire'] },
  { id: 'shaytan', term: 'Shaytan', meaning: 'Satan: the one who whispers doubt, despair and temptation.', match: ['Shaytan'] },
  { id: 'jibril', term: 'Jibril', meaning: 'The angel Gabriel, who brought God’s messages to the prophets.', match: ['Jibril'] },
  { id: 'decree', term: 'Decree', meaning: 'God’s knowledge of, and plan for, everything that happens.', match: ['decree', 'Decree'] },
  { id: 'dhikr', term: 'Dhikr', meaning: 'Remembering God, often by repeating short words of praise.', match: ['dhikr'] },
  { id: 'rizq', term: 'Rizq', meaning: 'Provision: everything God provides, from food and money to friendship and opportunity.', match: ['rizq'] },
  { id: 'luqman', term: 'Luqman', meaning: 'A wise man honoured in the Qur’an for the advice he gave his son.', match: ['Luqman'] },
  { id: 'maryam', term: 'Maryam', meaning: 'Mary, the mother of Jesus, honoured in the Qur’an.', match: ['Maryam'] },
  { id: 'qayyim', term: 'Ibn al-Qayyim', meaning: 'A 14th-century scholar from Damascus, known for his writing on the heart and good character.', match: ['Ibn al-Qayyim'] },
  { id: 'taymiyyah', term: 'Ibn Taymiyyah', meaning: 'A 13th–14th-century scholar from Damascus, and Ibn al-Qayyim’s teacher.', match: ['Ibn Taymiyyah'] },
  { id: 'jawzi', term: 'Ibn al-Jawzi', meaning: 'A 12th-century preacher and scholar from Baghdad, known for his reflections on self-discipline.', match: ['Ibn al-Jawzi'] },
  { id: 'rajab', term: 'Ibn Rajab', meaning: 'A 14th-century scholar from Damascus, known for explaining the Prophet’s sayings.', match: ['Ibn Rajab'] },
  { id: 'imam', term: 'Imam', meaning: 'A title of respect for a leading scholar. It can also mean the person who leads a prayer.', match: ['Imam'] },
  { id: 'shaykh', term: 'Shaykh', meaning: 'A title of respect for a religious teacher or scholar.', match: ['Shaykh'] },
];

// The book prints these short Arabic phrases as small images after a name.
export const honorificMeanings: Record<string, { term: string; meaning: string }> = {
  'honorific-mercy.jpg': { term: 'رحمه الله', meaning: '“May God have mercy on him.” Said after the name of a respected scholar who has passed away.' },
  'honorific-pleased.jpg': { term: 'رضي الله عنه', meaning: '“May God be pleased with him.” Said after the name of one of the Prophet’s companions.' },
  'honorific-peace-him.jpg': { term: 'عليه السلام', meaning: '“Peace be upon him.” Said after the name of a prophet or an angel.' },
  'honorific-peace-her.jpg': { term: 'عليها السلام', meaning: '“Peace be upon her.” Said after the name of an honoured woman, such as Mary.' },
};

const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const byMatch = new Map(glossary.flatMap(entry => entry.match.map(text => [text, entry] as const)));
export const glossaryPattern = new RegExp(`(?<![\\p{L}\\p{M}])(${[...byMatch.keys()].sort((a, b) => b.length - a.length).map(escape).join('|')})(?![\\p{L}\\p{M}])`, 'gu');
export const glossaryFor = (text: string) => byMatch.get(text);
