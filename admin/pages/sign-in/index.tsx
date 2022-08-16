import {
  Button,
  Flex,
  Heading,
  Input,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

export default function SignIn() {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");

  return (
    <Flex height={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Flex direction={"column"} bg={formBackground} p={12} rounded={6}>
        <Heading mb={6}>Bejelentkezés</Heading>
        <Input
          placeholder={"felhasználónév / email"}
          variant={"filled"}
          mb={3}
          type={"text"}
        />
        <Input
          placeholder={"********"}
          variant={"filled"}
          mb={6}
          type={"password"}
        />
        <Button mb={6} colorScheme={"teal"}>
          Bejelentkezés
        </Button>
      </Flex>
    </Flex>
  );
}
