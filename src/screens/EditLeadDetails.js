import React, { useState, useRef } from 'react';
import { Box, CheckIcon, Heading, Icon, Input, ScrollView, Select, Text, VStack } from 'native-base';
import FormController from '../../components/FormController';
import { MaterialIcons, AntDesign } from "@expo/vector-icons"
import country_codes from '../../constants/country_codes'
import SubmitButton from '../../components/SubmitButton';
import LoadingButton from '../../components/LoadingButton';
import { API, graphqlOperation } from "aws-amplify"
import * as mutations from '../../src/graphql/mutations'
import getStatus, { statusNames } from '../../constants/Satus'
import AlertCreator from '../../components/AlertCreator';
import { RefreshControl, TouchableOpacity } from 'react-native';
import * as queries from '../../src/graphql/queries';

const EditLeadDetails = ({ route, navigation }) => {
    const { executiveLead } = route.params;
    const exLead = executiveLead[0];
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        const lead = await API.graphql(graphqlOperation(queries.getLeadMaster, { id: exLead.id }));
        setLead(() => {
            setRefreshing(!true);
            return ({
                id: lead.data.getLeadMaster.id,
                name: lead.data.getLeadMaster.name,
                phone: lead.data.getLeadMaster.phone,
                email: lead.data.getLeadMaster.email,
                country_code: lead.data.getLeadMaster.country_code,
                _version: lead.data.getLeadMaster._version
            })
        })
    }, []);
    React.useEffect(() => {
        onRefresh();
    }, [exLead])
    const [lead, setLead] = useState({
        id: exLead.id,
        name: exLead.name,
        phone: exLead.phone,
        email: exLead.email,
        country_code: exLead.country_code,
        _version: exLead._version
    });
    const countryDetails = useRef(country_codes())
    const [isUploading, setIsUploading] = useState(false);
    const [status, setStatus] = useState({});
    const onUpdate = async () => {
        setIsUploading(true)
        try {
            const response = await API.graphql({ query: mutations.updateLeadMaster, variables: { input: lead } });
            if (response) {
                setStatus(getStatus(statusNames.success, "Update Successfully Completed!"))
                setLead({
                    id: response.data.updateLeadMaster.id,
                    name: response.data.updateLeadMaster.name,
                    phone: response.data.updateLeadMaster.phone,
                    email: response.data.updateLeadMaster.email,
                    country_code: response.data.updateLeadMaster.country_code,
                    _version: response.data.updateLeadMaster._version
                })
                setIsUploading(false)
            }
        } catch (error) {
            console.log(error);
            if (!error.message) {
                let msg = JSON.stringify(error)
                setStatus(getStatus(statusNames.error, msg))
            } else setStatus(getStatus(statusNames.error, err.message))
            setLead({
                name: exLead.name,
                phone: exLead.phone,
                email: exLead.email,
                country_code: exLead.country_code
            })
            setIsUploading(false)
        }
    }


    return (
        <ScrollView flexGrow={1} keyboardShouldPersistTaps={'handled'} refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
        }
        >
            <Box h={90} px={3} bg={'indigo.500'} justifyContent={'space-between'} w={'100%'} alignItems={'center'} pt={30} flexDir={'row'} >
                <Box>
                    <Heading size={'md'} color={'#fff'}  >{exLead.name}</Heading>
                </Box>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon
                        as={<AntDesign name="leftcircle" />}
                        size={5}
                        color="#fff"
                    />
                </TouchableOpacity>
            </Box>
            <AlertCreator status={status} setStatus={setStatus} />
            <Box mt={5}>
                <FormController isRequired={true} label="Lead Name" >
                    <Input
                        w={{
                            base: "80%",
                            md: "25%",
                        }}
                        InputLeftElement={
                            <Icon
                                as={<MaterialIcons name="person-add" />}
                                size={5}
                                ml="2"
                                color="muted.400"
                            />
                        }
                        placeholder="Lead Name"
                        borderColor={'muted.600'}
                        onChangeText={(val) => {
                            setLead({ ...lead, name: val })
                        }}
                        onBlur={() => {
                            setLead({ ...lead, name: lead.name.trim() })
                        }}
                        value={lead.name}
                    />
                </FormController>
                <FormController isRequired={false} label="Lead Email" >
                    <Input

                        w={{
                            base: "80%",
                            md: "25%",
                        }}
                        InputLeftElement={
                            <Icon
                                as={<MaterialIcons name="email" />}
                                size={5}
                                ml="2"
                                color="muted.400"
                            />
                        }
                        placeholder="Lead Email"
                        borderColor={'muted.600'}
                        onChangeText={(val) => {
                            setLead({ ...lead, email: val })
                        }}
                        onBlur={() => {
                            setLead({ ...lead, email: lead.email.trim().toLowerCase() })
                        }}
                        value={lead.email}
                    />
                </FormController>
                <FormController isRequired={false} label="Country Code" >
                    <VStack alignItems="center" space={4} w={"80%"} >
                        <Select
                            minWidth="58%"
                            _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="5" />,
                            }}
                            mt={1}
                            placeholder="--Select Country--"
                            borderColor={'muted.600'}
                            onValueChange={(itemValue) => {
                                setLead({ ...lead, country_code: itemValue })
                            }}
                            selectedValue={lead.country_code}

                        >
                            {
                                countryDetails.current.map((country_code, index) => {
                                    const code = country_code.code;
                                    const name = country_code.name;
                                    return (<Select.Item label={code + " - " + name} value={code} key={index.toString()} />)
                                })
                            }

                        </Select>
                    </VStack>
                </FormController>
                <FormController isRequired={true} label="Lead Phone Number" >
                    <Input

                        w={{
                            base: "80%",
                            md: "25%",
                        }}
                        InputLeftElement={
                            <Icon
                                as={<MaterialIcons name="phone-android" />}
                                size={5}
                                ml="2"
                                color="muted.400"
                            />
                        }
                        keyboardType='decimal-pad'
                        placeholder="Lead Phone Number"
                        borderColor={'muted.600'}
                        onChangeText={(val) => {
                            setLead({ ...lead, phone: val })
                        }}
                        onBlur={() => {
                            setLead({ ...lead, phone: lead.phone.trim() })
                        }}
                        value={lead.phone}
                    />
                </FormController>
            </Box>
            <Box justifyContent={'center'} alignItems={'center'}>
                <Box w={'60%'} >
                    {
                        !isUploading ? <SubmitButton size='lg' btnText={"UPDATE LEAD"} onSubmit={onUpdate} /> : <LoadingButton size='lg' />
                    }
                </Box>
            </Box>
        </ScrollView>
    );
}
export default EditLeadDetails; 