import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
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
  }

  async handleChange() {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const { trackObj, trackId } = this.props;
        await addSong(trackObj);
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
    const { trackName, trackUrl, trackId } = this.props;
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
};

export default TrackCard;
