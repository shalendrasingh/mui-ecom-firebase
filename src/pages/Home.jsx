import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Container,
  Grid,
  IconButton,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ExpandMore, ShoppingCartSharp } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/cart-slice";
import { fetchAllProducts } from "../Redux/product-slice";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [searchParam] = useSearchParams();
  const category = searchParam.get("category");
  const theme = useTheme();
  const state = useSelector((state) => state.products);
  // console.log(state);
  const { value: products, loading } = state ?? {};
  const dispatch = useDispatch();
  const searchTerm = searchParam.get("searchterm");

  if (!products?.length) {
    dispatch(fetchAllProducts());
  }

  const handleAddtoCart = (product) => {
    // dispatch an action to add product cart
    dispatch(addToCart({ product, quantity: 1 }));
  };

  let filteredProducts =
    category && category !== "all"
      ? products.filter((prod) => prod.category === category)
      : products;

  filteredProducts = searchTerm
    ? filteredProducts.filter((prod) =>
        prod.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredProducts;

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Grid container spacing={4}>
        {filteredProducts?.map(
          ({ title, id, image, price, description, rating }) => (
            <Grid item key={id} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    alignSelf: "center",
                    width: theme.spacing(30),
                    height: theme.spacing(30),
                    objectFit: "contain",
                    pt: theme.spacing(),
                  }}
                  image={image}
                  alt={title}
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {title}
                  </Typography>

                  <Typography
                    color="text.disabled"
                    paragraph
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {description}
                  </Typography>
                  <Typography fontSize={"large"} paragraph sx={{}}>
                    {price}
                  </Typography>
                  <Rating readOnly precision={0.5} value={rating.rate} />
                </CardContent>
                <CardActions
                  sx={{
                    alignSelf: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() =>
                      handleAddtoCart({
                        title,
                        id,
                        image,
                        price,
                        description,
                        rating,
                      })
                    }
                  >
                    <ShoppingCartSharp />
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </Container>
  );
};

export default Home;
