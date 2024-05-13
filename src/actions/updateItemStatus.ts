import { prisma } from "@/../prisma/client";

export const toggleItemBoughtStatus = async (id: string, status: boolean) => {
  console.log(`Toggling status for item with id: ${id} to ${status}`);

  // Update the 'bought' status in the database
  const updatedItem = await prisma.shoppingItem.update({
    where: { id },
    data: { bought: status },
  });

  return updatedItem;
};
