import { Auth, API, graphqlOperation } from 'aws-amplify';
import { listExamMasters } from '../src/graphql/queries';
const getAllExams = async () => {
    try {
        const examsObj = await API.graphql(graphqlOperation(listExamMasters));
        return (examsObj.data.listExamMasters.items);
    } catch (error) {
        console.log(error);
    }
}



export default getAllExams;