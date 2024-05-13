import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Fragment } from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <CssBaseline />
      <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
    </Fragment>
  );
};

export default RootLayout;
