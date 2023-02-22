import { useQuery, gql } from '@apollo/client';
import { useEffect } from 'react';
const GET_LOCATIONS = gql`
    query { 
        viewer { 
          login
        }
      }
`;
export default function UI() {
    const Data = useQuery(GET_LOCATIONS);
    useEffect(() => {
        if (Data.data !== undefined) console.log(Data.data)
    }, [Data.data])
    return <h1>Open Console to view Fetched Output using GraphQL</h1>
}