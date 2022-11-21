import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  TextField,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { getSubtotal } from "../utils";
const ReviewForm = () => {
  const cart = useSelector((state) => state.cart?.value);
  const subtotal = getSubtotal(cart)?.toFixed(2);
  console.log(subtotal);
  const address = useSelector((state) => state.checkout?.address);
  const addresses = address ? Object.values(address) : [];
  const payment = useSelector((state) => state.checkout?.payment);

  const payments = payment
    ? [
        {
          name: "Card type",
          detail: "Visa",
        },
        {
          name: "Card Number",
          detail: payment.cardNumber,
        },
        {
          name: "Card Holder",
          detail: payment.name,
        },
        {
          name: "Expiry Date",
          detail: payment.expDate,
        },
      ]
    : [];
  const theme = useTheme();
  return (
    <>
      <Typography gutterBottom variant="h6">
        Order Summary
      </Typography>
      <List disablePadding>
        {cart?.map(({ product, quantity }) => (
          <ListItem key={product.title} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{
                "& .MuiListItemText-primary": {
                  fontWeight: 500,
                },
                "& .MuiListItemText-secondary": {
                  fontSize: theme.spacing(2),
                },
              }}
              primary={product.title}
              secondary={`Qty: ${quantity}`}
            />
            <Typography variant="body2">
              {getSubtotal([{ product, quantity }])?.toFixed(2)}
            </Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary={"Total"} />
          <Typography variant="body2">{subtotal}</Typography>
        </ListItem>
      </List>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>

          <Typography>{addresses.join(",")}</Typography>
        </Grid>

        <Grid item container direction={"column"} xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment Details
          </Typography>

          <Grid container>
            {payments.map(({ name, detail }) => (
              <React.Fragment key={name}>
                <Grid key={name} item xs={6}>
                  <Typography gutterBottom>{name}</Typography>
                </Grid>
                <Grid key={detail} item xs={6}>
                  <Typography gutterBottom>{detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ReviewForm;
