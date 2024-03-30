import { Link } from 'react-router-dom';

const BookList = ({ books }) => {
  return (  
    <div className="book-list">
      {books.map(book => ( 
        <div className="book-preview" key={book.id}>
          <Link to={`/books/${book.id}`}>
            <div className="book-list">
              <div className="left">
                <h1>{book.title}</h1>
                <p>Written by {book.author}</p>
              </div>
              <div className="right">
                <img src={book.display} alt={book.title} />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
 
export default BookList;
