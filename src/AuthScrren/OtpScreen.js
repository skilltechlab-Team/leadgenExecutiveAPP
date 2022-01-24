import React from 'react';
import { Box, Heading, HStack, Icon, Input, Pressable, ScrollView, Text, VStack, useToast } from 'native-base';
import FormController from '../../components/FormController';
import { MaterialIcons, AntDesign } from "@expo/vector-icons"
import SubmitButton from '../../components/SubmitButton';
import handleResetPassword, { fotgotPasswordSubmit } from '../../controller/forgotPassword';
import LoadingButton from '../../components/LoadingButton';
import { Alert } from 'react-native';
const { useState, useRef, useEffect } = React;
const OtpScreen = ({ navigation }) => {
    const toast = useToast();
    const [username, setUsername] = useState('');
    const [isShowOtpBoxes, setIsShowOtpBoxes] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isUpdatePasswordActive, setIsUpdatePasswordActive] = useState(true);
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const [newPassword, setnewPassword] = useState('');
    const [isAllBoxesFilled, setIsAllBoxesFilled] = useState(false);
    const [otpValues, setOtpValues] = useState({
        box1: '',
        box2: '',
        box3: '',
        box4: '',
        box5: '',
        box6: '',
        [Symbol.iterator]: function* () {
            for (let key in this) {
                yield [key, this[key]] // yield [key, value] pair
            }
        }
    });

    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const inputRef3 = useRef(null);
    const inputRef4 = useRef(null);
    const inputRef5 = useRef(null);
    const inputRef6 = useRef(null);



    useEffect(() => {
        if (otpValues.box1 !== '' && otpValues.box2 !== '' && otpValues.box3 !== '' && otpValues.box4 !== '' && otpValues.box5 !== '' && otpValues.box6 !== '')
            setIsAllBoxesFilled(true)
        else {
            if (otpValues.box1 !== '')
                inputRef2.current.focus();
            if (otpValues.box2 !== '')
                inputRef3.current.focus();
            if (otpValues.box3 !== '')
                inputRef4.current.focus();
            if (otpValues.box4 !== '')
                inputRef5.current.focus();
            if (otpValues.box5 !== '')
                inputRef6.current.focus();
        }

    }, [...otpValues]);

    console.log(newPassword);
    const onSubmit = async () => {
        setIsUploading(true);
        try {
            const response = await handleResetPassword(username);
            if (response.CodeDeliveryDetails) {
                setIsUploading(false)
                setIsShowOtpBoxes(true);
            } else throw response;
        } catch (err) {
            toast.show({
                description: err.message,
            });
            console.log(err);
            setIsUploading(false)
        }
    }

    const onUpdatePassword = async () => {
        setIsUpdatePasswordActive(false);
        const otp = otpValues.box1.toString() + otpValues.box2.toString() + otpValues.box3.toString() + otpValues.box4.toString() + otpValues.box5.toString() + otpValues.box6.toString();
        const response = await fotgotPasswordSubmit(username, otp, newPassword)
        try {
            if (response === 'SUCCESS') {
                toast.show({
                    description: "Your password changed successfully, Please Wait.....",
                })
                setIsUpdatePasswordActive(true);
                setTimeout(() => {
                    navigation.replace('DrawerRoutes', { screen: 'LeadGenaration' });
                }, 2000);
            } else throw response;
        } catch (error) {
            toast.show({
                description: error.message,
            });
            console.log(error);
            setIsUpdatePasswordActive(true);
        }
    }

    return (
        <ScrollView flexGrow={1} keyboardShouldPersistTaps='handled' pt={30} bg={'light.200'} >
            <Box py={5} />
            <Box justifyContent={'center'} alignItems={'center'} bg={'light.50'} mx={8} my={5} py={5} borderRadius={5} style={{ elevation: 15 }} >
                <Text color={'red.500'} >Enter Your Username</Text>
                <FormController>
                    <Input
                        w={{
                            base: "80%",
                            md: "25%",
                        }}
                        InputLeftElement={
                            <Icon
                                as={<MaterialIcons name="person" />}
                                size={5}
                                ml="2"
                                color="muted.400"
                            />
                        }
                        placeholder="Username"
                        borderColor={'muted.600'}
                        onChangeText={(val) => { setUsername(() => (val)) }}
                        onBlur={() => setUsername(username.trim())}
                        autoCapitalize='none'
                        value={username}
                        borderWidth={2}
                        autoCorrect={false}
                    />
                </FormController>
                <Box w={'80%'} mt={-5} >
                    {
                        !isUploading ? <SubmitButton size='lg' btnText={"RESET PASSWORD"} onSubmit={onSubmit} /> : <LoadingButton size='lg' />
                    }
                </Box>
                <Box py={2} />
            </Box>
            <Box>
                {
                    isShowOtpBoxes &&
                    <Box my={3} bg={'light.50'} py={5} mx={5} alignSelf={'center'} w={'85%'} alignItems={'center'} pb={7} >
                        <Box justifyContent={'center'} alignItems={'center'} mb={2} >
                            <Heading size={'sm'} color={'red.600'} >--  Enter OTP --</Heading>
                            <Text>OTP has been sent to your Email</Text>
                        </Box>
                        <HStack justifyContent={'space-around'} w={'100%'} px={3} >
                            <VStack>
                                <Input
                                    borderWidth={2}
                                    borderColor={'dark.500'}
                                    textAlign={'center'}
                                    size={'lg'}
                                    maxLength={1}
                                    keyboardType='numeric'
                                    value={otpValues.box1}
                                    onChangeText={(val) => {

                                        setOtpValues(((otpValues) => ({ ...otpValues, box1: val })))

                                    }}
                                    ref={inputRef1}
                                />
                            </VStack>
                            <VStack>
                                <Input
                                    borderWidth={2}
                                    borderColor={'dark.500'}
                                    textAlign={'center'}
                                    size={'lg'}
                                    maxLength={1}
                                    keyboardType='numeric'
                                    value={otpValues.box2}
                                    onChangeText={(val) => {
                                        setOtpValues({ ...otpValues, box2: val })
                                    }}
                                    ref={inputRef2}
                                />
                            </VStack>
                            <VStack>
                                <Input
                                    borderWidth={2}
                                    borderColor={'dark.500'}
                                    textAlign={'center'}
                                    size={'lg'}
                                    maxLength={1}
                                    keyboardType='numeric'
                                    value={otpValues.box3}
                                    onChangeText={(val) => {
                                        setOtpValues({ ...otpValues, box3: val })
                                    }}
                                    ref={inputRef3}
                                />
                            </VStack>
                            <VStack>
                                <Input
                                    borderWidth={2}
                                    borderColor={'dark.500'}
                                    textAlign={'center'}
                                    size={'lg'}
                                    maxLength={1}
                                    keyboardType='numeric'
                                    value={otpValues.box4}
                                    onChangeText={(val) => setOtpValues((otpval) => ({ ...otpval, box4: val }))}
                                    ref={inputRef4}
                                />
                            </VStack>
                            <VStack>
                                <Input
                                    borderWidth={2}
                                    borderColor={'dark.500'}
                                    textAlign={'center'}
                                    size={'lg'}
                                    maxLength={1}
                                    keyboardType='numeric'
                                    value={otpValues.box5}
                                    onChangeText={(val) => setOtpValues((otpval) => ({ ...otpval, box5: val }))}
                                    ref={inputRef5}
                                />
                            </VStack>
                            <VStack>
                                <Input
                                    borderWidth={2}
                                    borderColor={'dark.500'}
                                    textAlign={'center'}
                                    size={'lg'}
                                    maxLength={1}
                                    keyboardType='numeric'
                                    value={otpValues.box6}
                                    onChangeText={(val) => setOtpValues((otpval) => ({ ...otpval, box6: val }))}
                                    ref={inputRef6}
                                />
                            </VStack>
                        </HStack>
                        {
                            isAllBoxesFilled &&
                            <Box my={5}>
                                <Box pt={2} >
                                    <Text color={'red.700'} >Enter New Password</Text>
                                </Box>
                                <Input
                                    my={3}
                                    type={show ? "text" : "password"}
                                    w={{
                                        base: "90%",
                                        md: "25%",
                                    }}
                                    InputRightElement={
                                        <Pressable onPress={handleClick}>
                                            {
                                                show ? <Icon
                                                    as={<MaterialIcons name="visibility" />}
                                                    size={5}
                                                    mr="2"
                                                    color="muted.400"
                                                /> :
                                                    <Icon
                                                        as={<MaterialIcons name="visibility-off" />}
                                                        size={5}
                                                        mr="2"
                                                        color="muted.400"
                                                    />
                                            }
                                        </Pressable>
                                    }
                                    InputLeftElement={
                                        <Icon
                                            as={<MaterialIcons name="lock" />}
                                            size={5}
                                            ml="2"
                                            color="muted.400"
                                        />
                                    }

                                    placeholder="New Password"
                                    borderColor={'muted.600'}
                                    value={newPassword}
                                    onChangeText={(val) => setnewPassword(val)}
                                />
                                <Box mt={-5}>
                                    {
                                        isUpdatePasswordActive ? <SubmitButton btnText={"UPDATE PASSWORD"} size='lg' onSubmit={onUpdatePassword} /> : <LoadingButton size='lg' />
                                    }
                                </Box>
                            </Box>
                        }
                    </Box>
                }
            </Box>
            <Box py={10} />
        </ScrollView>
    );
}
export default OtpScreen;
/*
<Box w={'80%'} mt={-5} >
                    {
                        !isUploading ? <SubmitButton size='lg' btnText={"RESET PASSWORD"} onSubmit={onSubmit} /> : <LoadingButton size='lg' />
                    }
                </Box>
                <Box py={2} />
                */