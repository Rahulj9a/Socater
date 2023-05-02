import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
     req: NextApiRequest,
     res: NextApiResponse,
) {
     if (req.method !== "POST" && req.method !== "DELETE") {
          return res.status(405).end();
     }
     try {
          const { userId } = req.body || req.query;
          const { currentUser } = await serverAuth(req, res);
          console.log(userId);
          if (!userId || typeof userId !== "string") {
               throw new Error("Invalid Id");
          }
          const user = await prisma.user.findUnique({
               where: {
                    id: userId,
               },
          });

          if (!user) {
               throw new Error("Invalid Id");
          }

          let updatedFollowingIds = [...(currentUser.followingIds || [])];

          if (req.method === "POST") {
               console.log(updatedFollowingIds, "updatedFollowingIds");
               updatedFollowingIds.push(userId);
               try {
                    const post = await prisma.post.findUnique({
                         where: {
                              id: userId,
                         },
                    });
                    if (userId) {
                         await prisma.notification.create({
                              data: {
                                   userId: userId,
                                   body: "Someone start following you",
                              },
                         });
                         await prisma.user.update({
                              where: {
                                   id: userId,
                              },
                              data: {
                                   hasNotification: true,
                              },
                         });
                    }
               } catch (error) {
                    console.log(error);
               }
          }

          if (req.method === "DELETE") {
               updatedFollowingIds = updatedFollowingIds.filter(
                    (followingId) => followingId !== userId,
               );
          }

          const updatedUser = await prisma.user.update({
               where: {
                    id: currentUser.id,
               },
               data: {
                    followingIds: updatedFollowingIds,
               },
          });

          return res.status(200).json(updatedUser);
     } catch (error) {
          console.log(error);
          res.status(400).end();
     }
}
