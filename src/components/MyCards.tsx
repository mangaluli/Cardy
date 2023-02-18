import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../interfaces/Card";
import { getCards } from "../services/cardsService";
import { getUser } from "../services/usersService";
import CardDescription from "./CardDescription";
import CustomeCard from "./CustomeCard";

interface MyCardsProps {

}

const MyCards: FunctionComponent<MyCardsProps> = () => {
  const [cards, setCards] = useState([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const navigate = useNavigate();

  async function fetchCards() {
    const cardsRes = await getCards();
    const userRes = await getUser(JSON.parse((sessionStorage.getItem('userData') as string)).id);
    const cardIds = userRes.data[0].cardIds;
    setCards(cardsRes.data.filter((card: Card) => cardIds.includes(card.id)));
  }

  function toggleRefresh() {
    setRefresh(!refresh);
  }

  useEffect(() => {
    fetchCards();
  }, [refresh])

  return (
    <>
      <Flex flex='1' flexDir='column' gap='20' py='8' wrap='wrap' align='center' justify='center'>
        <Text as='b' fontSize='4xl' >My Cards</Text>
        {cards.length ? (
          cards.map((card: Card) =>
            <Box key={card.id} >
              <CustomeCard card={card} />
              <CardDescription info={card.info} cardId={card.id} refresh={toggleRefresh} />
            </Box>
          )
        ) : (
          <Box textAlign='center' as='b' fontSize='lg'>
            <Text maxW='333px'>Regrettably, your collection of cards remains empty, serving as a bleak reminder of the void and emptiness in your life.</Text>
            <Text maxW='333px' py='4'>Summon your last bit of hope and energy to click on the button below, the only way to attempt to fill the aching void by creating a card.</Text>
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
          </Box>
        )}
      </Flex>
    </>
  );
}

export default MyCards;