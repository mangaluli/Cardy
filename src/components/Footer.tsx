import { Box, Center, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface FooterProps {

}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <>
      <Center>
        <Box w='100%' bg={useColorModeValue('#FFFAFB', '#290D20')} borderTop='2px solid rgba(0, 0, 0, 0.33)'>
          <Flex flexDir={{ base: 'column', md: 'row' }} w='100%' h='66' align='center' justify='space-evenly' as='b'>
            <Text>©️CARDY 2023-2023</Text>
            <Text>Regrettably, this website was created by Alex Bairakovski.</Text>
          </Flex>
        </Box>
      </Center>
    </>
  );
}

export default Footer;