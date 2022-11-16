import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h4" color={"inherit"} sx={{ flexGrow: 1 }}>
          Logo
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton
            size="larger"
            aria-label="shows cart items count"
            color="inherit"
          >
            <Badge badgeContent={2} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
        <Button color={"inherit"} size="large">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
