import { useQuery, gql, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import styles from '../CSS/Repositories.module.css'

const GET_REPO_NAME = gql`
query GET_REPO_DATA($userName:String!){
  viewer {
    starredRepositories(first: 10) {
      edges {
        cursor
        node {
          name
        }
      }
    }
  }
    user(login: $userName) {
      repositories(first: 5) {
        nodes {
          name
          id
        }
      }
    }
  }
`;

const SET_STAR = gql`
mutation AddStar($id:ID!) {
    addStar(input: {starrableId: $id}) {
      starrable {
        viewerHasStarred
      }
    }
  }
`;

const REMOVE_STAR = gql`
mutation RemoveStar($id:ID!){
  removeStar(input: {starrableId: $id}) {
    starrable {
      viewerHasStarred
    }
  }
}
`;

type repoDataType = { name?: string, id?: string, star?: boolean }
type RepositoriesTypes = { UserName: string }

export default function Repositories({ UserName }: RepositoriesTypes) {
  const Repo_Data = useQuery(GET_REPO_NAME, {
    variables: { userName: UserName },
  });
  const [addStar] = useMutation(SET_STAR);
  const [removeStar] = useMutation(REMOVE_STAR);
  const [showRepoData, setShowRepoData] = useState<repoDataType[]>([])
  useEffect(() => {
    if (Repo_Data.data !== undefined) {
      let arr = Repo_Data.data.viewer.starredRepositories.edges.map((edge: { node: { name: string } }) => edge.node.name)
      setShowRepoData(Repo_Data.data.user.repositories.nodes.map((n: repoDataType) => {
        let result = false
        arr.forEach((el: string) => {
          if (el === n.name) {
            result = true
            return
          }
          result = false
        })
        if (result) return { name: n.name, id: n.id, star: true }
        else return { name: n.name, id: n.id, star: false }
      }))
    }
  }, [Repo_Data])
  function SetStar(Id: string | undefined, position: number, starState: boolean | undefined) {
    if (starState) {
      removeStar({ variables: { id: Id } })
      changeRepoStarState(position, !starState)
    }
    else {
      addStar({ variables: { id: Id } })
      changeRepoStarState(position, !starState)
    }
  }
  function changeRepoStarState(position: number, state: boolean | undefined) {
    setShowRepoData(prev => {
      return prev.map((obj, index) => {
        if (index === position) return { ...obj, star: state }
        else return { ...obj }
      })
    })
  }
  return <>
    {showRepoData.map((repoObject, index) => {
      return <div key={repoObject.name} className={styles.repoBlock}>
        <h4>{repoObject.name}</h4>
        <button onClick={() => SetStar(repoObject.id, index, repoObject.star)}>{`${repoObject.star ? 'Starred' : 'Add to Star'}`}</button>
      </div>
    })}
  </>
}