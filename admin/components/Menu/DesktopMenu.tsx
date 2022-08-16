import {
  GridItem,
  Flex,
  VStack,
  StackDivider,
  useBreakpointValue,
  Text,
  Hide,
  useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Link from "next/link";

interface DesktopLinkProp {
  icon?: React.ReactNode;
  label: string;
  href: string;
}

function DesktopLink({ icon, label, href }: DesktopLinkProp) {
  return (
    <Link href={href}>
      <Flex
        width={"100%"}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={5}
        marginTop={5}
      >
        {icon}
        <Hide below="lg">
          <Text>{label}</Text>
        </Hide>
      </Flex>
    </Link>
  );
}

export default function DesktopMenu() {
  const shadowSize = useColorModeValue("lg", "dark-lg");

  return (
    <GridItem boxShadow={shadowSize} rowSpan={24} colSpan={4} borderRadius={6}>
      <VStack spacing={10} width={"100%"}>
        <DesktopLink icon={<AddIcon />} label={"Új időpont"} href={"#"} />
        <StackDivider borderColor="gray.200" />
        <DesktopLink icon={<AddIcon />} label={"Kezdőlap"} href={"#"} />
        <DesktopLink icon={<AddIcon />} label={"Új időpont"} href={"#"} />
      </VStack>
    </GridItem>
  );
}
