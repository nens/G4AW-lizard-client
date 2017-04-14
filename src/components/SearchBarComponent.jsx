import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles/SearchBarComponent.css';
// import SearchBar from 'react-search-bar';
import Autosuggest from 'react-autosuggest';

// NATIVE HTML SEARCHBAR:
////////////////////////////////////////
export default class SearchBarComponent extends Component {
  render () {
    return (
      <input type="text"
             defaultValue="Utrecht"
             className={styles.foobar} />
    );
  }
}


// Using package "react-search-bar" (=deprecated)
//////////////////////////////////////////////////////////////
// export default class SearchBarComponent extends Component {

//   handleChange() {
//     console.log("[dbg] detected change in searchbar!");
//   }

//   handleSuggestions() {
//     return ["Bilthoven", "De Bilt", "Maarssen", "Nieuwegein"];
//   }

//   onSearch() {
//     console.log("[dbg] initiate");
//   }

//   render() {
//     return (
//       <SearchBar className={styles.foobar}
//                  onChange={this.handleChange}
//                  onSearch={this.onSearch}
//                  suggestions={this.handleSuggestions()} />
//     );
//   }
// }

// Using package "react-autosuggest" (=OK!)
//////////////////////////////////////////////////////////////
// TODO: Vrijdag (14-04-2017) ochtend...

