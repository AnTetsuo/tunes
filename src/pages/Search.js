import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkNameLength = this.checkNameLength.bind(this);
  }

  handleChange(e) {
    const { target: { name, value } } = e;
    this.setState({
      [name]: value,
    });
  }

  checkNameLength() {
    const { artistName } = this.state;
    const minLength = 2;
    return artistName.length < minLength;
  }

  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <h2>Search</h2>
        <form>
          <input
            placeholder="Busque um Artista"
            type="text"
            name="artistName"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ this.checkNameLength() }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
