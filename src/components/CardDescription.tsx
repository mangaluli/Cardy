import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, Flex, Icon, IconButton, Img, Menu, MenuButton, MenuList, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { deleteCardById, loveCard, unloveCard } from "../services/cardEditService";

interface CardDescriptionProps {
  info: any;
  cardId: any;
  refresh: Function;
}

const CardDescription: FunctionComponent<CardDescriptionProps> = ({ info, cardId, refresh }) => {

  const { userData, setUserData } = useContext(UserContext);
  const [loved, setLoved] = useState<boolean>(false)
  const [lovedByUserIds, setLovedByUserIds] = useState<number[]>([])
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const date = new Date(+info.date);
  const navigate = useNavigate();


  const handleLovedClick = async () => {
    if (loved) {
      await unloveCard(cardId, userData.id);
      setLoved(false);
      setLovedByUserIds(lovedByUserIds.filter((userId: number) => userId != userData.id));
      refresh();
    } else {
      await loveCard(cardId, userData.id);
      setLoved(true);
      setLovedByUserIds([...lovedByUserIds, userData.id]);
    }
  }

  const handleDeleteClick = async () => {
    await deleteCardById(cardId);
    refresh();
  }

  const handleEditClick = () => navigate(`../edit-card/${cardId}`);


  useEffect(() => {
    setLovedByUserIds(info.lovedByUserIds);
    setLoved(info.lovedByUserIds.includes(userData.id));
  }, []);

  return (
    <>
      <Stack
        direction='column'
        w={{ base: '100%', sm: '400px', xl: '600px' }}
        px='6'
      >
        <Flex justify='space-between' align='center' pt='2'>
          <Text color={useColorModeValue('#444', '#fff')} as='b' fontSize='22' fontFamily='Verdana'>{info.name}</Text>

          <Flex align='center'>

            <Button variant="ghost" onClick={handleLovedClick}>

              <Text pr='2' as='b' fontSize='20' fontFamily='Verdana'>
                {lovedByUserIds.length}
              </Text>

              <Icon xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 24 24" fill={loved ? 'hotpink' : 'none'} stroke="hotpink" strokeWidth="3" strokeLinecap="round" strokeLinejoin="bevel">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </Icon>

            </Button>
          </Flex>
        </Flex>

        <Text textAlign='justify'>
          {info.comment}
        </Text>

        <Flex justify='space-between' pt='4'>
          <Text color='gray.400'>
            {userData.email}
          </Text>

          <Text color='gray.400'>
            {date.toLocaleString()}
          </Text>
        </Flex>

        {info.ownerId == userData.id &&
          <Flex justify='center'>
            <IconButton
              variant='ghost'
              aria-label='Edit Card'
              fontSize='20px'
              icon={<EditIcon />}
              onClick={handleEditClick}
            />
            <Menu isOpen={menuOpen} closeOnBlur>
              <MenuButton onClick={() => setMenuOpen(true)} onBlur={() => setMenuOpen(false)}>
                <IconButton
                  as={Flex}
                  variant='ghost'
                  aria-label='Edit Card'
                  fontSize='20px'
                  icon={<DeleteIcon />}
                />
              </MenuButton>
              <MenuList onClick={() => setMenuOpen(false)}>
                <Flex align='center' justify="space-evenly">
                  <Button
                    colorScheme='green'
                    onClick={() => {
                      setMenuOpen(false);
                      handleDeleteClick();
                    }}
                  >
                    Yes
                  </Button>
                  <Img h='12' src='/Are-You-Sure.gif' />
                  <Button colorScheme='red'>
                    NO!
                  </Button>
                </Flex>
              </MenuList>
            </Menu>
          </Flex>
        }
      </Stack>
    </>
  );
}

export default CardDescription;