import { Flex, useColorModeValue, Img, Text, Button } from "@chakra-ui/react";
import { FunctionComponent, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
  const { userData, setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => { }, [userData]);

  return (
    <Flex
      flex='1'
      flexDir='column'
      align='center'
      justify='center'
    >
      <Text
        as='b'
        fontSize='3xl'
        maxW='680px'
        textAlign='center'
        textShadow='2px 2px 2px rgba(0,0,0,.2)'
      >
        Design and Share Professional Business Cards Online with Cardy
      </Text>

      <Img maxW={{ base: '100%', sm: '480px', md: '600px' }} src={useColorModeValue('/Card-LightMode.svg', '/Card-DarkMode.svg')} alt="Cardy Banner" />

      <Text
        as='b'
        fontSize='2xl'
        maxW='700px'
        textAlign='center'
        textShadow='2px 2px 2px rgba(0,0,0,.2)'
      >
        Create stunning business cards with ease and join a community of professionals. Try Cardy today!
      </Text>
      {userData.id < 0 &&
        <Button mt='12' colorScheme='pink' size='lg' variant='outline' onClick={() => navigate('/connect')}>
          Start your journey
        </Button>
      }
    </Flex>
  );
}

export default Home;