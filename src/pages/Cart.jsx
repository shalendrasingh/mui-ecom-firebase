import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Rating,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../Redux/cart-slice";
import { getSubtotal } from "../utils";

const Cart = () => {
  const cart = useSelector((state) => state.cart?.value);
  const theme = useTheme();

  const subtotal = getSubtotal(cart)?.toFixed(2);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleQuantityUpdate = (e, { product, quantity }) => {
    const updatedQuantity = e.target.valueAsNumber;

    if (updatedQuantity < quantity) {
      // remove item from cart

      dispatch(removeFromCart({ product }));
    } else {
      dispatch(addToCart({ product }));
    }
  };

  const gotToHome = () => {
    navigate("/");
  };

  const checkoutItems = () => {
    navigate("/checkout");
  };
  return (
    <Container sx={{ py: 8 }}>
      <Grid container sx={{}} spacing={2}>
        <Grid sx={{}} item container spacing={2} md={8}>
          {cart?.map(({ product, quantity }) => {
            const { title, id, price, description, rating, image } = product;
            return (
              <Grid item key={id} xs={12}>
                <Card sx={{ display: "flex", py: 2 }}>
                  <CardMedia
                    component="img"
                    image={image}
                    sx={{
                      width: theme.spacing(30),
                      height: theme.spacing(30),
                      objectFit: "contain",
                      pt: theme.spacing(),
                    }}
                    alt={title}
                  />

                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <Typography variant="h6">{title}</Typography>

                      <Rating readOnly precision={0.5} value={rating.rate} />
                      <form>
                        <TextField
                          label="Quantity"
                          value={quantity}
                          inputProps={{
                            min: 0,
                            max: 10,
                          }}
                          sx={{
                            width: theme.spacing(8),
                          }}
                          id={`${id}-product-id`}
                          type="number"
                          variant="standard"
                          onChange={(e) =>
                            handleQuantityUpdate(e, { product, quantity })
                          }
                        ></TextField>
                      </form>
                    </Box>
                    <Box>
                      <Typography variant="h5" paragraph>
                        {getSubtotal([{ product, quantity }])?.toFixed(2)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Grid
          item
          container
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Card
              sx={{
                padding: 2,

                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography variant="h4">Subtotal </Typography>
              <Typography variant="h5">{subtotal}</Typography>

              {subtotal > 0 ? (
                <Button variant="contained" onClick={checkoutItems}>
                  Buy now
                </Button>
              ) : (
                <Button variant="contained" onClick={gotToHome}>
                  Shop products
                </Button>
              )}
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
