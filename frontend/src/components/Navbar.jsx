import {
  Container,
  Flex,
  Text,
  HStack,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { IoMoon, IoSunny } from "react-icons/io5";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container
      maxW={"2000px"}
      px={-4}
      bg={useColorModeValue("gray.300", "blackAlpha.400")}
    >
      <Flex
        h={20}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="4xl"
          fontWeight="extrabold"
          textTransform={"uppercase"}
          textAlign={"center"}
          paddingLeft={20}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>
        <HStack spacing={8} alignItems={"center"} px={20}>
          <Link to={"/create"}>
            <Button>
              <CiSquarePlus fontSize={25} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <IoSunny />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
