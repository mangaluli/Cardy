import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Card from "../interfaces/Card";
import { getCards } from "../services/cardsService";
import CardDescription from "./CardDescription";
import CustomeCard from "./CustomeCard";

interface GalleryProps { }

const Gallery: FunctionComponent<GalleryProps> = () => {

  const { userData, setUserData } = useContext(UserContext);
  const [cards, setCards] = useState([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const navigate = useNavigate();

  async function fetchCards() {
    const cardsRes = await getCards();
    setCards(cardsRes.data);
  }

  function toggleRefresh() {
    setRefresh(!refresh);
  }

  useEffect(() => {
    fetchCards();
  }, [refresh])

  return (
    <>
      <Flex flex='1' flexDir='column' gap='24' p='16' wrap='wrap' align='center' justify='center' >
        <Text as='b' fontSize='4xl' >Cards Gallery</Text>
        {cards.length ? (
          cards.map((card: Card) =>
            <Box key={card.id} >
              <CustomeCard card={card} />
              <CardDescription info={card.info} cardId={card.id} refresh={toggleRefresh} />
            </Box>
          )
        ) : (
          <Box textAlign='center' as='b' fontSize='lg'>
            <Text maxW='333px'>Alas, the website is devoid of any cards to offer, leaving us with a desolate and hopeless void.</Text>
            {userData.isBusiness && <>
              <Text maxW='333px' py='4'>The only action left is to click on the bleak and dreary button below to to commence a sorrowful quest of creating the first card on this lifeless website.</Text>
              <Button
                variant={'solid'}
                bg='hotpink'
                mt='4'
                size={'lg'}
                leftIcon={<AddIcon />}
                _hover={{
                  bg: '#eee',
                  _dark: { bg: '#111' }
                }}
                onClick={() => navigate('../new-card')}
              >
                Card
              </Button>
            </>
            }
          </Box>
        )}
      </Flex>
    </>
  );
}

export default Gallery;