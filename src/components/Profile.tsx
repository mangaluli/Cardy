import { Flex, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface ProfileProps {

}

const Profile: FunctionComponent<ProfileProps> = () => {
  return (
    <>
      <Flex w='100%' h='999px' minH='666px' maxH='80vh' justify='center' align='center'>
        <Text as='b' fontSize='9xl'>My Profile</Text>
      </Flex>
    </>
  );
}

export default Profile;