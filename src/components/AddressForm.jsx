import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateAddress } from "../Redux/checkout-slice";
const AddressForm = () => {
  const address = useSelector((state) => state.checkout?.address);
  const dispatch = useDispatch();

  const handleUpdateAddress = (e) => {
    const { name, value } = e.target;
    dispatch(updateAddress({ [name]: value }));
  };
  return (
    <>
      <Typography variant="h6">Shipping Address</Typography>

      <Box component={"form"} onChange={handleUpdateAddress}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label={"First Name"}
              fullWidth
              autoComplete="given-name"
              variant="standard"
              defaultValue={address.firstName ?? ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label={"Last Name"}
              fullWidth
              autoComplete="family-name"
              variant="standard"
              defaultValue={address.lastName ?? ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              defaultValue={address.address1 ?? ""}
              required
              id="address1"
              name="address1"
              label={"Address Line 1"}
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              defaultValue={address.address2 ?? ""}
              id="address2"
              name="address2"
              label={"Address Line 2"}
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              defaultValue={address.city ?? ""}
              id="city"
              name="city"
              label={"City"}
              fullWidth
              autoComplete="shipping address-line3"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              defaultValue={address.zipCode ?? ""}
              required
              id="zipCode"
              name="zipCode"
              label={"Zip Code/Postal Code"}
              fullWidth
              autoComplete="postal-code"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              defaultValue={address.country ?? ""}
              id="country"
              name="country"
              label={"Country"}
              fullWidth
              autoComplete="country-name"
              variant="standard"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AddressForm;
