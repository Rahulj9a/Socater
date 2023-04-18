//this function checks if the user is signed in and retrieves the current user's information from the database using Prisma.

import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb";

const serverAuth = async (req: NextApiRequest) => {
     const session = await getServerSession(req);

     if (!session?.user?.email) {
          throw new Error("not signed in");
     }
     const currentUser = await prisma.user.findUnique({
          where: {
               email: session.user.email,
          },
     });
     if (!currentUser) {
          throw new Error("Not signed in");
     }

     return { currentUser };
};

export default serverAuth;
