import React, { Component } from 'react';
import Header from '../components/Header';
import TrackCard from '../components/TrackCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      favList: [],
    };
    this.handleRequest = this.handleRequest.bind(this);
    this.handleChangeChildState = this.handleChangeChildState.bind(this);
  }

  componentDidMount() {
    this.handleRequest();
  }

  async handleChangeChildState(event) {
    const { target } = event;
    const { favList } = this.state;
    const filteredList = favList.filter((fav) => fav.trackId !== Number(target.name));
    const toRemove = favList.find((e) => e.trackId === Number(target.name));
    await removeSong(toRemove);
    this.setState({
      favList: filteredList,
    });
  }

  async handleRequest() {
    const favoriteList = await getFavoriteSongs();
    this.setState({
      favList: favoriteList,
    });
  }

  render() {
    const { favList } = this.state;
    const mappedFavoriteTracks = favList ? favList.map((favorite) => (
      <TrackCard
        key={ favorite.trackId }
        trackObj={ favorite }
        trackId={ favorite.trackId }
        trackName={ favorite.trackName }
        trackUrl={ favorite.previewUrl }
        handleChangeChildState={ this.handleChangeChildState }
      />))
      : '';
    return (
      <div data-testid="page-favorites">
        <Header />
        <h2>Favorites</h2>
        { mappedFavoriteTracks }
      </div>
    );
  }
}

export default Favorites;
