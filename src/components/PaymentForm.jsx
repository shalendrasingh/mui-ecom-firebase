import { Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePayment } from "../Redux/checkout-slice";

const PaymentForm = () => {
  const payment = useSelector((state) => state.checkout?.payment);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updatePayment({ [name]: value }));
  };
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>

      <Box component={"form"} onChange={handleChange}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              variant="standard"
              required
              label="Name on card"
              fullWidth
              name="name"
              id="name"
              autoComplete="cc-name"
              defaultValue={payment?.name ?? ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="standard"
              required
              name="cardNumber"
              id="cardNumber"
              label="Card Number"
              fullWidth
              autoComplete="cc-number"
              defaultValue={payment?.cardNumber ?? ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="standard"
              required
              name="expDate"
              id="expDate"
              label="Expiry Date"
              fullWidth
              autoComplete="cc-exp"
              defaultValue={payment?.expDate ?? ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="standard"
              required
              name="cvv"
              id="cvv"
              defaultValue={payment?.cvv ?? ""}
              type="password"
              label="CVV"
              fullWidth
              autoComplete="cc-csc"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PaymentForm;
