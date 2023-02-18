import { Box, Flex, Text } from "@chakra-ui/react";
import { FunctionComponent, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { Theme } from "../interfaces/Theme";
import { getTheme } from "../services/themeService";

interface CustomeCardProps {
  card: Card;
}

const CustomeCard: FunctionComponent<CustomeCardProps> = ({ card }) => {

  const [themeId, setThemeId] = useState<number>();
  const [theme, setTheme] = useState<Theme>()

  const fetchTheme = async (themeId: number) => {
    const themeRes = await getTheme(themeId);
    const theme = themeRes.data[0];
    setTheme(theme);
  }

  useEffect(() => {
    setThemeId(card.data.themeId);
    themeId && fetchTheme(themeId);
  }, [card, themeId])

  return (
    <>
      {theme &&
        < Box
          w={{ base: '100%', sm: '400px', xl: '600px' }}
          maxW={{ base: '400px', xl: '600px' }}
          h={{ base: '200px', sm: '200px', xl: '300px' }}
          bg={theme.bg}
          borderRadius={theme.borderRadius}
          shadow='xl'
        >
          <Flex w='100%' h='100%' flexDir={theme.flexDir[0] as any} align={theme.flexAlign[0]} justify={theme.flexJustify[0]} gap={theme.flexGap[0]}>

            <Flex direction={theme.flexDir[1] as any} align={theme.flexAlign[1]} justify={theme.flexJustify[1]} gap={theme.flexGap[1]}>
              <Text as='b' fontSize={{ base: '26', xl: '48' }} color={theme.colors[0]}>
                {card.data.title}
              </Text>
              <Text textAlign={theme.textAlign as any} fontSize={{ base: '14', xl: '24' }} color={theme.colors[1]}>
                {card.data.description}
              </Text>
            </Flex>

            <Flex direction={theme.flexDir as any} align={theme.flexAlign} justify={theme.flexJustify[2]} gap={theme.flexGap[1]} fontSize={{ base: '10', xl: '16' }}>
              <Text color={theme.colors[2]}>
                {card.data.phone}
              </Text>
              <Text color={theme.colors[2]}>
                {card.data.email}
              </Text>
              <Text color={theme.colors[2]}>
                {card.data.address}
              </Text>
            </Flex>

          </Flex>
        </Box >
      }
    </>
  )
};


export default CustomeCard;