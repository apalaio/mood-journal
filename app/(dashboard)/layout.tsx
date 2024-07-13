import { UserButton } from '@clerk/nextjs';

const DashboardLayout = ({ children }: { children: any }) => {
  return (
    <article className="h-screen w-screen flex">
      <aside className="w-[200px]">Mood</aside>
      <section className="flex flex-col flex-1  h-full">
        <header className="w-full h-8   p-6">
          <div className="h-full w-full flex items-center justify-end">
            <UserButton />
          </div>
        </header>
        <div className="flex-1 h-[calc(100vh-60px)]">{children}</div>
      </section>
    </article>
  );
};

export default DashboardLayout;
