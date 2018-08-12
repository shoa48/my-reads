import React from 'react'
import { Route } from 'react-router-dom'
import Books from './Books'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
  }
  componentDidMount() {
    BooksAPI.getAll().then((bookss) => {
      this.setState({ books: bookss })
    })
  }
  changeShelf = (e, shelfBook) => {
    const books = this.state.books;
    const shelf = e.target.value;
    shelfBook.shelf = e.target.value;

    this.setState({
        books
    });
    BooksAPI.update(shelfBook, shelf).then(() => {
      this.setState((prevState => ({
        books: prevState.books
    })));
  })
  }

  render() {
    return (
      <div className="app">
      <Route exact path='/' render={() => (
          <Books
            books={this.state.books} changeShelf = {this.changeShelf}
          />
        )}/>
      <Route exact path='/Search' render={() => (
          <Search
            books={this.state.books} changeShelf = {this.changeShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
