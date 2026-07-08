import type { Entry } from '@prisma/client';

export function findEntriesByText(entries: Entry[], query: string): Entry[] {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return entries;
  }

  return entries.filter((entry) =>
    entry.text.toLowerCase().includes(normalized),
  );
}
