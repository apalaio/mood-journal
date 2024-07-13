import { prisma } from '@/utils/db';
import { currentUser } from '@clerk/nextjs';
import { create } from 'domain';
import { redirect } from 'next/navigation';

const createNewUser = async () => {
  //We know user is logged in because the page is not set as public in the  middleware
  const user = await currentUser();

  const match = await prisma.user.findUnique({
    where: {
      clerkId: user?.id as string,
    },
  });

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user?.id ?? '',
        email: user?.emailAddresses[0].emailAddress ?? '',
      },
    });
  }

  redirect('/journal');
};

const NewUser = async () => {
  await createNewUser();
  return <div>New User hi</div>;
};

export default NewUser;
