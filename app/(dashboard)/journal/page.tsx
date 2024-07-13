import EntryCard from '@/components/EntryCard';
import NewEntryCard from '@/components/NewEntryCard';
import { analyze } from '@/utils/ai';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import Link from 'next/link';

const getEntries = async () => {
  const user = await getUserByClerkId();

  if (!user || !user.id) {
    throw new Error('User not found');
  }
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return entries;
};

const JournalPage = async () => {
  const entries = await getEntries();
  return (
    <div className="p-10 bg-indigo-100 h-full">
      <h1 className="text-3xl mb-8">Journal</h1>
      <div className="grid grid-cols-3 gap-4 ">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard key={entry.id} entry={entry}></EntryCard>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JournalPage;
