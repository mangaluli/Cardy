import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { FunctionComponent, useEffect } from "react";

interface AboutProps { }

const About: FunctionComponent<AboutProps> = () => {
  useEffect(() => { }, [])

  return (
    <Flex flexDir='column' justify='center' maxW='2xl' flex='1' mx='auto'>
      <Heading as="h1" size="xl" my='8' textAlign='center' textShadow='2px 2px 2px rgba(0,0,0, 0.2)'>
        About Cardy
      </Heading>
      <Box my={4} fontSize='lg' textShadow='1px 1px 1px rgba(0,0,0, 0.2)'>
        <Flex flexDir='column' gap='8'>
          <Text>
            Welcome to Cardy - the online platform for creating and sharing business cards. We understand that life can be tough, and sometimes it feels like nothing is going your way. But hey, at least you have a business card, right?
          </Text>
          <Text>
            Our platform is designed to help you make a lasting impression, even if your life is otherwise forgettable. We offer a range of customizable templates that can showcase your skills, your contact information, and your fading hopes and dreams. We won't promise that your card will get you a job or a promotion, but it might make people feel a little sorry for you. That's something, right?
          </Text>
          <Text>
            But we're not just about making business cards - we're a community of people who are all trying to make sense of this cruel, meaningless existence. Maybe you'll find some solace in connecting with others who are also struggling to find their place in the world. Or maybe you'll just get more depressed. Who knows?
          </Text>
          <Text>
            We're constantly updating our platform, but let's be real - it's not like it's going to change your life. We're just trying to make the best of a bad situation. Isn't that what life is all about? Just trying to survive, one day at a time?
          </Text>
          <Text>
            So, if you're feeling down and out, come on over to Cardy. We can commiserate together. Because really, what else do we have to live for?
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
}

export default About;