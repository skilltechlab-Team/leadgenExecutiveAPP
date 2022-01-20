import { Auth, API, graphqlOperation } from 'aws-amplify';
import { listPaymentMasters } from '../src/graphql/queries';
const getPaymentStatus = async () => {
    try {
        const paymentstatus = await API.graphql(graphqlOperation(listPaymentMasters));
        return (paymentstatus.data.listPaymentMasters.items);
    } catch (error) {
        console.log(error);
    }
}



export default getPaymentStatus;