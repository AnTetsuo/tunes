import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumCard from '../components/AlbumCard';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      loading: false,
      artistSearch: '',
      albumList: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkNameLength = this.checkNameLength.bind(this);
    this.fetchArtist = this.fetchArtist.bind(this);
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

  async fetchArtist() {
    const { artistName } = this.state;
    this.setState({
      loading: true,
      artistSearch: artistName,
    }, async () => {
      const responseArtist = await searchAlbumsAPI(artistName);
      this.setState({
        artistName: '',
        loading: false,
        albumList: responseArtist,
      });
    });
  }

  render() {
    const { artistName, artistSearch, loading, albumList } = this.state;
    const notFoundMessage = artistSearch
      ? <h3>Nenhum álbum foi encontrado</h3> : '';
    const mappedAlbums = (
      <div key="div-album-list" className="search-result-container">
        <p
          className="message"
          key="message"
        >
          {`Resultado de álbuns de: ${artistSearch}`}
        </p>
        {albumList.map((album, index) => (
          <div key={ index + album.artworkUrl100 } className="album">
            <AlbumCard
              key={ index + album.collectionId }
              name={ artistSearch }
              albumName={ album.collectionName }
              albumCover={ album.artworkUrl100 }
            />
            <Link
              key={ index + album.collectionId + album.collectionName }
              to={ `album/${album.collectionId}` }
              data-testid={ `link-to-album-${album.collectionId}` }
            >
              Link
            </Link>
          </div>
        ))}
      </div>);
    const requestReturn = albumList.length !== 0 ? mappedAlbums : notFoundMessage;
    return (
      <div data-testid="page-search" className="app-display">
        <Header />
        <h2>Search</h2>
        <form>
          <input
            placeholder="Busque um Artista"
            type="text"
            name="artistName"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
            value={ artistName }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ this.checkNameLength() }
            onClick={ this.fetchArtist }
          >
            Pesquisar
          </button>
        </form>
        { loading ? <p>Carregando...</p> : requestReturn }
      </div>
    );
  }
}

export default Search;
