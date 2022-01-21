import React, { useState, useEffect } from 'react';
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

    //  console.log(Math.random(), `  => `, paymentStatus);
    const [isUploading, setIsUploading] = useState(false);
    useEffect(() => {
        pullToUpdate();
        return () => {
            dispatch(createLeadList([]))
        }
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

    async function setAllLead() {
        try {
            const leadOBJ = await getAllLead();
            const ex = await getExamStatus();
            const pm = await getPaymentStatus();
            return ([{ leadOBJ }, { ex }, { pm }]);
        } catch (error) {
            console.log(error);
        }
    }
    async function doRefresh() {
        pullToUpdate()
    }
    const pullToUpdate = () => {
        setRefresh(true);
        setAllLead().then((r) => {
            if (r.length > 0) {
                r.forEach(element => {
                    if (Object.keys(element)[0] === "leadOBJ") {
                        dispatch(createLeadList([...element.leadOBJ]))
                    }
                    if (Object.keys(element)[0] === "pm") {
                        dispatch(createPaymentStatus([...element.pm]))
                    }
                    if (Object.keys(element)[0] === "ex") {
                        dispatch(createExamsStatus([...element.ex]))
                        setRefresh(false);
                    }
                });
            }
        })
    }
    return (
        examStatus.length > 0 && paymentStatus.length > 0 ?
            <Box flex={1}>
                <HStack w={'100%'} justifyContent={'space-between'} my={2}>
                    <VStack w={'25%'} ><Heading textAlign={'center'} size={'sm'}>Date</Heading></VStack>
                    <VStack w={'25%'} ><Heading textAlign={'center'} size={'sm'}>Lead Name</Heading></VStack>
                    <VStack w={'25%'} ><Heading textAlign={'center'} size={'sm'}>E.Status</Heading></VStack>
                    <VStack w={'25%'} ><Heading textAlign={'center'} size={'sm'}>P.Status</Heading></VStack>
                </HStack>

                <FlatList
                    data={executiveLead}
                    renderItem={({ item }) => (<LeadListView
                        item={item}
                        payload={[examStatus, paymentStatus]}
                        refresh={pullToUpdate}
                        lead={executiveLead}
                        toggleIsUploading={[isUploading, setIsUploading]}
                        navigation={navigation}
                    />)}
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