import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BookItem from './BookItem';

class ListBooks extends Component {
  static propTypes = {
		books: PropTypes.array.isRequired
  }

  normalizeShelf = (shelf) => (
    shelf.charAt(0).toLowerCase() + shelf.slice(1).replace(/\s/g, "")
  )
  
  render() {
    const shelfs = ["Currently Reading", "Want To Read", "Read"];
    const { books } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelfs.map(shelf => (
              <div className="bookshelf" key={shelf}>
                <h2 className="bookshelf-title">{shelf}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books.filter(book => book.shelf === this.normalizeShelf(shelf)).map(book => (
                      <BookItem book={book} key={book.id} />
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
          <div className="open-search">
            <Link
              to ='/search'
              className='close-search'>
              Add a book
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooks;