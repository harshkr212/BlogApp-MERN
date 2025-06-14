import UserContext from "./UserContext";
import { useState } from 'react'
import {  useNavigate } from 'react-router-dom';

const UserState = (props) => {
    const host="http://localhost:5000";
    let navigate=useNavigate();
    const [user,setUser]=useState()
    //Login
    const userLogin=async(email,password)=>{
        const response=await fetch(`${host}/api/user/login`,{
             method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({email,password})
        })
        const json=await response.json();
        if(json.success){
            localStorage.setItem('token',json.authToken);
            console.log(json);
             navigate('/');
             return true;
        }
        else{
            console.log(json);
            return false;
        }
    }
    const userSignup=async(name,email,password)=>{
       const response=await fetch(`${host}/api/user/createuser`,{
             method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({name,email,password})
        })
        const json=await response.json();
        if(json.success){
            localStorage.setItem('token',json.authToken);
            console.log(json);
             navigate('/');
             return true;
        }
        else{
            console.log(json);
            return false;
        }

    }
    const userDetails=async()=>{
      const token=localStorage.getItem('token');
      try {
         const response=await fetch(`${host}/api/user/getuser`,{
             method:'GET',
            headers:{
                'auth-token':localStorage.getItem('token')
            }
          })
      if (!response.ok) {
      throw new Error(`Failed: ${response.status}`);
    }
    const json = await response.json();
    console.log("User details:", json);
    setUser(json);
        
      } catch (error) {
         console.error("Error in userDetails():", error.message);
        
      }
      // console.log("Sending Token",token);
      
      //     const json=await response.json();
      //     console.log(json);
      //     setUser(json);
   
      
    }
  return (
    <div>
      <UserContext.Provider value={{userLogin,userSignup,userDetails,user,setUser}}>
        {props.children}
      </UserContext.Provider>
    </div>
  )
}

export default UserState
