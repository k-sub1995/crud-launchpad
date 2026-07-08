import { prisma } from '@/lib/prisma';
import { EntryPage } from './entry-page';

export default async function Home() {
  const entries = await prisma.entry.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return <EntryPage initialEntries={entries} />;
}
