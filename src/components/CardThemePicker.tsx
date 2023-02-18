import { Box, Text, Flex, HStack, useColorModeValue, VStack } from "@chakra-ui/react";
import { FunctionComponent, useEffect, useState } from "react";
import { Theme } from "../interfaces/Theme";
import { getThemes } from "../services/themeService";

interface CardThemePickerProps {
  card: any;
  setCard: Function;
}

const CardThemePicker: FunctionComponent<CardThemePickerProps> = ({ card, setCard }) => {

  const [themes, setThemes] = useState<Theme[]>([]);
  const [themeId, setThemeId] = useState<number>(1);

  async function fetchThemes() {
    const themesRes = await getThemes();
    setThemes(themesRes.data);
  }

  function changeTheme() {
    setCard({
      ...card,
      data: {
        ...card.data,
        themeId: themeId
      }
    });
  }

  useEffect(() => {
    fetchThemes();
    changeTheme();
  }, [themeId])

  return (
    <VStack h='100%' py='2'>
      <Flex justifySelf=''>
        <Text as='b' fontSize='2xl' >Theme picker</Text >
      </Flex >
      <Flex
        flexDir={{ base: 'column', md: 'row', lg: 'column' }}
        py='6'
        h='100%'
        justify='center'
        gap='8'
      >
        {themes && themes.map((theme) =>
          <Flex
            key={theme.id}
            p='1'
            bgGradient='linear(to-br, gray.400, pink.50)'
            boxShadow='xl'
            _hover={{
              cursor: 'pointer',
              transform: 'scale(1.06)'
            }}
            onClick={() => setThemeId(theme.id!)}
          >
            {theme.previewColors.map((color, i) =>
              <Box
                key={i}
                w='60px'
                h='80px'
                bg={color} />
            )}
          </Flex>
        )}
      </Flex>
    </VStack >
  );
}

export default CardThemePicker;