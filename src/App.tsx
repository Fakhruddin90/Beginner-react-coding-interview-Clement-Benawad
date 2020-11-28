import * as React from "react";
import axios from "axios";
import "./styles.css";

const { useRef, useEffect, useState } = React;

// https://randomuser.me/api

interface UserName {
  first: string;
  last: string;
  title: string;
}

interface UserPicture {
  thumbnail: string;
}

interface UserInfo {
  name: UserName;
  picture: UserPicture;
}

// const fetchRandomData = () => {
//   // ?page=2
//   return axios
//     .get("https://randomuser.me/api")
//     .then(({ data }) => {
//       // handle success
//       console.log(data);
//       // return JSON.stringify(data);
//       // return JSON.stringify(data, null, 2);
//       return data;
//     })
//     .catch((err) => {
//       // handle error
//       console.log(err);
//     });
// };
const fetchRandomData = (pageNumber) => {
  // ?page=2
  return axios
    .get(`https://randomuser.me/api?page=${pageNumber}`)
    .then(({ data }) => data)
    .catch((err) => {
      console.log(err);
    });
};

const getFullUserName = (userInfo: UserInfo) => {
  const {
    name: { first, last }
  } = userInfo;
  return `${first} ${last}`;
};

export default function App() {
  const [counter, setCounter] = useState(0);
  const [nextPageNumber, setNextPageNumber] = useState(1);
  const [userInfos, setUserInfos] = useState<any>([]);
  const [randomUserDataJSON, setRandomUserDataJSON] = useState("");

  const fetchNextUser = useRef(() => {});

  fetchNextUser.current = () => {
    fetchRandomData(nextPageNumber).then((randomData) => {
      // setRandomUserDataJSON(
      //   JSON.stringify(randomData, null, 2) || "No user data found"
      // );
      if (randomData === undefined) return alert("End of page"); // return nothing when out of page
      const newUserInfos = [...userInfos, ...randomData.results];
      setUserInfos(newUserInfos);
      setNextPageNumber(randomData.info.page + 1);
    });
  };

  // if (5) {
  //   return true
  // }

  useEffect(() => {
    fetchNextUser.current();
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <p>{counter}</p>
      <button
        onClick={() => {
          setCounter(counter + 1);
          console.log("foo");
        }}
      >
        Increase Counter
      </button>
      <button
        onClick={() => {
          fetchNextUser.current();
        }}
      >
        Fetch Next User
      </button>
      {/* <button
        onClick={() => {
          fetchRandomData();
        }}>Fetch Random Data</button> */}
      {userInfos.map((userInfo: UserName, idx: number) => (
        <div key={idx}>
          <p>{getFullUserName(userInfo)}</p>
          <img src={userInfo.picture.thumbnail} />
        </div>
      ))}
      {/* <p>{randomUserDataJSON}</p> */}
    </div>
  );
}

// const fetchRandomData = () => {
//   return axios.get('https://randomuser.me/api')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.err(error);
//   });
// }
