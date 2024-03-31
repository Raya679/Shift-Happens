import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch('http://localhost:7700/blogs/' + id);
  const navigate = useNavigate();

  return (
    <div className="BLOG">
      <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <div className="blogName">
            <h1 style={{textAlign:'center'}}>{blog.title}</h1>
          </div>
          <div className="authorName">
            <h3 style={{textAlign:'center'}}>~Written by {blog.author}</h3>
            <br />
          </div>
          <div className="blogContent">
            {blog.body.split('\n\n').map((paragraph, index) => (
              <p key={index} style={{ marginBottom: '10px', color:'black', fontSize: '18px' }}>{paragraph}</p>
            ))}
          </div>
          <img src={blog.image} alt={blog.title} style={{width:'600px', alignItems:'center'}}/>
          <div className="authorDesc" style={{ color: 'black', fontSize:'18px' }}>
            <br></br>
            <h3>About The Author:</h3><br></br>
            {blog.aboutAuthor}
          </div>
        </article>
      )}
    </div>
    </div>

  );
}

export default BlogDetails;
