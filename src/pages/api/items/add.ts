import { prisma } from "../../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { description, quantity, listId } = req.body;
    try {
      const newItem = await prisma.shoppingItem.create({
        data: { description, quantity, listId },
      });
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to add item", error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
  }
}
