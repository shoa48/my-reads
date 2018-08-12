import React from 'react'
import { Link } from "react-router-dom";
import Book from "./Book";

class Books extends React.Component {
	render() {
    const { books } = this.props;
    const shelves = {
    currentlyReading: ['Currently Reading', 'currentlyReading'],
    wantToRead: ['Want to Read', 'wantToRead'],
    read: ['Read', 'read']
  }
		return (
			<div className="list-books">
				<div className="list-books-title">
      		<h1>MyReads</h1>
        </div>
        	<div className="list-books-content">
        	<div>
          { Object.keys(shelves).map((shelf) =>
            <div key={shelves[shelf][1]} className="bookshelf">
            <h2 className="bookshelf-title">{shelves[shelf][0]}</h2>
            <Book showingBooks={ books.filter( book => book.shelf === shelves[shelf][1])}
            changeShelf={this.props.changeShelf}/>
            </div>
          )}
          </div>
          </div>
        <div className="open-search">
          <Link to = '/Search'>Add a Book</Link>
        </div>  
      </div>
    )
	}
}
export default Books;