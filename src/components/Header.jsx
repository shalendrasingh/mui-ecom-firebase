import IconButton from "@mui/material/IconButton";

import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Toolbar from "@mui/material/Toolbar";

import { alpha, styled, useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { getItemCount } from "../utils";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import { Menu, MenuItem } from "@mui/material";
import { fetchAllcategories } from "../Redux/category-slice";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../firebase/auth";
import { SignalCellularNullOutlined } from "@mui/icons-material";

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: "none",
}));

const Search = styled("section")(({ theme }) => ({
  display: "flex",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },

  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiTextField-root": {
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
  },
  "& .MuiInputBase-input": {
    color: theme.palette.common.white,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiSvgIcon-root": {
    fill: theme.palette.common.white,
  },
}));

const SearchIconWrapper = styled("section")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: 0,
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SearchBar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [searchParam] = useSearchParams();
  const category = searchParam.get("category");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const products = useSelector((state) => state.products?.value);
  const categories = useSelector((state) => state.categories?.value);
  const searchTerm = searchParam.get("searchTerm");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setSelectedCategory(category ? category : "all");
  }, [category]);

  if (!categories.length) {
    dispatch(fetchAllcategories());
  }

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    navigate(
      value === "all"
        ? "/"
        : `/?category=${value}${searchTerm ? "&searchterm=" + searchTerm : ""}`
    );
  };

  const handleSearchChange = (searchText) => {
    if (searchText) {
      navigate(
        selectedCategory === "all"
          ? `?searchterm=${searchText}`
          : `/?category=${selectedCategory}&searchterm=${searchText}`
      );
    } else {
      navigate(
        selectedCategory === "all" ? `/` : `/?category=${selectedCategory}`
      );
    }
  };

  return (
    <Search>
      <Select
        value={selectedCategory}
        size="small"
        sx={{
          m: 1,
          textTransform: "capitalize",

          "&": {
            "::before": {
              ":hover": {
                border: "none",
              },
            },
            "::before, &::after": {
              border: "none",
            },
            ".MuiSelect-standard": {
              color: "common.white",
            },
            ".MuiSelect-icon": {
              fill: theme.palette.common.white,
            },
          },
        }}
        variant="standard"
        labelId="selected-category"
        id="selected-category-id"
        onChange={handleCategoryChange}
      >
        <MenuItem
          sx={{
            textTransform: "capitalize",
          }}
          value="all"
        >
          All
        </MenuItem>
        {categories?.map((category) => (
          <MenuItem
            sx={{
              textTransform: "capitalize",
            }}
            key={category}
            value={category}
          >
            {category}
          </MenuItem>
        ))}
      </Select>
      <StyledAutocomplete
        freeSolo
        id="selected-product"
        value={selectedProduct}
        onChange={(e, value) => {
          console.log(value);
          handleSearchChange(value?.label);
        }}
        disablePortal
        options={Array.from(
          selectedCategory === "all"
            ? products
            : products.filter((prod) => prod.category === selectedCategory),
          (prod) => ({
            id: prod.id,
            label: prod.title,
          })
        )}
        // sx={{ width: 350 }}
        renderInput={(params) => <TextField {...params} />}
      />

      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
    </Search>
  );
};

const Header = () => {
  const { user, signOut } = useAuth();
  const cartItems = useSelector((state) => state.cart?.value);
  const count = getItemCount(cartItems);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const navigateToCart = () => {
    navigate("/cart");
  };

  const handleProfileMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id="user-profile-menu"
      keepMounted
      transformOrigin={{
        horizontal: "right",
        vertical: "top",
      }}
      anchorOrigin={{
        horizontal: "right",
        vertical: "bottom",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ py: 1 }}>
        <Toolbar sx={{ display: "flex", gap: 6 }}>
          <Typography variant="h6" color={"inherit"}>
            <StyledLink to="/">Ecommerce</StyledLink>
          </Typography>
          <SearchBar />
          <Box flexBasis={600} sx={{ display: { md: "flex" } }}>
            <IconButton
              size="larger"
              aria-label="shows cart items count"
              color="inherit"
              onClick={navigateToCart}
            >
              <Badge badgeContent={count} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {user ? (
              <Button
                color={"inherit"}
                size="large"
                onClick={handleProfileMenuOpen}
              >
                Hello, {user.displayName ?? user.email}
              </Button>
            ) : (
              <Button color={"inherit"} size="large">
                <Link to="/login">Login</Link>
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {renderMenu}
    </>
  );
};

export default Header;
