import { prisma } from "@/../prisma/client";

export const db = {
  getGroceryLists: async () => {
    const lists = await prisma.groceryList.findMany({
      orderBy: { title: "asc" }, // Sorting lists alphabetically
    });
    return lists;
  },
  getGroceryListById: async (id: string) => {
    const list = await prisma.groceryList.findUnique({
      where: { id },
      include: {
        items: true, // Include items related to the list
      },
    });
    return list;
  },
};
