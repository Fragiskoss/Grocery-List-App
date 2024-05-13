import React from "react";
import { AppBar, Toolbar, Typography, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Header: React.FC = () => {
  const theme = useTheme();
  return (
    <AppBar
      position="static"
      color="primary"
      sx={{
        boxShadow: "none",
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar>
        <Link
          href="/"
          underline="none"
          sx={{
            color: "inherit", 
            display: "flex", 
            alignItems: "center", 
            flexGrow: 1, 
            textDecoration: "none", 
      
          }}
        >
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            Grocery List Manager
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
