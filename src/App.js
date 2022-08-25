import { useState } from "react";
import { useQuery, gql } from "@apollo/client";

const LIST_LAUNCHES = gql`
  query ListLaunches($limit: Int!, $offset: Int!) {
    launchesPast(limit: $limit, offset: $offset) {
      mission_name
      id
    }
  }
`;

const ITEM_PER_PAGE = 10;

function App() {
  const [pageNum, setPageNum] = useState(0);

  const { error, loading, data } = useQuery(LIST_LAUNCHES, {
    variables: {
      limit: ITEM_PER_PAGE,
      offset: pageNum * ITEM_PER_PAGE,
    },
  });
  console.log({
    error,
    loading,
    data,
  });

  if (loading) {
    return <h3>Loading ....</h3>;
  }

  if (error) {
    return <h3>An Error Has Been Occured</h3>;
  }

  return (
    <div className="App">
      <h1>React Pagination With Apollo Client Example</h1>
      {data.launchesPast.length > 0 ? (
        <ul>
          {data.launchesPast.map((item) => (
            <li key={item.id}>{item.mission_name}</li>
          ))}
        </ul>
      ) : (
        <h4>No data Found</h4>
      )}

      <button
        disabled={pageNum === 0}
        onClick={() => {
          setPageNum((prev) => prev - 1);
        }}
      >
        previous
      </button>
      <button
        onClick={() => {
          setPageNum((prev) => prev + 1);
        }}
        disabled={data.launchesPast.length === 0}
      >
        next
      </button>
    </div>
  );
}

export default App;
