import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
      </header>
    );
  }
}

export default Header;
