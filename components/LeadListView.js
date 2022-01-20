import React, { useState } from 'react';
import { Box, HStack, Text, VStack, Icon, Heading } from 'native-base';
import { MaterialIcons, FontAwesome } from "@expo/vector-icons"
import date from 'date-and-time';
import { Alert, TouchableOpacity } from 'react-native';
import updateLeadDetails from '../controller/updateLeadDetails';
import UpdateLead from './UpdateLead';
const LeadListView = ({ item, payload, refresh }) => {
    const pattern = date.compile('ddd, MMM DD YYYY');
    const createdAT = date.format(new Date(item.createdAt), pattern);
    const [examStatus, paymentStatus] = payload
    const userExamDetails = examStatus.filter(es => es.leadMasterID === item.id)[0];
    const userPaymentDetails = paymentStatus.filter(pms => pms.leadMasterID === item.id)[0];
    const [showModal, setShowModal] = React.useState(false)
    const [examDetails, setExamDetails] = useState({ id: userExamDetails.id, _version: userExamDetails._version, status: userExamDetails.status });
    const [paymentDetails, setPaymentDetails] = useState({ id: userPaymentDetails.id, _version: userPaymentDetails._version, status: userPaymentDetails.status });
    const [isUploading, setIsUploading] = useState(false);
    async function onUpdate() {
        setIsUploading(true)
        const st = await updateLeadDetails(examDetails, paymentDetails)
        console.log(st);
        if (st !== -1) {
            await refresh()
            setShowModal(false)
            setIsUploading(false)
        } else {
            Alert.alert("Update Failed")
            setIsUploading(false)
        }
    }
    return (
        <TouchableOpacity onPress={() => setShowModal(true)} >
            <HStack w={'100%'} justifyContent={'space-between'} p={2} borderWidth={1} borderBottomColor={'#000'} >
                <VStack w={'25%'}  ><Heading textAlign={'center'} size={'sm'} fontWeight={'normal'} fontSize={'sm'} flexWrap={'wrap'} >{createdAT}</Heading></VStack>
                <VStack w={'25%'} ><Heading textAlign={'center'} size={'sm'} fontWeight={'normal'} fontSize={'sm'} flexWrap={'wrap'}>{item.name}</Heading></VStack>
                <VStack w={'25%'} ><Heading textAlign={'center'} size={'sm'} fontWeight={'normal'} fontSize={'sm'} flexWrap={'wrap'}>{userExamDetails.status}</Heading></VStack>
                <VStack w={'25%'} ><Heading textAlign={'center'} size={'sm'} fontWeight={'normal'} fontSize={'sm'} flexWrap={'wrap'}>{userPaymentDetails.status}</Heading></VStack>
            </HStack>
            <UpdateLead modalFN={[showModal, setShowModal]} details={[examDetails, paymentDetails]} userState={[setExamDetails, setPaymentDetails]} updateFN={onUpdate} uploadFn={[isUploading, setIsUploading]} />
        </TouchableOpacity>
    );
}
export default LeadListView;