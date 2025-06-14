import React, { useContext, useEffect } from 'react'
import {
  Link,
  useLocation,
  useNavigate
} from 'react-router-dom'
import UserContext from '../Contextblog/UserContext';

const Navbar = () => {
  const context = useContext(UserContext);
  const location = useLocation();
  const { userDetails, user } = context;
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/login')

  }
  useEffect(() => {
     const token=localStorage.getItem('token');
      console.log("Sending Token",token);
      if(token){
         try {
        userDetails();
   } catch (error) {
    console.error("userDetails threw an error:", error);
   }

      }
  

  }, [location])


  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Fast Blogs</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              {localStorage.getItem('token') && (<li className="nav-item">
                <Link className="nav-link" to="/blogs">myBlogs</Link>
              </li>)}
              {localStorage.getItem('token') && (<li className="nav-item">
                <Link className="nav-link" to="/addblogs">AddBlog</Link>
              </li>)}
            </ul>
            {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
            {!localStorage.getItem('token') ? <form><Link className="btn btn-primary mx-2" role="button" to="/login">Login</Link>
              <Link className="btn btn-primary mx-2" role="button" to="/signup">SignUp</Link></form> :
              <form>
                {user && (
                    <ul className="navbar-nav">
                 
                  <li className="nav-item dropdown">
                    <button className="nav-link dropdown-toggle" 
                    data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="fa-solid fa-user"></i>  {user.name}
                    </button>
                    <ul className="dropdown-menu">
                      <li> <button className='btn btn-primary dropdown-item' onClick={handleClick}>Logout</button></li>
                    </ul>
                  </li>
                  </ul>
                )}
               
                 
              </form>
            }
            {/* {!localStorage.getItem('token')?<form> <Link className="btn btn-primary mx-2" role="button" to="/login">Login</Link>
            <Link className="btn btn-primary mx-2" role="button" to="/signup">SignUp</Link></form>:<button className='btn btn-primary mx-2' onClick={handleClick}>Logout</button>} */}
            
           
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
