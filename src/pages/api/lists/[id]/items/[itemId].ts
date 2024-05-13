import { prisma } from "../../../../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { itemId } = req.query;

  if (req.method === "PUT") {
    try {
      const { description, quantity, bought } = req.body; // Destructure the properties you expect to update from req.body
      const item = await prisma.shoppingItem.update({
        where: { id: itemId as string },
        data: {
          description, 
          quantity,
          bought,
        },
      });
      res.status(200).json(item);
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({
        message: "Failed to update item",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.shoppingItem.delete({
        where: { id: itemId as string },
      });
      res.status(204).end();
    } catch (error) {
      console.error("Delete error:", error);
      res.status(500).json({
        message: "Failed to delete item",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  } else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
