import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AlbumCard extends Component {
  render() {
    const { name, albumName, albumCover } = this.props;
    return (
      <div className="album-card">
        <img src={ albumCover } alt="albumName" />
        <p>{ albumName }</p>
        <p>{ name }</p>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  name: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  albumCover: PropTypes.string.isRequired,
};

export default AlbumCard;
