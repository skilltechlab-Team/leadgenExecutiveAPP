import React, { useState, memo, useCallback, useEffect } from 'react';
import { Box, HStack, Text, VStack, Icon, Heading } from 'native-base';
import { MaterialIcons, FontAwesome } from "@expo/vector-icons"
import date from 'date-and-time';
import { Alert, TouchableOpacity } from 'react-native';
import updateLeadDetails from '../controller/updateLeadDetails';
import UpdateLead from './UpdateLead';
const LeadListView = ({ item, payload, refresh, toggleIsUploading, lead, navigation }) => {
    const pattern = date.compile('ddd, MMM DD YYYY');
    const createdAT = date.format(new Date(item.createdAt), pattern);
    const [showModal, setShowModal] = React.useState(false)
    const [isUploading, setIsUploading] = toggleIsUploading;
    const executiveLead = lead.filter(l => l.id === item.id)
    const [userExamDetails, userPaymentDetails] = payload
    const [examDetails, setExamDetails] = useState({
        id: 0,
        _version: 0,
        status: '',
        proposedDate: '',
        proposedTime: ''
    });
    const [paymentDetails, setPaymentDetails] = useState({
        id: 0,
        _version: 0,
        status: '',
        confirmation_number: ''
    });
    const [leadSetter, setLeadSetter] = useState({
        id: 0,
        _version: 0,
        status: '',
        confirmation_number: '',
        proposedTime: '',

    });
    const addexamDetails = useCallback(() => {
        setExamDetails(state => ({
            ...state,
            id: userExamDetails[0].id,
            _version: userExamDetails[0]._version,
            status: userExamDetails[0].status,
            proposedDate: userExamDetails[0].proposedDate,
            proposedTime: userExamDetails[0].proposedTime
        }));
    }, [examDetails]);
    const addpaymentDetails = useCallback(() => {
        setPaymentDetails(state => ({
            ...state,
            id: userPaymentDetails[0].id,
            _version: userPaymentDetails[0]._version,
            status: userPaymentDetails[0].status,
            confirmation_number: userPaymentDetails[0].confirmation_number
        }))
    }, [paymentDetails]);
    const addleadSetterDetails = useCallback(() => {
        setLeadSetter(state => ({
            ...state,
            id: executiveLead[0].id,
            _version: executiveLead[0]._version,
            proposedDate: executiveLead[0].proposedDate,
            proposedTime: executiveLead[0].proposedTime,
            confirmation_number: executiveLead[0].confirmation_number
        }))
    }, [leadSetter]);
    useEffect(() => {
        addexamDetails();
        addpaymentDetails();
        addleadSetterDetails();
    }, []);

    function onUpdate() {
        setIsUploading(true)
        updateLeadDetails(examDetails, paymentDetails, leadSetter, setPaymentDetails, setExamDetails, setLeadSetter, getStatus => {
            if (getStatus !== -1) {
                refresh()
                setShowModal(false)
                setIsUploading(false)
            } else {
                Alert.alert("Update Failed")
                setIsUploading(false)
            }
        })
    }

    return (

        <Box>
            {
                userExamDetails.length > 0 && userPaymentDetails.length > 0 &&
                <TouchableOpacity onPress={() => setShowModal(true)} key={examDetails.id} onLongPress={() => navigation.navigate('EditLeadDetails', { executiveLead })} >
                    {
                        <HStack w={'100%'} justifyContent={'space-between'} p={2} borderBottomWidth={1} borderBottomColor={'#000'} >
                            <VStack w={'25%'}  ><Heading textAlign={'center'} size={'sm'} fontWeight={'normal'} fontSize={'sm'} flexWrap={'wrap'} >{createdAT}</Heading></VStack>
                            <VStack w={'25%'} ><Heading textAlign={'center'} size={'sm'} fontWeight={'normal'} fontSize={'sm'} flexWrap={'wrap'}>{item.name}</Heading></VStack>
                            <VStack w={'25%'} ><Heading textAlign={'center'} size={'sm'} fontWeight={'normal'} fontSize={'sm'} flexWrap={'wrap'}>{examDetails.status}</Heading></VStack>
                            <VStack w={'25%'} ><Heading textAlign={'center'} size={'sm'} fontWeight={'normal'} fontSize={'sm'} flexWrap={'wrap'}>{paymentDetails.status}</Heading></VStack>
                        </HStack>
                    }
                    <UpdateLead
                        modalFN={[showModal, setShowModal]}
                        details={[examDetails, paymentDetails]}
                        userState={[setExamDetails, setPaymentDetails]}
                        updateFN={onUpdate}
                        uploadFn={[isUploading, setIsUploading]}
                        leadMaster={[leadSetter, setLeadSetter]}
                        key={examDetails.id}
                    />
                </TouchableOpacity>
            }

        </Box>
    );
}
export default memo(LeadListView);