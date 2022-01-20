import React from 'react';
import { Box, Button, Heading, Text } from 'native-base';
import { Auth } from 'aws-amplify';
const NotFound = (props) => {
    async function signOut() {
        try {
            await Auth.signOut();
            props.navigation.replace("Login");
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
    return (
        <Box flex={1} justifyContent={'center'} alignItems={'center'} bg={'light.200'}>
            <Box>
                <Heading size={'sm'} textAlign={'center'} color={'red.600'} >You'r Login Status is Inactive,
                    You Can't Proceed</Heading>

            </Box>
            <Box w={'70%'} my={3} justifyContent={'center'} alignItems={'center'} >
                <Button size={'lg'} colorScheme='danger' onPress={signOut} >LOGOUT</Button>
            </Box>
        </Box>
    );
}
export default NotFound;