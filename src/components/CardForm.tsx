import { FunctionComponent, useContext, useEffect } from 'react';
import { Input, Text, FormControl, FormLabel, Button, VStack, Stack, Textarea, Flex, Box } from '@chakra-ui/react';
import Card from '../interfaces/Card';
import { editCard } from '../services/cardsService';
import { useNavigate } from 'react-router-dom';
import { createCard } from '../services/cardEditService';
import { UserContext } from '../context/UserContext';

interface CardFormProps {
  card: Card;
  setCard: Function;
}

const CardForm: FunctionComponent<CardFormProps> = ({ card, setCard }) => {

  const { userData, setUserData } = useContext(UserContext);
  let navigate = useNavigate();

  const handleInfoChange = (event: any) => {
    const { name, value } = event.target;
    setCard({ ...card, info: { ...card.info, [name]: value } });

    handleResize(event);
  };

  const handleDataChange = (event: any) => {
    const { name, value } = event.target;
    setCard({ ...card, data: { ...card.data, [name]: value } });

    handleResize(event.target);
  };

  function handleResize(target: any) {
    if (target && target.tagName == 'TEXTAREA') {
      target.style.height = "auto";
      target.style.height = `${target.scrollHeight * 1.14}px`;
    }
  }

  const handleSaveClick = async () => {
    setCard({ ...card, info: { ...card.info, date: Date.now() } });
    (card.id && card.id > 0) ?
      await editCard(card)
        .catch(err => console.log(err))
      :
      await createCard(card, userData.id);
    navigate('../my-cards');
  };

  useEffect(() => {
    document.querySelectorAll('textarea').forEach(textarea => {
      handleResize(textarea);
    })
  }, [card])

  return (
    <Flex flexDir='column' gap='4' w='100%'>
      <VStack gap='0' w={{ base: '100%', sm: '333px', lg: 'unset' }} mx='auto'>
        <Text as='b' fontSize='2xl'>Card info</Text>
        <FormControl id="name">
          <FormLabel size={{ base: "sm", xl: "md" }}>Card Name</FormLabel>
          <Input size={{ base: "sm", xl: "md" }} name="name" value={card.info.name} onChange={handleInfoChange} />
        </FormControl>
        <FormControl id="comment">
          <FormLabel size={{ base: "sm", xl: "md" }}>Comment</FormLabel>
          <Textarea
            name='comment'
            resize='none'
            value={card.info.comment}
            onChange={handleInfoChange}
            size={{ base: "sm", xl: "md" }}
            minH='10'
            overflow='clip'
          />
        </FormControl>
      </VStack>

      <VStack gap='0' w={{ base: '100%', sm: '333px', lg: 'unset' }} mx='auto'>
        <Text as='b' fontSize='2xl'>Cards inner text</Text>
        <FormControl id="title">
          <FormLabel size={{ base: "sm", xl: "md" }}>Title</FormLabel>
          <Input size={{ base: "sm", xl: "md" }} name="title" value={card.data.title} onChange={handleDataChange} />
        </FormControl>
        <FormControl id="description">
          <FormLabel size={{ base: "sm", xl: "md" }}>Description</FormLabel>
          <Textarea
            name='description'
            resize='none'
            value={card.data.description}
            onChange={handleDataChange}
            size={{ base: "sm", xl: "md" }}
            minH="10"
            overflow="clip"
          />
        </FormControl>

        <FormControl id="email">
          <FormLabel size={{ base: "sm", xl: "md" }}>Email</FormLabel>
          <Input size={{ base: "sm", xl: "md" }} name="email" value={card.data.email} onChange={handleDataChange} />
        </FormControl>
        <FormControl id="phone">
          <FormLabel size={{ base: "sm", xl: "md" }}>Phone</FormLabel>
          <Input size={{ base: "sm", xl: "md" }} name="phone" value={card.data.phone} onChange={handleDataChange} />
        </FormControl>
        <FormControl id="address">
          <FormLabel size={{ base: "sm", xl: "md" }}>Address</FormLabel>
          <Input size={{ base: "sm", xl: "md" }} name="address" value={card.data.address} onChange={handleDataChange} />
        </FormControl>
      </VStack>
      <Button mb='8' alignSelf='center' colorScheme="pink" onClick={handleSaveClick}>
        Save
      </Button>
    </Flex>
  );
}

export default CardForm;