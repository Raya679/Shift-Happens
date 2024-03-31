import { Link } from 'react-router-dom';
// import SideBar from '../components/sideBar';

const BlogList = ({blogs}) => {
  return (  
    <div className="flex">
      {/* <SideBar/> */}
    
    <div className="blogList">
      {blogs.map(blog=>(
        <div className="blog-preview" key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            <div className="blog-list">
            <div className="left">
              <h1>{blog.title}</h1>
              <p>Written by {blog.author}</p>
            </div>
            <div className="right">
              <img src={blog.display} alt={blog.title} />
            </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
    </div>
  );
}
 
export default BlogList;