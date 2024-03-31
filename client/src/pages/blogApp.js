import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import BlogDetails from './BlogDetails';
import BookDetails from './BookDetails';
import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
