import { prisma } from "../../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const lists = await prisma.groceryList.findMany({
          include: {
            items: true, 
          },
        });
        res.status(200).json(lists);
      } catch (error) {
        console.error("Failed to retrieve lists:", error);
        res.status(500).json({
          error: "Failed to retrieve lists",
          message: error instanceof Error ? error.message : "Unknown error",
        });
      }
      break;

    case "POST":
      const { title } = req.body;
      if (!title || typeof title !== "string") {
        return res.status(400).json({
          error: "Invalid input data. Title is required and must be a string.",
        });
      }
      try {
        const newList = await prisma.groceryList.create({
          data: { title },
        });
        res.status(201).json(newList);
      } catch (error) {
        console.error("Failed to create a new list:", error);
        res.status(500).json({
          error: "Failed to create a new list",
          message: error instanceof Error ? error.message : "Unknown error",
        });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
