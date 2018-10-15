import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookItem from './BookItem';
import Loading from './Loading';

class SearchBook extends Component {
  state = {
    myBooks: [],
    books: [],
    query: '',
    loading: false
  }
  
  searchQuery = query => {
    if(query.length !== 0) {

      /*
        displaying the loading and
        enabling the user to keep typing
        even though the API din't respond so far

        If we move the `query: query` to the `then`
        promise method, the user will have to wait
        untill the API responds to type any other
        letter
      */
      this.setState({
        loading: true,
        query: query
      })

      BooksAPI.search(query).then(
        response => {
          const filteredBooks = this.filterMyBooks(response, query, this.state.myBooks);
          let result = []
          if (response.error === undefined) {
            result = response.concat(filteredBooks)
          } else {
            result = filteredBooks
          }
          this.setState({
            books: result,
            loading: false
          })
        }
      )
    } else {
      this.setState(() => ({
        books: [],
        query: query
      }))
    }
  }

  filterMyBooks = (response, query, myBooks) => {
    const filtered = myBooks.filter(myBook => (
      myBook.title.includes(query) || (myBook.author && myBook.author.includes(query))
    ))
    
    /*
      this will remove repetead items
      from this.state.myBooks and the response from API
    */
    if (response.error === undefined) {
      response.map((itemAPI) => (
        filtered.map((itemState, index) => {
          if (itemAPI.id === itemState.id) {
            filtered.splice(index, 1)
          }
          return filtered
        })
      ))
    }
    return filtered
  }

  componentDidMount() {
    if (this.props.myBooks.length !== 0) {
      this.setState({
        myBooks: this.props.myBooks
      })
    } else {
      BooksAPI.getAll().then(myBooks => this.setState({
        myBooks
      }))
    }
	}
  
  render() {
    const { books, query, loading } = this.state;
    const { changeShelf } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to ='/'
            className='close-search'>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              autoFocus
              value={query}
              onChange={(event) => this.searchQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {loading && <Loading /> }

          <ol className="books-grid">
            {books.length >= 1 && books.map(book => (
              <BookItem book={book} changeShelf={changeShelf} key={book.id} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBook;