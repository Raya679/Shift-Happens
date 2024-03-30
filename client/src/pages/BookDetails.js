import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

// import useFetch from './useFetch';

const BookDetails = () => {
  const { id } = useParams();
  const { data: book, error, isPending } = useFetch('http://localhost:7700/books/' + id);
  const navigate = useNavigate();

  return (
    <div className="BOOK">
      <div className="book-details">
        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {book && (
          <article>
            <div className="bookName">
              <h1 style={{textAlign:'center'}}>{book.title}</h1>
            </div>
            <div>
              <h3 style={{textAlign:'center'}}>~Written by {book.author}</h3>
            </div>
            <div className="bookPlot" style={{ color: 'black', fontSize: '18px' }}>
              <br></br>
              <h3>Plot:</h3>
              {book.plot.split('\n\n').map((paragraph, index) => (
                <p key={index} style={{ marginBottom: '10px', color: 'black', fontSize: '20px' }}>{paragraph}</p>
              ))}
            </div>
            <div className="bookImg" >
              <img src={book.image} alt={book.title} style={{ width: '300px', height: '500px' }} />
            </div>
            <div className="bookAuth" style={{fontSize:'20px', color:'black'}} >
              <h3>About The Author</h3>
              <p>{book.aboutAuthor}</p>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}

export default BookDetails;
