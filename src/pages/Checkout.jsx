import React, { useEffect } from "react";
import {
  Container,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useState } from "react";
import AddressForm from "../components/AddressForm";
import PaymentForm from "../components/PaymentForm";
import ReviewForm from "../components/ReviewForm";
import { useDispatch } from "react-redux";
import { clearCheckOutInformation } from "../Redux/checkout-slice";
import { clearCart } from "../Redux/cart-slice";
import { Link } from "react-router-dom";

const steps = ["Shipping Address", "Payment Details", "Review Order"];

const getStepsContent = (activeStep) => {
  switch (activeStep) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <ReviewForm />;
    default:
      throw new Error("Unknown steps");
  }
};

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeStep === steps.length) {
      dispatch(clearCart());
      dispatch(clearCheckOutInformation());
    }
  }, [activeStep]);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  return (
    <Container
      component={"section"}
      maxWidth="lg"
      sx={{
        mb: 4,
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          my: { xs: 3, md: 6 },
          p: { xs: 2, md: 3 },
        }}
      >
        <Typography variant="h4" align="center" component={"h1"}>
          Checkout
        </Typography>

        <Stepper sx={{ pt: 3, pb: 5 }} activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Typography variant="h5" gutterBottom>
              Thank you for your order
            </Typography>
            <Typography>
              Your order number is #ORD12BC12. We have emailed you regarding
              your order confirmation.
            </Typography>
            <Link to="/">Shop More</Link>
          </>
        ) : (
          <>
            {getStepsContent(activeStep)}

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button
                  sx={{
                    mt: 3,
                    ml: 1,
                  }}
                  onClick={handleBack}
                  variant="contained"
                >
                  Back
                </Button>
              )}

              <Button
                sx={{
                  mt: 3,
                  ml: 1,
                }}
                onClick={handleNext}
                variant="contained"
              >
                {activeStep === steps.length - 1 ? "Place Order" : "Next"}
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Checkout;
