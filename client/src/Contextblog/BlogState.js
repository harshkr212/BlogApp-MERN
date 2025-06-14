import BlogContext from "./BlogContext";
import React, { useState } from 'react'

const BlogState = (props) => {
    const [blogs,setBlogs]=useState([]);
    const [pblogs,setPblogs]=useState([])
    const localhost="http://localhost:5000"


    //add a blog 
    const addblog=async(title,content,author,slug)=>{
        //to do api calls
        const response=await fetch(`${localhost}/api/blogs/addblog`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({title,content,author,slug})
            
        })
        const blog=await response.json();
        console.log(blog);
        setBlogs(blogs.concat(blog));


    }
    //add blog with image
       const addBlogWithImage = async (formData) => {
        try {
             const response = await fetch(`${localhost}/api/blogs/addblog`, {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('token')
            },
            body: formData
        });
        const blog = await response.json();
        console.log("Blog with image added:", blog);
        setBlogs(blogs.concat(blog));
            
        } catch (error) {
             console.error("Upload failed:", error.message);
           alert(error.message); // Or show toast
            
        }
       
    };
    // get all blogs
    const getblogs=async()=>{
        const response=await fetch(`${localhost}/api/blogs/getblogs`,{
            method:'GET',
            headers:{
                'Content-Type':"application/json",
                'auth-token':localStorage.getItem('token')
            }
        })
        const allblog=await response.json();
        if(Array.isArray(allblog)){
            setBlogs(allblog);
        }
        else{
          console.error("Failed to fetch notes:", allblog);
          setBlogs([]); // prevent app from crashing
        }
        console.log("getblogs is called");
        return allblog;
    }
    //Mark Posted
    const markPosted=async(id)=>{
         const response=await fetch(`${localhost}/api/blogs/markposted/${id}`,{
            method:'PUT',
            headers:{
                'auth-token':localStorage.getItem('token')
            }
        })
        const markedposted= await response.json();
        console.log(markedposted);

    }
    //get all posted blogs 
    const PostedBlogs=async()=>{
         const response=await fetch(`${localhost}/api/blogs/postedblog`,{
            method:'GET',
        })
       
          const allblog=await response.json();
        if(Array.isArray(allblog)){
            setPblogs(allblog);
        }
        else{
          console.error("Failed to fetch notes:", allblog);
          setBlogs([]); // prevent app from crashing
        }
        console.log("getblogs is called");
        return allblog;
        
    }
    //Update blog Login required
    const updateBlog=async(title,content,author,slug,id)=>{
         console.log(localStorage.getItem('token'));
         const response=await fetch(`${localhost}/api/blogs/updateblog/${id}`,{
            method:'PUT',
             headers:{
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({title,content,author,slug})
            
        })
        const json=await response.json();
        console.log(json);
        
      let newBlogs= JSON.parse(JSON.stringify(blogs));
      for(let index=0;index<blogs.length;index++){
        const element= blogs[index];
        if(id===element._id){
            newBlogs[index].title=title;
            newBlogs[index].content=content;
            newBlogs[index].author=author;
            newBlogs[index].slug=slug;
        }
      }
   setBlogs(newBlogs);

    }
    // delete a blog
    const deleteblog=async(id)=>{
        const response=await fetch(`${localhost}/api/blogs/deleteblog/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':"application/json",
                'auth-token':localStorage.getItem('token')
            }
        })
        const json=await response.json();
        let newBlogs=blogs.filter((blog)=>{return blog._id!==id});
        setBlogs(newBlogs);

    }
  return (
    <div>
        <BlogContext.Provider value={{blogs,addBlogWithImage,setBlogs,addblog,getblogs,markPosted,pblogs,setPblogs,PostedBlogs,updateBlog,deleteblog}}>
            {props.children}
        </BlogContext.Provider>
      
    </div>
  )
}

export default BlogState
