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

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      let myBooksReplica = this.state.myBooks;
      myBooksReplica.map(filteredBook => (
        filteredBook.id === book.id ? filteredBook.shelf = shelf : myBooksReplica
      ))
      console.log(myBooksReplica)
      this.setState({
        myBooks: myBooksReplica
      })
    })
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
