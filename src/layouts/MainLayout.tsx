import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container } from "@mui/material";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <Container>
    <Header />
    <main>{children}</main>
    <Footer />
  </Container>
);

export default MainLayout;
