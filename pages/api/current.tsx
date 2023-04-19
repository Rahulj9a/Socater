import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
     req: NextApiRequest,
     res: NextApiResponse,
) {
     if (req.method !== "GET") {
          return res.status(405).end();
     }
     try {
          const { currentUser } = await serverAuth(req, res);
          return res.status(200).json(currentUser);
     } catch (error) {
          console.log(error);
          return res.status(400).end();
     }
}

/* it is gonna use serverAuth to get the currentsession from req and will checked if we are loggedin and then serverAuth will return user
and current.tsx will then return that user to us */
