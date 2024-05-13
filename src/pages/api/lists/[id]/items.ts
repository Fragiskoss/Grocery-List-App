import { prisma } from "../../../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query; // The list ID to which the item belongs
  const { description, quantity } = req.body;

  try {
    const newItem = await prisma.shoppingItem.create({
      data: {
        description,
        quantity,
        bought: false, // Default value
        listId: id as string,
      },
    });
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Failed to add item:", error);
    res.status(500).json({
      error: "Failed to add item",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
