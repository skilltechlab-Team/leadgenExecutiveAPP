import { API } from "aws-amplify"
import * as mutations from '../src/graphql/mutations'
export default updateLeadDetails = async (exam, payment, leadSetter, setPaymentDetails, setExamDetails, setLeadSetter, getStatus) => {
    let mod_payment = payment
    if (payment.status === 'Pending') {
        mod_payment = { ...payment, confirmation_number: "" }
    }

    try {
        API.graphql({ query: mutations.updateExamStatus, variables: { input: exam } }).then((status) => {
            if (status) {
                // console.log(`\nupdateExamStatus => `, status, `\n\n`);
                setExamDetails(exam => ({
                    ...exam,
                    _version: status.data.updateExamStatus._version,
                    status: status.data.updateExamStatus.status,
                    proposedDate: status.data.updateExamStatus.proposedDate,
                    proposedTime: status.data.updateExamStatus.proposedTime
                }))
                API.graphql({ query: mutations.updatePaymentMaster, variables: { input: mod_payment } }).then(res => {
                    if (res) {
                        setPaymentDetails((payment) => ({
                            ...payment,
                            _version: res.data.updatePaymentMaster._version,
                            status: res.data.updatePaymentMaster.status,
                            confirmation_number: res.data.updatePaymentMaster.confirmation_number
                        }))

                        API.graphql({ query: mutations.updateLeadMaster, variables: { input: leadSetter } }).then((r) => {
                            if (r) {
                                setLeadSetter(lead => ({
                                    ...lead,
                                    _version: r.data.updateLeadMaster._version,
                                    proposedDate: r.data.updateLeadMaster.proposedDate,
                                    proposedTime: r.data.updateLeadMaster.proposedTime,
                                    confirmation_number: r.data.updateLeadMaster.confirmation_number
                                }))
                                getStatus(r)
                            } else throw "Error: updateLeadMaster"
                        })
                    } else throw "Error: updatePaymentMaster"
                })
            } else throw "Error: updateExamStatus"
        })
    } catch (error) {
        console.log(error);
        getStatus(-1)
    }
}