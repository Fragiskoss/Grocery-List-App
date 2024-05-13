import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { Button, Typography, List, ListItem, Checkbox, ListItemText, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Menu, MenuItem, } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface Item {
  id: string;
  description: string;
  quantity: number;
  bought: boolean;
}

interface ListDetail {
  title: string;
  items: Item[];
}

const ListDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [list, setList] = useState<ListDetail | null>(null);
  const [newItem, setNewItem] = useState({ description: "", quantity: 1 });
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const fetchListDetails = useCallback(async () => {
    if (id) {
      const response = await fetch(`/api/lists/${id}`);
      if (response.ok) {
        const data = await response.json();
        setList(data);
      } else {
        alert("Failed to fetch list details.");
      }
    }
  }, [id]);

  useEffect(() => {
    fetchListDetails();
  }, [fetchListDetails]);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteList = async () => {
    if (confirm("Are you sure you want to delete this entire list?")) {
      const response = await fetch(`/api/lists/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        router.push("/");
      } else {
        alert("Failed to delete the list.");
      }
    }
  };

  const handleRenameList = async (newTitle: string) => {
    const response = await fetch(`/api/lists/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle }),
    });
    if (response.ok) {
      fetchListDetails();
    } else {
      alert("Failed to rename the list.");
    }
  };

  const handleToggleBought = async (item: Item) => {
    const updatedItem = { ...item, bought: !item.bought };
    const response = await fetch(`/api/lists/${id}/items/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });
    if (response.ok) {
      fetchListDetails();
    } else {
      alert("Failed to update the item's bought status.");
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      const response = await fetch(`/api/lists/${id}/items/${itemId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchListDetails();
      } else {
        alert("Failed to delete item.");
      }
    }
  };

  const handleAddItem = async () => {
    const response = await fetch(`/api/lists/${id}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
    if (response.ok) {
      setNewItem({ description: "", quantity: 1 });
      fetchListDetails();
    } else {
      alert("Failed to add item.");
    }
  };

  const handleEditItem = async () => {
    if (editItem) {
      const response = await fetch(`/api/lists/${id}/items/${editItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editItem),
      });
      if (response.ok) {
        setOpenEdit(false);
        fetchListDetails();
      } else {
        alert("Failed to update item.");
      }
    }
  };

  if (!list) return <p>Loading...</p>;

  return (
    <div>
      <Typography variant="h5">
        {list.title}
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls="long-menu"
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleMenuClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: "20ch",
            },
          }}
        >
          <MenuItem onClick={() => handleDeleteList()}>Delete List</MenuItem>
          <MenuItem
            onClick={() => {
              const newTitle = prompt(
                "Enter new title for the list:",
                list.title
              );
              if (newTitle) {
                handleRenameList(newTitle);
              }
            }}
          >
            Rename List
          </MenuItem>
        </Menu>
      </Typography>
      <List>
        {list.items.map((item) => (
          <ListItem
            key={item.id}
            secondaryAction={
              <>
                <IconButton
                  onClick={() => {
                    setOpenEdit(true);
                    setEditItem(item);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteItem(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <Checkbox
              checked={item.bought}
              onChange={() => handleToggleBought(item)}
              inputProps={{ "aria-label": "controlled" }}
            />
            <ListItemText
              primary={item.description}
              secondary={`Quantity: ${item.quantity}`}
            />
          </ListItem>
        ))}
      </List>
      <TextField
        label="Description"
        value={newItem.description}
        onChange={(e) =>
          setNewItem({ ...newItem, description: e.target.value })
        }
      />
      <TextField
        label="Quantity"
        type="number"
        value={newItem.quantity}
        onChange={(e) =>
          setNewItem({ ...newItem, quantity: parseInt(e.target.value, 10) })
        }
      />
      <Button onClick={handleAddItem}>Add Item</Button>
      {openEdit && (
        <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogContent>
            <TextField
              label="Description"
              fullWidth
              value={editItem ? editItem.description : ""}
              onChange={(e) =>
                setEditItem({
                  ...editItem,
                  description: e.target.value,
                } as Item)
              }
            />
            <TextField
              label="Quantity"
              type="number"
              fullWidth
              value={editItem ? editItem.quantity : 1}
              onChange={(e) =>
                setEditItem({
                  ...editItem,
                  quantity: parseInt(e.target.value, 10),
                } as Item)
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
            <Button onClick={handleEditItem}>Save</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ListDetailsPage;
