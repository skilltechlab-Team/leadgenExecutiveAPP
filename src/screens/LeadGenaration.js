import React, { useEffect, useState } from 'react';
import { Box, HStack, ScrollView, useToast } from 'native-base';
import { useSelector } from 'react-redux';
import CreateLead from '../../components/CreateLead';
import getAllVendors from '../../controller/getAllVendors';
import getAllExams from '../../controller/getAllExam'
import { useDispatch } from 'react-redux';
import { createExamsList } from '../../store/reducers/examList';
import SubmitButton from '../../components/SubmitButton';
import LoadingButton from '../../components/LoadingButton';
import AlertCreator from '../../components/AlertCreator'
import getStatus, { statusNames } from '../../constants/Satus';
import createALead from '../../controller/createALead';
const LeadGenaration = ({ navigation }) => {
    const allExecutives = useSelector(state => state.users.usersList)
    const [status, setStatus] = useState({});
    const currentUser = useSelector((state) => state.auth.auth[0]);
    const usrATTR = useSelector((state) => state.auth.auth[0][0].userAttr);
    let userID = '';
    usrATTR.forEach(element => {
        if (element.Name === 'custom:userID') {
            userID = element.Value;
        }
    });
    const toast = useToast()
    const username = currentUser[0].token.payload.username;
    const [userStatus, setUserStatus] = useState(false);
    const [lead, setLead] = useState({ vendor_id: '', exam_id: '', country_code: '', email: '', name: '', phone: '', payment: '', trainer_charges: '', net_profit: '', total_course_fee: '', exam_status: '', payment_status: '' });
    const [vendorList, setVendorList] = useState([]);
    const examListDetails = useSelector(state => state.exam.examsList);
    const dispatch = useDispatch();
    const [isUploading, setIsUploading] = useState(false);
    useEffect(() => {
        if (isActive()) {
            setUserStatus(isActive())
            setAllVendors()
        } else {
            navigation.replace('NotFound');
        }
    }, []);
    function calculateNetProfit(totalCoursefee, trainerCharges) {
        if (totalCoursefee.length > 0 && trainerCharges.length > 0) {
            let x = parseInt(totalCoursefee);
            let y = parseInt(trainerCharges)
            let c = x - y;
            setLead(lead => ({ ...lead, net_profit: c.toString() }))
        }
    }
    function isActive(usrname) {
        const execDetails = allExecutives.filter(exec => exec.username === username && exec.status === "active")
        return (execDetails.length > 0 ? true : false)
    }

    async function setAllVendors() {
        const allVendors = await getAllVendors();
        const activeVendors = allVendors.filter((v) => v._deleted !== true)
        setVendorList(activeVendors)
        const allExam = await getAllExams();
        const activeExams = allExam.filter((e) => e._deleted !== true)
        dispatch(createExamsList(activeExams))
    }

    async function onSubmit() {
        setIsUploading(true)
        calculateNetProfit(lead.total_course_fee, lead.trainer_charges);
        const { vendor_id, exam_id, country_code, email, name, phone, payment, trainer_charges, net_profit, total_course_fee, exam_status, payment_status } = lead;

        if (vendor_id !== '' && exam_id !== '' && country_code !== '' && email !== '' && name !== '' && phone !== '' && payment !== '' && trainer_charges !== '' && net_profit !== '' && total_course_fee !== '' && exam_status !== '' && payment_status !== '') {
            const leadDetailsObject = {
                name: name,
                email: email,
                country_code: country_code,
                phone: phone,
                exam_Id: exam_id,
                vendor_Id: vendor_id,
                payment_id: '',
                trainer_charges: trainer_charges,
                net_profit: net_profit,
                total_fees: total_course_fee,
                executiveID: userID,
                payment: payment
            }
            const paymentStatusDetails = {
                status: payment_status
            }
            const examStatusDetails = {

                status: exam_status,
                examID: exam_id
            }
            const submissionStatus = await createALead(leadDetailsObject, toast, paymentStatusDetails, examStatusDetails);
            if (submissionStatus !== -1) {
                setStatus(getStatus(statusNames.success, 'Lead Generated Successfully!'))
                setIsUploading(false)
                setLead({ vendor_id: '', exam_id: '', country_code: '', email: '', name: '', phone: '', payment: '', trainer_charges: '', net_profit: '', total_course_fee: '', exam_status: '', payment_status: '' })
            } else setStatus(getStatus(statusNames.error, 'Lead Generation Failed'))
            setIsUploading(false)
        } else {
            setStatus(getStatus(statusNames.error, 'All Fields Are Required'))
            setTimeout(() => {
                setStatus({})
                setIsUploading(false)
            }, 5000);
        }
    }


    if (userStatus) {
        return (
            <ScrollView flexGrow={1} keyboardShouldPersistTaps='handled'>
                <AlertCreator status={status} setStatus={setStatus} />
                <Box justifyContent={'center'} alignItems={'center'} my={3}>
                    <CreateLead leadSetter={[lead, setLead, vendorList, examListDetails, calculateNetProfit]} />
                </Box>
                <HStack w={'80%'} h={50} justifyContent={'center'} alignSelf={'center'} mt={-8} >
                    {
                        !isUploading ? <SubmitButton btnText={'CREATE LEAD'} onSubmit={onSubmit} />
                            :
                            <LoadingButton />
                    }
                </HStack>
                <Box h={50} my={2} p={10} />
            </ScrollView >
        )
    } else return <></>
}
export default LeadGenaration; 