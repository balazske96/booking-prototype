import React from "react";
import { Container } from "@mui/material";
import { Toolbar } from "@mui/material";
import { IconButton } from "@mui/material";
import { Typography } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material/";
import useUserSetting from "../../hooks/useUserSettings";
import { Drawer } from "./Drawer";
import { AppBar } from "./AppBar";
import NoSsr from "@mui/material/NoSsr";

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isMenuOpened, closeMenu, openMenu } = useUserSetting();

  return (
    <>
      <AppBar position="fixed" open={isMenuOpened}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => {
              isMenuOpened ? closeMenu() : openMenu();
            }}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <NoSsr>
        <Drawer variant="permanent" anchor="left" open={isMenuOpened}></Drawer>
      </NoSsr>
      <Container maxWidth="lg">{children}</Container>
    </>
  );
}
