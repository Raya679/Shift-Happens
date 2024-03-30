import React from 'react';
import BlogList from './BlogList';
import BookList from './BookList';
import useFetch from '../hooks/useFetch';


const Home = () => {
    const { error: blogError, isPending: blogIsPending, data: blogs } = useFetch('http://localhost:7700/blogs');
    const { error: bookError, isPending: bookIsPending, data: books } = useFetch('http://localhost:7700/books');

    return (  
        <div className="home">
            <h1 className='heading'>Popular Blogs</h1>
            {blogError && <div>{blogError}</div>}
            {blogIsPending && <div>Loading blogs...</div>}
            {blogs && <BlogList blogs={blogs} />}
            
            <h1 className='heading'>Classic Books on Mental Health</h1>
            {bookError && <div>{bookError}</div>}
            {bookIsPending && <div>Loading books...</div>}
            {books && <BookList books={books} />}
        </div>
    );
}
 
export default Home;
