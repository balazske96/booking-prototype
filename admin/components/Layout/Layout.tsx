import React from "react";
import {
  Grid,
  GridItem,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { DesktopMenu, MobileMenu } from "../Menu";

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const shawodSize = useColorModeValue("lg", "dark-lg");
  const menu = useBreakpointValue({
    base: <MobileMenu />,
    md: <DesktopMenu />,
  });

  return (
    <Grid
      minHeight={"100vh"}
      templateRows="repeat(24, 1fr)"
      templateColumns="repeat(24, 1fr)"
      padding={"2rem"}
      gap={8}
    >
      {menu}
      <GridItem
        boxShadow={shawodSize}
        rowSpan={2}
        colSpan={20}
        borderRadius={6}
      />
      <GridItem
        boxShadow={shawodSize}
        rowSpan={22}
        colSpan={20}
        borderRadius={6}
      >
        {children}
      </GridItem>
    </Grid>
  );
}
