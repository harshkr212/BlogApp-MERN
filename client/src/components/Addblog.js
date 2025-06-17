import React,{useContext,useState} from 'react'
import BlogContext from '../Contextblog/BlogContext'

const Addblog = () => {
    const context=useContext(BlogContext);
    const { addblog ,addBlogWithImage}=context;
    const [image,setImage]=useState(null);
    const [blog,setBlog]=useState({title:"",content:"",author:"",slug:""})
    // const handleSubmit=(e)=>{
    //     e.preventDefault();
    //     addblog(blog.title,blog.content,blog.author,blog.slug);
    //     setBlog({title:"",content:"",author:"",slug:""})
    // }
    const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", blog.title);
  formData.append("content", blog.content);
  formData.append("author", blog.author);
  formData.append("slug", blog.slug);
  if (image) formData.append("image", image);

  await addBlogWithImage(formData);
  setBlog({ title: "", content: "", author: "", slug: "" });
  setImage(null);
};
    const handleClear=(e)=>{
         e.preventDefault();
          setBlog({title:"",content:"",author:"",slug:""});

    }
    const onChange=(e)=>{
      setBlog({...blog,[e.target.name]:e.target.value})
    }
    const handleImageChange=(e)=>{
        setImage(e.target.files[0]);

    }
    return (
        <div className='container'>
            <div className="mb-2">
                <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" value={blog.title} onChange={onChange} />
            </div>
            <div className="mb-2">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Content</label>
                <textarea className="form-control" id="content" name="content" rows="3" value={blog.content} onChange={onChange}></textarea>
            </div>
            <div className="mb-2">
                <label htmlFor="exampleFormControlInput1" className="form-label">Author</label>
                <input type="text" className="form-control" id="author" name="author" value={blog.author} onChange={onChange} />
            </div>
            <div className="mb-2">
                <label htmlFor="exampleFormControlInput1" className="form-label">Slug</label>
                <input type="text" className="form-control" id="slug" name="slug" value={blog.slug} onChange={onChange} />
            </div>
            <div className='mb-2'>
                <label htmlFor="exampleFormControlInput1" className="form-label">Image</label>
                <input type="file" name="image" className="form-control" required accept="image/*" onChange={handleImageChange} />
            </div>
            <button type="submit" className="btn btn-primary mx-2" disabled={!image} onClick={handleSubmit}>Submit</button>
            <button type="submit" className="btn btn-primary mx-2" onClick={handleClear}>Clear</button>

        </div>
    )
}

export default Addblog
