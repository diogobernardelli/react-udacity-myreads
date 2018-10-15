import React from 'react';
import SearchBook from './SearchBook';
import ListBooks from './ListBooks';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import './App.css';

class BooksApp extends React.Component {
  state = {
    myBooks: []
  }

  componentDidMount() {
		BooksAPI.getAll().then(myBooks => this.setState({
			myBooks
    }))
	}

  render() {
    const { myBooks } = this.state;
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBook
            myBooks={myBooks} 
          />
        )}
			  />
        <Route exact path='/' render={() => (
          <ListBooks
            books={myBooks} 
          />
        )}
			  />
      </div>
    )
  }
}

export default BooksApp;
