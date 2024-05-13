import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;

  switch (req.method) {
    case "GET":
      const list = await prisma.groceryList.findUnique({
        where: { id },
        include: { items: true },
      });
      if (!list) {
        return res.status(404).json({ message: "List not found" });
      }
      res.status(200).json(list);
      break;

    case "PUT":
      const { title } = req.body;
      try {
        const updatedList = await prisma.groceryList.update({
          where: { id },
          data: { title },
        });
        res.status(200).json(updatedList);
      } catch (error) {
        res.status(500).json({ message: "Failed to update list", error });
      }
      break;

    case "DELETE":
      try {
        await prisma.shoppingItem.deleteMany({
          where: { listId: id },
        });
        await prisma.groceryList.delete({
          where: { id },
        });
        res.status(204).end();
      } catch (error) {
        console.error("Deletion error:", error);
        res
          .status(500)
          .json({ message: "Failed to delete list and items", error });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
