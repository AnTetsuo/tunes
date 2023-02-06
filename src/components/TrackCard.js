import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import trackObjTypes from './types/types';

class TrackCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      isFavorite: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.returnCheck = this.returnCheck.bind(this);
    this.getFavoriteMusicOnLoad = this.getFavoriteMusicOnLoad.bind(this);
  }

  componentDidMount() {
    this.getFavoriteMusicOnLoad();
  }

  async handleChange() {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const { trackObj, trackId } = this.props;
        const favoriteList = JSON.parse(localStorage.getItem('favorite_songs'));
        const alreadyInFavorites = favoriteList
          .some((track) => track.trackId === trackId);
        if (alreadyInFavorites) {
          await removeSong(trackObj);
          this.setState({
            loading: false,
            isFavorite: false,
          });
        } else {
          await addSong(trackObj);
          this.setState({
            loading: false,
            isFavorite: this.returnCheck(trackId),
          });
        }
      },
    );
  }

  async getFavoriteMusicOnLoad() {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const { trackId } = this.props;
        await getFavoriteSongs();
        this.setState({
          loading: false,
          isFavorite: this.returnCheck(trackId),
        });
      },
    );
  }

  returnCheck(selfId) {
    const getted = JSON.parse(localStorage.getItem('favorite_songs'));
    const isTrack = getted.some((element) => element.trackId === selfId);
    return isTrack;
  }

  render() {
    const { trackName, trackUrl, trackId, handleChangeChildState } = this.props;
    const { loading, isFavorite } = this.state;
    const trackElement = (
      <>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ trackUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label
          htmlFor={ trackId }
          data-testid={ `checkbox-music-${trackId}` }
        >
          <input
            id={ trackId }
            type="checkbox"
            name={ trackId }
            onChange={ this.handleChange }
            checked={ isFavorite }
            onClick={ handleChangeChildState }
          />
          Favorita
        </label>
      </>);
    return (
      <div className="track-card">
        {loading ? <span>Carregando...</span> : trackElement }
      </div>
    );
  }
}

TrackCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  trackUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackObj: PropTypes.shape(trackObjTypes).isRequired,
  handleChangeChildState: PropTypes.func.isRequired,
};

export default TrackCard;
