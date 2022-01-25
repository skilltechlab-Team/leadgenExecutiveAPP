import { Auth, API, graphqlOperation } from 'aws-amplify';
import { listLeadMasters } from '../src/graphql/queries';
const getAllLead = async () => {
    console.log('lead running');
    try {
        const leadsObj = await API.graphql(graphqlOperation(listLeadMasters));
        return (leadsObj.data.listLeadMasters.items);
    } catch (error) {
        console.log(error);
    }
}



export default getAllLead;