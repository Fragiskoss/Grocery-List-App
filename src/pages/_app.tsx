import React from "react";
import { AppProps } from "next/app";
import MainLayout from "../layouts/MainLayout";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme();

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  </ThemeProvider>
);

export default MyApp;
