import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TrackCard extends Component {
  render() {
    const { trackName, trackUrl } = this.props;
    return (
      <div className="track-card">
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ trackUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

TrackCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  trackUrl: PropTypes.string.isRequired,
};

export default TrackCard;
