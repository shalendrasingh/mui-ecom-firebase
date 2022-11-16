import { createTheme, CssBaseline, Paper, ThemeProvider } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const theme = createTheme({
  palette: {
    mode: "light",
    // primary: {
    //   main: blue[500],
    // },
  },
});
const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>Hello footer</footer>
    </ThemeProvider>
  );
};

export default Layout;
