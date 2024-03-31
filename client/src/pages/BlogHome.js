import React from 'react';
import BlogList from './BlogList';
import BookList from './BookList';
import useFetch from '../hooks/useFetch';
import SideBar from '../components/sideBar';


const BlogHome = () => {
    const { error: blogError, isPending: blogIsPending, data: blogs } = useFetch('http://localhost:7700/blogs');
    const { error: bookError, isPending: bookIsPending, data: books } = useFetch('http://localhost:7700/books');

    return (  
        <div className="flex">
            <SideBar/>
            <div className=" home">
                <h1 className='heading text-[40px]'>Popular Blogs</h1>
                {blogError && <div>{blogError}</div>}
                {blogIsPending && <div>Loading blogs...</div>}
                {blogs && <BlogList blogs={blogs} />}
                
                <h1 className='heading text-[40px]'>Classic Books on Mental Health</h1>
                {bookError && <div>{bookError}</div>}
                {bookIsPending && <div>Loading books...</div>}
                {books && <BookList books={books} />}
            </div>
        </div>
    );
}
 
export default BlogHome;
