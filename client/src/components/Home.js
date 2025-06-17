import React, { useContext,useEffect, useState } from 'react'
import HomeItem from './HomeItem'
import BlogContext from '../Contextblog/BlogContext'
import Spinner from './Spinner'
const Home = () => {
  const context=useContext(BlogContext);
  const {PostedBlogs,pblogs}=context;
  const [Loading ,setLoading]=useState(false);
  useEffect(()=>{
    const fetchPostedBlog=async()=>{
        setLoading(true);
        try {
        await PostedBlogs();
        } catch (error) {
            console.error("PostedBlog threw an error:", error);
        }
        finally{
            setLoading(false);
        }

    }
    fetchPostedBlog();
      
      // eslint-disable-next-line
  },[])
  return (
     <div>
           {Loading && <Spinner />}
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
