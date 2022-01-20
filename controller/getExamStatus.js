import { Auth, API, graphqlOperation } from 'aws-amplify';
import { listExamStatuses } from '../src/graphql/queries';
const getExamStatus = async () => {
    try {
        const examstatus = await API.graphql(graphqlOperation(listExamStatuses));
        return (examstatus.data.listExamStatuses.items);
    } catch (error) {
        console.log(error);
    }
}



export default getExamStatus;