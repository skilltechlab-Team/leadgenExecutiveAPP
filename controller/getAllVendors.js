import { Auth, API, graphqlOperation } from 'aws-amplify';
import { listVendorMasters } from '../src/graphql/queries';
const getAllVendors = async () => {
    try {
        const vendorsObj = await API.graphql(graphqlOperation(listVendorMasters));
        return (vendorsObj.data.listVendorMasters.items);
    } catch (error) {
        console.log(error);
    }
}



export default getAllVendors;