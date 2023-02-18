import { Alert, AlertIcon, Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import Login from "./Login";
import Register from "./Register";

interface ConnectProps { }

const Connect: FunctionComponent<ConnectProps> = () => {
  return (
    <Flex
      flexDir='column'
      py='16'
      gap='16'
      align='center'
    >

      <Box>
        <Tabs isFitted colorScheme='pink'>
          <TabList>
            <Tab>Login</Tab>
            <Tab>Register</Tab>
          </TabList>
          <Box>
            <Alert status='info' as={Flex} flexDir='column' fontSize='sm' gap='4' justify='flex-end' alignItems='' >
              <Flex>
                <AlertIcon />
                <Flex flexDir='column' color='gray.600'>
                  <Text>No account creation is necessary to test the website.</Text>
                  <Text>Options include:</Text>
                </Flex>
              </Flex>
              <Flex flexDir={{ base: 'column', sm: 'row' }} justify='center' gap='2' as='b' mx='8' >
                <Flex bg='blue.200' w='100%' p='1' borderRadius='8' flexDir='column' color='gray.600' border='1px solid gray'>
                  <Text>admin@example.com</Text>
                  <Text>admin1234</Text>
                </Flex>
                <Flex bg='blue.200' w='100%' p='1' borderRadius='8' flexDir='column' color='gray.600' border='1px solid gray'>
                  <Text>user@example.com</Text>
                  <Text>user1234</Text>
                </Flex>
              </Flex>
            </Alert>
          </Box>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Register />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

    </Flex>
  );
}

export default Connect;