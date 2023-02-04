import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import TrackCard from '../components/TrackCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      artistInfo: {},
      trackList: [],
    };
    this.requestHandler = this.requestHandler.bind(this);
  }

  componentDidMount() {
    this.requestHandler();
  }

  async requestHandler() {
    const { match: { params: { id } } } = this.props;
    const albumDescResponse = await getMusics(id);
    const albumTrackList = albumDescResponse.filter((_track, index) => index !== 0);
    this.setState({
      artistInfo: { artistName: albumTrackList[0].artistName,
        albumName: albumTrackList[0].collectionName,
        albumUrl: albumTrackList[0].artworkUrl100 },
      trackList: albumTrackList,
    });
  }

  render() {
    const { artistInfo, trackList } = this.state;
    const { artistName, albumName, albumUrl } = artistInfo;
    const trackListCall = trackList.map((track) => (
      <TrackCard
        key={ track.trackId }
        trackName={ track.trackName }
        trackUrl={ track.previewUrl }
      />));
    return (
      <div data-testid="page-album">
        <Header />
        <AlbumCard name={ artistName } albumName={ albumName } albumCover={ albumUrl } />
        {trackListCall}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
