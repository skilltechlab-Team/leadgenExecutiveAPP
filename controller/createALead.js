import { API } from "aws-amplify"
import * as mutations from '../src/graphql/mutations'
export default createALead = async (lead, toast, paymentStatusDetails, examStatusDetails) => {
    //examStatusDetails.proposedDate === '' ? examStatusDetails[proposedDate] = null : '';
    // console.log(examStatusDetails);
    try {
        const leadOBJ = await API.graphql({ query: mutations.createLeadMaster, variables: { input: lead } });
        const leadMaster = await leadOBJ.data.createLeadMaster;
        const leadMasterID = leadMaster.id;
        const leadMasterVersion = leadMaster._version;
        if (leadMasterID) {
            paymentStatusDetails.leadMasterID = leadMasterID;
            examStatusDetails.leadMasterID = leadMasterID;
            const paymentStatus = await API.graphql({
                query: mutations.createPaymentMaster, variables: {
                    input: paymentStatusDetails
                }
            });
            const examStatus = await API.graphql({
                query: mutations.createExamStatus, variables: {
                    input: examStatusDetails
                }
            });
            const updateData = {
                id: leadMasterID,
                payment_id: paymentStatus.data.createPaymentMaster.id,
                _version: leadMaster._version
            }
            const updatePaymentID = await API.graphql({ query: mutations.updateLeadMaster, variables: { input: updateData } })
            return leadMasterID;
        } else return -1
    } catch (error) {
        console.log(error);
        const err = JSON.stringify(error)
        toast.show({
            description: err,
        })
        return -1;
    }
}