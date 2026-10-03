// Compact authoring format; every paragraph below is individually written.
// Source line references refer to source-arabic-remaining.txt, not printed pages.
export function reading(id, name, arabic, meaning, theme, invitation, introduction, sections, practice, reflection, arabicExcerpt, sourceBasis, related) {
  return {id,name,arabic,meaning,theme,invitation,introduction,art:'garden',
    takeaway:invitation,sections:sections.map(([title,...paragraphs])=>({title,paragraphs})),
    practice,reflection,arabicExcerpt,sourceNote:sourceBasis+' The practical examples are original contemporary applications. This selective companion reading is not a complete translation.',
    related,editorialStatus:'source-informed draft'};
}
