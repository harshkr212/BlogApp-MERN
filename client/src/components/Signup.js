import React, { useContext, useState } from 'react'
import UserContext from '../Contextblog/UserContext';

const Signup = () => {
    const context=useContext(UserContext);
    const {userSignup}=context;
    const[credential,setCredential]=useState({name:"",email:"",password:""});
    const handleClick=(e)=>{
        e.preventDefault();
        userSignup(credential.name,credential.email,credential.password);
        setCredential({name:"",email:"",password:""});
    }
    const handleChange=(e)=>{
      setCredential({...credential,[e.target.name]:e.target.value})
    }
  return (
   <div className='container'>
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={credential.name} onChange={handleChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credential.email} onChange={handleChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={credential.password} onChange={handleChange} id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
  )
}

export default Signup
