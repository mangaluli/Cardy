import {
  Box,
  Flex,
  IconButton,
  Link,
  useDisclosure,
  HStack,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
  VStack,
  Text
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
} from '@chakra-ui/icons';

import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { successMsg } from "../services/toastify";

interface NavbarProps {
}

const Navbar: FunctionComponent<NavbarProps> = () => {

  const { colorMode, toggleColorMode } = useColorMode();
  const { userData, setUserData } = useContext(UserContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  function getSesUserData() {
    const SesUserData = JSON.parse(sessionStorage.getItem('userData') as string);
    if (SesUserData && SesUserData.id > 0) {
      setUserData(SesUserData);
    } else {
      setSesUserData();
    }
  }

  function setSesUserData() {
    sessionStorage.setItem('userData', JSON.stringify(userData));
  }

  function clearSesUserData() {
    sessionStorage.setItem('userData', JSON.stringify({ id: -2, email: '', name: '', isBusiness: false }));
  }

  useEffect(() => {
    getSesUserData();
  }, []);

  const logout = () => {
    clearSesUserData();
    setUserData({ id: -2, email: '', name: '', isBusiness: false });
    colorMode == 'dark' && toggleColorMode();
    navigate('/');
  }

  return (
    <Flex justify='center' flexDir='column' background={useColorModeValue('#F6F9FB', '#0A0B0F')}
      borderBottom='2px solid rgba(0, 0, 0, 0.33)'>
      <Flex
        maxW='1666px'
        mx='auto'
        as="header"
        w="100%"
        py='3'
        px='6'
        alignItems='center'
        justifyContent='space-between' >
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={12}>
          <Link
            fontSize='2xl' as='b' fontFamily='Sumana'
            px={2}
            py={1}
            _hover={{ textDecoration: 'none' }}
            onClick={() => navigate('/')}
          >
            Cardy
          </Link>
          <HStack
            as='nav'
            spacing='4'
            display={{ base: 'none', md: 'flex' }}>

            <Link
              px={2}
              py={1}
              rounded={'md'}
              _hover={{
                textDecoration: 'none',
                bg: 'gray:100',
                _dark: { bg: 'gray:900' }
              }}
              onClick={() => navigate('/about')}
            >
              About us
            </Link>

            {userData.id > 0 &&
              <Link
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: 'gray:100',
                  _dark: { bg: 'gray:900' }
                }}
                onClick={() => navigate('/gallery')}
              >
                Card's Gallery
              </Link>
            }
          </HStack>
        </HStack>

        <Flex alignItems={'center'}>
          {userData.id < 1 ? (
            <>
              <Button bg='pink' mr='2' onClick={() => navigate('/connect')}>Connect</Button>
            </>
          ) : (
            <>
              {userData.isBusiness &&
                <Button
                  visibility={{ base: 'hidden', sm: 'visible' }}
                  variant={'solid'}
                  bg='hotpink'
                  size={'sm'}
                  mr={4}
                  leftIcon={<AddIcon />}
                  _hover={{
                    bg: '#eee',
                    _dark: { bg: '#111' }
                  }}
                  onClick={() => navigate('new-card')}
                >
                  Card
                </Button>
              }
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Flex align='center' gap='1'>
                    <Text fontSize='lg'>😎 {userData.name}</Text>
                  </Flex>
                </MenuButton>
                <MenuList>
                  {userData.isBusiness &&
                    <Box display={{ base: 'block', sm: 'none' }}>
                      <MenuItem onClick={() => navigate('loved-cards')}><Button
                        variant={'solid'}
                        bg='hotpink'
                        size={'sm'}
                        mr={4}
                        leftIcon={<AddIcon />}
                        _hover={{
                          bg: '#eee',
                          _dark: { bg: '#111' }
                        }}
                        onClick={() => navigate('new-card')}
                      >
                        Card
                      </Button>
                      </MenuItem>
                      <MenuDivider />
                    </Box>
                  }
                  <MenuItem onClick={() => navigate('profile')}>Profile</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={() => navigate('loved-cards')}>Cards I love</MenuItem>
                  {userData.isBusiness && <MenuItem onClick={() => navigate('my-cards')}>My cards</MenuItem>}
                  <MenuItem onClick={toggleColorMode}>
                    {colorMode === 'light' ? 'Too bright 😢' : 'Too dark 😶'}
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={() => { successMsg('Logout successfully'); logout(); }}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
        </Flex>
      </Flex >
      {
        isOpen && (
          <Box pb={4} display={{ md: 'none' }}>
            <VStack as={'nav'} py='4' gap='2'>

              <Link
                px={2}
                py={1}
                rounded={'md'}
                fontSize='24'
                onClick={() => navigate('/about')}
              >
                About
              </Link>

              {userData.id > 0 &&
                <Link
                  px={2}
                  py={1}
                  rounded={'md'}
                  fontSize='24'
                  onClick={() => navigate('/gallery')}
                >
                  Gallery
                </Link>

              }
            </VStack>
          </Box>
        )
      }

    </Flex >
  );
}

export default Navbar;