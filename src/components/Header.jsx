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
import { useSelector } from "react-redux";
import { getItemCount } from "../utils";
const Header = () => {

  const cartItems =   useSelector(state=>state.cart)
console.log("cartItems",cartItems.value)
const count =  1

// getItemCount(cartItems)

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
            <Badge badgeContent={count} color="error">
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
