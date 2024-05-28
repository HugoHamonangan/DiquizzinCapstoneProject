export function translate(
  language: string,
  wordEnglish: string,
  wordIndonesian: string
) {
  return language === 'en' ? wordEnglish : wordIndonesian;
}
