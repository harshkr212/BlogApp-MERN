import React, { useContext } from 'react'
import imageP from './learn-python.jpg'
import BlogContext from '../Contextblog/BlogContext'
const Blogpage = (props) => {
  const host="https://blogapp-backend-8qit.onrender.com"
  const context = useContext(BlogContext);
  const { markPosted, deleteblog } = context;
  const handleClick = (e) => {
    e.preventDefault();
    markPosted(props.id);
  }
  return (
    <div>
      <div className="card" style={{ maxWidth: '540px' }}>
        <img src={`${host}/uploads/${props.blog.image}`} className="img-fluid rounded-start" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.blog.title}</h5>
          <p className="card-text">{props.blog.content}</p>

          <p className="card-text"><small className="text-body-secondary">By - {props.blog.author} on {props.blog.date}</small></p>
          {!props.blog.posted ? <button className="btn btn-primary mx-2" onClick={handleClick}>POST</button> :
            <span className="btn btn-success mx-2" style={{ pointerEvents: "none", hover: "default", cursor: "default" }}>Posted✅</span>}
          <i className="fa-solid fa-trash mx-2" style={{ cursor: "pointer" }} onClick={() => { deleteblog(props.id) }}> </i>
          <i className="fa-solid fa-pen-to-square mx-2" style={{ cursor: "pointer" }} onClick={() => { props.UpdateBlog(props.blog) }}></i>

        </div>
      </div>

    </div>
  )
}

export default Blogpage
