import { useQuery, gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import NavBar from './Components/NavBar';
import Repositories from './Components/Repositories';
const GET_USERNAME = gql`
    query { 
        viewer { 
          login
        }
      }
`;
export default function UI() {
  const Data = useQuery(GET_USERNAME);
  const [userName, setUserName] = useState('')
  useEffect(() => {
    if (Data.data !== undefined) setUserName(Data.data.viewer.login)
  }, [Data.data])
  return (
    <>
      <NavBar />
      <Repositories UserName={userName} />
    </>
  )
}