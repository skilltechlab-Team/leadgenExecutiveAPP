import { API } from "aws-amplify"
import * as mutations from '../src/graphql/mutations'
export default createALead = async (lead, toast, paymentStatusDetails, examStatusDetails) => {
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