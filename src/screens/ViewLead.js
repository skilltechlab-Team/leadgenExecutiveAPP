import React, { useState, useEffect } from 'react';
import { Box, Heading, HStack, VStack } from 'native-base';
import getAllLead from '../../controller/getAllLead';
import LeadListView from '../../components/LeadListView';
import getExamStatus from '../../controller/getExamStatus';
import getPaymentStatus from '../../controller/getPaymentStatus';
import { RefreshControl, FlatList } from 'react-native';
const ViewLead = () => {
    const [lead, setLead] = useState({});
    const [examStatus, setExamStatus] = useState([]);
    const [paymentStatus, setPaymentStatus] = useState([]);
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        setAllLead()
    }, []);

    async function setAllLead() {
        const leadOBJ = await getAllLead();
        const ex = await getExamStatus();
        const pm = await getPaymentStatus();
        setLead([...leadOBJ]);
        setExamStatus([...ex]);
        setPaymentStatus([...pm])
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
                    data={lead}
                    renderItem={({ item }) => (<LeadListView item={item} payload={[examStatus, paymentStatus]} refresh={setAllLead} />)}
                    keyExtractor={(item) => item.id}
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={() => setAllLead()}
                            tintColor="red"
                        />
                    }
                />

            </Box> :
            <></>
    );
}
export default ViewLead;