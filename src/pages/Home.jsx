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

const Home = () => {
  const theme = useTheme();
  const [products, setProducts] = useState([]);

  async function fetchAllProducts() {
    const response = await fetch("https://fakestoreapi.com/products");
    const result = await response.json();

    setProducts(result);
  }
  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Grid container spacing={4}>
        {products?.map(({ title, id, image, price, description, rating }) => (
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
                <Button variant="contained">
                  <ShoppingCartSharp />
                  Add to cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
