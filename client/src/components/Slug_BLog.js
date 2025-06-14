import {useContext, useEffect,useState} from 'react'
import BlogContext from '../Contextblog/BlogContext'
import { useParams } from 'react-router-dom';

const Slug_BLog = () => {
   const host="https://blogapp-backend-8qit.onrender.com"
   const { slug } = useParams();
    const context=useContext(BlogContext);
    const {PostedBlogs}=context;
    const[blog,setBlog]=useState();
    const fetchAllBlogs=async()=>{
      const allBlogs=await PostedBlogs();
       const matched=allBlogs.find((b)=>b.slug===slug)
      setBlog(matched);
    }
  useEffect(()=>{
    fetchAllBlogs();
  },[slug])
  if(!blog){
    return (<h1>Loading...</h1>)
  }

  return (
    <div>
        <div class="card mb-3">
  <img src={`${host}/uploads/${blog.image}`} class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">{blog.title}</h5>
    <p class="card-text">{blog.content}</p>
    <p class="card-text"><small class="text-body-secondary">By - {blog.author} on {blog.date}</small></p>
  </div>
</div>
      
    </div>
  )
}

export default Slug_BLog
