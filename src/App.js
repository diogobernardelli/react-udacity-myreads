import React from 'react';
import SearchBook from './SearchBook';
import ListBooks from './ListBooks';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import Loading from './Loading';
import './App.css';

class BooksApp extends React.Component {
  state = {
    myBooks: [],
    loading: false
  }

  changeShelf = (book, shelf) => {
    this.setState({
      loading: true
    })

    /*
      I could do another solution here, but it demands
      a lot of code, which is: after the response from
      update promise, find the book in myBook state and
      updating its shelf. If the book isn't in the myBook
      state, use the get method from API. But it is, at least,
      10 to 15 plus lines of code..
    */
   
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then(myBooks => this.setState({
        myBooks,
        loading: false
      }))
    })
  }

  componentDidMount() {
    this.setState({
      loading: true
    })
		BooksAPI.getAll().then(myBooks => this.setState({
			myBooks,
      loading: false
    }))
	}

  render() {
    const { myBooks, loading } = this.state;
    return (
      <div className="app">
        {loading && <Loading /> }
        <Route path='/search' render={() => (
          <SearchBook
            myBooks={myBooks} 
            changeShelf = {this.changeShelf}
          />
        )}
			  />
        <Route exact path='/' render={() => (
          <ListBooks
            books={myBooks}
            changeShelf = {this.changeShelf}
          />
        )}
			  />
      </div>
    )
  }
}

export default BooksApp;
