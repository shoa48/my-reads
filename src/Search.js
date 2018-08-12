import React from "react";
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Book'

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showingBooksResult:[], homeBooks: props.books, query: '', eror: ''}
    }
    componentWillReceiveProps(props) {
        this.setState({ homeBooks: props.books });
    }
    search = (query) => {
        if (query.trim() === '') {
            this.setState({
                showingBooksResult:[],
                eror: "Nothing searched",
            })
        }
        else {
            BooksAPI.search(query.trim()).then((showingBooksResult) => {
                if (showingBooksResult.error) {
                    this.setState({
                        showingBooksResult:[],
                        eror: "Error, Books not found",
                     })
                }
                else if (showingBooksResult.length > 0) {
                    let homeBooks = this.state.homeBooks;
                    homeBooks.map((book) => {
                        showingBooksResult.map((newBook) => {
                            if (newBook.id === book.id) {
                                newBook.shelf = book.shelf
                            }
                        })
                    });
                    this.setState({ showingBooksResult: showingBooksResult })
                }

            })
        }
    }


    render() {
        const { showingBooksResult } = this.state
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search" >Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                            onChange={(event) => this.search(event.target.value)} placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    {showingBooksResult.length > 0 ? <Book showingBooks={showingBooksResult} changeShelf={this.props.changeShelf} /> : <h3>{this.state.eror}</h3>}
                </div>

            </div>

        )
    }
}
export default Search;