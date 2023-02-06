import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      userGet: '',
    };
    this.handleRequest = this.handleRequest.bind(this);
  }

  componentDidMount() {
    this.handleRequest();
  }

  async handleRequest() {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const gotUser = await getUser();
        this.setState({
          userGet: gotUser,
          loading: false,
        });
      },
    );
  }

  render() {
    const { loading, userGet } = this.state;
    return (
      <header
        data-testid="header-component"
      >
        <p
          data-testid="header-user-name"
        >
          { loading ? 'Carregando...' : userGet.name }
        </p>
        <div className="nav-links">
          <Link
            to="/search"
            data-testid="link-to-search"
          >
            Search
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
          >
            Favorites
          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
          >
            Profile
          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
