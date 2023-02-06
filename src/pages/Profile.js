import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      userObj: {
        description: '',
        email: '',
        image: '',
        name: '',
      },
    };
    this.requestHandler = this.requestHandler.bind(this);
  }

  componentDidMount() {
    this.requestHandler();
  }

  async requestHandler() {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const responseUser = await getUser();
        console.log(responseUser);
        this.setState({
          userObj: responseUser,
          loading: false,
        });
      },
    );
  }

  render() {
    const { userObj, loading } = this.state;
    const { name, description, image, email } = userObj;
    const userDisplay = (
      <section>
        <Link to="/profile/edit">Editar perfil</Link>
        <h3>{ name }</h3>
        <p>{ description }</p>
        <img src={ image } alt={ description } data-testid="profile-image" />
        <p>{ email }</p>
      </section>
    );
    return (
      <div data-testid="page-profile">
        <Header />
        <h2>Profile</h2>
        { loading ? 'Carregando' : userDisplay }
      </div>
    );
  }
}

export default Profile;
