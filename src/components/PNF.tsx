import { Box, Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from '@chakra-ui/icons';

interface NPFProps { }

const NPF: FunctionComponent<NPFProps> = () => {

  const navigate = useNavigate();

  return (
    <Flex flex='1' mx='auto' flexDir='column' align='center' justify='center'>
      <Text as='b' fontSize='9xl'>404</Text>
      <Text fontSize='3xl'>🤨📸 How did you get here??</Text>
      <Button colorScheme='pink' size='lg' mt='6' leftIcon={<ChevronLeftIcon />} onClick={() => navigate(-1)}> Go back!</Button>
    </Flex >
  );
}

export default NPF;