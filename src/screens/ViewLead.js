import React, { useState, useEffect, useCallback } from 'react';
import { Box, Heading, HStack, VStack } from 'native-base';
import getAllLead from '../../controller/getAllLead';
import LeadListView from '../../components/LeadListView';
import getExamStatus from '../../controller/getExamStatus';
import getPaymentStatus from '../../controller/getPaymentStatus';
import { RefreshControl, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { createLeadList } from '../../store/reducers/leadList';
import { createExamsStatus } from '../../store/reducers/examStatus';
import { useDispatch } from 'react-redux';
import { createPaymentStatus } from '../../store/reducers/paymentStatus';
const ViewLead = ({ navigation }) => {
    const dispatch = useDispatch();
    const leadList = useSelector(state => state.leadList.leadList)
    const examStatus = useSelector(state => state.examStatus.examStatus)
    const paymentStatus = useSelector(state => state.paymentStatus.paymentStatus)
    const [refresh, setRefresh] = useState(false);

    //console.log(examStatus);
    const [isUploading, setIsUploading] = useState(false);
    useEffect(() => {
        setAllLead();
    }, []);

    const currentUser = useSelector((state) => state.auth.auth[0]);
    const userAttr = currentUser[0].userAttr;
    let userId = ''
    userAttr.forEach(element => {
        if (element.Name === "custom:userID") {
            userId = element.Value
        }
    });
    const executiveLead = leadList.filter((l) => l.executiveID === userId)

    const setAllLead = useCallback(async () => {
        setRefresh(true);
        try {
            const leadOBJ = await getAllLead();
            const ex = await getExamStatus();
            const pm = await getPaymentStatus();
            if (leadOBJ.length > 0) {
                //  console.log(leadOBJ, ` <= lead`);
                dispatch(createLeadList([...leadOBJ]));
            }
            if (ex.length > 0) {
                //  console.log(ex, ` <= ex`);
                dispatch(createExamsStatus([...ex]))
            }

            if (pm.length > 0) {
                dispatch(createPaymentStatus([...pm]))
            }
            setRefresh(false);
        } catch (error) {
            console.log(error);
        }

    }, [leadList, examStatus, paymentStatus])
    async function doRefresh() {
        setAllLead()
    }

    return (
        (examStatus.length > 0 && examStatus[0].id !== 0) && (paymentStatus.length > 0 && paymentStatus[0].id !== 0) ?
            <Box flex={1}>
                <HStack w={'100%'} justifyContent={'space-between'} my={2}>
                    <VStack w={'25%'} ><Heading textAlign={'center'} size={'sm'}>Date</Heading></VStack>
                    <VStack w={'25%'} ><Heading textAlign={'center'} size={'sm'}>Lead Name</Heading></VStack>
                    <VStack w={'25%'} ><Heading textAlign={'center'} size={'sm'}>E.Status</Heading></VStack>
                    <VStack w={'25%'} ><Heading textAlign={'center'} size={'sm'}>P.Status</Heading></VStack>
                </HStack>

                <FlatList
                    data={executiveLead}
                    renderItem={({ item }) => {
                        const userExamDetails = examStatus.filter(es => es.leadMasterID === item.id);
                        const userPaymentDetails = paymentStatus.filter(pms => pms.leadMasterID === item.id);
                        if ((userExamDetails && userExamDetails.length > 0) && (userPaymentDetails && userPaymentDetails.length > 0)) {
                            return (
                                <LeadListView
                                    item={item}
                                    payload={[userExamDetails, userPaymentDetails]}
                                    refresh={setAllLead}
                                    lead={executiveLead}
                                    toggleIsUploading={[isUploading, setIsUploading]}
                                    navigation={navigation}
                                />
                            )
                        } else return (<></>)
                    }}
                    keyExtractor={(item) => item.id}
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={doRefresh}
                            tintColor="red"
                        />
                    }
                />

            </Box> :
            <></>
    );
}
export default ViewLead;