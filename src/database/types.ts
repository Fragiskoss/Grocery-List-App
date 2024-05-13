export interface GroceryList {
  id: string;
  title: string;
  items: ShoppingItem[];
}

export interface ShoppingItem {
  id: string;
  description: string;
  quantity: number;
  bought: boolean;
}
