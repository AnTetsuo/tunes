import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      userObj: {},
    };
    this.requestHandler = this.requestHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.userChanges = this.userChanges.bind(this);
  }

  componentDidMount() {
    this.requestHandler();
  }

  handleChange(event) {
    const { target } = event;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit() {
    const { name, description, img, email } = this.state;
    const check = [name, description, img, email];
    const validate = check.some((field) => field === '');
    return validate;
  }

  async userChanges() {
    const { name, description, img, email } = this.state;
    const userSave = {
      name,
      description,
      image: img,
      email,
    };
    await updateUser(userSave);
  }

  async requestHandler() {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const responseUser = await getUser();
        const { name, description, image, email } = responseUser;
        this.setState({
          userObj: responseUser,
          loading: false,
          name,
          description,
          img: image,
          email,
        });
      },
    );
  }

  render() {
    const { userObj, loading } = this.state;
    const { name, description, image, email } = userObj;
    const profileInput = (
      <>
        <label
          htmlFor="name"
        >
          Edite seu Nome:
          <input
            id="name"
            name="name"
            type="text"
            data-testid="edit-input-name"
            defaultValue={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label
          htmlFor="email"
        >
          Edite seu Email:
          <input
            name="email"
            type="text"
            data-testid="edit-input-email"
            defaultValue={ email }
            onChange={ this.handleChange }
          />
        </label>
        <textarea
          name="description"
          data-testid="edit-input-description"
          maxLength="140"
          defaultValue={ description }
          onChange={ this.handleChange }
          placeholder="entre sua descrição aqui"
        />
        <label
          htmlFor="img"
        >
          Imagem de Perfil:
          <input
            name="img"
            type="text"
            data-testid="edit-input-image"
            defaultValue={ image }
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/profile">
          <button
            type="button"
            data-testid="edit-button-save"
            disabled={ this.handleSubmit() }
            onClick={ this.userChanges }
          >
            Salvar
          </button>
        </Link>
      </>
    );
    return (
      <div data-testid="page-profile-edit" className="app-display">
        <Header />
        <h2>Profile Edit</h2>
        { loading ? <span>Carregando...</span> : profileInput }
      </div>
    );
  }
}

export default ProfileEdit;
