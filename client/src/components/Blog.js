import React, { useContext, useEffect,useRef, useState } from 'react'
import Blogdata from './tempblog.json'
import Blogpage from './Blogpage'
import BlogContext from '../Contextblog/BlogContext'

const Blog = () => {
    const [ublog,setUblog]=useState({title:"",content:"",author:"",slug:"",id:""});
    const context = useContext(BlogContext);
    const { getblogs, blogs ,updateBlog} = context;
    useEffect(() => {
        getblogs();
        // eslint-disable-next-line
    }, [])
    const ref=useRef(null);
    const closeRef=useRef(null);
    const UpdateBlog=(currBlog)=>{
        setUblog({title:currBlog.title,content:currBlog.content,author:currBlog.author,slug:currBlog.slug,id:currBlog._id})
        ref.current.click();


    }
    const onChange=(e)=>{
     setUblog({...ublog,[e.target.name]:e.target.value})
    }
    const handleClick=(e)=>{
        e.preventDefault();
        updateBlog(ublog.title,ublog.content,ublog.author,ublog.slug,ublog.id);
        closeRef.current.click();



    }
    return (

        <div>
            <div>
                <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {/* this is modal body */}
                                <div className="mb-2">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" value={ublog.title} onChange={onChange} />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Content</label>
                                    <textarea className="form-control" id="content" name="content" rows="3" value={ublog.content} onChange={onChange}></textarea>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Author</label>
                                    <input type="text" className="form-control" id="author" name="author" value={ublog.author} onChange={onChange} />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Slug</label>
                                    <input type="email" className="form-control" id="slug" name="slug" value={ublog.slug} onChange={onChange} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" ref={closeRef} data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="container" >
                <div className="row">
                    {blogs.length===0 && <h3>Add Blogs to show</h3>}
                    {blogs.length !== 0 && blogs.map((blog, index) => {
                        return (
                            <div className="col-md-6 my-2" key={index}>
                                <Blogpage blog={blog} id={blog._id} UpdateBlog={UpdateBlog} />
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default Blog
