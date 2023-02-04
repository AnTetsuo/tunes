import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AlbumCard extends Component {
  render() {
    const { name, albumName, albumCover } = this.props;
    return (
      <div className="album-card">
        <img src={ albumCover } alt="albumName" />
        <p data-testid="album-name">{ albumName }</p>
        <p data-testid="artist-name">{ name }</p>
      </div>
    );
  }
}

AlbumCard.defaultProps = {
  name: 'Artist Name',
  albumName: 'Collection Name',
  albumCover: 'NOT FOUND',
};

AlbumCard.propTypes = {
  name: PropTypes.string,
  albumName: PropTypes.string,
  albumCover: PropTypes.string,
};

export default AlbumCard;
