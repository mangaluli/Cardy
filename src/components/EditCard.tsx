import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Card from "../interfaces/Card";
import { getCard } from "../services/cardsService";
import CardForm from "./CardForm";
import CardThemePicker from "./CardThemePicker";
import CustomeCard from "./CustomeCard";

interface EditCardProps { }

const EditCard: FunctionComponent<EditCardProps> = () => {
  const { userData, setUserData } = useContext(UserContext);
  const params = useParams();
  const [cardId, setCardId] = useState<number>(params.cardId ? Number(params.cardId) : -1);
  const [card, setCard] = useState<Card>({
    info: {
      name: 'My Cardy',
      date: Date.now(),
      comment: 'My 1st Cardy',
      lovedByUserIds: [],
      ownerId: JSON.parse(sessionStorage.getItem('userData') as string).id
    },
    data: {
      themeId: 1,
      title: 'My Cardy',
      description: 'You can edit me from the Edit menu and change my appearance from the Themes menu',
      email: 'business@email.com',
      phone: '+(123)456789',
      address: 'STATE / CITY',
    }
  })

  async function fetchCard() {
    const cardRes = await getCard(cardId);
    setCard(cardRes.data[0]);
  }

  useEffect(() => {
    cardId > 0 && cardId !== card.id && fetchCard();
  }, [card]);

  return (
    <Flex flex='1' flexDir='column'>
      <Flex
        flex='1'
        gap='24'
        flexGrow='stretch'
        maxW='1666px'
        w='100%'
        justify='space-between'
        align='center'
        alignItems={{ base: 'center', lg: 'stretch' }}
        mx='auto'
        flexDir={{ base: 'column', lg: 'row' }}
      >
        <Flex
          w={{ base: '100%', xl: '333px' }}
          align='center'
          justify='center'
          pl='8'
          pr='4'
          background={useColorModeValue(
            'rgba(255, 255, 255, .4)',
            'rgba(0, 0, 0, 0.5)'
          )}
          borderX='2px solid rgba(0, 0, 0, 0.33)'
        >
          <CardThemePicker card={card} setCard={setCard} />
        </Flex>
        <Box alignSelf='center'>
          <CustomeCard card={card} />
        </Box>
        <Flex
          w={{ base: '100%', xl: '333px' }}
          pl='4'
          pr='8'
          py='2'
          background={useColorModeValue(
            'rgba(255, 255, 255, .4)',
            'rgba(0, 0, 0, 0.5)'
          )}
          borderX='2px solid rgba(0, 0, 0, 0.33)'
        >
          <CardForm card={card} setCard={setCard} />
        </Flex>
      </Flex>
    </Flex >
  );
}

export default EditCard;