import React, { useContext,useEffect } from 'react'
import HomeItem from './HomeItem'
import BlogContext from '../Contextblog/BlogContext'
const Home = () => {
  const context=useContext(BlogContext);
  const {PostedBlogs,pblogs}=context;
  useEffect(()=>{
      PostedBlogs();
      // eslint-disable-next-line
  },[])
  return (
     <div>
            <div className="container" >
            <div className="row">
            {pblogs.length!==0 && pblogs.map((blog, index) => {
                return (    
                        <div className="col-md-6 my-2" key={index}>
                            <HomeItem blog={blog} />
                        </div>
                )
            })}
             </div>
             </div>

        </div>
  )
}

export default Home
