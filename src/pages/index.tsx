import React from "react";
import Typography from "@mui/material/Typography";
import ListAutocomplete from "../components/ListAutocomplete";
import CreateListDialog from "../components/CreateListDialog";

const HomePage = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Welcome to the Grocery List Manager
      </Typography>
      <ListAutocomplete />
      <CreateListDialog />
    </div>
  );
};

export default HomePage;
