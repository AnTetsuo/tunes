import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      loginName: '',
      loading: false,
      response: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkNameLength = this.checkNameLength.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
  }

  async handleRequest(nameObj) {
    this.setState(
      {
        loading: true,
      },
      async () => {
        await createUser(nameObj);
        this.setState({
          response: 'OK',
          loading: false,
        });
      },
    );
  }

  handleChange(e) {
    const { target: { name, value } } = e;
    this.setState({
      [name]: value,
    });
  }

  checkNameLength() {
    const { loginName } = this.state;
    const minLength = 3;
    return loginName.length < minLength;
  }

  render() {
    const { loginName, loading, response } = this.state;
    const requestName = { name: loginName };
    const getResponse = response === 'OK';
    const LoginForm = (
      <form>
        <h2>Login</h2>
        <label
          htmlFor="login-name"
          className="app-display"
        >
          Insira seu Nome
          <input
            type="text"
            id="login-name"
            name="loginName"
            data-testid="login-name-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ this.checkNameLength() }
          onClick={ async () => this.handleRequest(requestName) }
        >
          Entrar
        </button>
      </form>);
    return (
      <div data-testid="page-login">
        { getResponse ? <Redirect to="/search" /> : console.log('waiting') }
        {loading ? <Loading /> : LoginForm }
      </div>
    );
  }
}

export default Login;
