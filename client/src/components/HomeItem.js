import React from 'react'
import imageP from './learn-python.jpg'


const HomeItem = (props) => {
  const host="https://blogapp-backend-8qit.onrender.com";
  return (
    <div>
      <div className="card" style={{ maxWidth: '540px' }}>
        <img src={`%=${host}/uploads/${props.blog.image}`} className="img-fluid rounded-start" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.blog.title}</h5>
          <p className="card-text">{props.blog.content}</p>
          <p className="card-text"><small className="text-body-secondary">By - {props.blog.author} on {props.blog.date}</small></p>
          <a href={`/blog/${props.blog.slug}`} className="btn btn-primary">Read Blog</a>
        </div>
      </div>
    </div>
  )
}

export default HomeItem
