import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookItem extends Component {
  static propTypes = {
		book: PropTypes.object.isRequired
  }

  render() {
    const { book } = this.props;
    
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={book.imageLinks && { width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select defaultValue={book.shelf ? book.shelf : "none"}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {/* <div className="book-title">Shelf: {book.shelf}</div> */}
          <div className="book-authors">{book.authors && book.authors.join(", ")}</div>
        </div>
      </li>
    )
  }
}

export default BookItem;