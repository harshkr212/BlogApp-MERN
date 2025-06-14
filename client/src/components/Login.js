import React, { useContext, useState } from 'react'
import UserContext from '../Contextblog/UserContext'

const Login = () => {
     const context=useContext(UserContext);
     const { userLogin }=context;
    const[credential,setCredential]=useState({email:"",password:""})
   const handleClick=async(e)=>{
    e.preventDefault();
   const success=await userLogin(credential.email,credential.password);
   if(success){
    console.log(success);
   }
   else{
    console.log(success);
   }
    }
    const handleChange=(e)=>{
        setCredential({...credential,[e.target.name]:e.target.value})
    }
    return (
        <div className='container'>
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credential.email} onChange={handleChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={credential.password} onChange={handleChange} id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
