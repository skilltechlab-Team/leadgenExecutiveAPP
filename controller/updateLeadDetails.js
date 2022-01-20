import { API } from "aws-amplify"
import * as mutations from '../src/graphql/mutations'
export default updateLeadDetails = async (exam, payment) => {
    try {
        const updateExam = await API.graphql({ query: mutations.updateExamStatus, variables: { input: exam } });
        const updatePayment = await API.graphql({ query: mutations.updatePaymentMaster, variables: { input: payment } });
        if (updateExam && updatePayment) {
            return 1;
        } else return -1;
    } catch (error) {
        console.log(error);
        return -1;
    }
}