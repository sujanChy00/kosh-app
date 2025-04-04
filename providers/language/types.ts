export type LanguageKey = 'en' | 'np';

const dictionary_keys = createUniqueArray(['language']);

export type DictionaryKey = (typeof dictionary_keys)[number];

type HasDuplicates<T extends string[]> = T extends [infer F, ...infer Rest]
  ? F extends Rest[number]
    ? true
    : HasDuplicates<Rest extends string[] ? Rest : []>
  : false;

function createUniqueArray<const T extends string[]>(
  arr: HasDuplicates<T> extends true ? never : T
): T {
  const uniqueSet = new Set(arr);
  if (uniqueSet.size !== arr.length) {
    throw new Error('Duplicate keys found');
  }
  return arr;
}
