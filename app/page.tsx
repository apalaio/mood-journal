import { auth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const { userId } = await auth();
  const href = userId ? '/journal' : '/new-user';

  return (
    <main className="h-screen w-screen bg-black flex justify-center items-center text-white">
      <article className="w-full max-w-[700px] mx-auto">
        <h1 className="text-6xl mb-4">The definitive Journal app</h1>
        <p className="text-2xl text-white/60 mb-10">
          Track your mood. All you have to do is be honest.
        </p>
        <div>
          <Link href={href}>
            <button className="bg-indigo-600 px-4 py-2 rounded-lg text-xl">
              Get Started
            </button>
          </Link>
        </div>
      </article>
    </main>
  );
}
