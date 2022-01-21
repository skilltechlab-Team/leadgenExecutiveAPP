import React, { useState } from 'react';
import { Box, HStack, Text, VStack, Icon, Heading } from 'native-base';
import { MaterialIcons, FontAwesome } from "@expo/vector-icons"
import date from 'date-and-time';
import { Alert, TouchableOpacity } from 'react-native';
import updateLeadDetails from '../controller/updateLeadDetails';
import UpdateLead from './UpdateLead';
function isObject(val) {
    if (val === null) { return false; }
    return ((typeof val === 'function') || (typeof val === 'object'));
}
const LeadListView = ({ item, payload, refresh, toggleIsUploading, lead, navigation }) => {
    const pattern = date.compile('ddd, MMM DD YYYY');
    const createdAT = date.format(new Date(item.createdAt), pattern);
    const [examStatus, paymentStatus] = payload
    const userExamDetails = examStatus.filter(es => es.leadMasterID === item.id);
    const userPaymentDetails = paymentStatus.filter(pms => pms.leadMasterID === item.id);
    const [showModal, setShowModal] = React.useState(false)
    const [isUploading, setIsUploading] = toggleIsUploading;
    let eStatus = userExamDetails.length > 0 ? userExamDetails[0].status : ''
    let pStatus = userPaymentDetails.length > 0 ? userPaymentDetails[0].status : ''
    const [examDetails, setExamDetails] = useState({
        id: userExamDetails[0].id,
        _version: userExamDetails[0]._version,
        status: userExamDetails[0].status,
        proposedDate: userExamDetails[0].proposedDate,
        proposedTime: userExamDetails[0].proposedTime
    });
    const [paymentDetails, setPaymentDetails] = useState(
        {
            id: userPaymentDetails[0].id,
            _version: userPaymentDetails[0]._version,
            status: userPaymentDetails[0].status,
            confirmation_number: userPaymentDetails[0].confirmation_number
        });

    const executiveLead = lead.filter(l => l.id === item.id)
    const [leadSetter, setLeadSetter] = useState({
        id: executiveLead[0].id,
        _version: executiveLead[0]._version,
        proposedDate: executiveLead[0].proposedDate,
        proposedTime: executiveLead[0].proposedTime,
        confirmation_number: executiveLead[0].confirmation_number
    });



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
        <Box key={paymentDetails.id}>
            <TouchableOpacity onPress={() => setShowModal(true)} key={examDetails.id} onLongPress={() => navigation.navigate('EditLeadDetails', { executiveLead })} >
                {
                    <HStack w={'100%'} justifyContent={'space-between'} p={2} borderBottomWidth={1} borderBottomColor={'#000'} >
                        <VStack w={'25%'}  ><Heading textAlign={'center'} size={'sm'} fontWeight={'normal'} fontSize={'sm'} flexWrap={'wrap'} >{createdAT}</Heading></VStack>
                        <VStack w={'25%'} ><Heading textAlign={'center'} size={'sm'} fontWeight={'normal'} fontSize={'sm'} flexWrap={'wrap'}>{item.name}</Heading></VStack>
                        <VStack w={'25%'} ><Heading textAlign={'center'} size={'sm'} fontWeight={'normal'} fontSize={'sm'} flexWrap={'wrap'}>{eStatus}</Heading></VStack>
                        <VStack w={'25%'} ><Heading textAlign={'center'} size={'sm'} fontWeight={'normal'} fontSize={'sm'} flexWrap={'wrap'}>{pStatus}</Heading></VStack>
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

        </Box>
    );
}
export default LeadListView;