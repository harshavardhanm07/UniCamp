import axios from 'axios';
import React, { useState, useEffect,useContext } from 'react';
import BASE_URL from '../config';
import {AuthContext} from '../context/logincontext';

export default function Profile() {

        const [data, setData] = useState(null);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

//   useEffect( () =>{
//     async function fetchData(){
//     await axios.get(BASE_URL+'/health',{
//       withCredentials:true}
    
//     ).then((res)=>{
//       console.log(res.data);
//       setData(res.data);
//     }).catch((err)=>{
//       console.log(err);
//     })

//   }
//   fetchData();
// },[])

useEffect(() => {
  async function fetchData() {
    try {
      const userResponse = await axios.get(BASE_URL + '/auth/user', {
        withCredentials: true,
      });
      setIsLoggedIn(userResponse.data.isLoggedIn);

      if (userResponse.data.isLoggedIn) {
        const dataResponse = await axios.get(`${BASE_URL}/health`, {
          withCredentials: true,
        });
        setData(dataResponse.data);
      }
    } catch (error) {
      setIsLoggedIn(false);
    }
  }

  fetchData();
}, [isLoggedIn, setIsLoggedIn]);


  return (
    <div>
      <h1>Welcome to the Profile</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      
    </div>
  );
    }