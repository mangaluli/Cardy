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
    try {
      const cardsRes = await getCards();
      const userRes = await getUser(JSON.parse((sessionStorage.getItem('userData') as string)).id); const cardIds = userRes.data[0].lovedCardIds;
      setCards(cardsRes.data.filter((card: Card) => cardIds.includes(card.id)));
    }
    catch (err) { console.log(err) }
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
        <Text as='b' fontSize='4xl' >Cards I Love</Text>
        {cards.length ? (
          cards.map((card: Card) =>
            <Box key={card.id} >
              <CustomeCard card={card} />
              <CardDescription info={card.info} cardId={card.id} refresh={toggleRefresh} />
            </Box>
          )
        ) : (
          <Box textAlign='center' as='b' fontSize='lg'>
            <Text maxW='333px'>Unfortunately, none of the cards have been able to capture your affection yet.</Text>
            <Text maxW='333px' py='4'>Visit the Gallery page by clicking the button below, and perhaps there you will discover a card worth your affection.</Text>
            <Button
              variant={'solid'}
              bg='hotpink'
              mt='4'
              size={'lg'}
              _hover={{
                bg: '#eee',
                _dark: { bg: '#111' }
              }}
              onClick={() => navigate('../gallery')}
            >
              To the Gallery
            </Button>
          </Box>
        )}
      </Flex>
    </>
  );
}

export default MyCards;