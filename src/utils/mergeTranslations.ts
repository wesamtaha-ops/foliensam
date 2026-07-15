type TranslationRecord = Record<string, unknown>;

const isPlainObject = (value: unknown): value is TranslationRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const deepMerge = (base: TranslationRecord, override: TranslationRecord): TranslationRecord => {
  const result: TranslationRecord = { ...base };

  for (const key of Object.keys(override)) {
    const baseValue = base[key];
    const overrideValue = override[key];

    if (isPlainObject(baseValue) && isPlainObject(overrideValue)) {
      result[key] = deepMerge(baseValue, overrideValue);
    } else {
      result[key] = overrideValue;
    }
  }

  return result;
};

/** Keys where bundled defaults must win over stale PHP/localStorage data. */
const DEFAULT_PRIORITY_KEYS = ['hero', 'seoPages', 'contact'] as const;

/**
 * Merge admin/custom translations with bundled defaults.
 * Custom values override defaults except for migrated namespaces
 * (hero, seoPages, contact) where defaults always win.
 */
export const mergeTranslations = (
  defaults: TranslationRecord,
  custom?: TranslationRecord | null
): TranslationRecord => {
  if (!custom) return { ...defaults };

  const merged = deepMerge(defaults, custom);

  for (const key of DEFAULT_PRIORITY_KEYS) {
    const defaultValue = defaults[key];
    if (!isPlainObject(defaultValue)) continue;

    const customValue = custom[key];
    merged[key] = deepMerge(
      isPlainObject(customValue) ? customValue : {},
      defaultValue
    );
  }

  return merged;
};
