import React, { useEffect, useState } from 'react';
import { Box, Text, Heading, HStack, Pressable } from 'native-base';
import HandleLogin from '../../components/AuthComp/HandleLogin';
import getUsers from '../../controller/getUsers';
import handleLoginEvent, { getCurrentAuthenticatedUser } from '../../controller/handleLoginEvent';
import { useDispatch, useSelector } from 'react-redux';
import { createUserAuth } from '../../store/reducers/userAuth';
import usersList, { createUsersList } from '../../store/reducers/usersList';
import getStatus, { statusNames } from '../../constants/Satus';
import AlertCreator from '../../components/AlertCreator'
import LoadingButton from '../../components/LoadingButton'
import SubmitButton from '../../components/SubmitButton';
import UserLoading from '../../components/AuthComp/UserLoading'

const Login = ({ navigation }) => {
    const [loginHandler, setLoginHandler] = React.useState({ username: 'avik', password: 'Mahavir2' });
    const [status, setStatus] = useState({});
    const [isUploading, setIsUploading] = useState(false);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    // console.log(allExecutives);
    useEffect(() => {
        isUserAuthenticated();

    }, []);
    async function getUsersList() {
        const usersList = await getUsers();
        dispatch(createUsersList(usersList));
    }

    async function isUserAuthenticated() {
        const userDetails = await getCurrentAuthenticatedUser(setStatus);
        if (userDetails) {
            setIsLoading(false)
            await getUsersList()
            dispatch(createUserAuth([userDetails]));
            setStatus(getStatus(statusNames.success, "User Authenticated Successfully!"))
            setTimeout(() => {
                navigation.replace('DrawerRoutes', { screen: 'LeadGenaration' });
            }, 1500);
        } else {
            setIsLoading(false)
        }
    }
    const onSubmit = async () => {
        setIsUploading(true)
        const loginStatus = await handleLoginEvent(loginHandler, setStatus);
        if (loginStatus !== -1) {
            getUsersList()
            isUserAuthenticated()
            setIsUploading(false)
        } else {
            setIsUploading(false)
        }

    }
    return (
        !isLoading ?
            <Box flex={1} justifyContent={'center'} alignItems={'center'} >
                <Heading size={'md'} color={'amber.600'} > EXECUTIVE LOGIN </Heading>
                <Box backgroundColor={'light.50'} borderWidth={1 / 2} borderRadius={10} borderColor={'muted.300'} p={3} my={5} style={{ elevation: 10 }} px={5} w={'80%'} justifyContent={'center'} alignItems={'center'} pb={60} pt={5} >
                    <AlertCreator status={status} setStatus={setStatus} />
                    <HandleLogin loginHandler={loginHandler} setLoginHandler={setLoginHandler} />
                    <HStack w={'80%'} h={50} justifyContent={'center'} alignSelf={'center'} >
                        {
                            !isUploading ? <SubmitButton btnText={'LOGIN NOW'} onSubmit={onSubmit} />
                                :
                                <LoadingButton />
                        }
                    </HStack>
                </Box>
                <Pressable _pressed={{ opacity: 5 }} onPress={() => navigation.navigate('OtpScreen')}  >
                    <Text color={'danger.500'} >Forgot Password</Text>
                </Pressable>
            </Box>
            :
            <UserLoading />
    );

}
export default Login;